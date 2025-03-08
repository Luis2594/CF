/**
 * Login API error code mappings
 * Maps error codes to their corresponding messages in both English and Spanish
 */

export interface LoginErrorMessage {
  en: string;
  es: string;
  technical?: string;
}

export const LOGIN_ERROR_CODES: Record<string, LoginErrorMessage> = {
  // Success
  '000': {
    en: 'Login successful',
    es: 'El login fue correcto',
    technical: 'Login successful ✅'
  },
  // Integration error
  '001': {
    en: 'Invalid request parameters',
    es: 'Parámetros de solicitud inválidos',
    technical: 'One or more parameters were not sent, integration error ⛔'
  },
  // User does not exist
  '002': {
    en: 'Incorrect username or password',
    es: 'Usuario o contraseña incorrectos',
    technical: 'User does not exist ⛔'
  },
  // User blocked
  '003': {
    en: 'Account blocked',
    es: 'Cuenta bloqueada',
    technical: 'User is blocked ⛔'
  },
  // Password mismatch
  '004': {
    en: 'Incorrect username or password',
    es: 'Usuario o contraseña incorrectos',
    technical: 'User exists but password does not match ⛔'
  },
  // Device error
  '005': {
    en: 'Device not authorized',
    es: 'Dispositivo no autorizado',
    technical: 'Device does not exist or is not configured for this user ⛔'
  },
  // Encryption error
  '006': {
    en: 'Security validation failed',
    es: 'Validación de seguridad fallida',
    technical: 'One or more payload parameters were not sent encrypted ⛔'
  },
  // General error
  '007': {
    en: 'An error occurred',
    es: 'Ocurrió un error',
    technical: 'General error ⛔'
  }
} as const;

/**
 * Get error message based on code and language
 */
export const getLoginErrorMessage = (code: string, language: 'en' | 'es'): string => {
  const errorInfo = LOGIN_ERROR_CODES[code];
  if (!errorInfo) {
    return language === 'es' 
      ? 'Error desconocido' 
      : 'Unknown error';
  }
  return errorInfo[language];
};