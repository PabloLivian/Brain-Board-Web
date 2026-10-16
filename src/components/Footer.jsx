import { Sun, Moon, Download, Scale, UserCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { BrainBoardLogo } from './icons/BrainBoardLogo';
import { APP_INFO, NAV_LINKS } from '../data/content';

export function Footer() {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Fila Principal: Marca, Enlaces y Acciones */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Izquierda: Logotipo reducido y descripción */}
          <div className="space-y-2">
            <a
              href="#inicio"
              className="inline-flex items-center gap-2 text-[var(--text-main)] no-underline"
            >
              <BrainBoardLogo className="w-6 h-5 text-[var(--primary)]" />
              <span className="font-bold text-base tracking-tight">
                {APP_INFO.name}
              </span>
              <span className="badge-version">{APP_INFO.version}</span>
            </a>
            <p className="text-xs text-[var(--text-subtle)] max-w-md m-0">
              Pizarra infinita de escritorio 100% local, privada y con sistema
              integrado de copias de seguridad (.rtb).
            </p>
          </div>

          {/* Centro: Enlaces rápidos */}
          <div className="flex flex-wrap items-center gap-5 text-xs font-medium">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-[var(--text-muted)] hover:text-[var(--text-main)] no-underline transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Derecha: Selector rápido de tema y descarga */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleTheme}
              className="btn-secondary !py-1.5 !px-3 !text-xs"
              aria-label="Alternar tema visual"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span>Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#64748b]" />
                  <span>Modo Oscuro</span>
                </>
              )}
            </button>

            <a
              href="#descarga"
              className="btn-primary !py-1.5 !px-3.5 !text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar {APP_INFO.version}</span>
            </a>
          </div>
        </div>

        {/* Bloque de Autoría (Pablo Livian) y Licencia MIT */}
        <div className="mt-8 pt-8 border-t border-[var(--border-subtle)] grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tarjeta de Autoría */}
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-card)] flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-[var(--badge-bg)] text-[var(--primary)] flex items-center justify-center shrink-0 mt-0.5">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)] m-0">
                Autoría y Desarrollo
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed m-0">
                Tanto esta página web como la aplicación de escritorio{' '}
                <strong className="text-[var(--text-main)] font-semibold">
                  {APP_INFO.name}
                </strong>{' '}
                han sido íntegramente diseñadas y creadas por{' '}
                <strong className="text-[var(--primary)] font-semibold">
                  Pablo Livian
                </strong>
                .
              </p>
            </div>
          </div>

          {/* Tarjeta de Licencia MIT */}
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-card)] flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-[var(--badge-bg)] text-[var(--primary)] flex items-center justify-center shrink-0 mt-0.5">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)] m-0">
                  Licencia MIT
                </h3>
                <span className="badge-version !text-[10px] !py-0.5 !px-2">
                  Open Source
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed m-0">
                Distribuido bajo la{' '}
                <strong className="text-[var(--text-main)] font-semibold">
                  Licencia MIT
                </strong>
                . Se concede permiso de forma gratuita para usar, copiar,
                modificar y distribuir este software sin restricciones,
                manteniendo siempre el aviso de copyright y autoría original de{' '}
                <strong className="text-[var(--text-main)] font-semibold">
                  Pablo Livian
                </strong>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Línea final de copyright */}
        <div className="mt-6 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-subtle)]">
          <span>
            © {new Date().getFullYear()} {APP_INFO.name} — Creado por{' '}
            <strong className="text-[var(--text-main)] font-semibold">
              Pablo Livian
            </strong>{' '}
            bajo Licencia MIT.
          </span>
          <span>
            Diseñado para Windows 10/11 (64-bit) • Privacidad 100% Offline
          </span>
        </div>
      </div>
    </footer>
  );
}
