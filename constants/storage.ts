/**
 * Storage keys for AsyncStorage
 */
export const STORAGE_KEYS = {
  // Onboarding flow
  HAS_COMPLETED_ONBOARDING: 'hasCompletedOnboarding',
  
  // Language preferences
  LANGUAGE: 'app_language',
  
  // Authentication
  LAST_LOGIN_CREDENTIALS: 'lastLoginCredentials',
  BIOMETRIC_ENABLED: 'biometricEnabled',
  DEVICE_ID: 'deviceId',
} as const;