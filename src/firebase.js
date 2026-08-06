// Firebase Cloud Integration & Analytics for BodyFit
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { INITIAL_TRAINERS } from './data/trainersAndScheduleData';
import { DEFAULT_MEMBERSHIP_PLANS } from './data/membershipPlans';

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
const TRAINERS_COLLECTION = 'trainers';
const MEMBERSHIPS_COLLECTION = 'memberships';
// Members who actually bought a plan. `memberships` above holds the plan
// catalogue; this one holds the people on those plans.
const MEMBER_SIGNUPS_COLLECTION = 'membershipSignups';

// Helper to create clean, readable document IDs in Firestore for trainers (e.g. "Priya Kapoor" -> "priya-kapoor")
function getTrainerDocId(trainerOrName) {
  const name = typeof trainerOrName === 'string' ? trainerOrName : (trainerOrName?.name || trainerOrName?.id || 'trainer');
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || `trainer-${Date.now()}`;
}

// Helper to get exact clean document ID for membership plans (e.g. "silver" -> "silver-plan")
function getDocIdForPlan(plan) {
  if (plan.id === 'basic-plan' || plan.id === 'standard-plan' || plan.id === 'premium-plan') {
    return plan.id;
  }
  if (plan.docId === 'basic-plan' || plan.docId === 'standard-plan' || plan.docId === 'premium-plan') {
    return plan.docId;
  }
  const rawName = plan.name || plan.tier || 'plan';
  const slug = rawName
    .toLowerCase()
    .trim()
    .replace(/\(.*?\)/g, '') // strip parentheses e.g. "(Gym Only)"
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (slug === 'basic' || slug === 'standard' || slug === 'premium') return `${slug}-plan`;
  return slug ? (slug.endsWith('-plan') ? slug : `${slug}-plan`) : `plan-${Date.now()}`;
}

// ----------------------------------------------------
// BOOKINGS COLLECTION FIRESTORE INTEGRATION
// ----------------------------------------------------

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

// ----------------------------------------------------
// TRAINERS COLLECTION FIRESTORE INTEGRATION
// ----------------------------------------------------

/**
 * Auto-seed initial trainers into Firebase Firestore
 */
export async function seedInitialTrainersToFirebase() {
  try {
    const seededList = [];
    for (const trainer of INITIAL_TRAINERS) {
      const docId = getTrainerDocId(trainer);
      const trainerToSave = {
        ...trainer,
        id: docId,
        docId,
        photo: typeof trainer.photo === 'string' ? trainer.photo : '',
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, TRAINERS_COLLECTION, docId), trainerToSave, { merge: true });
      seededList.push({ docId, ...trainerToSave });
    }
    return seededList;
  } catch (error) {
    console.warn('Auto-seeding trainers to Firebase failed:', error.message);
    return [];
  }
}

/**
 * Sync all trainers list (existing + new) to Firebase Firestore
 * Purges legacy random hash IDs (like 0TQVg2lCU606oDgpAk0F) and replaces with trainer names
 */
export async function syncAllTrainersToFirebase(trainersList) {
  try {
    // 1. Delete legacy random doc IDs from Firestore
    const q = query(collection(db, TRAINERS_COLLECTION));
    const snapshot = await getDocs(q);

    const VALID_IDS = new Set(INITIAL_TRAINERS.map((t) => getTrainerDocId(t)));

    for (const docSnap of snapshot.docs) {
      const docId = docSnap.id;
      const isLegacyRandomDoc = !VALID_IDS.has(docId) && (!docId.includes('-') || docId.endsWith('-plan') || docId.length > 15);
      if (isLegacyRandomDoc) {
        try {
          await deleteDoc(doc(db, TRAINERS_COLLECTION, docId));
        } catch (e) {
          console.warn('Could not delete legacy random trainer doc:', docId);
        }
      }
    }

    const combined = [...INITIAL_TRAINERS, ...trainersList];
    const mapByKey = new Map();
    combined.forEach((item) => {
      const cleanId = getTrainerDocId(item);
      if (cleanId && !mapByKey.has(cleanId)) {
        mapByKey.set(cleanId, item);
      }
    });

    const updatedList = [];
    for (const [cleanId, trainer] of mapByKey.entries()) {
      const trainerToSave = {
        ...trainer,
        id: cleanId,
        docId: cleanId,
        photo: typeof trainer.photo === 'string' ? trainer.photo : '',
        createdAt: trainer.createdAt || new Date().toISOString()
      };
      await setDoc(doc(db, TRAINERS_COLLECTION, cleanId), trainerToSave, { merge: true });
      updatedList.push({ docId: cleanId, ...trainerToSave });
    }
    return updatedList;
  } catch (error) {
    console.warn('Sync all trainers to Firebase failed:', error.message);
    return trainersList;
  }
}

