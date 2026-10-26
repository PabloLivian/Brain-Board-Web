import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Download } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useRelease } from '../context/ReleaseContext';
import { BrainBoardLogo, WindowsLogo } from './icons/BrainBoardLogo';
import { APP_INFO, NAV_LINKS } from '../data/content';

export function Navbar({ page = 'home' }) {
  const { theme, toggleTheme } = useTheme();
  const release = useRelease();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(page === 'docs' ? 'documentacion' : 'inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detectar scroll para activar elevación y blur en la navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil automáticamente al pasar a escritorio
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ScrollSpy reactivo para resaltar la sección visible actual (solo en la portada)
  useEffect(() => {
    if (page !== 'home') return;
    const sectionElements = NAV_LINKS.map((item) =>
      document.getElementById(item.id)
    ).filter(Boolean);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-25% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [page]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 border-b border-[var(--border-subtle)] ${
        isScrolled
          ? 'bg-[var(--bg-surface)]/85 backdrop-blur-md shadow-[var(--shadow-sm)]'
          : 'bg-[var(--bg-surface)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Izquierda: Isotipo SVG + Logotipo tipográfico + Badge v1.0.3 */}
        <a
          href="/#inicio"
          className="flex items-center gap-2.5 text-[var(--text-main)] no-underline group shrink-0"
        >
          <span className="text-[var(--primary)] transition-transform duration-200 group-hover:scale-105">
            <BrainBoardLogo className="w-7 h-6" />
          </span>
          <span className="font-bold text-[17px] tracking-tight text-[var(--text-main)]">
            {APP_INFO.name}
          </span>
          <span className="badge-version">{release.version}</span>
        </a>

        {/* Centro: Enlaces de ancla suaves con estado activo reactivo */}
        <nav
          aria-label="Navegación principal"
          className="hidden lg:flex items-center gap-1"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-lg text-[14px] font-medium transition-all duration-150 no-underline ${
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

        {/* Derecha: Botón Toggle de Tema (38x38px) + Botón CTA Descargar */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            id="btn-theme-toggle"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
            }
            title={
              theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'
            }
            className="btn-theme-toggle"
          >
            {theme === 'dark' ? (
              <Sun className="w-[18px] h-[18px] text-[#fbbf24]" />
            ) : (
              <Moon className="w-[18px] h-[18px] text-[#64748b]" />
            )}
          </button>

          <a href="/#descarga" className="btn-primary !py-2 !px-4 !text-[14px]">
            <WindowsLogo className="w-3.5 h-3.5" />
            <span>Descargar</span>
          </a>
        </div>

        {/* Controles en Móvil: Toggle de Tema + Botón Menú */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
            }
            className="btn-theme-toggle"
          >
            {theme === 'dark' ? (
              <Sun className="w-[18px] h-[18px] text-[#fbbf24]" />
            ) : (
              <Moon className="w-[18px] h-[18px] text-[#64748b]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
            className="btn-theme-toggle"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[var(--text-main)]" />
            ) : (
              <Menu className="w-5 h-5 text-[var(--text-main)]" />
            )}
          </button>
        </div>
      </div>

      {/* Panel Desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--bg-elevated)] border-t border-[var(--border-subtle)] px-4 pt-3 pb-5 space-y-1.5 shadow-[var(--shadow-md)]">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium no-underline transition-colors ${
                  isActive
                    ? 'text-[var(--primary)] bg-[var(--badge-bg)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                )}
              </a>
            );
          })}

          <div className="pt-3 mt-2 border-t border-[var(--border-subtle)]">
            <a
              href="/#descarga"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full justify-center"
            >
              <Download className="w-4 h-4" />
              <span>Descargar para Windows ({release.version})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
