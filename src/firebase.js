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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
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
    let querySnapshot;
    try {
      const q = query(collection(db, BOOKINGS_COLLECTION), orderBy('createdAt', 'desc'));
      querySnapshot = await getDocs(q);
    } catch (e) {
      querySnapshot = await getDocs(collection(db, BOOKINGS_COLLECTION));
    }
    return querySnapshot.docs.map((docSnap) => ({
      docId: docSnap.id,
      ...docSnap.data()
    }));
  } catch (error) {
    console.warn('Firebase read unavailable or fallback mode active:', error.message);
    return [];
  }
}

/**
 * Update an existing booking in Firebase Firestore
 */
export async function updateBookingInFirebase(docIdOrBookingId, patch) {
  try {
    if (docIdOrBookingId && typeof docIdOrBookingId === 'string' && docIdOrBookingId.length > 15 && !docIdOrBookingId.startsWith('BF-')) {
      const docRef = doc(db, BOOKINGS_COLLECTION, docIdOrBookingId);
      await updateDoc(docRef, patch);
      return true;
    }

    const q = query(collection(db, BOOKINGS_COLLECTION));
    const snapshot = await getDocs(q);
    const targetDoc = snapshot.docs.find((d) => d.data().id === docIdOrBookingId || d.id === docIdOrBookingId);

    if (targetDoc) {
      const docRef = doc(db, BOOKINGS_COLLECTION, targetDoc.id);
      await updateDoc(docRef, patch);
      return true;
    }
  } catch (error) {
    console.warn('Firebase update unavailable:', error.message);
  }
  return false;
}

/**
 * Delete a booking from Firebase Firestore
 */
export async function deleteBookingFromFirebase(docIdOrBookingId) {
  try {
    if (docIdOrBookingId && typeof docIdOrBookingId === 'string' && docIdOrBookingId.length > 15 && !docIdOrBookingId.startsWith('BF-')) {
      const docRef = doc(db, BOOKINGS_COLLECTION, docIdOrBookingId);
      await deleteDoc(docRef);
      return true;
    }

    const q = query(collection(db, BOOKINGS_COLLECTION));
    const snapshot = await getDocs(q);
    const targetDoc = snapshot.docs.find((d) => d.data().id === docIdOrBookingId || d.id === docIdOrBookingId);

    if (targetDoc) {
      const docRef = doc(db, BOOKINGS_COLLECTION, targetDoc.id);
      await deleteDoc(docRef);
      return true;
    }
  } catch (error) {
    console.warn('Firebase delete unavailable:', error.message);
  }
  return false;
}