/**
 * Fetch all trainers from Firebase Firestore (purges legacy random hash IDs and seeds clean trainer names)
 */
export async function getTrainersFromFirebase() {
  try {
    const q = query(collection(db, TRAINERS_COLLECTION));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Purge any legacy random hash IDs from Firestore on fetch
      for (const docSnap of querySnapshot.docs) {
        if (!docSnap.id.includes('-') || docSnap.id.length > 15) {
          try {
            await deleteDoc(doc(db, TRAINERS_COLLECTION, docSnap.id));
          } catch (e) {
            console.warn('Could not purge legacy trainer doc:', docSnap.id);
          }
        }
      }
    }
    
    // Seed and ensure clean trainer name document IDs exist in Firestore
    const seeded = await seedInitialTrainersToFirebase();
    if (seeded.length > 0) return seeded;
  } catch (error) {
    console.warn('Firebase trainers read error:', error.message);
  }
  return [];
}

/**
 * Add a new trainer to Firebase Firestore with a readable document ID
 */
export async function addTrainerToFirebase(trainerData) {
  try {
    const docId = getTrainerDocId(trainerData);
    const trainerToSave = {
      ...trainerData,
      id: docId,
      docId,
      photo: typeof trainerData.photo === 'string' ? trainerData.photo : '',
      createdAt: new Date().toISOString()
    };
    await setDoc(doc(db, TRAINERS_COLLECTION, docId), trainerToSave, { merge: true });
    return trainerToSave;
  } catch (error) {
    console.warn('Firebase trainer add failed:', error.message);
    return null;
  }
}

/**
 * Update an existing trainer in Firebase Firestore
 */
export async function updateTrainerInFirebase(docIdOrTrainerId, patch) {
  try {
    if (!docIdOrTrainerId) return false;

    const directRef = doc(db, TRAINERS_COLLECTION, String(docIdOrTrainerId));
    const directSnap = await getDoc(directRef);
    if (directSnap.exists()) {
      await updateDoc(directRef, patch);
      return true;
    }

    const q = query(collection(db, TRAINERS_COLLECTION));
    const snapshot = await getDocs(q);
    const targetDoc = snapshot.docs.find(
      (d) => d.id === docIdOrTrainerId || d.data().id === docIdOrTrainerId || d.data().docId === docIdOrTrainerId
    );

    if (targetDoc) {
      const docRef = doc(db, TRAINERS_COLLECTION, targetDoc.id);
      await updateDoc(docRef, patch);
      return true;
    }
  } catch (error) {
    console.warn('Firebase trainer update failed:', error.message);
  }
  return false;
}

/**
 * Delete a trainer from Firebase Firestore
 */
export async function deleteTrainerFromFirebase(docIdOrTrainerId) {
  try {
    if (!docIdOrTrainerId) return false;

    const directRef = doc(db, TRAINERS_COLLECTION, String(docIdOrTrainerId));
    const directSnap = await getDoc(directRef);
    if (directSnap.exists()) {
      await deleteDoc(directRef);
      return true;
    }

    const q = query(collection(db, TRAINERS_COLLECTION));
    const snapshot = await getDocs(q);
    const targetDoc = snapshot.docs.find(
      (d) => d.id === docIdOrTrainerId || d.data().id === docIdOrTrainerId || d.data().docId === docIdOrTrainerId
    );

    if (targetDoc) {
      const docRef = doc(db, TRAINERS_COLLECTION, targetDoc.id);
      await deleteDoc(docRef);
      return true;
    }
  } catch (error) {
    console.warn('Firebase trainer delete failed:', error.message);
  }
  return false;
}

