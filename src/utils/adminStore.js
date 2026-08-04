// Data layer for the admin portal.
//
// Everything lives in localStorage, on the same keys the public site already
// reads, so an edit here shows up on the live site after a refresh:
//   bodyfit_bookings  <- BookingForm.jsx writes, Bookings panel manages
//   bodyfit_trainers  <- Trainers.jsx reads
//   bodyfit_classes   <- ClassSchedule.jsx reads
//   bodyfit_memberships <- managed here only (no public section renders it yet)

import { INITIAL_TRAINERS, INITIAL_SCHEDULE } from '../data/trainersAndScheduleData';
import { initialMemberships } from '../data/seedData';

export const STORE_KEYS = {
  BOOKINGS: 'bodyfit_bookings',
  TRAINERS: 'bodyfit_trainers',
  CLASSES: 'bodyfit_classes',
  MEMBERSHIPS: 'bodyfit_memberships',
};

export const BOOKING_STATUSES = ['Pending', 'Approved', 'Rejected'];

// Dummy price list used only for the revenue estimate. Update these to the
// gym's real rates — nothing else depends on them.
export const SERVICE_PRICES = {
  'Gym Session': 500,
  'Personal Training': 1200,
  'Group Class': 700,
  'Membership Enquiry': 0,
};

function read(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key}:`, error);
  }
  return value;
}

/** Seeds a key from its static defaults the first time the portal opens. */
function readSeeded(key, seed) {
  const raw = localStorage.getItem(key);
  if (raw === null) return write(key, seed);
  return read(key, seed);
}

/* ------------------------------- bookings ------------------------------- */

export const getBookings = () => read(STORE_KEYS.BOOKINGS);
export const saveBookings = (list) => write(STORE_KEYS.BOOKINGS, list);

export function updateBooking(id, patch) {
  const next = getBookings().map((booking) =>
    booking.id === id ? { ...booking, ...patch, updatedAt: new Date().toISOString() } : booking
  );
  return saveBookings(next);
}

export function deleteBooking(id) {
  return saveBookings(getBookings().filter((booking) => booking.id !== id));
}

export const todayISO = () => new Date().toISOString().split('T')[0];

/** Buckets a booking by its date: 'today' | 'upcoming' | 'past'. */
export function bucketOf(booking) {
  const today = todayISO();
  if (!booking.date) return 'past';
  if (booking.date === today) return 'today';
  return booking.date > today ? 'upcoming' : 'past';
}

/* ------------------------- manageable collections ------------------------ */

export const getTrainers = () => readSeeded(STORE_KEYS.TRAINERS, INITIAL_TRAINERS);
export const saveTrainers = (list) => write(STORE_KEYS.TRAINERS, list);

export const getClasses = () => readSeeded(STORE_KEYS.CLASSES, INITIAL_SCHEDULE);
export const saveClasses = (list) => write(STORE_KEYS.CLASSES, list);

export const getMemberships = () => readSeeded(STORE_KEYS.MEMBERSHIPS, initialMemberships);
export const saveMemberships = (list) => write(STORE_KEYS.MEMBERSHIPS, list);

export const newId = (prefix) => `${prefix}-${Date.now().toString(36)}`;

/* ------------------------------- analytics ------------------------------- */

/** Parses '07:00 AM' into a 0-23 hour. Returns null if unparseable. */
export function hourOf(timeLabel) {
  if (!timeLabel) return null;
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(timeLabel.trim());
  if (!match) return null;
  let hour = Number(match[1]) % 12;
  if (match[3].toUpperCase() === 'PM') hour += 12;
  return hour;
}

export function formatHour(hour) {
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:00 ${suffix}`;
}

export function buildAnalytics(bookings) {
  // Bookings per day for the last 14 days, oldest first.
  const perDay = [];
  for (let offset = 13; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    const iso = date.toISOString().split('T')[0];
    perDay.push({
      date: iso,
      label: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      count: bookings.filter((booking) => booking.date === iso).length,
    });
  }

  const byService = {};
  bookings.forEach((booking) => {
    const service = booking.service || 'Unspecified';
    byService[service] = (byService[service] || 0) + 1;
  });
  const services = Object.entries(byService)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const byHour = {};
  bookings.forEach((booking) => {
    const hour = hourOf(booking.time);
    if (hour === null) return;
    byHour[hour] = (byHour[hour] || 0) + 1;
  });
  const hours = Object.entries(byHour)
    .map(([hour, count]) => ({ hour: Number(hour), label: formatHour(Number(hour)), count }))
    .sort((a, b) => b.count - a.count);

  // Revenue estimate counts approved bookings only.
  const approved = bookings.filter((booking) => booking.status === 'Approved');
  const revenue = approved.reduce(
    (total, booking) => total + (SERVICE_PRICES[booking.service] ?? 0),
    0
  );

  return {
    perDay,
    services,
    hours,
    revenue,
    approvedCount: approved.length,
    total: bookings.length,
    pending: bookings.filter((booking) => booking.status === 'Pending').length,
    rejected: bookings.filter((booking) => booking.status === 'Rejected').length,
  };
}

/** Collapses bookings into one row per unique phone number. */
export function buildMembers(bookings) {
  const map = new Map();
  bookings.forEach((booking) => {
    const key = booking.phone || booking.email || booking.name;
    if (!key) return;
    const existing = map.get(key);
    if (existing) {
      existing.bookings += 1;
      if (booking.date > existing.lastBooking) existing.lastBooking = booking.date;
      if (booking.date < existing.firstBooking) existing.firstBooking = booking.date;
    } else {
      map.set(key, {
        name: booking.name || '',
        phone: booking.phone || '',
        email: booking.email || '',
        bookings: 1,
        firstBooking: booking.date || '',
        lastBooking: booking.date || '',
      });
    }
  });
  return Array.from(map.values()).sort((a, b) => b.bookings - a.bookings);
}

/* --------------------------------- CSV ---------------------------------- */

function escapeCell(value) {
  const text = value === null || value === undefined ? '' : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function toCsv(rows, columns) {
  const header = columns.map((column) => escapeCell(column.label)).join(',');
  const body = rows
    .map((row) => columns.map((column) => escapeCell(row[column.key])).join(','))
    .join('\n');
  return `${header}\n${body}`;
}

export function downloadCsv(filename, csv) {
  // Prepend a BOM so Excel opens UTF-8 correctly.
  const blob = new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
