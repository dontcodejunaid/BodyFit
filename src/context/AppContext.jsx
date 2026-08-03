import React, { createContext, useContext, useState, useEffect } from 'react';
import { KEYS, getStorageItem, setStorageItem } from '../utils/localStorage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [bookings, setBookings] = useState(() => getStorageItem(KEYS.BOOKINGS));
  const [memberships, setMemberships] = useState(() => getStorageItem(KEYS.MEMBERSHIPS));
  const [trainers, setTrainers] = useState(() => getStorageItem(KEYS.TRAINERS));

  useEffect(() => setStorageItem(KEYS.BOOKINGS, bookings), [bookings]);
  useEffect(() => setStorageItem(KEYS.MEMBERSHIPS, memberships), [memberships]);
  useEffect(() => setStorageItem(KEYS.TRAINERS, trainers), [trainers]);

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
    <AppContext.Provider value={{ bookings, addBooking, memberships, setMemberships, trainers }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);