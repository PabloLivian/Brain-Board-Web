import { useState, useEffect, useCallback } from 'react';
import {
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Sun,
  Moon,
  Columns2,
} from 'lucide-react';
import { SCREENSHOT_ITEMS } from '../data/content';

export function ScreenshotsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dualViewMode, setDualViewMode] = useState('split'); // 'split' | 'dark' | 'light'
  const [lightboxImage, setLightboxImage] = useState(null);

  const currentItem = SCREENSHOT_ITEMS[activeIndex];
  const isDualSection = Boolean(currentItem.secondaryImageSrc);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === 0 ? SCREENSHOT_ITEMS.length - 1 : prev - 1
    );
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === SCREENSHOT_ITEMS.length - 1 ? 0 : prev + 1
    );
  }, []);

  // Atajos de teclado cuando el visor Lightbox está abierto
  useEffect(() => {
    if (!lightboxImage) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setLightboxImage(null);
      if (event.key === 'ArrowLeft') {
        setLightboxImage(null);
        handlePrev();
      }
      if (event.key === 'ArrowRight') {
        setLightboxImage(null);
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, handlePrev, handleNext]);

  const openCurrentInLightbox = () => {
    if (isDualSection && dualViewMode === 'light') {
      setLightboxImage({
        src: currentItem.secondaryImageSrc,
        title: `${currentItem.tabTitle} — Modo Claro`,
      });
    } else {
      setLightboxImage({
        src: currentItem.imageSrc,
        title: isDualSection
          ? `${currentItem.tabTitle} — Modo Oscuro`
          : currentItem.title,
      });
    }
  };

  return (
    <section
      id="capturas"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-subtle)]"
    >
      {/* Cabecera del Apartado de Capturas */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="badge-version mb-3">Galería del Programa</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-main)] tracking-tight">
          Capturas de pantalla de Brain Board
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)]">
          Conoce cada apartado del programa: desde el menú de inicio y la
          pizarra multitarea hasta la gestión de cientos de fotografías y los
          modos visual claro y oscuro.
        </p>
      </div>

      {/* Pestañas de las 4 Secciones */}
      <div
        role="tablist"
        aria-label="Secciones de capturas de Brain Board"
        className="flex flex-wrap items-center justify-center gap-2.5 mb-8"
      >
        {SCREENSHOT_ITEMS.map((item, idx) => {
          const IconComponent = item.icon;
          const isSelected = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveIndex(idx)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-sm font-semibold border transition-all duration-150 cursor-pointer ${
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

      {/* Ventana Principal de Captura (.app-mockup-window) */}
      <div className="app-mockup-window">
        {/* Barra Superior del Marco */}
        <div className="px-4 py-3 bg-[var(--bg-page)] border-b border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/80" />
            </div>
            <span className="text-xs font-semibold text-[var(--text-main)] pl-1">
              {currentItem.tabTitle}
            </span>
            <span className="hidden sm:inline-flex badge-version !text-[11px]">
              {currentItem.badge}
            </span>
          </div>

          {/* Controles de la Cuarta Sección (Modo Claro / Modo Oscuro / Ambos) + Botón Ampliar */}
          <div className="flex flex-wrap items-center gap-2">
            {isDualSection && (
              <div className="inline-flex items-center p-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-card)]">
                <button
                  type="button"
                  onClick={() => setDualViewMode('split')}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    dualViewMode === 'split'
                      ? 'bg-[var(--primary)] text-white'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <Columns2 className="w-3.5 h-3.5" />
                  <span>Ambos</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDualViewMode('dark')}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    dualViewMode === 'dark'
                      ? 'bg-[var(--primary)] text-white'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Modo Oscuro</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDualViewMode('light')}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    dualViewMode === 'light'
                      ? 'bg-[var(--primary)] text-white'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Modo Claro</span>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={openCurrentInLightbox}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-card)] transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span>Ampliar captura</span>
            </button>
          </div>
        </div>

        {/* Visor de Imagen(es) */}
        <div className="bg-[var(--bg-page)] p-3 sm:p-5">
          {!isDualSection ? (
            <div
              onClick={() =>
                setLightboxImage({
                  src: currentItem.imageSrc,
                  title: currentItem.title,
                })
              }
              className="group relative rounded-xl overflow-hidden border border-[var(--border-card)] cursor-zoom-in shadow-[var(--shadow-md)]"
              title="Haz clic para ver la captura a tamaño completo"
            >
              <img
                src={currentItem.imageSrc}
                alt={currentItem.title}
                className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.005]"
              />
            </div>
          ) : dualViewMode === 'split' ? (
            /* Cuarta sección: mostrando Modo_oscuro.png y Modo_claro.png lado a lado */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Tarjeta Modo Oscuro */}
              <div
                onClick={() =>
                  setLightboxImage({
                    src: currentItem.imageSrc,
                    title: 'Brain Board — Modo Oscuro',
                  })
                }
                className="group rounded-xl overflow-hidden border border-[var(--border-card)] bg-[var(--bg-surface)] cursor-zoom-in shadow-[var(--shadow-md)]"
                title="Haz clic para ampliar Modo Oscuro"
              >
                <div className="px-3.5 py-2 border-b border-[var(--border-subtle)] flex items-center justify-between text-xs font-semibold text-[var(--text-main)]">
                  <span className="inline-flex items-center gap-1.5">
                    <Moon className="w-3.5 h-3.5 text-[#818cf8]" />
                    Modo Oscuro
                  </span>
                  <span className="text-[11px] text-[var(--text-subtle)]">
                    Clic para ampliar
                  </span>
                </div>
                <img
                  src={currentItem.imageSrc}
                  alt="Brain Board en Modo Oscuro"
                  className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </div>

              {/* Tarjeta Modo Claro */}
              <div
                onClick={() =>
                  setLightboxImage({
                    src: currentItem.secondaryImageSrc,
                    title: 'Brain Board — Modo Claro',
                  })
                }
                className="group rounded-xl overflow-hidden border border-[var(--border-card)] bg-[var(--bg-surface)] cursor-zoom-in shadow-[var(--shadow-md)]"
                title="Haz clic para ampliar Modo Claro"
              >
                <div className="px-3.5 py-2 border-b border-[var(--border-subtle)] flex items-center justify-between text-xs font-semibold text-[var(--text-main)]">
                  <span className="inline-flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-[#fbbf24]" />
                    Modo Claro
                  </span>
                  <span className="text-[11px] text-[var(--text-subtle)]">
                    Clic para ampliar
                  </span>
                </div>
                <img
                  src={currentItem.secondaryImageSrc}
                  alt="Brain Board en Modo Claro"
                  className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </div>
            </div>
          ) : (
            /* Vista individual de Modo Oscuro o Modo Claro en la 4ª sección */
            <div
              onClick={openCurrentInLightbox}
              className="group relative rounded-xl overflow-hidden border border-[var(--border-card)] cursor-zoom-in shadow-[var(--shadow-md)]"
              title="Haz clic para ver la captura a tamaño completo"
            >
              <img
                src={
                  dualViewMode === 'light'
                    ? currentItem.secondaryImageSrc
                    : currentItem.imageSrc
                }
                alt={
                  dualViewMode === 'light'
                    ? 'Brain Board en Modo Claro'
                    : 'Brain Board en Modo Oscuro'
                }
                className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.005]"
              />
            </div>
          )}
        </div>

        {/* Panel Inferior Descriptivo + Navegación de Secciones */}
        <div className="p-6 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
                  Sección {activeIndex + 1} de {SCREENSHOT_ITEMS.length}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">
                {currentItem.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] mt-1.5 leading-relaxed">
                {currentItem.description}
              </p>

              {/* Puntos clave de la captura actual */}
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {currentItem.highlights.map((point) => (
                  <span
                    key={point}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-main)]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
                    {point}
                  </span>
                ))}
              </div>
            </div>

            {/* Controles Anterior / Siguiente */}
            <div className="flex items-center gap-2.5 self-end lg:self-center shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Sección anterior"
                className="btn-theme-toggle"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1.5 px-2">
                {SCREENSHOT_ITEMS.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Ir a sección ${idx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === activeIndex
                        ? 'w-6 bg-[var(--primary)]'
                        : 'w-2 bg-[var(--border-card)] hover:bg-[var(--text-subtle)]'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Siguiente sección"
                className="btn-theme-toggle"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Miniaturas de Acceso Rápido a las 4 Secciones */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SCREENSHOT_ITEMS.map((item, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-2.5 ${
                isSelected
                  ? 'bg-[var(--bg-card-hover)] border-[var(--primary)] shadow-[var(--shadow-sm)]'
                  : 'bg-[var(--bg-card)] border-[var(--border-card)] hover:bg-[var(--bg-card-hover)] opacity-80 hover:opacity-100'
              }`}
            >
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-page)]">
                {item.secondaryImageSrc ? (
                  <div className="grid grid-cols-2 h-full w-full">
                    <img
                      src={item.imageSrc}
                      alt="Modo oscuro"
                      className="w-full h-full object-cover object-left-top"
                    />
                    <img
                      src={item.secondaryImageSrc}
                      alt="Modo claro"
                      className="w-full h-full object-cover object-left-top border-l border-[var(--border-subtle)]"
                    />
                  </div>
                ) : (
                  <img
                    src={item.imageSrc}
                    alt={item.tabTitle}
                    className="w-full h-full object-cover object-top"
                  />
                )}
              </div>
              <div>
                <div className="text-xs font-bold text-[var(--text-main)]">
                  {item.tabTitle}
                </div>
                <div className="text-[11px] text-[var(--text-muted)] line-clamp-1 mt-0.5">
                  {item.badge}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Modal Lightbox a Pantalla Completa */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImage.title}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-6xl w-full bg-[var(--bg-elevated)] border border-[var(--border-card)] rounded-[18px] overflow-hidden shadow-[var(--shadow-lg)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
              <span className="font-semibold text-sm text-[var(--text-main)]">
                {lightboxImage.title}
              </span>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                aria-label="Cerrar vista ampliada"
                className="btn-theme-toggle !w-8 !h-8"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 sm:p-5 bg-[var(--bg-page)] max-h-[82vh] overflow-y-auto">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="w-full max-h-[76vh] object-contain mx-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
