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
    institution: 'Ingrese una institución',
    username: 'Ingrese su usuario',
    password: 'Ingrese su contraseña',
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
      return `Inicia sesión de forma rápida y segura usando tu ${biometricText}?`;

    }
    return '';
  },
  disableBiometrics: 'Ahora no',
  enableBiometrics: 'Habilitar',

  // Terms
  lastUpdated: 'Última actualización: 1 de junio de 2025',

  // Client Management
  clients: {
    loading: 'Cargando...',
    noClients: 'No hay clientes disponibles',
    errors: {
      loading: 'Error al cargar los clientes',
      invalidParams: 'Parámetros de solicitud inválidos',
      unauthorized: 'Acceso no autorizado',
      general: 'Ocurrió un error al cargar los clientes'
    }
  },

  // Home Tab
  hello: 'Hola, Alex',
  todayTasks: 'Tareas de hoy',
  recentProjects: 'Proyectos recientes',
  viewAll: 'Ver todos',
  taskTitle: 'Completar propuesta de proyecto',
  projectTitle: 'Campaña de Marketing',
  progress: 'Progreso',

  // Profile Tab
  editProfile: 'Editar Perfil',
  aboutMe: 'Sobre mí',
  aboutMeText: 'Diseñador de productos con más de 5 años de experiencia creando soluciones digitales centradas en el usuario. Apasionado por resolver problemas complejos con diseños elegantes.',
  achievements: 'Logros',
  achievementItems: {
    topDesigner: {
      title: 'Mejor Diseñador 2024',
      desc: 'Reconocido por trabajo excepcional en UI/UX',
    },
    milestone: {
      title: 'Hito de 5 años',
      desc: 'Completados 5 años en la industria',
    },
    projects: {
      title: '100+ Proyectos',
      desc: 'Entregados con éxito más de 100 proyectos',
    },
  },
  stats: {
    projects: 'Proyectos',
    followers: 'Seguidores',
    following: 'Siguiendo',
  },

  // Notifications Tab
  notifications: 'Notificaciones',
  markAllRead: 'Marcar todo como leído',
  notificationTypes: {
    message: 'Nuevo mensaje',
    like: 'le gustó tu publicación',
    follow: 'Nuevo seguidor',
    reminder: 'Recordatorio de reunión',
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
    logout: 'Cerrar Sesión',
  },
  appVersion: 'Versión 1.0.0',
  copyright: '© 2025 FindForce. Todos los derechos reservados.',
};