import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
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

// Initialize Analytics
const analytics = getAnalytics(app);

// Initialize Auth
const auth = getAuth(app);

export { app, auth, analytics };