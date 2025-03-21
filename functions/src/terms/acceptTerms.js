const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const { encryptText } = require('../utils/encryption');
const https = require('https');
const { log } = require('firebase-functions/logger');


exports.acceptTerms = functions.https.onCall(async (data, context) => {
  try {
    // Verify authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated to accept terms'
      );
    }

    // Validate required parameters
    const requiredParams = ['userId', 'deviceId', 'acceptedOn', 'language', 'token'];
    for (const param of requiredParams) {
      if (!data[param]) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          `Missing required parameter: ${param}`
        );
      }
    }

    const agent = new https.Agent({
      rejectUnauthorized: false,
    })

    const url = 'https://api-mobile-proxy-test.credit-force.com/api/v1/terms/accept';

    const body = {
      userId: data.userId,
      accepted: true,
      acceptedOn: data.acceptedOn,
      deviceId: data.deviceId,
      language: data.language
    };

    const curlCommand = `curl -X POST "${url}" \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer ${data.token}" \\\n  --data '${JSON.stringify(body)}'`;

    log("Generated cURL Command:\n", curlCommand);

    // Make request to Credit Force API
    const response = await axios.post(
      url,
      body,
      {
        httpsAgent: agent,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.token}`
        }
      }
    );

    log('response: ', response);

    return {
      success: true,
      data: response.data
    };

  } catch (error) {
    console.error('Terms acceptance error:', error);

    if (error instanceof functions.https.HttpsError) {
      throw error;
    }

    if (error.response) {
      throw new functions.https.HttpsError(
        'unknown',
        error.response.data.message || 'Failed to accept terms',
        { code: error.response.data.code || '007' }
      );
    }

    throw new functions.https.HttpsError(
      'internal',
      'An internal error occurred while accepting terms'
    );
  }
});
