// functions/src/clients/postGestor.js
const functions = require('firebase-functions');
const axios = require('axios');
const https = require('https');
const { log } = require('firebase-functions/logger');

exports.postGestor = functions.https.onCall(async (data, context) => {
  try {
    // Verify authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated to update client'
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

    // Validate required fields
    const requiredFields = [
      'userId', 'clientId', 'portfolioId', 'actionCodeId',
      'resultCodeId', 'reasonNoPaymentId', 'comments',
      'latitude', 'longitude', 'isRealTime', 'detail', 'token'
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          `Missing required field: ${field}`
        );
      }
    }

    // Validate detail array
    if (!Array.isArray(data.detail) || data.detail.length === 0) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Detail must be a non-empty array'
      );
    }

    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    const url = "https://api-mobile-proxy-test.credit-force.com/api/v1/management/record";
    const headers = {
      'Authorization': `Bearer ${data.token}`,
      'Content-Type': 'application/json',
      'accept': '*/*'
    };

    // Make the request
    const response = await axios.post(url, data, {
      httpsAgent: agent,
      headers
    });

    log('response: ', response);

    return {
      success: true,
      data: response.data
    };

  } catch (error) {
    log('Error updating client:', error);

    if (error instanceof functions.https.HttpsError) {
      throw error;
    }

    if (error.response) {
      throw new functions.https.HttpsError(
        'unknown',
        error.response.data.message || 'Failed to update client',
        { code: error.response.data.code || '007' }
      );
    }

    throw new functions.https.HttpsError(
      'internal',
      'An internal error occurred while updating client'
    );
  }
});
