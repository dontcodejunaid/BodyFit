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
  orderBy
} from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { INITIAL_TRAINERS } from './data/trainersAndScheduleData';
import { DEFAULT_MEMBERSHIP_PLANS } from './data/membershipPlans';

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

// Helper to get exact clean document ID for membership plans
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
// TRAINERS COLLECTION FIRESTORE INTEGRATION
// ----------------------------------------------------
const TRAINERS_COLLECTION = 'trainers';

/**
 * Sync all trainers list (existing + new) to Firebase Firestore
 */
export async function syncAllTrainersToFirebase(trainersList) {
  try {
    // 1. Fetch current docs from Firestore to find and clean up any random hash IDs
    const q = query(collection(db, TRAINERS_COLLECTION));
    const snapshot = await getDocs(q);
    
    for (const docSnap of snapshot.docs) {
      const isRandomHash = docSnap.id.length > 15 && !docSnap.id.includes('trainer') && !docSnap.id.includes('-');
      if (isRandomHash) {
        try {
          await deleteDoc(doc(db, TRAINERS_COLLECTION, docSnap.id));
        } catch (e) {
          console.warn('Could not delete legacy random doc:', docSnap.id);
        }
      }
    }

    const mapByKey = new Map();
    trainersList.forEach((item) => {
      const cleanId = toSlugDocId(item.name, 'trainer');
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
 * Fetch all trainers from Firebase Firestore (with auto-seed to create collection if empty)
 */
export async function getTrainersFromFirebase() {
  try {
    const q = query(collection(db, TRAINERS_COLLECTION));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs.map((docSnap) => ({
        docId: docSnap.id,
        ...docSnap.data()
      }));
    } else {
      // Auto-seed initial trainers into Firestore database to create collection
      const seeded = await seedInitialTrainersToFirebase();
      if (seeded.length > 0) return seeded;
    }
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
    const rawName = trainerData.name || 'trainer';
    const docId = toSlugDocId(rawName, 'trainer');
    const trainerToSave = {
      ...trainerData,
      id: docId,
      docId,
      createdAt: new Date().toISOString()
    };
    await setDoc(doc(db, TRAINERS_COLLECTION, docId), trainerToSave, { merge: true });
    return { docId, ...trainerToSave };
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

    // 1. Check direct doc ref
    const directRef = doc(db, TRAINERS_COLLECTION, String(docIdOrTrainerId));
    const directSnap = await getDoc(directRef);
    if (directSnap.exists()) {
      await updateDoc(directRef, patch);
      return true;
    }

    // 2. Search snapshot docs
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

    // 1. Check direct doc ref
    const directRef = doc(db, TRAINERS_COLLECTION, String(docIdOrTrainerId));
    const directSnap = await getDoc(directRef);
    if (directSnap.exists()) {
      await deleteDoc(directRef);
      return true;
    }

    // 2. Search snapshot docs
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
const MEMBERSHIPS_COLLECTION = 'memberships';

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
    // 1. Delete duplicate/legacy documents from Firestore
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
      // Filter out duplicate legacy docs if present
      const validDocs = querySnapshot.docs.filter((d) => d.id !== 'premium-gym-pt-diet-plan' && d.id !== 'standard-gym-classes-plan');
      return validDocs.map((docSnap) => ({
        docId: docSnap.id,
        ...docSnap.data()
      }));
    } else {
      // Auto-seed initial membership plans into Firestore database to create collection
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

    // 1. Check direct doc ref
    const directRef = doc(db, MEMBERSHIPS_COLLECTION, String(docIdOrPlanId));
    const directSnap = await getDoc(directRef);
    if (directSnap.exists()) {
      await updateDoc(directRef, patch);
      return true;
    }

    // 2. Search snapshot docs
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

    // 1. Check direct doc ref
    const directRef = doc(db, MEMBERSHIPS_COLLECTION, String(docIdOrPlanId));
    const directSnap = await getDoc(directRef);
    if (directSnap.exists()) {
      await deleteDoc(directRef);
      return true;
    }

    // 2. Search snapshot docs
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

