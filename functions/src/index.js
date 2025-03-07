const admin = require('firebase-admin');
const { createCustomToken } = require('./auth/createCustomToken');

// Initialize Firebase Admin
admin.initializeApp();

// Export the functions
exports.createCustomToken = createCustomToken;