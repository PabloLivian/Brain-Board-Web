import { useState } from 'react';
import {
  Eye,
  CheckCircle2,
  MousePointer,
  StickyNote,
  Image as ImageIcon,
  GitBranch,
  ZoomIn,
  HardDrive,
} from 'lucide-react';
import { WindowsLogo, BrainBoardLogo } from './icons/BrainBoardLogo';
import { useRelease } from '../context/ReleaseContext';
import { APP_INFO } from '../data/content';

const HERO_TABS = ['Inicio', 'Recursos', 'DEV / AI'];

export function HeroSection() {
  const release = useRelease();
  const [activeMockupTab, setActiveMockupTab] = useState('DEV / AI');

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
            href="#descarga"
            className="btn-primary w-full sm:w-auto !px-6 !py-3.5 !text-[15px]"
          >
            <WindowsLogo className="w-4 h-4 shrink-0" />
            <span>Descargar Brain Board para Windows (64-bit)</span>
            <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-white/20 text-white font-medium">
              {release.version}
            </span>
          </a>

          <a
            href="#capturas"
            className="btn-secondary w-full sm:w-auto !px-6 !py-3.5 !text-[15px]"
          >
            <Eye className="w-4 h-4 text-[var(--primary)]" />
            <span>Ver Capturas del Programa</span>
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

        {/* Mockup de la Aplicación (Visual Showcase interactivo) */}
        <div className="mt-12 sm:mt-14 text-left">
          <div className="app-mockup-window">
            {/* Barra de pestañas horizontal idéntica a Brain Board */}
            <div className="app-mockup-tabs justify-between select-none">
              <div className="flex items-center gap-2 overflow-x-auto">
                {/* Controles sutiles e icono de app */}
                <div className="flex items-center gap-1.5 pr-2 pb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/80" />
                </div>

                {HERO_TABS.map((tabName) => {
                  const isActive = activeMockupTab === tabName;
                  return (
                    <button
                      key={tabName}
                      type="button"
                      onClick={() => setActiveMockupTab(tabName)}
                      className={`px-4 py-2 text-xs font-semibold rounded-t-lg border-t border-x transition-colors cursor-pointer ${isActive
                          ? 'bg-[var(--bg-surface)] text-[var(--text-main)] border-[var(--border-card)]'
                          : 'bg-transparent text-[var(--text-subtle)] border-transparent hover:text-[var(--text-muted)]'
                        }`}
                    >
                      {tabName}
                    </button>
                  );
                })}
              </div>

              <div className="hidden sm:flex items-center gap-3 pb-2 pr-2 text-[11px] text-[var(--text-subtle)]">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                  <HardDrive className="w-3 h-3 text-[#22c55e]" />
                  Auto-guardado local activo
                </span>
                <span className="px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] font-mono">
                  Zoom: 100%
                </span>
              </div>
            </div>

            {/* Canvas central mostrando notas adhesivas, tarjetas y conectores */}
            <div className="app-mockup-canvas p-5 sm:p-8 flex flex-col justify-between overflow-hidden">
              {/* Barra de herramientas flotante izquierda */}
              <div className="relative z-10 flex flex-col lg:flex-row items-start gap-6">
                <div className="flex lg:flex-col items-center gap-1.5 p-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-card)] shadow-[var(--shadow-md)]">
                  <div
                    className="p-2 rounded-lg bg-[var(--primary)] text-white"
                    title="Seleccionar (V)"
                  >
                    <MousePointer className="w-4 h-4" />
                  </div>
                  <div
                    className="p-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)]"
                    title="Nota Adhesiva (N)"
                  >
                    <StickyNote className="w-4 h-4" />
                  </div>
                  <div
                    className="p-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)]"
                    title="Imagen de Alta Resolución"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div
                    className="p-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)]"
                    title="Conector (L)"
                  >
                    <GitBranch className="w-4 h-4" />
                  </div>
                  <div
                    className="p-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)]"
                    title="Zoom"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                {/* Elementos del lienzo infinito */}
                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-5 items-center relative">
                  {/* Columna 1: Notas adhesivas con colores suaves */}
                  <div className="space-y-4">
                    {/* Nota Amarilla */}
                    <div className="p-4 rounded-lg bg-[#fef08a] text-[#1e293b] shadow-md border border-[#fde047] transform -rotate-1 transition-transform hover:rotate-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#854d0e] mb-1">
                        Arquitectura Core • {activeMockupTab}
                      </div>
                      <p className="text-xs font-semibold leading-snug">
                        Motor Canvas 2D desacoplado con persistencia directa en
                        IndexedDB + JSON local.
                      </p>
                    </div>

                    {/* Nota Menta */}
                    <div className="p-4 rounded-lg bg-[#bbf7d0] text-[#14532d] shadow-md border border-[#86efac] transform rotate-1 transition-transform hover:rotate-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#166534] mb-1">
                        Copias de Seguridad
                      </div>
                      <p className="text-xs font-semibold leading-snug">
                        Creación y restauración instantánea de copias de
                        seguridad con imágenes originales sin usar la nube.
                      </p>
                    </div>
                  </div>

                  {/* Columna 2: Nodo Central de Arquitectura Visual */}
                  <div className="p-5 rounded-xl bg-[var(--bg-card)] border-2 border-[var(--primary)] shadow-[var(--shadow-lg)] relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="badge-version">Nodo Principal</span>
                      <BrainBoardLogo className="w-5 h-5 text-[var(--primary)]" />
                    </div>
                    <h3 className="text-sm font-bold text-[var(--text-main)]">
                      Espacio de Trabajo: {activeMockupTab}
                    </h3>
                    <p className="mt-1.5 text-xs text-[var(--text-muted)] leading-relaxed">
                      Sincronización en tiempo real con el sistema de archivos de
                      Windows. Cero latencia de red.
                    </p>
                    <div className="mt-3 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-subtle)]">
                      <span>248 elementos activos</span>
                      <span className="text-[#22c55e] font-semibold">
                        60 FPS
                      </span>
                    </div>
                  </div>

                  {/* Columna 3: Nota Azul Pastel + Tarjeta de Referencia Visual */}
                  <div className="space-y-4">
                    {/* Nota Azul Pastel */}
                    <div className="p-4 rounded-lg bg-[#bfdbfe] text-[#1e3a8a] shadow-md border border-[#93c5fd] transform rotate-1 transition-transform hover:rotate-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#1d4ed8] mb-1">
                        Privacidad 100%
                      </div>
                      <p className="text-xs font-semibold leading-snug">
                        Tus diagramas e ideas confidenciales nunca abandonan tu
                        ordenador.
                      </p>
                    </div>

                    {/* Tarjeta de Imagen / Referencia */}
                    <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-card)] shadow-[var(--shadow-sm)]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-[var(--badge-bg)] text-[var(--primary)] flex items-center justify-center shrink-0">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[var(--text-main)]">
                            diagrama-sistema-v2.png
                          </div>
                          <div className="text-[11px] text-[var(--text-subtle)]">
                            3840 × 2160 px • Incrustada en .RTB
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Barra inferior del lienzo mockup */}
              <div className="mt-6 pt-3 border-t border-[var(--border-subtle)]/70 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-subtle)]">
                <span>
                  Haz clic en las pestañas superiores (<strong>Inicio</strong>,{' '}
                  <strong>Recursos</strong>, <strong>DEV / AI</strong>) para
                  probar la barra del programa.
                </span>
                <a
                  href="#capturas"
                  className="text-[var(--primary)] font-semibold hover:underline no-underline"
                >
                  Ver todas las capturas de pantalla →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
