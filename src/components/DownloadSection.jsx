import { useState } from 'react';
import {
  Download,
  CheckCircle2,
  Monitor,
  WifiOff,
  HardDrive,
  FileCode2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { WindowsLogo, BrainBoardLogo } from './icons/BrainBoardLogo';
import { useRelease } from '../context/ReleaseContext';
import { APP_INFO } from '../data/content';

export function DownloadSection() {
  const release = useRelease();
  const [downloadStarted, setDownloadStarted] = useState(false);

  const handleDownloadClick = () => {
    setDownloadStarted(true);
    setTimeout(() => {
      setDownloadStarted(false);
    }, 6000);
  };

  return (
    <section
      id="descarga"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[var(--border-subtle)]"
    >
      {/* Caja Central Destacada de Descarga */}
      <div className="relative rounded-[18px] bg-[var(--bg-surface)] border border-[var(--border-card)] p-6 sm:p-12 shadow-[var(--shadow-lg)] overflow-hidden">
        {/* Glow decorativo de fondo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -bottom-20 w-72 h-72 rounded-full opacity-20 blur-[90px]"
          style={{ background: 'var(--primary)' }}
        />

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--primary)] mb-5">
            <BrainBoardLogo className="w-8 h-7" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="badge-version">Versión Estable {release.version}</span>
            <span className="badge-version">Windows 64-bit</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] tracking-tight">
            Descarga Brain Board para Windows
          </h2>

          <p className="mt-3 text-base text-[var(--text-muted)]">
            Instalador oficial listo para ejecutar en modo 100% local. Una vez
            descargado, no requiere conexión a Internet ni cuentas en la nube.
          </p>

          {/* Botón Principal de Descarga del Instalador .exe */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href={release.downloadUrl}
              download={release.installerName}
              onClick={handleDownloadClick}
              className="btn-primary w-full sm:w-auto !px-8 !py-4 !text-base"
            >
              <WindowsLogo className="w-5 h-5 shrink-0" />
              <span>Descargar {release.installerName}</span>
              <Download className="w-4 h-4 ml-1" />
            </a>

            {downloadStarted && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#22c55e] text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  Iniciando descarga de <strong>{release.installerName}</strong>{' '}
                  ({release.size})...
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Requisitos del Sistema */}
        <div className="mt-10 pt-8 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-card)] flex items-start gap-3">
            <Monitor className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[var(--text-main)]">
                Sistema Operativo
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-0.5">
                {APP_INFO.os} ({APP_INFO.architecture})
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-card)] flex items-start gap-3">
            <WifiOff className="w-5 h-5 text-[#22c55e] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[var(--text-main)]">
                Funcionamiento Offline
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-0.5">
                Sin conexión a Internet tras la descarga
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-card)] flex items-start gap-3">
            <HardDrive className="w-5 h-5 text-[#818cf8] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[var(--text-main)]">
                Instalador Ligero
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-0.5">
                Tamaño aproximado: {release.size}
              </div>
            </div>
          </div>
        </div>

        {/* Notas de Versión (Changelog dinámico) */}
        <div className="mt-6 p-5 rounded-xl bg-[var(--bg-page)] border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-main)]">
              <FileCode2 className="w-4 h-4 text-[var(--primary)]" />
              <span>Notas de la versión {release.version} (Changelog)</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={release.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-[var(--text-subtle)] hover:text-[var(--primary)] transition-colors no-underline"
              >
                <span>Ver en GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="inline-flex items-center gap-1 text-[11px] text-[var(--primary)] font-medium">
                <Sparkles className="w-3 h-3" />
                Última versión
              </span>
            </div>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 m-0 p-0 list-none">
            {release.changelog.map((note, index) => (
              <li
                key={`${note}-${index}`}
                className="flex items-start gap-2 text-xs text-[var(--text-muted)] leading-relaxed"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary)] shrink-0 mt-0.5" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
