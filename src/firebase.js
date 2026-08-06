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

// Check if Firebase configuration environment variables are present and valid
export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  !import.meta.env.VITE_FIREBASE_API_KEY.includes('your_firebase_api_key')
);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase App & Firestore Database safely
let app = null;
let db = null;
let analytics = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);

    if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      }).catch((err) => {
        console.warn('Firebase Analytics initialization warning:', err.message);
      });
    }
  } catch (err) {
    console.error('Firebase Initialization Error:', err.message);
  }
} else {
  console.info(
    '🔥 Firebase API keys not configured. Set VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID in your .env file to enable cloud sync.'
  );
}

export { app, db, analytics };

const BOOKINGS_COLLECTION = 'bookings';
const REVIEWS_COLLECTION = 'reviews';

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

  if (!db) {
    console.warn('Firebase DB is not initialized. Using local storage fallback.');
    return bookingWithId;
  }

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
  if (!db) {
    console.warn('Firebase DB is not initialized. Unable to fetch remote bookings.');
    return [];
  }

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


/**
 * Save review to Firebase Firestore
 */
export async function saveReviewToFirebase(reviewData) {
  const randomId = Math.floor(10000 + Math.random() * 90000);

  const reviewWithId = {
    id: `RV-${randomId}`,
    ...reviewData,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  try {
    const docRef = await addDoc(
      collection(db, REVIEWS_COLLECTION),
      reviewWithId
    );

    return {
      docId: docRef.id,
      ...reviewWithId,
    };
  } catch (error) {
    console.warn("Firebase review write unavailable:", error.message);
    throw error;
  }
}

/**
 * Fetch all reviews from Firebase Firestore
 */
export async function getReviewsFromFirebase() {
  try {
    let querySnapshot;

    try {
      const q = query(
        collection(db, REVIEWS_COLLECTION),
        orderBy("createdAt", "desc")
      );

      querySnapshot = await getDocs(q);
    } catch {
      querySnapshot = await getDocs(
        collection(db, REVIEWS_COLLECTION)
      );
    }

    return querySnapshot.docs.map((docSnap) => ({
      docId: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.warn("Firebase review read unavailable:", error.message);
    return [];
  }
}

/**
 * Update review in Firebase Firestore
 */
export async function updateReviewInFirebase(docIdOrReviewId, patch) {
  try {
    if (
      docIdOrReviewId &&
      typeof docIdOrReviewId === "string" &&
      docIdOrReviewId.length > 15 &&
      !docIdOrReviewId.startsWith("RV-")
    ) {
      const docRef = doc(db, REVIEWS_COLLECTION, docIdOrReviewId);
      await updateDoc(docRef, patch);
      return true;
    }

    const snapshot = await getDocs(collection(db, REVIEWS_COLLECTION));

    const targetDoc = snapshot.docs.find(
      (d) =>
        d.data().id === docIdOrReviewId ||
        d.id === docIdOrReviewId
    );

    if (targetDoc) {
      await updateDoc(
        doc(db, REVIEWS_COLLECTION, targetDoc.id),
        patch
      );
      return true;
    }
  } catch (error) {
    console.warn("Firebase review update unavailable:", error.message);
  }

  return false;
}

/**
 * Delete review from Firebase Firestore
 */
export async function deleteReviewFromFirebase(docIdOrReviewId) {
  try {
    if (
      docIdOrReviewId &&
      typeof docIdOrReviewId === "string" &&
      docIdOrReviewId.length > 15 &&
      !docIdOrReviewId.startsWith("RV-")
    ) {
      await deleteDoc(doc(db, REVIEWS_COLLECTION, docIdOrReviewId));
      return true;
    }

    const snapshot = await getDocs(collection(db, REVIEWS_COLLECTION));

    const targetDoc = snapshot.docs.find(
      (d) =>
        d.data().id === docIdOrReviewId ||
        d.id === docIdOrReviewId
    );

    if (targetDoc) {
      await deleteDoc(
        doc(db, REVIEWS_COLLECTION, targetDoc.id)
      );
      return true;
    }
  } catch (error) {
    console.warn("Firebase review delete unavailable:", error.message);
  }

  return false;
}