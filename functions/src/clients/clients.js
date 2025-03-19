const functions = require('firebase-functions');
const axios = require('axios');
const https = require('https');

exports.getClients = functions.https.onCall(async (data, context) => {
  try {
    // Verify authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated to fetch clients'
      );
    }

    // Get the token from user claims
    const idTokenResult = await context.auth.token;
    if (!idTokenResult.token) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'User token not found'
      );
    }

    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    // Make request to Credit Force API
    const response = await axios.get(
      `https://api-mobile-proxy-test.credit-force.com/api/v1/clients/assigned-to-manager/${context.auth.uid}`,
      {
        httpsAgent: agent,
        headers: {
          'Authorization': `Bearer ${data.token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      success: true,
      data: response.data
    };

  } catch (error) {
    console.error('Error fetching clients:', error);

    if (error instanceof functions.https.HttpsError) {
      throw error;
    }

    if (error.response) {
      throw new functions.https.HttpsError(
        'unknown',
        error.response.data.message || 'Failed to fetch clients',
        { code: error.response.data.code || '007' }
      );
    }

    throw new functions.https.HttpsError(
      'internal',
      'An internal error occurred while fetching clients'
    );
  }
});