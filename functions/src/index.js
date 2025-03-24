const admin = require('firebase-admin');
const { createCustomToken } = require('./auth/createCustomToken');
const { acceptTerms } = require('./terms/acceptTerms');
const { getClients, getActionsResults, getReasonsNoPayment } = require('./clients/clients');
const { postGestor } = require('./clients/postGestor');

// Initialize Firebase Admin with default credentials
admin.initializeApp();

// Export the functions
exports.createCustomToken = createCustomToken;
exports.acceptTerms = acceptTerms;
exports.getClients = getClients;
exports.postGestor = postGestor;
exports.getActionsResults = getActionsResults;
exports.getReasonsNoPayment = getReasonsNoPayment;