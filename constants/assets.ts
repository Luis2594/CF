/**
 * Asset paths singleton for the FindForce application.
 * Centralizes all asset path management in one location.
 */

// SVG Components
import LogoSvg from '../assets/images/logo.svg';
import RadarWavesSvg from '../assets/images/radar-waves.svg';

export const SVG = {
  LOGO: LogoSvg,
  RADAR_WAVES: RadarWavesSvg,
} as const;

export const IMAGES = {
  // Profile images (using Unsplash)
  PROFILE_DEFAULT: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
  PROJECT_THUMBNAIL: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  LOGO_PLACEHOLDER: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=200&auto=format&fit=crop',
  
  // Illustrations
  TERMS_ILLUSTRATION: 'https://images.unsplash.com/photo-1586880244406-556ebe35f282?q=80&w=1000&auto=format&fit=crop',
  WELCOME_ILLUSTRATION: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop',
} as const;

export const ANIMATIONS = {
  LOGO: require('../assets/animations/logo-animation.json')
} as const;