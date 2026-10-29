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
  version: 'v1.0.7',
  installerName: 'Brain-Board-Setup-1.0.7.exe',
  installerUrl: '#descarga',
  directDownloadFile:
    'https://github.com/PabloLivian/BrainBoard/releases/download/v1.0.7/Brain-Board-Setup-1.0.7.exe',
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
  'Nueva plantilla Recursos: ordena enlaces, vídeos e imágenes por fecha o por estrellas, y une una imagen a cada enlace para que vayan juntos.',
  'Contenedores más listos: el título se ajusta al tamaño, la etiqueta enseña el título y el índice de secciones muestra los marcos anidados en árbol.',
  'Nuevo texto desplegable (spoiler) que se abre con un clic y se copia con un botón.',
  'La pluma vuelve a funcionar, ahora con grosor y color a elegir entre tus favoritos.',
  'Los colores que eliges se ven igual en el tema oscuro y en el claro, con la nueva opción Sin color para quitar el relleno.',
  'Barra de herramientas reordenada y nueva plantilla Título para índice.',
];
