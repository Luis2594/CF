import { BiometricType } from "@/hooks/useBiometrics";

export const en = {
  // Splash Screen
  appName: 'FindForce',
  tagline: 'Your daily companion',

  // Language Selection
  languageSelection: 'Select a language',
  languageSubtitle: 'You can change this later in settings',
  languagePlaceHolder: 'English',
  continue: 'Continue',
  languajeError: 'You must select some languaje',
  languages: [{
    code: "es",
    name: 'Spanish',
  }, {
    code: "en",
    name: 'English',
  }],

  // Welcome Screen
  welcome: 'Welcome',
  welcomeDescription: 'To access your route, enable geolocation on your device.',
  back: 'Back',
  next: 'Next',
  features: {
    personalized: 'Personalized experience',
    synchronization: 'Seamless synchronization',
    analytics: 'Advanced analytics',
  },
  getStarted: 'Get Started',

  // Terms Intro
  termsTitle: 'Terms and conditions',
  termsDescription: 'To access your account, you must accept the terms and conditions.',
  termsHighlights: {
    secure: 'Your data is secure and encrypted',
    privacy: 'We respect your privacy',
    deletion: 'You can request data deletion anytime',
  },
  viewFullTerms: 'View Full Terms',
  acceptTerms: 'By continuing, you agree to our Terms of Service and Privacy Policy',
  acceptContinue: 'Accept & Continue',

  // Terms Acceptance
  acceptTermsCheckbox: 'I accept the terms and conditions',
  acceptTermsError: 'You must accept the terms and conditions to continue',
  acceptTermsNextError: 'Error accepting terms. Please try again.',
  processing: 'Processing...',

  // Login
  welcomeBack: 'Welcome',
  signInContinue: 'Sign in to continue',
  institution: 'Institution',
  username: 'Username',
  password: 'Password',
  forgotPassword: 'Forgot Password?',
  signIn: 'Login',
  signingIn: 'Logging in...',
  faceIdLogin: (biometricType: BiometricType) => `or login with ${biometricType === "facial" ? "Face ID" : "fingerprint"}`,
  orPassword: 'or enter with password',
  noAccount: 'Don\'t have an account?',
  signUp: 'Sign Up',
  loginErrors: {
    institution: "Institution is required",
    username: "Username is required",
    password: "Password is required",
    deviceId: 'Error getting device ID',
    emptyBiometric: 'No saved credentials for biometric login',
    failBiometric: 'Biometric authentication failed',
    errorTitleBiometric: 'Authentication Error',
    errorDescriptionBiometric: 'Could not verify your biometric identity. You can try again later from settings.',
    errorConfigTitleBiometric: 'Error',
    errorConfigDescriptionBiometric: 'An error occurred while setting up biometric authentication. Please try again later.'
  },
  ok: 'OK',
  textsBiometrics: (biometricType: BiometricType, text: 'title' | 'description') => {
    const biometricText =
      biometricType === "fingerprint"
        ? "fingerprint"
        : biometricType === "facial"
          ? "Face ID"
          : biometricType === "iris"
            ? "iris recognition"
            : "";

    if (text === 'title') {
      return `Enable ${biometricText}?`;

    }

    if (text === 'description') {
      return `Sign in quickly and securely using your ${biometricText}?`;

    }
    return '';
  },
  disableBiometrics: 'Not now',
  enableBiometrics: 'Enable',

  // Terms
  lastUpdated: 'Last Updated: June 1, 2025',

  // Home Tab
  hello: 'Hello, Alex',
  todayTasks: 'Today\'s Tasks',
  recentProjects: 'Recent Projects',
  viewAll: 'View All',
  taskTitle: 'Complete project proposal',
  projectTitle: 'Marketing Campaign',
  progress: 'Progress',

  // Client
  // OPERATIONS
  operations: [{ code: '1', label: 'Cards' }, { code: '2', label: 'Loans' }],


  // Profile Tab
  editProfile: 'Edit Profile',
  aboutMe: 'About Me',
  aboutMeText: 'Product designer with 5+ years of experience creating user-centered digital solutions. Passionate about solving complex problems with elegant designs.',
  achievements: 'Achievements',
  achievementItems: {
    topDesigner: {
      title: 'Top Designer 2024',
      desc: 'Recognized for exceptional UI/UX work',
    },
    milestone: {
      title: '5 Year Milestone',
      desc: 'Completed 5 years in the industry',
    },
    projects: {
      title: '100+ Projects',
      desc: 'Successfully delivered over 100 projects',
    },
  },
  stats: {
    projects: 'Projects',
    followers: 'Followers',
    following: 'Following',
  },

  // Notifications Tab
  notifications: 'Notifications',
  markAllRead: 'Mark all as read',
  notificationTypes: {
    message: 'New message',
    like: 'liked your post',
    follow: 'New follower',
    reminder: 'Meeting reminder',
  },

  // Settings Tab
  settings: 'Settings',
  preferences: 'Preferences',
  account: 'Account',
  settingsItems: {
    notifications: 'Notifications',
    darkMode: 'Dark Mode',
    language: 'Language',
    privacy: 'Privacy & Security',
    help: 'Help & Support',
    logout: 'Log Out',
  },
  appVersion: 'Version 1.0.0',
  copyright: '© 2025 FindForce. All rights reserved.',

  // Client Management
  clients: {
    loading: 'Loading...',
    noClients: 'No clients available',
    errors: {
      loading: 'Error loading clients',
      invalidParams: 'Invalid request parameters',
      unauthorized: 'Unauthorized access',
      general: 'An error occurred while loading clients'
    }
  },
};