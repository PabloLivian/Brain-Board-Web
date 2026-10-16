import { ArrowRight, FileArchive, HardDrive, Lock } from 'lucide-react';
import { FEATURES_LIST } from '../data/content';

export function FeaturesGrid() {
  return (
    <>
      {/* Sección de Características (Feature Grid de 3 columnas) */}
      <section
        id="caracteristicas"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-subtle)]"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="badge-version mb-3">Ingeniería Visual</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-main)] tracking-tight">
            Diseñado para velocidad, privacidad y control total
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)]">
            Todo lo que necesitas de una pizarra infinita moderna, ejecutándose
            nativamente en tu escritorio sin cuotas mensuales ni límites de
            tableros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_LIST.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <article key={feature.id} className="feature-card">
                <div className="flex items-center justify-between">
                  <div className="feature-card-icon">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="badge-version !text-[11px]">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="feature-card-title">{feature.title}</h3>
                <p className="feature-card-desc">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Bloque Destacado: Copias de Seguridad RTB y Privacidad Offline */}
      <section
        id="compatibilidad"
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="rounded-[18px] bg-[var(--bg-surface)] border border-[var(--border-card)] p-6 sm:p-10 shadow-[var(--shadow-md)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="badge-version">Copias de Seguridad .RTB</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] tracking-tight">
                Tus copias de seguridad (.rtb), siempre listas y editables en
                local
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                Brain Board lee y genera paquetes de copia de seguridad{' '}
                <code className="px-1.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--primary)] font-mono text-xs">
                  .rtb
                </code>{' '}
                de forma directa. Conserva la estructura de tus tableros,
                colores de notas adhesivas, conectores y fotografías de alta
                resolución sin subir un solo byte a Internet.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm text-[var(--text-main)] font-medium">
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-card)]">
                  <FileArchive className="w-4 h-4 text-[var(--primary)]" />
                  Importación y exportación .RTB
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-card)]">
                  <HardDrive className="w-4 h-4 text-[#22c55e]" />
                  Guardado en JSON + IndexedDB
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-card)]">
                  <Lock className="w-4 h-4 text-[#818cf8]" />
                  Cero telemetría externa
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-5 rounded-2xl bg-[var(--bg-page)] border border-[var(--border-card)] space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-card)]">
                  <div>
                    <div className="text-xs font-bold text-[var(--text-main)]">
                      backup-arquitectura.rtb
                    </div>
                    <div className="text-[11px] text-[var(--text-subtle)]">
                      Copia de seguridad local • 42.8 MB
                    </div>
                  </div>
                  <span className="badge-version">Entrada</span>
                </div>

                <div className="flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-[var(--badge-bg)] text-[var(--primary)] flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--bg-card)] border-2 border-[var(--primary)]">
                  <div>
                    <div className="text-xs font-bold text-[var(--text-main)]">
                      Pizarra Local Brain Board
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">
                      Notas, imágenes HD y conectores listos para editar
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#22c55e]/15 text-[#22c55e]">
                    Offline
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
