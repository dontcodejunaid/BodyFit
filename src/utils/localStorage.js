// LocalStorage Persistence Layer for BodyFit Bookings

const BOOKINGS_KEY = 'bodyfit_bookings';

/**
 * Get all saved bookings from LocalStorage
 * @returns {Array} List of booking objects
 */
export function getBookings() {
  try {
    const data = localStorage.getItem(BOOKINGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading bookings from localStorage:', error);
    return [];
  }
}

/**
 * Save a new booking to LocalStorage
 * @param {Object} newBooking 
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
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedList));
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
