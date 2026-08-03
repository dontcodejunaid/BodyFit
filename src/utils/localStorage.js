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