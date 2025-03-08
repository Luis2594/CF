import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage';

export type BiometricType = 'fingerprint' | 'facial' | 'iris' | null;

interface BiometricState {
  isAvailable: boolean;
  biometricType: BiometricType;
  isEnabled: boolean;
  error: string | null;
}

interface BiometricCredentials {
  username: string;
  institution: string;
  password: string;
}

export const useBiometrics = () => {
  const [state, setState] = useState<BiometricState>({
    isAvailable: false,
    biometricType: null,
    isEnabled: false,
    error: null,
  });

  useEffect(() => {
    checkBiometricAvailability();
    loadBiometricState();
  }, []);

  const loadBiometricState = async () => {
    try {
      const enabled = await AsyncStorage.getItem(STORAGE_KEYS.BIOMETRIC_ENABLED);
      setState(prev => ({ ...prev, isEnabled: enabled === 'true' }));
    } catch (error) {
      console.error('Error loading biometric state:', error);
    }
  };

  const checkBiometricAvailability = async () => {
    try {
      if (Platform.OS === 'web') {
        setState(prev => ({ ...prev, isAvailable: false }));
        return;
      }

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      
      if (!hasHardware || !isEnrolled) {
        setState(prev => ({ 
          ...prev, 
          isAvailable: false,
          error: !hasHardware ? 'No biometric hardware' : 'No biometric enrolled'
        }));
        return;
      }

      const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
      let biometricType: BiometricType = null;

      if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
        biometricType = 'fingerprint';
      } else if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
        biometricType = 'facial';
      } else if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
        biometricType = 'iris';
      }

      setState(prev => ({
        ...prev,
        isAvailable: true,
        biometricType,
        error: null
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isAvailable: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  };

  const getBiometricKey = (userId: string) => `${STORAGE_KEYS.BIOMETRIC_CREDENTIALS}_${userId}`;

  const loadBiometricCredentials = async (userId: string): Promise<BiometricCredentials | null> => {
    try {
      const data = await AsyncStorage.getItem(getBiometricKey(userId));
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading biometric credentials:', error);
      return null;
    }
  };

  const saveBiometricCredentials = async (userId: string, credentials: BiometricCredentials) => {
    try {
      await AsyncStorage.setItem(getBiometricKey(userId), JSON.stringify(credentials));
      setState(prev => ({ ...prev, isEnabled: true }));
    } catch (error) {
      console.error('Error saving biometric credentials:', error);
      throw error;
    }
  };

  const removeBiometricCredentials = async (userId: string) => {
    try {
      await AsyncStorage.removeItem(getBiometricKey(userId));
      setState(prev => ({ ...prev, isEnabled: false }));
    } catch (error) {
      console.error('Error removing biometric credentials:', error);
      throw error;
    }
  };

  const setBiometricEnabled = async (enabled: boolean) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.BIOMETRIC_ENABLED, enabled.toString());
      setState(prev => ({ ...prev, isEnabled: enabled }));
    } catch (error) {
      console.error('Error setting biometric state:', error);
      throw error;
    }
  };

  const authenticate = async (): Promise<boolean> => {
    try {
      if (!state.isAvailable) return false;

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to continue',
        fallbackLabel: 'Use password',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
      });

      return result.success;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  };

  return {
    ...state,
    authenticate,
    loadBiometricCredentials,
    saveBiometricCredentials,
    removeBiometricCredentials,
    setBiometricEnabled,
  };
};