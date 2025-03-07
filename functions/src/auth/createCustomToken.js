const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

exports.createCustomToken = functions.https.onCall(async (data, context) => {
  try {
    // Validate required parameters
    const requiredParams = ['username', 'password', 'deviceId', 'companyName'];
    for (const param of requiredParams) {
      if (!data[param]) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          `Missing required parameter: ${param}`
        );
      }
    }

    // Call the authentication endpoint
    const response = await axios.post(
      'https://api-mobile-proxy-test.credit-force.com/api/v1/auth/login',
      {
        username: data.username,
        password: data.password,
        deviceId: data.deviceId,
        companyName: data.companyName,
        biometric: data.biometric || false
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': '192.4.168.212' // This should be dynamic in production
        }
      }
    );

    const responseData = response.data;

    // Validate the response
    if (!responseData.success || responseData.code !== '000') {
      throw new functions.https.HttpsError(
        'unauthenticated',
        responseData.message || 'Authentication failed'
      );
    }

    // Extract claims from the response
    const claims = {
      userId: responseData.userId,
      name: responseData.name,
      acceptedTerms: responseData.acceptedTerms,
      apiKey: responseData.apiKey,
      parameters: responseData.parameters.reduce((acc, param) => {
        acc[param.key] = param.value;
        return acc;
      }, {}),
      companyName: data.companyName,
      deviceId: data.deviceId
    };

    // Create Firebase custom token with claims
    const customToken = await admin.auth().createCustomToken(responseData.userId, claims);

    return {
      token: customToken,
      claims
    };
  } catch (error) {
    console.error('Authentication error:', error);

    if (error.response) {
      throw new functions.https.HttpsError(
        'unknown',
        `Authentication failed: ${error.response.data.message || 'Unknown error'}`
      );
    }

    throw new functions.https.HttpsError(
      'internal',
      `Failed to create custom token: ${error.message || 'Unknown error'}`
    );
  }
});