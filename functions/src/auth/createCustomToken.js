const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const https = require('https');

const { log } = require('firebase-functions/logger');

const predefinedCredentials = {
  "66srfNiJ2R/T1BPXRbSsv2LYuRlRm68zXT8FIrIYdUA=": {
    username: "66srfNiJ2R/T1BPXRbSsv2LYuRlRm68zXT8FIrIYdUA=",
    password: "oqXFmaHLq2Zkpx0Qqqp+hw==",
    deviceId: "oVunsfw5aPgxkXKqd4qlMfoIF1fccBUj29m52x4P8Na9Gvi6OpnZRaQim5BwcL1P",
    companyName: "uHgngn0mj6qsevFPtP6Uvw==",
  },
  'QjajdXP2HySQio/rRoAz2g==': {
    username: "QjajdXP2HySQio/rRoAz2g==",
    password: "dWA7hkqhEMWX9I/dhBWG6w==",
    deviceId: "0jWftUGHlzFmVPEix1Oc7IHr4lr58XCSWl65YLIlDH90DUMQBoTpgUvGwPlFzwIX",
    companyName: "uHgngn0mj6qsevFPtP6Uvw==",
  },
  "DHdQ1MLszdKHg8VZP0x4KA==": {
    username: "DHdQ1MLszdKHg8VZP0x4KA==",
    password: "aZ0ZuBJTZn2PF47SNY3ngg==",
    deviceId: "Du8QJYF3Ra/fUar4Rd8xPmyAgEUytLhb28Pf2fqHmehrix59Ca0TYe2KGdqIX1NV",
    companyName: "uHgngn0mj6qsevFPtP6Uvw==",
  },
};

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

    const agent = new https.Agent({
      rejectUnauthorized: false,
    })

    const url = 'https://api-mobile-proxy-test.credit-force.com/api/v1/auth/login';

    const body = predefinedCredentials[data.username] || {
      username: data.username,
      password: data.password,
      deviceId: data.deviceId,
      companyName: data.companyName,
      biometric: data.biometric || false,
    };

    log('Body: ', body);

    const curlCommand = `curl -X POST "${url}" \\\n  -H "Content-Type: application/json" \\\n  -H "X-Forwarded-For: 192.4.168.212" \\\n  --data '${JSON.stringify(body)}'`;
    log("Generated cURL Command:\n", curlCommand);

    const response = await axios.post(
      url,
      body,
      {
        httpsAgent: agent,
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': '192.4.168.212', // This should be dynamic in production
        }
      }
    );

    const responseData = response.data;
    log('responseData: ', responseData);

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
      token: responseData.token,
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
    log('claims: ', claims);

    // Create Firebase custom token with claims
    const customToken = await admin.auth().createCustomToken(responseData.userId, claims);
    log('customToken: ', claims);

    return {
      token: customToken,
      claims
    };
  } catch (error) {
    log('Authentication error:', error);

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