// ----------------------------------------------------
// MEMBERSHIPS COLLECTION FIRESTORE INTEGRATION
// ----------------------------------------------------

/**
 * Auto-seed initial membership plans into Firebase Firestore if collection is empty
 */
export async function seedInitialMembershipsToFirebase() {
  try {
    const seededList = [];
    for (const plan of DEFAULT_MEMBERSHIP_PLANS) {
      const docId = getDocIdForPlan(plan);
      const planToSave = {
        ...plan,
        id: docId,
        docId,
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, MEMBERSHIPS_COLLECTION, docId), planToSave, { merge: true });
      seededList.push({ docId, ...planToSave });
    }
    return seededList;
  } catch (error) {
    console.warn('Auto-seeding memberships to Firebase failed:', error.message);
    return [];
  }
}

/**
 * Sync all membership plans list (existing + new) to Firebase Firestore
 * Purges duplicate/legacy docs like "premium-gym-pt-diet-plan" or "standard-gym-classes-plan"
 */
export async function syncAllMembershipsToFirebase(membershipsList) {
  try {
    const q = query(collection(db, MEMBERSHIPS_COLLECTION));
    const snapshot = await getDocs(q);

    const VALID_IDS = new Set(['basic-plan', 'standard-plan', 'premium-plan']);

    for (const docSnap of snapshot.docs) {
      const docId = docSnap.id;
      const isLegacyDuplicate =
        docId === 'premium-gym-pt-diet-plan' ||
        docId === 'standard-gym-classes-plan' ||
        docId === 'basic-gym-only-plan' ||
        (docId.length > 15 && !docId.includes('-plan') && !docId.includes('-'));

      if (isLegacyDuplicate && !VALID_IDS.has(docId)) {
        try {
          await deleteDoc(doc(db, MEMBERSHIPS_COLLECTION, docId));
        } catch (e) {
          console.warn('Could not delete duplicate doc:', docId);
        }
      }
    }

    const combined = [...DEFAULT_MEMBERSHIP_PLANS, ...membershipsList];
    const mapByKey = new Map();
    combined.forEach((item) => {
      const cleanId = getDocIdForPlan(item);
      if (cleanId && !mapByKey.has(cleanId)) {
        mapByKey.set(cleanId, item);
      }
    });

    const updatedList = [];
    for (const [cleanId, plan] of mapByKey.entries()) {
      const planToSave = {
        ...plan,
        id: cleanId,
        docId: cleanId,
        createdAt: plan.createdAt || new Date().toISOString()
      };
      await setDoc(doc(db, MEMBERSHIPS_COLLECTION, cleanId), planToSave, { merge: true });
      updatedList.push({ docId: cleanId, ...planToSave });
    }
    return updatedList;
  } catch (error) {
    console.warn('Sync all memberships to Firebase failed:', error.message);
    return membershipsList;
  }
}

/**
 * Fetch all membership plans from Firebase Firestore (with auto-seed to create collection if empty)
 */
export async function getMembershipsFromFirebase() {
  try {
    const q = query(collection(db, MEMBERSHIPS_COLLECTION));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const validDocs = querySnapshot.docs.filter((d) => d.id !== 'premium-gym-pt-diet-plan' && d.id !== 'standard-gym-classes-plan');
      return validDocs.map((docSnap) => ({
        docId: docSnap.id,
        ...docSnap.data()
      }));
    } else {
      const seeded = await seedInitialMembershipsToFirebase();
      if (seeded.length > 0) return seeded;
    }
  } catch (error) {
    console.warn('Firebase memberships read error:', error.message);
  }
  return [];
}

/**
 * Add a new membership plan directly to Firebase Firestore on creation
 */
export async function addMembershipToFirebase(membershipData) {
  try {
    const docId = getDocIdForPlan(membershipData);
    const planToSave = {
      ...membershipData,
      id: docId,
      docId,
      createdAt: new Date().toISOString()
    };
    await setDoc(doc(db, MEMBERSHIPS_COLLECTION, docId), planToSave, { merge: true });
    return planToSave;
  } catch (error) {
    console.warn('Firebase membership add failed:', error.message);
    return null;
  }
}

/**
 * Update an existing membership plan in Firebase Firestore
 */
