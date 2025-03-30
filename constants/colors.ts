export const colors = {
  // Primary colors
  primary: {
    main: '#F04E23',
    light: '#FBC7AD',
    dark: '#F34A2D',
    background: 'rgba(240, 78, 35, 0.1)',
  },

  // Secondary colors
  secondary: {
    main: '#0093D4',
    light: '#00AEEF',
  },

  // Success colors
  success: {
    main: '#15DD7D',
    light: '#34C759',
    dark: '#18784A',
    background: 'rgba(76, 175, 80, 0.1)',
  },

  // Error colors
  error: {
    main: '#FF3B30',
    light: '#FFE4E4',
    dark: '#9D2B2B',
    background: 'rgba(255, 59, 48, 0.1)',
  },

  // Gray scale
  gray: {
    50: '#F5F5F6',
    100: '#E6E6E7',
    200: '#D9D9D9',
    300: '#D0D0D1',
    400: '#A0A0A0',
    500: '#717275',
    600: '#666666',
    700: '#4c669f',
  },

  // Common colors
  common: {
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
  },

  // Background colors
  background: {
    default: '#FFFFFF',
    paper: '#F5F5F6',
    modal: 'rgba(0, 0, 0, 0.5)',
  },

  // Text colors
  text: {
    primary: '#717275',
    secondary: '#666666',
    disabled: '#D0D0D1',
  },

  // Border colors
  border: {
    main: '#E6E6E7',
    light: '#F5F5F6',
    dark: '#D0D0D1',
  },

  // Status colors
  status: {
    pending: '#FC4343',
    visited: '#15DD7D',
  },
} as const;

// Type for colors object to ensure type safety
export type Colors = typeof colors;

// Type for accessing nested color values
export type ColorValue<T> = T extends object
  ? { [K in keyof T]: ColorValue<T[K]> }[keyof T]
  : T;

// Helper function to get color value with type safety
export function getColor<T extends ColorValue<Colors>>(color: T): string {
  return color as string;
}