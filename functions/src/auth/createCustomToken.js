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
          `Missing required parameter: ${param}`,
          { code: '001' } // Integration error code
        );
      }
    }

    // Call the authentication endpoint using fetch
    const response = await fetch('https://cflogin.jamesjara.com/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '192.4.168.212', // This should be dynamic in production
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        deviceId: data.deviceId,
        companyName: data.companyName,
        biometric: data.biometric || false,
      }),
    });

    // Handle response
    // const responseData = await response.json();

    const responseData =  {"userId":"2c477968-8e33-435d-9789-772be5cb2614","name":"James Jara","success":true,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYzQ3Nzk2OC04ZTMzLTQzNWQtOTc4OS03NzJiZTVjYjI2MTQiLCJ1c2VyTmFtZSI6IlhNSTFWb25oZE5wa1JTMThjMkRxOWc9PSIsImNvbXBhbnlOYW1lIjoidUhnbmduMG1qNnFzZXZGUHRQNlV2dz09IiwiZXhwIjoxNzQxMzkzNzU4LCJpc3MiOiJ3d3cuY3JlZGl0LWZvcmNlLmNvbSIsImF1ZCI6Ind3dy5hcGkuY3JlZGl0LWZvcmNlLmNvbSJ9.ecWQJ-pnPbGezlwHXSM6UYVgy1TxnwTJptl0T9y1TMs","message":"The login was successful.","acceptedTerms":true,"code":"000","apiKey":"oASPc#wSNIMcYP9sVSa3OGT#","parameters":[{"key":"RadioProximity","value":"15KM"}] };
 
    // Validate the response
    if (!responseData.success || responseData.code !== '000') {
      throw new functions.https.HttpsError(
        'unauthenticated',
        responseData.message || 'Authentication failed',
        { code: responseData.code || '007' } // Pass the error code from the response
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

    if (error instanceof functions.https.HttpsError) {
      // Pass through HttpsError with its code
      throw error;
    }

    if (error.response) {
      // Pass through API error code if available
      throw new functions.https.HttpsError(
        'unknown',
        error.response.data.message || 'Authentication failed',
        { code: error.response.data.code || '007' }
      );
    }

    // Generic error with default code
    throw new functions.https.HttpsError(
      'internal',
      error.message || 'Unknown error',
      { code: '007' }
    );
  }
});