export async function updateMembershipInFirebase(docIdOrPlanId, patch) {
  try {
    if (!docIdOrPlanId) return false;

    const directRef = doc(db, MEMBERSHIPS_COLLECTION, String(docIdOrPlanId));
    const directSnap = await getDoc(directRef);
    if (directSnap.exists()) {
      await updateDoc(directRef, patch);
      return true;
    }

    const q = query(collection(db, MEMBERSHIPS_COLLECTION));
    const snapshot = await getDocs(q);
    const targetDoc = snapshot.docs.find(
      (d) => d.id === docIdOrPlanId || d.data().id === docIdOrPlanId || d.data().docId === docIdOrPlanId
    );

    if (targetDoc) {
      const docRef = doc(db, MEMBERSHIPS_COLLECTION, targetDoc.id);
      await updateDoc(docRef, patch);
      return true;
    }
  } catch (error) {
    console.warn('Firebase membership update failed:', error.message);
  }
  return false;
}

/**
 * Delete a membership plan from Firebase Firestore
 */
export async function deleteMembershipFromFirebase(docIdOrPlanId) {
  try {
    if (!docIdOrPlanId) return false;

    const directRef = doc(db, MEMBERSHIPS_COLLECTION, String(docIdOrPlanId));
    const directSnap = await getDoc(directRef);
    if (directSnap.exists()) {
      await deleteDoc(directRef);
      return true;
    }

    const q = query(collection(db, MEMBERSHIPS_COLLECTION));
    const snapshot = await getDocs(q);
    const targetDoc = snapshot.docs.find(
      (d) => d.id === docIdOrPlanId || d.data().id === docIdOrPlanId || d.data().docId === docIdOrPlanId || d.data().name === docIdOrPlanId
    );

    if (targetDoc) {
      const docRef = doc(db, MEMBERSHIPS_COLLECTION, targetDoc.id);
      await deleteDoc(docRef);
      return true;
    }
  } catch (error) {
    console.warn('Firebase membership delete failed:', error.message);
  }
  return false;
}

// ----------------------------------------------------
// MEMBERSHIP SIGNUPS COLLECTION FIRESTORE INTEGRATION
// (every person who takes a membership lands here)
// ----------------------------------------------------

/**
 * Save a membership signup to Firestore. The document ID is the readable
 * member reference (e.g. "MB-48210") so the console stays browsable, and the
 * collection is created automatically on the first write.
 */
