import { Platform } from 'react-native';
import * as Application from 'expo-application';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get device ID based on platform
export const getDeviceId = async () => {
  if (Platform.OS === 'ios') {
    return await Application.getIosIdForVendorAsync() || generateWebDeviceId();
  } else if (Platform.OS === 'android') {
    return Application.androidId || generateWebDeviceId();
  } else {
    return generateWebDeviceId();
  }
};

// Fallback for web platform
export const generateWebDeviceId = () => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Initialize device ID if not exists
export const initDeviceId = async () => {
  try {
    const existingDeviceId = await AsyncStorage.getItem('deviceId');
    if (!existingDeviceId) {
      const newDeviceId = await getDeviceId();
      await AsyncStorage.setItem('deviceId', newDeviceId);
      return newDeviceId;
    }
    return existingDeviceId;
  } catch (error) {
    console.error('Error initializing device ID:', error);
    return null;
  }
};