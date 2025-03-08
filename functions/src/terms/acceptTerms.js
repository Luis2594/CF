const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

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
    const requiredParams = ['userId', 'deviceId', 'acceptedOn', 'language'];
    for (const param of requiredParams) {
      if (!data[param]) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          `Missing required parameter: ${param}`
        );
      }
    }

    // Make request to Credit Force API
    const response = await axios.post(
      'https://api-mobile-proxy-test.credit-force.com/api/v1/terms/accept',
      {
        userId: data.userId,
        accepted: true,
        acceptedOn: data.acceptedOn,
        deviceId: data.deviceId,
        language: data.language
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Update user custom claims to reflect terms acceptance
    await admin.auth().setCustomUserClaims(context.auth.uid, {
      ...context.auth.token,
      acceptedTerms: true,
      acceptedOn: data.acceptedOn,
      language: data.language
    });

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