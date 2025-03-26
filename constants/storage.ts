/**
 * Storage keys for AsyncStorage
 */
export const STORAGE_KEYS = {
  // Onboarding flow
  HAS_COMPLETED_ONBOARDING: 'hasCompletedOnboarding',

  // Language preferences
  LANGUAGE: 'app_language',

  // Authentication
  LOGIN_CACHE: 'loginCache',
  LAST_LOGIN_CREDENTIALS: 'lastLoginCredentials',
  BIOMETRIC_ENABLED: 'biometricEnabled',
  DEVICE_ID: 'deviceId',

  // USER 
  USER_CACHE: 'userCache',

  // CLIENTS
  CLIENTS_CACHE: 'clientsCache',
  CLIENTS: 'clients',
  SELECTED_CLIENT: 'client',

  // GESTIONS 
  GESTIONS_CACHE: "gestionsCache",
  ACTIONS_RESULT: 'actionsResults',
  REASON_NO_PAYMENT: 'reasonsNoPayment',
} as const;