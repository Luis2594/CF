/**
 * Login API error code mappings
 * Maps error codes to their corresponding messages in both English and Spanish
 */

export interface LoginErrorMessage {
  en: string;
  es: string;
  technical?: string;
}
export const LOGIN_ERROR_CODES: Record<string, { en: string; es: string }> = {
  // Success
  '000': {
    en: 'Login successful ✅',
    es: 'El login fue correcto ✅'
  },
  // Integration error
  '001': {
    en: 'One or more parameters were not sent, integration error ⛔',
    es: 'Alguno, varios o todos los parámetros no fueron enviados, es un error de integración ⛔'
  },
  // User does not exist
  '002': {
    en: 'User does not exist, reported as "Incorrect username or password" in the technical message ⛔',
    es: 'El usuario no existe, se reporta como "Usuario o contraseña incorrectos" en mensaje técnico ⛔'
  },
  // User blocked
  '003': {
    en: 'The user is blocked ⛔',
    es: 'El usuario está bloqueado ⛔'
  },
  // Password mismatch
  '004': {
    en: 'The user exists, but the password does not match ⛔',
    es: 'El usuario existe, pero no coincide la contraseña ⛔'
  },
  // Device error
  '005': {
    en: 'The device does not exist or is not configured for this user ⛔',
    es: 'El dispositivo no existe o no está configurado para este usuario ⛔'
  },
  // Encryption error
  '006': {
    en: 'One or more payload parameters were not sent encrypted ⛔',
    es: 'Alguno de los parámetros del payload no fue enviado de manera encriptada ⛔'
  },
  // General error
  '007': {
    en: 'General error ⛔',
    es: 'Error general ⛔'
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