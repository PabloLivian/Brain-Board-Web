import { useEffect, useState } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Captura del programa que sigue el tema de la web (modo claro / oscuro) y se amplía al pulsarla.
// crop: enseña el recorte de la zona importante (<id>-crop-<tema>.webp) y amplía la captura entera.
export function ThemedShot({ id, alt, crop = false, className = '' }) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const suffix = theme === 'light' ? 'light' : 'dark';
  const full = `/assets/capturas/${id}-${suffix}.webp`;
  const src = crop ? `/assets/capturas/${id}-crop-${suffix}.webp` : full;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative block w-full p-0 rounded-xl overflow-hidden border border-[var(--border-card)] bg-[var(--bg-page)] shadow-[var(--shadow-md)] cursor-zoom-in ${className}`}
        title="Ampliar captura"
      >
        <img
          src={src}
          alt={alt}
          width={crop ? 960 : 1440}
          height={crop ? 600 : 900}
          loading="lazy"
          className="block w-full h-auto"
        />
        <span className="absolute top-2.5 right-2.5 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--bg-surface)]/90 border border-[var(--border-card)] text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
          <Maximize2 className="w-4 h-4" />
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md cursor-zoom-out"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
            className="absolute top-4 right-4 btn-theme-toggle"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={full}
            alt={alt}
            className="max-w-full max-h-full rounded-xl border border-[var(--border-card)] shadow-[var(--shadow-lg)]"
          />
        </div>
      )}
    </>
  );
}
