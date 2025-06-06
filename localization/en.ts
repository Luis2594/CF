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
    errorDescriptionBiometric: 'Could not verify your biometric identity. You can try again later.',
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

  // Map Screen
  map: {
    title: 'Unvisited customers',
    suggestedRadius: {
      title: 'Suggested local radius',
      description: 'Show me in this area'
    },
    customRadius: {
      title: 'Custom local radius',
      description: 'Show me locations within a specific distance'
    },
    apply: 'Apply',
    noClients: "No nearby customers found",
    noLocation: "Unable to determine your current location. Please ensure that GPS is enabled and location permissions are granted in your device settings.",
    selectedClient: 'Selected client',
    kilometers: 'Kilometers',
    goTo: 'Go to',
    navigationOptions: {
      title: 'Navigation options',
      message: 'Choose your preferred navigation app',
      maps: 'Maps',
      cancel: 'Cancel'
    }
  },

  // Terms
  lastUpdated: 'Last Updated: June 1, 2025',

  // Location Permissions
  locationPermissions: {
    title: 'Location permissions',
    message: 'This app needs location access to work properly',
    allow: 'Allow',
    cancel: 'Cancel',
    errors: {
      denied: 'Permissions permanently denied. Enable them in settings.',
      checking: 'Error checking location permissions.',
      requesting: 'Error requesting location permissions',
    }
  },

  // Error Messages
  errors: {
    title: 'Error',
    logout: 'Error logging out. Please try again.',
  },

  // Client Management
  clients: {
    loading: "Loading...",
    noClients: "No clients available",
    noSearchResults: "No clients found matching your search",
    errors: {
      loading: "Error loading client data",
      invalidParams: "Invalid request parameters",
      unauthorized: "Unauthorized access",
      general: "An error occurred while loading clients",
      notFound: "Client not found",
      noData: "Client data not available"
    }
  },

  // Client Info
  client: {
    portfolioGroup: 'Portfolio Group',
    consumption: 'Consumption',
    manage: 'Manage',
    tabs: {
      information: 'Information',
      operations: 'Operations',
      history: 'History'
    },
    info: {
      isVisited: 'Client successfully visited.',
      identification: 'Identification',
      code: 'Code',
      civilStatus: 'Civil Status',
      position: 'Position',
      address: 'Address',
      cycle: 'Cycle',
      mobilePhone: 'Mobile Phone',
      homePhone: 'Home Phone',
      workPhone: 'Work Phone'
    }
  },

  // Operations
  operationTypes: [
    { code: '1', label: 'Cards' },
    { code: '2', label: 'Loans' }
  ],
  operations: {
    overdueDays: "Overdue Days",
    overduePayments: "Overdue Payments",
    totalBalance: "Total Balance",
    overdueBalance: "Overdue Balance",
    totalBalanceAgain: "Total Balance",
    cycle: "Cycle",
    portfolio: "Portfolio",
    nextPaymentDate: "Next Payment Date",
    lastPaymentDate: "Last Payment Date",
    lastPaymentAmount: "Last Payment Amount",
    pendingInstallment: "Pending Installment"
  },

  // History
  history: {
    management: 'Management',
    managementDate: "Management Date",
    action: "Action",
    result: "Result",
    comment: "Comment",
    contact: "Contact",
    manager: "Manager",
    actionDate: "Action Date",
    gcPortfolio: "GC",
    delinquencyReason: "Delinquency Reason"
  },

  // Gestion Screen
  gestion: {
    title: 'Record Management',
    action: 'Action',
    result: 'Result',
    reasonNoPayment: 'Reason for No Payment',
    comment: 'Comment',
    commentPlaceholder: 'Comment',
    operation: 'Operation',
    localAmount: 'Local amount',
    extAmount: 'Foreign amount',
    paymentDate: 'Payment date',
    takePhoto: 'Take photo',
    save: 'Save',
    success: 'The management has been saved',
    successTitle: 'Successful management',
    errorTitle: 'Error',
    errors: {
      action: "Action is required",
      result: "Result is required",
      reason: "Reason is required",
      localAmount: "Local amount is required",
      minAmount: "The minimum amount required is: ",
      extAmount: "Foreign amount is required",
      paymentDate: "Payment date is required",
      saveFailed: "Failed to save management record",
      unauthorized: "Unauthorized access",
    }
  },

  // Camera
  camera: {
    notAvailable: "Camera not available on web platform",
    close: "Close",
    permissionTitle: "Camera permission",
    permissionMessage: "We need your permission to use the camera",
    grantPermission: "Grant Permission",
    error: {
      checking: "Error checking camera permissions",
      taking: "Error taking picture",
    }
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
    logout: 'Log out',
  },
  appVersion: 'Version 1.0.0',
  copyright: '© 2025 FindForce. All rights reserved.',

  currencyNames: {
    "320": "Colón",
    "840": "Dollars",
  },

  // SIGN_OUT 
  exp_title: 'Session Expired',
  exp_description: 'Your session has expired. Please log in again.',

  // Home Screen
  home: {
    greeting: "Welcome,",
    subtitle: "We share today's home route with you.",
    titleFilter: 'Home collection route',
    search: {
      placeholder: "Search",
    },
    filters: {
      all: "All clients",
      pending: "Pending",
      visited: "Visited"
    },
    client: {
      portfolio: "Portfolio",
      id: "ID",
      status: "Status",
      statusTypes: {
        pending: "Pending",
        visited: "Visited"
      },
      noRegion: "No region",
      client: "client",
      clients: "clients",
      card: {
        region: 'Region',
        state: 'State',
        portfolioGroup: 'Portfolio group'
      }
    }
  },
};