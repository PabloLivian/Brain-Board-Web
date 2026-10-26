import {
  Brain,
  Link2,
  History,
  Search,
  ShieldCheck,
  FolderOpen,
} from 'lucide-react';

export const APP_INFO = {
  name: 'Brain Board',
  author: 'Pablo Livian',
  version: 'v1.0.6',
  installerName: 'Brain-Board-Setup-1.0.6.exe',
  installerUrl: '#descarga',
  directDownloadFile:
    'https://github.com/PabloLivian/BrainBoard/releases/download/v1.0.6/Brain-Board-Setup-1.0.6.exe',
  size: '89.6 MB',
  os: 'Windows 10 / 11 (64-bit)',
  architecture: 'x64 Nativo',
  githubUrl: 'https://github.com/PabloLivian/BrainBoard',
};

// Rutas absolutas: la navegación también funciona desde la página de documentación
export const NAV_LINKS = [
  { id: 'inicio', label: 'Inicio', href: '/#inicio' },
  { id: 'funciones', label: 'Funciones', href: '/#funciones' },
  { id: 'documentacion', label: 'Documentación', href: '/documentacion' },
  { id: 'descarga', label: 'Descargar', href: '/#descarga' },
];

// Capturas de /public/assets/capturas/<id>-light.webp y <id>-dark.webp
// (se generan con scripts/web_screenshots/generate.js del repositorio de la app)
export const HERO_FEATURES = [
  {
    id: 'cerebro',
    shot: 'cerebro',
    icon: Brain,
    title: 'Pregunta a tus tableros',
    description:
      'El Cerebro IA conoce todo lo que has guardado: te resume lo de la semana, te escribe apuntes y te los propone antes de tocar nada.',
    docs: 'cerebro',
  },
  {
    id: 'enlaces',
    shot: 'enlaces',
    icon: Link2,
    title: 'Pega un enlace y listo',
    description:
      'Vídeos, repositorios y webs se convierten en tarjetas con miniatura y descripción. Puntúalos con estrellas y te avisa si ya lo tenías guardado.',
    docs: 'enlaces',
  },
  {
    id: 'frescura',
    shot: 'frescura',
    icon: History,
    title: 'Mapa de Frescura',
    description:
      'Cada elemento sabe cuándo lo guardaste. Un vistazo de color te dice qué apuntes siguen al día y cuáles conviene revisar.',
    docs: 'frescura',
  },
  {
    id: 'busqueda',
    shot: 'busqueda',
    icon: Search,
    title: 'Encuéntralo todo',
    description:
      'Busca a la vez en todos tus tableros, sin preocuparte de tildes ni mayúsculas, y salta directo al elemento.',
    docs: 'organizar',
  },
  {
    id: 'copias',
    shot: 'copias',
    icon: ShieldCheck,
    title: 'Tu trabajo, a salvo',
    description:
      'Guardado automático, una copia diaria de todos tus tableros y papelera de 30 días. Todo en tu propio ordenador.',
    docs: 'copias',
  },
  {
    id: 'carpetas',
    shot: 'carpetas',
    icon: FolderOpen,
    title: 'Tus carpetas, dentro del tablero',
    description:
      'Pega la ruta de una carpeta o un archivo del ordenador y ábrelo desde la pizarra, junto a tus referencias.',
    docs: 'enlaces',
  },
];

// Lo básico, en una sola línea bajo las funciones principales
export const BASICS = [
  'Pizarra infinita',
  'Local y offline',
  'Pestañas',
  'Modo claro y oscuro',
  'Plantillas',
  'Exportar a PNG / JPG',
  'Paquetes .rtb',
  'Actualizaciones automáticas',
];

export const CHANGELOG_LATEST = [
  'Busca en todos tus tableros a la vez (Ctrl+Shift+F) y salta a cualquier sección con el nuevo índice.',
  'El Cerebro IA te propone los cambios antes de tocar el tablero (Insertar, Descartar y Deshacer) y responde sobre lo que selecciones.',
  'Puntúa con estrellas tus enlaces, recibe un aviso si ya tenías guardado uno y abre carpetas de tu PC desde el tablero.',
  'Papelera de 30 días y una copia automática diaria de todos tus tableros.',
  'Mapa de Frescura configurable, alinear y distribuir, plantillas de Galería y Comparativa, y capas más intuitivas.',
  'Tablero de Ejemplo renovado: guía de todas las funciones y de cómo conseguir la clave gratis de Google Gemini.',
];
