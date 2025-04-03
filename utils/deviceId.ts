import { Platform } from 'react-native';
import * as Application from 'expo-application';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';;

// Get device ID based on platform
export const getDeviceId = async () => {
  try {
    if (Platform.OS === 'ios') {
      return await Application.getIosIdForVendorAsync() || initDeviceId();
    } else if (Platform.OS === 'android') {
      return Application.androidId || initDeviceId();
    } else {
      return initDeviceId();
    }
  } catch (error) {
    console.log("Error: ", error);
    return initDeviceId();
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
      const newDeviceId = await generateWebDeviceId();
      await AsyncStorage.setItem('deviceId', newDeviceId);
      return newDeviceId;
    }
    return existingDeviceId;
  } catch (error) {
    console.error('Error initializing device ID:', error);
    return null;
  }
};