export async function saveMembershipSignupToFirebase(signup) {
  if (!db) {
    console.warn('Firebase DB is not initialized. Membership signup kept locally only.');
    return signup;
  }

  try {
    const docId = signup.id || `MB-${Math.floor(10000 + Math.random() * 90000)}`;
    const toSave = {
      ...signup,
      id: docId,
      docId,
      createdAt: signup.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await setDoc(doc(db, MEMBER_SIGNUPS_COLLECTION, docId), toSave, { merge: true });
    return toSave;
  } catch (error) {
    console.warn('Firebase membership signup write unavailable:', error.message);
    return signup;
  }
}

/**
 * Fetch every membership signup, newest first.
 */
export async function getMembershipSignupsFromFirebase() {
  if (!db) return [];

  try {
    let querySnapshot;
    try {
      const q = query(collection(db, MEMBER_SIGNUPS_COLLECTION), orderBy('createdAt', 'desc'));
      querySnapshot = await getDocs(q);
    } catch (e) {
      querySnapshot = await getDocs(collection(db, MEMBER_SIGNUPS_COLLECTION));
    }
    return querySnapshot.docs.map((docSnap) => ({
      docId: docSnap.id,
      ...docSnap.data()
    }));
  } catch (error) {
    console.warn('Firebase membership signups read unavailable:', error.message);
    return [];
  }
}

/**
 * Live listener — the admin Memberships tab updates the moment someone joins,
 * from any device. Returns an unsubscribe function (a no-op when offline).
 */
export function subscribeToMembershipSignups(onChange, onError) {
  if (!db) return () => {};

  try {
    return onSnapshot(
      collection(db, MEMBER_SIGNUPS_COLLECTION),
      (snapshot) => {
        const list = snapshot.docs.map((docSnap) => ({
          docId: docSnap.id,
          ...docSnap.data()
        }));
        onChange(list);
      },
      (error) => {
        console.warn('Firebase membership signups listener error:', error.message);
        if (onError) onError(error);
      }
    );
  } catch (error) {
    console.warn('Could not attach membership signups listener:', error.message);
    return () => {};
  }
}

/**
 * Update a membership signup (status changes, renewals, notes).
 */
export async function updateMembershipSignupInFirebase(docIdOrMemberId, patch) {
  if (!db || !docIdOrMemberId) return false;

  try {
    const withTimestamp = { ...patch, updatedAt: new Date().toISOString() };

    const directRef = doc(db, MEMBER_SIGNUPS_COLLECTION, String(docIdOrMemberId));
    const directSnap = await getDoc(directRef);
    if (directSnap.exists()) {
      await updateDoc(directRef, withTimestamp);
      return true;
    }

    const snapshot = await getDocs(collection(db, MEMBER_SIGNUPS_COLLECTION));
    const targetDoc = snapshot.docs.find(
      (d) => d.id === docIdOrMemberId || d.data().id === docIdOrMemberId || d.data().docId === docIdOrMemberId
    );

    if (targetDoc) {
      await updateDoc(doc(db, MEMBER_SIGNUPS_COLLECTION, targetDoc.id), withTimestamp);
      return true;
    }
  } catch (error) {
    console.warn('Firebase membership signup update unavailable:', error.message);
  }
  return false;
}

/**
 * Remove a membership signup.
 */
export async function deleteMembershipSignupFromFirebase(docIdOrMemberId) {
  if (!db || !docIdOrMemberId) return false;

  try {
    const directRef = doc(db, MEMBER_SIGNUPS_COLLECTION, String(docIdOrMemberId));
    const directSnap = await getDoc(directRef);
    if (directSnap.exists()) {
      await deleteDoc(directRef);
      return true;
    }

    const snapshot = await getDocs(collection(db, MEMBER_SIGNUPS_COLLECTION));
    const targetDoc = snapshot.docs.find(
      (d) => d.id === docIdOrMemberId || d.data().id === docIdOrMemberId || d.data().docId === docIdOrMemberId
    );

    if (targetDoc) {
      await deleteDoc(doc(db, MEMBER_SIGNUPS_COLLECTION, targetDoc.id));
      return true;
    }
  } catch (error) {
    console.warn('Firebase membership signup delete unavailable:', error.message);
  }
  return false;
}

// ----------------------------------------------------
// REVIEWS COLLECTION FIRESTORE INTEGRATION
// ----------------------------------------------------

/**
 * Save review to Firebase Firestore
 */
export async function saveReviewToFirebase(reviewData) {
  const randomId = Math.floor(10000 + Math.random() * 90000);

  const reviewWithId = {
    id: `RV-${randomId}`,
    ...reviewData,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  try {
    const docRef = await addDoc(
      collection(db, REVIEWS_COLLECTION),
      reviewWithId
    );

    return {
      docId: docRef.id,
      ...reviewWithId
    };
  } catch (error) {
    console.warn('Firebase review write unavailable:', error.message);
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
        orderBy('createdAt', 'desc')
      );

      querySnapshot = await getDocs(q);
    } catch (e) {
      querySnapshot = await getDocs(
        collection(db, REVIEWS_COLLECTION)
      );
    }

    return querySnapshot.docs.map((docSnap) => ({
      docId: docSnap.id,
      ...docSnap.data()
    }));
  } catch (error) {
    console.warn('Firebase review read unavailable:', error.message);
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
      typeof docIdOrReviewId === 'string' &&
      docIdOrReviewId.length > 15 &&
      !docIdOrReviewId.startsWith('RV-')
    ) {
      await updateDoc(
        doc(db, REVIEWS_COLLECTION, docIdOrReviewId),
        patch
      );
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
    console.warn('Firebase review update unavailable:', error.message);
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
      typeof docIdOrReviewId === 'string' &&
      docIdOrReviewId.length > 15 &&
      !docIdOrReviewId.startsWith('RV-')
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
    console.warn('Firebase review delete unavailable:', error.message);
  }

  return false;
}
