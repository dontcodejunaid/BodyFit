import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  STORE_KEYS, getBookings, saveBookings,
  getMemberships, saveMemberships, getTrainers, saveTrainers,
} from '../utils/adminStore';

// Previously imported KEYS/getStorageItem/setStorageItem from utils/localStorage,
// none of which that module exports — mounting this provider threw immediately.
// It now reads through adminStore, so the context, the public sections and the
// admin panel all share the same localStorage keys.

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [bookings, setBookings] = useState(getBookings);
  const [memberships, setMemberships] = useState(getMemberships);
  const [trainers, setTrainers] = useState(getTrainers);

  useEffect(() => { saveBookings(bookings); }, [bookings]);
  useEffect(() => { saveMemberships(memberships); }, [memberships]);
  useEffect(() => { saveTrainers(trainers); }, [trainers]);

  // Pick up writes made in another tab (or by the admin panel).
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORE_KEYS.BOOKINGS) setBookings(getBookings());
      if (event.key === STORE_KEYS.MEMBERSHIPS) setMemberships(getMemberships());
      if (event.key === STORE_KEYS.TRAINERS) setTrainers(getTrainers());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addBooking = (newBooking) => {
    const bookingWithId = { 
      id: `BK-${Date.now()}`, 
      ...newBooking, 
      status: 'Pending', 
      createdAt: new Date().toISOString() 
    };
    setBookings((prev) => [...prev, bookingWithId]);
    return bookingWithId;
  };

  return (
    <AppContext.Provider
      value={{ bookings, addBooking, memberships, setMemberships, trainers, setTrainers }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);