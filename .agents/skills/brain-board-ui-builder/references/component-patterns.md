# Patrones de Componentes — Brain Board Web (React + JS + Tailwind)

Este archivo contiene las implementaciones de referencia para los componentes críticos de **Brain Board Web**, garantizando el cumplimiento estricto de `GUIA_DISENO_WEB.md` y `agent.md`.

---

## 1. Proveedor de Tema Reactivo (`src/context/ThemeContext.jsx`)

Respeta el Modo Oscuro como predeterminado y persiste en `localStorage` bajo `brainboard_theme`:

```jsx
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('brainboard_theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    localStorage.setItem('brainboard_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

---

## 2. Navbar Reactiva con ScrollSpy y Menú Móvil (`src/components/Navbar.jsx`)

```jsx
import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Download } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { BrainBoardLogo } from './icons/BrainBoardLogo';

const NAV_LINKS = [
  { id: 'inicio', label: 'Inicio', href: '#inicio' },
  { id: 'capturas', label: 'Capturas', href: '#capturas' },
  { id: 'caracteristicas', label: 'Características', href: '#caracteristicas' },
  { id: 'descarga', label: 'Requisitos y Descarga', href: '#descarga' },
];

export function Navbar({ version = 'v1.0.3', downloadUrl = '#descarga' }) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detectar scroll para aplicar elevación y blur reactivo
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ScrollSpy reactivo mediante IntersectionObserver
  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[var(--bg-surface)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-[var(--shadow-sm)]'
          : 'bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Izquierda: Isotipo + Nombre + Badge de versión */}
        <a href="#inicio" className="flex items-center gap-2.5 text-[var(--text-main)] no-underline group">
          <span className="text-[var(--primary)] transition-transform duration-200 group-hover:scale-105">
            <BrainBoardLogo className="w-7 h-6" />
          </span>
          <span className="font-bold text-lg tracking-tight">Brain Board</span>
          <span className="badge-version">{version}</span>
        </a>

        {/* Centro: Enlaces con indicador reactivo de sección activa */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'text-[var(--primary)] bg-[var(--badge-bg)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Derecha: Toggle de Tema + Botón CTA Descargar */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="btn-theme-toggle"
            title={theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#fbbf24]" />
            ) : (
              <Moon className="w-4 h-4 text-[#64748b]" />
            )}
          </button>

          <a href={downloadUrl} className="btn-primary">
            <Download className="w-4 h-4" />
            <span>Descargar</span>
          </a>
        </div>

        {/* Controles Móviles */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="btn-theme-toggle"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#fbbf24]" />
            ) : (
              <Moon className="w-4 h-4 text-[#64748b]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Abrir menú de navegación"
            className="btn-theme-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] px-4 pt-2 pb-4 space-y-2">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'text-[var(--primary)] bg-[var(--badge-bg)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-2">
            <a
              href={downloadUrl}
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full justify-center"
            >
              <Download className="w-4 h-4" />
              <span>Descargar para Windows</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
```

---

## 3. Apartado de Capturas de Pantalla (`src/components/ScreenshotsSection.jsx`)

Incluye pestañas reactivas, marco de ventana estilo Brain Board (`.app-mockup-window`), fallback visual si el archivo de imagen aún no existe en `public/screenshots/` y modal Lightbox con navegación por teclado:

```jsx
import { useState, useEffect } from 'react';
import { Maximize2, ChevronLeft, ChevronRight, X, Layers, FolderKanban, FileArchive, Sparkles } from 'lucide-react';

const SCREENSHOTS_DATA = [
  {
    id: 'canvas',
    tabTitle: 'Pizarra Infinita',
    windowTab: 'DEV / AI',
    title: 'Lienzo infinito con notas adhesivas, conectores y referencias visuales',
    description:
      'Organiza miles de notas con colores suaves y vibrantes, imágenes en alta resolución y flechas de conexión fluidas a 60 FPS.',
    imageSrc: '/screenshots/canvas-board.png',
    icon: Layers,
  },
  {
    id: 'home-dashboard',
    tabTitle: 'Gestión de Tableros',
    windowTab: 'Inicio',
    title: 'Panel de inicio con categorización inteligente y búsqueda instantánea',
    description:
      'Clasifica tus proyectos por espacios de trabajo, filtra tableros al instante y alterna entre múltiples pestañas abiertas sin salir de la aplicación.',
    imageSrc: '/screenshots/dashboard-home.png',
    icon: FolderKanban,
  },
  {
    id: 'rtb-import',
    tabTitle: 'Copias de Seguridad .RTB',
    windowTab: 'Recursos',
    title: 'Importación y exportación nativa de copias de seguridad (.rtb)',
    description:
      'Abre y genera archivos de respaldo .rtb directamente desde tu disco local conservando la posición exacta de tus notas, textos e imágenes incrustadas.',
    imageSrc: '/screenshots/rtb-import.png',
    icon: FileArchive,
  },
  {
    id: 'dual-theme',
    tabTitle: 'Modo Oscuro / Claro',
    windowTab: 'DEV / AI',
    title: 'Diseño nativo en Modo Oscuro y Modo Claro para sesiones prolongadas',
    description:
      'Alterna en un clic entre una interfaz oscura de alto contraste profesional y un modo claro limpio adaptable a cualquier entorno de iluminación.',
    imageSrc: '/screenshots/dual-theme.png',
    icon: Sparkles,
  },
];

export function ScreenshotsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [failedImages, setFailedImages] = useState({});

  const currentItem = SCREENSHOTS_DATA[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? SCREENSHOTS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === SCREENSHOTS_DATA.length - 1 ? 0 : prev + 1));
  };

  // Soporte de teclado en el Lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <section id="capturas" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Encabezado de Sección */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="badge-version mb-3">Interfaz de Escritorio</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-main)] tracking-tight">
          Explora Brain Board por dentro
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)]">
          Una experiencia de escritorio cuidada al detalle, sin menús sobrecargados y diseñada para que tus ideas fluyan sin fricción.
        </p>
      </div>

      {/* Selector Reactivo de Pestañas */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {SCREENSHOTS_DATA.map((item, idx) => {
          const IconComponent = item.icon;
          const isSelected = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-sm font-medium border transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-[var(--primary)] text-white border-transparent shadow-[var(--shadow-sm)]'
                  : 'bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border-card)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)]'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{item.tabTitle}</span>
            </button>
          );
        })}
      </div>

      {/* Marco de Ventana Principal (.app-mockup-window) */}
      <div className="app-mockup-window">
        {/* Barra Superior de Pestañas Estilo Brain Board */}
        <div className="app-mockup-tabs justify-between">
          <div className="flex items-end gap-1.5">
            {['Inicio', 'Recursos', 'DEV / AI'].map((tabName) => {
              const isTabActive = currentItem.windowTab === tabName;
              return (
                <div
                  key={tabName}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-t-lg border-t border-x transition-colors ${
                    isTabActive
                      ? 'bg-[var(--bg-surface)] text-[var(--text-main)] border-[var(--border-card)]'
                      : 'bg-transparent text-[var(--text-subtle)] border-transparent'
                  }`}
                >
                  {tabName}
                </div>
              );
            })}
          </div>

          <div className="pb-1.5 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-card)] border border-[var(--border-card)] cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Ampliar captura</span>
            </button>
          </div>
        </div>

        {/* Visor de Captura o Fallback de Alta Fidelidad */}
        <div
          onClick={() => setLightboxOpen(true)}
          className="relative group cursor-zoom-in overflow-hidden bg-[var(--bg-page)]"
        >
          {!failedImages[currentItem.id] ? (
            <img
              src={currentItem.imageSrc}
              alt={currentItem.title}
              onError={() =>
                setFailedImages((prev) => ({ ...prev, [currentItem.id]: true }))
              }
              className="w-full h-[380px] sm:h-[480px] object-cover object-top transition-transform duration-300 group-hover:scale-[1.01]"
            />
          ) : (
            <div className="app-mockup-canvas flex items-center justify-center p-6">
              <p className="text-sm text-[var(--text-muted)]">
                Vista interactiva de {currentItem.tabTitle} ({currentItem.imageSrc})
              </p>
            </div>
          )}
        </div>

        {/* Pie Descriptivo con Controles Anterior / Siguiente */}
        <div className="p-5 sm:p-6 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-main)]">
              {currentItem.title}
            </h3>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              {currentItem.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Captura anterior"
              className="btn-theme-toggle"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-medium text-[var(--text-subtle)] px-2">
              {activeIndex + 1} / {SCREENSHOTS_DATA.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Siguiente captura"
              className="btn-theme-toggle"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Lightbox a Pantalla Completa */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-[var(--bg-elevated)] border border-[var(--border-card)] rounded-[18px] overflow-hidden shadow-[var(--shadow-lg)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-subtle)]">
              <span className="font-semibold text-sm text-[var(--text-main)]">
                {currentItem.tabTitle} — {currentItem.title}
              </span>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Cerrar vista ampliada"
                className="btn-theme-toggle"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-[var(--bg-page)]">
              <img
                src={currentItem.imageSrc}
                alt={currentItem.title}
                className="w-full max-h-[75vh] object-contain mx-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
```
