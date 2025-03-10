import CryptoJS from 'crypto-js';

const API_KEY = "$ASPcAwSNIgcPPEoTSa0ODw#";

/**
 * Encrypts text using AES encryption with ECB mode and PKCS7 padding
 * @param text - Text to encrypt
 * @returns Encrypted text
 */
export const encryptText = (text: string): string => {
  try {
    const secretBytes = CryptoJS.enc.Utf8.parse(API_KEY);
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

/**
 * Encrypts login credentials using the API key
 */
export const encryptLoginCredentials = (params: {
  username: string;
  password: string;
  deviceId: string;
  companyName: string;
}) => {
  return {
    username: encryptText(params.username),
    password: encryptText(params.password),
    deviceId: encryptText(params.deviceId),
    companyName: encryptText(params.companyName)
  };
};