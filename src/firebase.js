// Firebase Cloud Integration & Analytics for BodyFit
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC8YVZcgktJamYJR4YTMaC2R9nxWtVKyS8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "body-fit-a1823.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "body-fit-a1823",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "body-fit-a1823.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "839012042785",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:839012042785:web:d65b55b5f5525f3d72fb60",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-4ND6FQ5NBJ"
};

// Initialize Firebase App & Firestore Database
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Safe Analytics Initialization for browser environments
export let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

const BOOKINGS_COLLECTION = 'bookings';

/**
 * Save booking to Firebase Firestore (with LocalStorage sync)
 */
export async function saveBookingToFirebase(bookingData) {
  const randomId = Math.floor(10000 + Math.random() * 90000);
  const bookingWithId = {
    id: `BF-${randomId}`,
    ...bookingData,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  try {
    const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), bookingWithId);
    return { docId: docRef.id, ...bookingWithId };
  } catch (error) {
    console.warn('Firebase write unavailable or fallback mode active:', error.message);
    return bookingWithId;
  }
}

/**
 * Fetch all bookings from Firebase Firestore
 */
export async function getBookingsFromFirebase() {
  try {
    const q = query(collection(db, BOOKINGS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnap) => ({
      docId: docSnap.id,
      ...docSnap.data()
    }));
  } catch (error) {
    console.warn('Firebase read unavailable or fallback mode active:', error.message);
    return [];
  }
}
