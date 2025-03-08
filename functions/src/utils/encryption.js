const CryptoJS = require('crypto-js');

/**
 * Encrypts text using AES encryption with ECB mode and PKCS7 padding
 * @param {string} text - Text to encrypt
 * @param {string} key - Encryption key
 * @returns {string} - Encrypted text
 */
const encryptText = (text, key) => {
  try {
    const secretBytes = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.AES.encrypt(text, secretBytes, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt text');
  }
};

module.exports = {
  encryptText
};