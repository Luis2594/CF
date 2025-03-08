import { Platform } from 'react-native';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  browserLocalPersistence, 
  setPersistence, 
  initializeAuth, 
  getReactNativePersistence,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  getFirestore, 
  enableIndexedDbPersistence,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
  persistentLocalCache
} from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFunctions } from 'firebase/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// Firebase configuration object
export const firebaseConfig = {
  apiKey: "AIzaSyCWqj-mLKVL0_TONp8tYa7NCQO-XiTblA0",
  authDomain: "cf-cobros.firebaseapp.com",
  projectId: "cf-cobros",
  storageBucket: "cf-cobros.firebasestorage.app",
  messagingSenderId: "692644095038",
  appId: "1:692644095038:web:6fb5d7cb72766c6dcd9d6f",
  measurementId: "G-T7BWK36HX0"
};

// Initialize Firebase only if no apps exist
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with platform-specific persistence
const auth = Platform.OS === 'web' 
  ? getAuth(app)
  : initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });

// Set persistence to local for web platform only
if (Platform.OS === 'web') {
  setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
      console.error("Error setting persistence:", error);
    });
}

// Initialize Firestore with platform-specific settings
const db = Platform.OS === 'web'
  ? getFirestore(app)
  : getFirestore(app);

// Enable offline persistence for mobile platforms
if (Platform.OS !== 'web') {
  enableIndexedDbPersistence(db).catch((err) => {
    console.error('Error enabling offline persistence:', err);
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser doesn\'t support offline persistence.');
    }
  });
}

// Initialize Functions
const functions = getFunctions(app);

// Initialize Analytics only if supported (web platform)
let analytics = null;
isSupported().then(yes => {
  if (yes) {
    analytics = getAnalytics(app);
  }
}).catch(err => {
  console.error("Firebase Analytics initialization error:", err);
});

// Set up auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    if (window.location.pathname === '/login') {
      router.replace('/(tabs)');
    }
  } else {
    // User is signed out
    if (window.location.pathname !== '/login') {
      router.replace('/login');
    }
  }
});

export { app, auth, db, analytics, functions };