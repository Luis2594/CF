// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFunctions } from 'firebase/functions';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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

export { app, auth, analytics, functions };