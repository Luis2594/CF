const admin = require('firebase-admin');
const { createCustomToken } = require('./auth/createCustomToken');
const { acceptTerms } = require('./terms/acceptTerms');
const { getClients } = require('./clients/clients');
const { postGestor } = require('./clients/postGestor');

// Initialize Firebase Admin with default credentials
admin.initializeApp();

// Export the functions
exports.createCustomToken = createCustomToken;
exports.acceptTerms = acceptTerms;
exports.getClients = getClients;
exports.postGestor = postGestor;