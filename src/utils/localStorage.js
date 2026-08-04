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
 * Check if a date, time slot & optional trainer is already booked for double-booking protection
 * @param {string} date 
 * @param {string} time 
 * @param {string} trainer Optional trainer name
 * @returns {boolean} True if slot is booked/conflict detected
 */
export function isSlotTaken(date, time, trainer = null) {
  const bookings = getBookings();
  return bookings.some(b => {
    if (b.status === 'Cancelled') return false;
    const sameSlot = b.date === date && b.time === time;
    if (!sameSlot) return false;

    // If specific trainer specified, check trainer collision
    if (trainer && trainer !== 'No Preference (Assign Any Available)') {
      return b.trainer === trainer || b.trainer === 'No Preference (Assign Any Available)';
    }

    return true;
  });
}

/**
 * Update booking lifecycle status
 * @param {string} id Booking reference ID
 * @param {string} newStatus 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
 * @returns {Array} Updated list of bookings
 */
export function updateBookingStatus(id, newStatus) {
  const bookings = getBookings();
  const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error updating booking status:', error);
  }
  return updated;
}
