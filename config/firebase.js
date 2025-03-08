// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFunctions } from 'firebase/functions';

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

// Initialize Auth
const auth = getAuth(app);

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