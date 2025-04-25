import { BiometricType } from "@/hooks/useBiometrics";

export const es = {
  // Splash Screen
  appName: 'FindForce',
  tagline: 'Tu compañero diario',

  // Language Selection
  languageSelection: 'Seleccione un idioma',
  languageSubtitle: 'Puedes cambiarlo más tarde en configuración',
  languagePlaceHolder: 'Español',
  continue: 'Siguiente',
  languajeError: 'Debe seleccionar algún idioma',
  languages: [{
    code: "es",
    name: 'Español',
  }, {
    code: "en",
    name: 'Inglés',
  }],

  // Welcome Screen
  welcome: 'Bienvenido',
  welcomeDescription: 'Para acceder a su ruta, habilite la geolocalización en su dispositivo.',
  back: 'Regresar',
  next: 'Siguiente',
  features: {
    personalized: 'Experiencia personalizada',
    synchronization: 'Sincronización perfecta',
    analytics: 'Análisis avanzados',
  },
  getStarted: 'Comenzar',

  // Terms Intro
  termsTitle: 'Términos y condiciones',
  termsDescription: 'Para acceder a su cuenta, es necesario acepte los términos y condiciones.',
  termsHighlights: {
    secure: 'Tus datos están seguros y encriptados',
    privacy: 'Respetamos tu privacidad',
    deletion: 'Puedes solicitar la eliminación de datos en cualquier momento',
  },
  viewFullTerms: 'Ver Términos Completos',
  acceptTerms: 'Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad',
  acceptContinue: 'Aceptar y Continuar',

  // Terms Acceptance
  acceptTermsCheckbox: 'Acepto los términos y condiciones',
  acceptTermsError: 'Debe aceptar los términos y condiciones para continuar',
  acceptTermsNextError: 'Error al aceptar los términos. Por favor intente de nuevo.',
  processing: 'Procesando...',

  // Login
  welcomeBack: 'Bienvenido',
  signInContinue: 'Inicia sesión para continuar',
  institution: 'Institución',
  username: 'Usuario',
  password: 'Contraseña',
  forgotPassword: '¿Olvidaste tu contraseña?',
  signIn: 'Iniciar sesión',
  signingIn: 'Iniciando sesión...',
  faceIdLogin: (biometricType: BiometricType) => `o ingrese con ${biometricType === "facial" ? "Face ID" : "huella"}`,
  orPassword: 'o ingresar con contraseña',
  noAccount: '¿No tienes una cuenta?',
  signUp: 'Regístrate',
  loginErrors: {
    institution: 'Institución es requerido',
    username: 'Usuario es requerido',
    password: 'Contraseña es requerido',
    deviceId: 'Error al obtener ID del dispositivo',
    emptyBiometric: 'No hay credenciales guardadas para inicio de sesión biométrico',
    failBiometric: 'Autenticación biométrica fallida',
    errorTitleBiometric: 'Error de autenticación',
    errorDescriptionBiometric: 'No se pudo verificar su identidad biométrica. Puede intentarlo más tarde desde la configuración.',
    errorConfigTitleBiometric: 'Error',
    errorConfigDescriptionBiometric: 'Ocurrió un error al configurar la autenticación biométrica. Por favor intente más tarde.',
  },
  ok: 'OK',
  textsBiometrics: (biometricType: BiometricType, text: 'title' | 'description') => {
    const biometricText =
      biometricType === "fingerprint"
        ? "huella digital"
        : biometricType === "facial"
          ? "reconocimiento facial"
          : biometricType === "iris"
            ? "reconocimiento de iris"
            : "";

    if (text === 'title') {
      return `¿Habilitar ${biometricText}?`;
    }

    if (text === 'description') {
      return `Inicia sesión de forma rápida y segura usando tu ${biometricText}`;
    }
    return '';
  },
  disableBiometrics: 'Ahora no',
  enableBiometrics: 'Habilitar',

  // Map Screen
  map: {
    title: 'Clientes no visitados',
    suggestedRadius: {
      title: 'Radio local sugerido',
      description: 'Mostrarme los de esta zona'
    },
    customRadius: {
      title: 'Radio local personalizado',
      description: 'Mostrarme ubicaciones dentro de una distancia específica'
    },
    apply: 'Aplicar',
    noClients: "No se encontraron clientes cercanos",
    noLocation: "No se puede determinar su ubicación actual. Asegúrese de que el GPS esté activado y de que los permisos de ubicación estén disponibles en la configuración de su dispositivo.",
    kilometers: 'Kilómetros',
    selectedClient: 'Cliente seleccionado',
    goTo: 'Ir a',
    navigationOptions: {
      title: 'Opciones de navegación',
      message: 'Elija su aplicación de navegación preferida',
      maps: 'Mapas',
      cancel: 'Cancelar'
    }
  },

  // Terms
  lastUpdated: 'Última actualización: 1 de junio de 2025',

  // Location Permissions
  locationPermissions: {
    title: 'Permisos de ubicación',
    message: 'Esta aplicación necesita acceso a la ubicación para funcionar correctamente',
    allow: 'Permitir',
    cancel: 'Cancelar',
    errors: {
      denied: 'Permisos denegados permanentemente. Habilítelos en la configuración.',
      checking: 'Error al comprobar los permisos de ubicación.',
      requesting: 'Error al solicitar permisos de ubicación.',
    }
  },

  // Error Messages
  errors: {
    title: 'Error',
    logout: 'Error al cerrar sesión. Por favor intente de nuevo.',
  },

  // Client Management
  clients: {
    loading: "Cargando...",
    noClients: "No hay clientes disponibles",
    noSearchResults: "No se encontraron clientes que coincidan con tu búsqueda",
    errors: {
      loading: "Error al cargar los datos del cliente",
      invalidParams: "Parámetros de solicitud inválidos",
      unauthorized: "Acceso no autorizado",
      general: "Ocurrió un error al cargar los clientes",
      notFound: "Cliente no encontrado",
      noData: "Datos del cliente no disponibles"
    }
  },

  // Client Info
  client: {
    portfolioGroup: 'Grupo de cartera',
    consumption: 'Consumo',
    manage: 'Gestionar',
    tabs: {
      information: 'Información',
      operations: 'Operaciones',
      history: 'Historial'
    },
    info: {
      isVisited: 'Cliente visitado con éxito.',
      identification: 'Identificación',
      code: 'Código',
      civilStatus: 'Estado civil',
      position: 'Puesto',
      address: 'Dirección',
      cycle: 'Ciclo',
      mobilePhone: 'Teléfono móvil',
      homePhone: 'Teléfono casa',
      workPhone: 'Teléfono trabajo'
    }
  },

  // Operations
  operationTypes: [
    { code: '1', label: 'Tarjetas' },
    { code: '2', label: 'Préstamos' }
  ],

  operations: {
    overdueDays: "Días vencidos",
    overduePayments: "Pagos vencidos",
    totalBalance: "Saldo total",
    overdueBalance: "Saldo vencido",
    totalBalanceAgain: "Saldo total",
    cycle: "Ciclo",
    portfolio: "Cartera",
    nextPaymentDate: "Fecha próximo pago",
    lastPaymentDate: "Fecha último pago",
    lastPaymentAmount: "Monto último pago",
    pendingInstallment: "Cuota pendiente"
  },

  // History
  history: {
    management: 'Gestión',
    managementDate: "Fecha gestión",
    action: "Acción",
    result: "Resultado",
    comment: "Comentario",
    contact: "Contacto",
    manager: "Gestor",
    actionDate: "Fecha acción",
    gcPortfolio: "GC Cartera",
    delinquencyReason: "Razón mora"
  },

  // Gestion Screen
  gestion: {
    title: 'Grabar gestión',
    action: 'Acción',
    result: 'Resultado',
    reasonNoPayment: 'Razón no pago',
    comment: 'Comentario',
    commentPlaceholder: 'Comentario',
    operation: 'Operación',
    localAmount: 'Monto Local',
    extAmount: 'Monto Ext',
    paymentDate: 'Fecha de pago',
    takePhoto: 'Tomar foto',
    save: 'Guardar',
    success: 'Se ha guardado la gestión',
    successTitle: 'Gestión exitosa',
    errorTitle: 'Error',
    errors: {
      action: 'Acción es requerido',
      result: 'Resultado es requerido',
      reason: 'Razón es requerido',
      localAmount: 'Monto local es requerido',
      minAmount: 'El monto mínimo requerido es de: ',
      extAmount: 'Monto Ext es requerido',
      paymentDate: 'Fecha de pago es requerido',
      saveFailed: "Error al guardar el registro de gestión",
      unauthorized: "Acceso no autorizado",
    }
  },

  // Camera
  camera: {
    notAvailable: "Cámara no disponible en plataforma web",
    close: "Cerrar",
    permissionTitle: "Permiso de cámara",
    permissionMessage: "Necesitamos su permiso para usar la cámara",
    grantPermission: "Conceder Permiso",
    error: {
      checking: "Error al verificar los permisos de la cámara",
      taking: "Error al tomar la foto",
    }
  },

  // Settings Tab
  settings: 'Configuración',
  preferences: 'Preferencias',
  account: 'Cuenta',
  settingsItems: {
    notifications: 'Notificaciones',
    darkMode: 'Modo oscuro',
    language: 'Idioma',
    privacy: 'Privacidad y Seguridad',
    help: 'Ayuda y Soporte',
    logout: 'Cerrar sesión',
  },
  appVersion: 'Versión 1.0.0',
  copyright: '© 2025 FindForce. Todos los derechos reservados.',

  currencyNames: {
    "320": "Colones",
    "840": "Dólares",
    "978": "Euros",
    "826": "Libras Esterlinas",
    "484": "Pesos Mexicanos",
    "392": "Yenes",
  },

  // SIGN_OUT 
  exp_title: 'Sesión expirada',
  exp_description: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',

  // Home Screen
  home: {
    greeting: "Bienvenido,",
    subtitle: "Te compartimos la ruta domiciliar de hoy.",
    titleFilter: 'Ruta de cobro domiciliar',
    search: {
      placeholder: "Buscar",
    },
    filters: {
      all: "Todos",
      pending: "Pendientes",
      visited: "Visitado"
    },
    client: {
      portfolio: "Cartera",
      id: "ID",
      status: "Estado",
      statusTypes: {
        pending: "Pendiente",
        visited: "Visitado"
      },
      noRegion: "Sin región",
      client: "cliente",
      clients: "clientes",
      card: {
        region: 'Región',
        state: 'Estado',
        portfolioGroup: 'Grupo de cartera'
      }
    }
  },
};