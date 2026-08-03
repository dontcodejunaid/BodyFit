// LocalStorage persistence layer for BodyFit.
//
// Two APIs live here because two callers grew independently:
//   - the generic KEYS/getStorageItem/setStorageItem trio, used by AppContext
//   - the booking-specific helpers, used by BookingForm
// Both read and write the same KEYS.BOOKINGS list, so a booking saved through
// saveBooking() is picked up by AppContext on the next mount.

import { initialMemberships, initialTrainers } from '../data/seedData';

export const KEYS = {
  USERS: 'bodyfit_users',
  BOOKINGS: 'bodyfit_bookings',
  MEMBERSHIPS: 'bodyfit_memberships',
  TRAINERS: 'bodyfit_trainers',
  REVIEWS: 'bodyfit_reviews',
  SETTINGS: 'bodyfit_settings'
};

export const getStorageItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item);
    if (key === KEYS.MEMBERSHIPS) return initialMemberships;
    if (key === KEYS.TRAINERS) return initialTrainers;
    return [];
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return [];
  }
};

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage`, error);
  }
};

/**
 * Get all saved bookings from LocalStorage
 * @returns {Array} List of booking objects
 */
export function getBookings() {
  try {
    const data = localStorage.getItem(KEYS.BOOKINGS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading bookings from localStorage:', error);
    return [];
  }
}

/**
 * Save a new booking to LocalStorage
 * @param {Object} bookingData
 * @returns {Object} Saved booking with reference ID
 */
export function saveBooking(bookingData) {
  const existingBookings = getBookings();

  // Generate unique booking reference ID (e.g. BF-84920)
  const randomId = Math.floor(10000 + Math.random() * 90000);
  const bookingWithId = {
    id: `BF-${randomId}`,
    ...bookingData,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  const updatedList = [bookingWithId, ...existingBookings];

  try {
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updatedList));
  } catch (error) {
    console.error('Error saving booking to localStorage:', error);
  }

  return bookingWithId;
}

/**
 * Check if a date & time slot is already booked for double-booking protection
 * @param {string} date
 * @param {string} time
 * @returns {boolean} True if slot is booked
 */
export function isSlotTaken(date, time) {
  const bookings = getBookings();
  return bookings.some(b => b.date === date && b.time === time && b.status !== 'Cancelled');
}
