/**
 * Asset paths singleton for the FindForce application.
 * Centralizes all asset path management in one location.
 */

// SVG Components
import LogoSvg from '../assets/images/logo.svg';
import RadarWavesSvg from '../assets/images/radar-waves.svg';
import FaceId from '../assets/images/icons/faceid.svg';
import Fingerprint from '../assets/images/icons/fingerprint.svg';
import FaceIdBlue from '../assets/images/icons/faceId_Blue.svg';
import FingerprintBlue from '../assets/images/icons/fingerprint_Blue.svg';
import FaceIdCircle from '../assets/images/icons/faceidCircle.svg';
import FingerprintCircle from '../assets/images/icons/fingerprintCircle.svg';
import Close from '../assets/images/icons/close.svg';
import CloseSecond from '../assets/images/icons/closeSecond.svg';
import Check from '../assets/images/icons/checbox.svg';
import ChevronUp from '../assets/images/icons/chevronUp.svg';
import ChevronDown from '../assets/images/icons/chevronDown.svg';
import Card from '../assets/images/icons/card.svg';
import Calendar from '../assets/images/icons/calendar.svg';
import Camera from '../assets/images/icons/camera.svg';
import Finance from '../assets/images/icons/finance.svg';
import SuccessModal from '../assets/images/icons/successModal.svg';
import ErrorModal from '../assets/images/icons/errorModal.svg';
import Expand from '../assets/images/icons/expand.svg';
import Bag from '../assets/images/icons/bag.svg';
import CheckCircle from '../assets/images/icons/checkCircle.svg';

export const SVG = {
  LOGO: LogoSvg,
  RADAR_WAVES: RadarWavesSvg,
  FACE_ID: FaceId,
  FINGERPRINT: Fingerprint,
  FACE_ID_BLUE: FaceIdBlue,
  FINGERPRINT_BLUE: FingerprintBlue,
  FACE_ID_CIRCLE: FaceIdCircle,
  FINGERPRINT_CIRCLE: FingerprintCircle,
  CLOSE: Close,
  CLOSE_SECOND: CloseSecond,
  CHECK: Check,
  CHEVRON_UP: ChevronUp,
  CHEVRON_DOWN: ChevronDown,
  CARD: Card,
  CALENDAR: Calendar,
  CAMERA: Camera,
  FINANCE: Finance,
  SUCCESS_MODAL: SuccessModal,
  ERROR_MODAL: ErrorModal,
  EXPAND: Expand,
  BAG: Bag,
  CHECK_CIRCLE: CheckCircle,
} as const;

export const IMAGES = {
  // Profile images (using Unsplash)
  PROFILE_DEFAULT: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
  PROJECT_THUMBNAIL: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  LOGO_PLACEHOLDER: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=200&auto=format&fit=crop',

  // Illustrations
  WELCOME_ILLUSTRATION: require('../assets/images/welcome-Illustration.png'),
  TERMS_ILLUSTRATION: require('../assets/images/terms-illustration.png'),
} as const;

export const ANIMATIONS = {
  LOGO: require('../assets/animations/logo-animation.json')
} as const;