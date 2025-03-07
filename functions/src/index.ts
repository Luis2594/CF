import * as admin from 'firebase-admin';
import { createCustomToken } from './auth/createCustomToken';

// Initialize Firebase Admin
admin.initializeApp();

// Export the functions
export {
  createCustomToken
};