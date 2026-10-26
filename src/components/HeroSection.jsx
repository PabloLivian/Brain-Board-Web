import { Eye, CheckCircle2 } from 'lucide-react';
import { WindowsLogo } from './icons/BrainBoardLogo';
import { AppMockup } from './AppMockup';
import { useRelease } from '../context/ReleaseContext';
import { APP_INFO } from '../data/content';

export function HeroSection() {
  const release = useRelease();

  return (
    <section
      id="inicio"
      className="relative pt-14 pb-20 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Resplandor ambiental superior sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[680px] h-[320px] rounded-full opacity-25 blur-[110px]"
        style={{
          background:
            'radial-gradient(circle, var(--primary) 0%, rgba(99, 102, 241, 0.2) 60%, transparent 100%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Badge superior */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)] text-xs sm:text-[13px] font-semibold mb-6">
          <span>⚡ 100% Local • Offline • Sin Nube Obligatoria</span>
        </div>

        {/* Título H1 con gradiente sutil en modo oscuro */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] max-w-4xl mx-auto text-[var(--text-main)]">
          Tu pizarra infinita local.{' '}
          <span className="bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
            Rápida, privada y sin límites.
          </span>
        </h1>

        {/* Subtítulo explicativo de valor */}
        <p className="mt-5 text-base sm:text-lg lg:text-xl text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed">
          Una herramienta local para organizar tus ideas, notas
          y referencias visuales.
        </p>

        {/* Botones de Acción (CTAs) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href="/#descarga"
            className="btn-primary w-full sm:w-auto !px-6 !py-3.5 !text-[15px]"
          >
            <WindowsLogo className="w-4 h-4 shrink-0" />
            <span>Descargar Brain Board para Windows (64-bit)</span>
            <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-white/20 text-white font-medium">
              {release.version}
            </span>
          </a>

          <a
            href="/#funciones"
            className="btn-secondary w-full sm:w-auto !px-6 !py-3.5 !text-[15px]"
          >
            <Eye className="w-4 h-4 text-[var(--primary)]" />
            <span>Ver qué puede hacer</span>
          </a>
        </div>

        {/* Metadatos rápidos bajo el botón de descarga */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[var(--text-subtle)]">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
            Instalador directo ({release.size})
          </span>
          <span>•</span>
          <span>{APP_INFO.os}</span>
          <span>•</span>
          <span>Sin registro ni suscripciones</span>
        </div>

        {/* Maqueta interactiva de la app, fiel a su interfaz */}
        <div className="mt-12 sm:mt-14">
          <AppMockup />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-left text-xs text-[var(--text-subtle)]">
            <span>
              Pruébala: cambia de pestaña, puntúa las tarjetas con las
              estrellas o despliega la carpeta.
            </span>
            <a
              href="/documentacion"
              className="text-[var(--primary)] font-semibold hover:underline no-underline"
            >
              Leer la documentación →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
