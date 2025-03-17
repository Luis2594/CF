import CryptoJS from 'crypto-js';

const API_KEY_LOGIN = "$ASPcAwSNIgcPPEoTSa0ODw#";
const API_KEY = "oASPc#wSNIMcYP9sVSa3OGT#";

/**
 * Encrypts text using AES encryption with ECB mode and PKCS7 padding
 * @param text - Text to encrypt
 * @returns Encrypted text
 */
export const encryptTextLogin = (text: string): string => {
  try {
    const secretBytes = CryptoJS.enc.Utf8.parse(API_KEY_LOGIN);
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
    username: encryptTextLogin(params.username),
    password: encryptTextLogin(params.password),
    deviceId: encryptTextLogin(params.deviceId),
    companyName: encryptTextLogin(params.companyName)
  };
};