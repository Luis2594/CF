import { BiometricType } from "@/hooks/useBiometrics";

export const en = {
  // Splash Screen
  appName: "FindForce",
  tagline: "Your daily companion",

  // Language Selection
  languageSelection: "Select a language",
  languageSubtitle: "You can change this later in settings",
  languagePlaceHolder: "English",
  continue: "Continue",
  languajeError: "You must select some languaje",
  languages: [
    {
      code: "es",
      name: "Spanish",
    },
    {
      code: "en",
      name: "English",
    },
  ],

  // Welcome Screen
  welcome: "Welcome",
  welcomeDescription:
    "To access your route, enable geolocation on your device.",
  back: "Back",
  next: "Next",
  features: {
    personalized: "Personalized experience",
    synchronization: "Seamless synchronization",
    analytics: "Advanced analytics",
  },
  getStarted: "Get Started",

  // Terms Intro
  termsTitle: "Terms and conditions",
  terms: `This document governs the use of the 2Collect mobile application, developed and exclusively licensed by CreditForce, including its complementary environment: the administration console. Both constitute an integrated system for domiciliary collection management.\n\nAcceptance of these Terms and Conditions constitutes a legally binding agreement between you, as an authorized user, your institution, and CreditForce.\n\nIf you do not agree with these terms, do not continue using the system.\n\n1. DEFINITIONS\n• 2Collect / App / Application: Mobile application owned by CreditForce used for domiciliary collection management.\n• User: Person authorized by their institution to operate the App.\n• Institution: Organization licensed to use the App.\n• Authorized Device: Mobile phone validated by IMEI and linked to an authorized user.\n• Management: Any action recorded from the App during the collection process.\n• Administration Console: Web platform that complements and is inseparable from the App, used by the institution to configure, supervise, and control the 2Collect operational ecosystem.\n\n2. SYSTEM SCOPE\n• The mobile application, operated in the field by users.\n• The administration console, operated by authorized institution personnel for configuration, route assignment, device validation, and monitoring.\n• The App cannot operate autonomously without active setup from the console.\n\n3. LICENSE OF USE\n• The system is provided under a limited, revocable, non-exclusive, and non-transferable license valid only during the contractual relationship between the institution and CreditForce.\n• The user agrees to use the system exclusively for work-related purposes as defined by their institution.\n• Prohibited:\n  • Accessing from unregistered devices.\n  • Sharing credentials or tampering with data.\n  • Modifying, decompiling, or replicating the system.\n\n4. AUTHENTICATION AND SECURITY\n• Access to the App requires:\n  • Authentication via credentials or biometrics (fingerprint, facial recognition).\n  • Prior validation of the authorized device by IMEI.\n  • Active geolocation permissions and connectivity to the administration console.\n• Any unauthorized access attempt may be blocked and reported as a security incident.\n\n5. DATA COLLECTION AND EVIDENCE\n• During operation, the App may record:\n  • User’s geographic location.\n  • Photographs as proof of visit.\n  • Comments, result codes, and payment promises.\n• This data is temporarily stored on the device and automatically synced with institutional systems upon regaining connection.\n• The user provides informed consent for the collection, processing, and use of this information.\n\n6. OFFLINE OPERATION AND SYNC\n• 2Collect may operate without internet connection. However:\n  • Records will be stored locally.\n  • Syncing is mandatory and automatic upon reconnection.\n  • Operational traceability depends on sync quality.\n• The user is responsible for keeping the device updated and functional.\n\n7. RESPONSIBILITY AND CONDUCT\n• The user agrees to:\n  • Keep credentials confidential.\n  • Use the App and data ethically and in line with institutional protocols.\n  • Not alter information or submit false records.\n• Misuse may result in disciplinary, contractual, or legal consequences.\n\n8. CONFIDENTIALITY AND DATA PROTECTION\n• CREDITFORCE does not access or store personal information handled by the user.\n• All data is transmitted exclusively to the institution, which is responsible for processing it in accordance with applicable laws (including but not limited to GDPR, LGPD, CCPA).\n• The administration console allows the institution to audit system use and ensure compliance with internal policies.\n\n9. MODIFICATIONS\n• CreditForce may update these Terms and Conditions at any time for technical, regulatory, security, or functional improvement reasons.\n• Users will be notified through the App or designated institutional channels.\n• Accepting the new terms will be required to continue using the App.\n\n10. VALIDITY\n• These Terms and Conditions become effective upon user acceptance and remain valid while a license agreement exists between CreditForce and the institution.\n• Validity may end due to:\n  • Termination of the contract between CreditForce and the institution.\n  • Revocation of the user’s access by the institution.\n  • Technical or commercial suspension of the service.\n• Upon expiration, the user must immediately stop using the App and uninstall it.\n\n11. ACCESS REVOCATION\n• CreditForce or the institution may revoke, suspend, or limit access to the App or console in the following cases:\n  • Misuse or suspicious activity.\n  • Termination of the user's employment.\n  • Breach of these Terms.\n  • Operational or cybersecurity risks.\n\n12. LIMITATION OF LIABILITY\n• CREDITFORCE, its employees, and contractors are not liable for:\n  • Failures caused by system misuse.\n  • Data loss, service interruption, or indirect damages.\n  • Actions or omissions by institutional personnel or subcontractors.\n• CreditForce’s liability shall in all cases be limited to the actual amount paid for the subscription over the last three (3) months.\n\n13. CONTRACTUAL RELATIONSHIP\n• Nothing in these Terms and Conditions creates an employment, agency, representation, or partnership relationship between CreditForce and the user.\n• Each party acts independently and is responsible for its own actions, obligations, and personnel.\n\n14. JURISDICTION\n• These Terms and Conditions are governed by the laws of the Republic of Costa Rica.\n• Any dispute will be resolved through arbitration in accordance with the rules of the competent arbitration center.\n\n15. EXPRESS CONSENT\n• By pressing “ACCEPT”, you declare:\n  • You have read, understood, and fully accepted this document.\n  • You authorize the use of your biometric data, location, and collection records for the stated purposes.\n  • You acknowledge your activity will be monitored by your institution through the administration console.\n  • You agree to act according to principles of professional integrity, legality, and data protection.`,
  termsDescription:
    "To access your account, you must accept the terms and conditions.",
  termsHighlights: {
    secure: "Your data is secure and encrypted",
    privacy: "We respect your privacy",
    deletion: "You can request data deletion anytime",
  },
  viewFullTerms: "View Full Terms",
  acceptTerms:
    "By continuing, you agree to our Terms of Service and Privacy Policy",
  acceptContinue: "Accept & Continue",

  // Terms Acceptance
  acceptTermsCheckbox: "I accept the terms and conditions",
  acceptTermsError: "You must accept the terms and conditions to continue",
  acceptTermsNextError: "Error accepting terms. Please try again.",
  processing: "Processing...",

  // Login
  welcomeBack: "Welcome",
  signInContinue: "Sign in to continue",
  institution: "Institution",
  username: "Username",
  password: "Password",
  forgotPassword: "Forgot Password?",
  signIn: "Login",
  signingIn: "Logging in...",
  faceIdLogin: (biometricType: BiometricType) =>
    `or login with ${biometricType === "facial" ? "Face ID" : "fingerprint"}`,
  orPassword: "or enter with password",
  noAccount: "Don't have an account?",
  signUp: "Sign Up",
  loginErrors: {
    institution: "Institution is required",
    username: "Username is required",
    password: "Password is required",
    deviceId: "Error getting device ID",
    emptyBiometric: "No saved credentials for biometric login",
    failBiometric: "Biometric authentication failed",
    errorTitleBiometric: "Authentication Error",
    errorDescriptionBiometric:
      "Could not verify your biometric identity. You can try again later.",
    errorConfigTitleBiometric: "Error",
    errorConfigDescriptionBiometric:
      "An error occurred while setting up biometric authentication. Please try again later.",
  },
  ok: "OK",
  textsBiometrics: (
    biometricType: BiometricType,
    text: "title" | "description"
  ) => {
    const biometricText =
      biometricType === "fingerprint"
        ? "fingerprint"
        : biometricType === "facial"
        ? "Face ID"
        : biometricType === "iris"
        ? "iris recognition"
        : "";

    if (text === "title") {
      return `Enable ${biometricText}?`;
    }

    if (text === "description") {
      return `Sign in quickly and securely using your ${biometricText}?`;
    }
    return "";
  },
  disableBiometrics: "Not now",
  enableBiometrics: "Enable",

  // Map Screen
  map: {
    title: "Unvisited customers",
    suggestedRadius: {
      title: "Suggested local radius",
      description: "Show me in this area",
    },
    customRadius: {
      title: "Custom local radius",
      description: "Show me locations within a specific distance",
    },
    apply: "Apply",
    noClients: "No nearby customers found",
    noLocation:
      "Unable to determine your current location. Please ensure that GPS is enabled and location permissions are granted in your device settings.",
    selectedClient: "Selected client",
    kilometers: "Kilometers",
    goTo: "Go to",
    navigationOptions: {
      title: "Navigation options",
      message: "Choose your preferred navigation app",
      maps: "Maps",
      cancel: "Cancel",
    },
  },

  // Terms
  lastUpdated: "Last Updated: June 1, 2025",

  // Location Permissions
  locationPermissions: {
    title: "Location permissions",
    message: "This app needs location access to work properly",
    allow: "Allow",
    cancel: "Cancel",
    errors: {
      denied: "Permissions permanently denied. Enable them in settings.",
      checking: "Error checking location permissions.",
      requesting: "Error requesting location permissions",
    },
  },

  // Error Messages
  errors: {
    title: "Error",
    logout: "Error logging out. Please try again.",
    noInternet: "Internet connection required. Please try again.",
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
      noData: "Client data not available",
    },
  },

  // Client Info
  client: {
    portfolioGroup: "Portfolio Group",
    consumption: "Consumption",
    manage: "Manage",
    tabs: {
      information: "Information",
      operations: "Operations",
      history: "History",
    },
    info: {
      isVisited: "Client successfully visited.",
      identification: "Identification",
      code: "Code",
      civilStatus: "Civil Status",
      position: "Position",
      address: "Address",
      cycle: "Cycle",
      mobilePhone: "Mobile Phone",
      homePhone: "Home Phone",
      workPhone: "Work Phone",
    },
  },

  // Operations
  operationTypes: [
    { code: "1", label: "Cards" },
    { code: "2", label: "Loans" },
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
    pendingInstallment: "Pending Installment",
  },

  // History
  history: {
    management: "Management",
    managementDate: "Management Date",
    action: "Action",
    result: "Result",
    comment: "Comment",
    contact: "Contact",
    manager: "Manager",
    actionDate: "Action Date",
    gcPortfolio: "GC",
    delinquencyReason: "Delinquency Reason",
  },

  // Gestion Screen
  gestion: {
    title: "Record Management",
    action: "Action",
    result: "Result",
    reasonNoPayment: "Reason for No Payment",
    comment: "Comment",
    commentPlaceholder: "Comment",
    operation: "Operation",
    localAmount: "Local amount",
    extAmount: "Foreign amount",
    paymentDate: "Payment date",
    takePhoto: "Take photo",
    save: "Save",
    success: "The management has been saved",
    successTitle: "Successful management",
    errorTitle: "Error",
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
    },
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
      deniedTemporarily: "Camera permission was denied. Please try again.",
      deniedPermanently:
        "Camera permission was blocked. Open settings to allow access.",
    },
  },

  // Settings Tab
  settings: "Settings",
  preferences: "Preferences",
  account: "Account",
  settingsItems: {
    notifications: "Notifications",
    darkMode: "Dark Mode",
    language: "Language",
    privacy: "Privacy & Security",
    help: "Help & Support",
    logout: "Log out",
  },
  appVersion: "Version 1.0.0",
  copyright: "© 2025 FindForce. All rights reserved.",

  currencyNames: {
    "320": "Colón",
    "840": "Dollars",
  },

  // SIGN_OUT
  exp_title: "Session Expired",
  exp_description: "Your session has expired. Please log in again.",

  // Home Screen
  home: {
    greeting: "Welcome,",
    subtitle: "We share today's home route with you.",
    titleFilter: "Home collection route",
    search: {
      placeholder: "Search",
    },
    filters: {
      all: "All clients",
      pending: "Pending",
      visited: "Visited",
    },
    client: {
      portfolio: "Portfolio",
      id: "ID",
      status: "Status",
      statusTypes: {
        pending: "Pending",
        visited: "Visited",
      },
      noRegion: "No region",
      client: "client",
      clients: "clients",
      card: {
        region: "Region",
        state: "State",
        portfolioGroup: "Portfolio group",
      },
    },
  },
};
