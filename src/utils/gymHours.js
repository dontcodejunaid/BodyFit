// Single source of truth for opening hours.
//
// Everything is evaluated against the VISITOR'S local clock (new Date() reads
// the device timezone), so a member in another timezone sees the badge relative
// to their own time. If the gym should always be shown in IST regardless of
// where the visitor is, that needs an explicit timezone conversion here.

export const SHIFTS = [
  { label: 'Morning Shift', start: 6, end: 13 },  // 6:00 AM - 1:00 PM
  { label: 'Evening Shift', start: 17, end: 22 }, // 5:00 PM - 10:00 PM
];

export function formatHour(hour) {
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:00 ${suffix}`;
}

/**
 * Current open/closed state from the visitor's own clock.
 * @returns {{ isOpen: boolean, label: string, detail: string, shift: object|null, minutesUntilChange: number }}
 */
export function getOpenStatus(now = new Date()) {
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  const current = SHIFTS.find(
    (shift) => minutesNow >= shift.start * 60 && minutesNow < shift.end * 60
  );

  if (current) {
    return {
      isOpen: true,
      label: 'Open Now',
      detail: `Closes ${formatHour(current.end)}`,
      shift: current,
      minutesUntilChange: current.end * 60 - minutesNow,
    };
  }

  const next = SHIFTS.find((shift) => minutesNow < shift.start * 60);

  if (next) {
    return {
      isOpen: false,
      label: 'Closed',
      detail: `Opens today at ${formatHour(next.start)}`,
      shift: null,
      minutesUntilChange: next.start * 60 - minutesNow,
    };
  }

  // Past the last shift — next opening is tomorrow morning.
  const minutesLeftToday = 24 * 60 - minutesNow;
  return {
    isOpen: false,
    label: 'Closed',
    detail: `Opens tomorrow at ${formatHour(SHIFTS[0].start)}`,
    shift: null,
    minutesUntilChange: minutesLeftToday + SHIFTS[0].start * 60,
  };
}

/** Human summary used by the FAQ bot and the footer. */
export const hoursSummary = SHIFTS.map(
  (shift) => `${shift.label}: ${formatHour(shift.start)} – ${formatHour(shift.end)}`
).join(' · ');
