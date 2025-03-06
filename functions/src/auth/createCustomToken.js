/**
 * Creates a custom authentication token with optional claims
 * @param {string} uid - The user ID to create a token for
 * @param {Object} [additionalClaims] - Optional additional claims to include in the token
 * @returns {string} The generated custom token
 * @throws {Error} If the token creation fails
 */

const crypto = require('crypto');

// Constants for token generation
const TOKEN_EXPIRY = 3600; // 1 hour in seconds
const ALGORITHM = 'HS256';
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key-min-32-chars-long!!';

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function createCustomToken(uid, additionalClaims = {}) {
  try {
    // Validate inputs
    if (!uid || typeof uid !== 'string') {
      throw new Error('User ID must be a non-empty string');
    }

    if (typeof additionalClaims !== 'object') {
      throw new Error('Additional claims must be an object');
    }

    // Create JWT header
    const header = {
      alg: ALGORITHM,
      typ: 'JWT'
    };

    // Create JWT payload
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: 'findforce-auth',
      sub: uid,
      aud: 'findforce-app',
      iat: now,
      exp: now + TOKEN_EXPIRY,
      ...additionalClaims
    };

    // Encode header and payload
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));

    // Create signature
    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const signature = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(signatureInput)
      .digest('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    // Combine to create final token
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  } catch (error) {
    throw new Error(`Failed to create custom token: ${error.message}`);
  }
}

// Example usage:
// const token = createCustomToken('user123', { role: 'admin' });

module.exports = createCustomToken;