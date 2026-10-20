import {
  ShieldCheck,
  FileArchive,
  Gauge,
  MoonStar,
  HardDriveDownload,
  FolderSearch,
  Layers,
  FolderKanban,
  Sparkles,
} from 'lucide-react';

export const APP_INFO = {
  name: 'Brain Board',
  author: 'Pablo Livian',
  version: 'v1.0.4',
  installerName: 'Brain-Board-Setup-1.0.4.exe',
  installerUrl: '#descarga',
  directDownloadFile:
    'https://github.com/PabloLivian/BrainBoard/releases/download/v1.0.4/Brain-Board-Setup-1.0.4.exe',
  size: '82.4 MB',
  os: 'Windows 10 / 11 (64-bit)',
  architecture: 'x64 Nativo',
  license: 'Licencia MIT • 100% Local y Offline',
  githubUrl: 'https://github.com/PabloLivian/BrainBoard',
};

export const NAV_LINKS = [
  { id: 'inicio', label: 'Inicio', href: '#inicio' },
  { id: 'capturas', label: 'Capturas', href: '#capturas' },
  { id: 'caracteristicas', label: 'Características', href: '#caracteristicas' },
  { id: 'compatibilidad', label: 'Compatibilidad RTB', href: '#compatibilidad' },
  { id: 'descarga', label: 'Descargar', href: '#descarga' },
];

export const SCREENSHOT_ITEMS = [
  {
    id: 'menu-inicio',
    tabTitle: '1. Menú de Inicio',
    badge: 'Centro de Control Local',
    title: 'Todos tus tableros organizados por categorías y acceso rápido',
    description:
      'Al abrir Brain Board encontrarás un panel de inicio limpio donde gestionar todos tus proyectos locales. Filtra tus pizarras por categorías personalizadas (General, Creative, Random), búscalas en tiempo real, revisa la fecha de última apertura y accede directamente a las opciones para importar o crear copias de seguridad (.rtb).',
    imageSrc: '/assets/Menu_Inicio.png',
    highlights: [
      'Clasificación por categorías y espacios con contador de tableros',
      'Miniaturas visuales e historial exacto de última modificación',
      'Acceso rápido para crear tableros y gestionar copias de seguridad (.rtb)',
    ],
    icon: FolderKanban,
  },
  {
    id: 'tablero-principal',
    tabTitle: '2. Pizarra y Pestañas',
    badge: 'Lienzo Infinito Multitarea',
    title: 'Estructura ideas complejas con pestañas múltiples y herramientas ágiles',
    description:
      'Mantén varios tableros abiertos a la vez en la barra superior de pestañas y muévete entre ellos sin esperas. El lienzo infinito te permite organizar columnas temáticas, conectar conceptos mediante flechas, añadir textos detallados y combinar referencias visuales con guardado automático instantáneo.',
    imageSrc: '/assets/Tablero.png',
    highlights: [
      'Navegación multitarea por pestañas estilo navegador',
      'Barra de herramientas lateral con selección, notas, formas, texto y conectores',
      'Indicador de guardado local en tiempo real en cada cambio',
    ],
    icon: Layers,
  },
  {
    id: 'gestor-galeria',
    tabTitle: '3. Galería y Muchas Fotos',
    badge: 'Alto Rendimiento Visual',
    title: 'Almacena y visualiza cientos de fotografías en alta resolución sin límites',
    description:
      'Brain Board está diseñado para manejar enormes colecciones de fotos, catálogos de referencias y librerías visuales pesadas dentro de un mismo tablero. Puedes reunir cientos de imágenes de alta calidad ordenadas en tu pizarra y hacer zoom o desplazarte con total fluidez.',
    imageSrc: '/assets/Gestor_Galeria.png',
    highlights: [
      'Capacidad para almacenar gran cantidad de fotos pesadas en un solo tablero',
      'Renderizado fluido al hacer zoom sobre colecciones y catálogos extensos',
      'Ideal para bibliotecas de recursos gráficos, referencias 3D y moodboards',
    ],
    icon: Gauge,
  },
  {
    id: 'modo-dual',
    tabTitle: '4. Modo Claro y Oscuro',
    badge: 'Adaptación Visual Instantánea',
    title: 'Trabaja a tu gusto: Modo Oscuro profundo o Modo Claro de alta legibilidad',
    description:
      'Cambia el aspecto de tus tableros con un solo clic desde la barra superior. El Modo Oscuro ofrece un fondo descansado para sesiones largas de estudio o desarrollo, mientras que el Modo Claro proporciona un aspecto de papel limpio e iluminado perfecto para leer apuntes extensos y documentación.',
    imageSrc: '/assets/Modo_oscuro.png',
    secondaryImageSrc: '/assets/Modo_claro.png',
    highlights: [
      'Conmutador integrado en la esquina superior derecha del programa',
      'Modo Oscuro calibrado para evitar la fatiga ocular prolongada',
      'Modo Claro nítido que adapta automáticamente bloques de texto y fondos',
    ],
    icon: Sparkles,
  },
];

export const FEATURES_LIST = [
  {
    id: 'offline-privacy',
    title: '100% Privado y Offline',
    description:
      'Todos tus tableros se almacenan directamente en tu equipo (IndexedDB + archivos JSON físicos locales). Nada se envía a servidores de terceros.',
    icon: ShieldCheck,
    tag: 'Privacidad Total',
  },
  {
    id: 'rtb-support',
    title: 'Importación y Exportación RTB Completa',
    description:
      'Abre y genera copias de seguridad .rtb con imágenes incrustadas de alta resolución de forma instantánea y con total fidelidad.',
    icon: FileArchive,
    tag: 'Copias de Seguridad',
  },
  {
    id: 'canvas-performance',
    title: 'Motor Canvas 2D de Alto Rendimiento',
    description:
      'Zoom suave, pan fluido y soporte para miles de objetos, conectores e imágenes pesadas sin ralentización.',
    icon: Gauge,
    tag: '60 FPS Estables',
  },
  {
    id: 'dual-dark-mode',
    title: 'Modo Oscuro Nativo Dual',
    description:
      'Diseñado desde cero para largas sesiones de trabajo creativo e ingeniería con confort visual garantizado en modo oscuro y claro.',
    icon: MoonStar,
    tag: 'Dark & Light UI',
  },
  {
    id: 'autosave',
    title: 'Auto-guardado Inmediato',
    description:
      'Cada modificación en la pizarra se persiste al milisegundo en tu disco local para que nunca pierdas tu trabajo ante cierres imprevistos.',
    icon: HardDriveDownload,
    tag: 'Persistencia Local',
  },
  {
    id: 'smart-search',
    title: 'Búsqueda y Categorización Inteligente',
    description:
      'Panel lateral de inicio para ordenar tableros por categorías, proyectos y espacios de trabajo con acceso en pestañas.',
    icon: FolderSearch,
    tag: 'Multi-Pestaña',
  },
];

export const CHANGELOG_LATEST = [
  'Motor Canvas 2D optimizado con renderizado selectivo de alto rendimiento.',
  'Soporte completo para importación y exportación de archivos .rtb con imágenes de alta resolución.',
  'Nuevo sistema de pestañas horizontales para alternar entre múltiples pizarras sin recargar.',
  'Conmutador nativo de Modo Oscuro (#0e1215) y Modo Claro (#f5f5f7) con guardado instantáneo.',
];
