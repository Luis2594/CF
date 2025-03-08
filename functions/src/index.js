const admin = require('firebase-admin');
const { createCustomToken } = require('./auth/createCustomToken');
const { acceptTerms } = require('./terms/acceptTerms');

// Initialize Firebase Admin with default credentials
admin.initializeApp();

// Export the functions
exports.createCustomToken = createCustomToken;
exports.acceptTerms = acceptTerms;