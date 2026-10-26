import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { HERO_FEATURES, BASICS } from '../data/content';
import { ThemedShot } from './ThemedShot';

export function HeroFeatures() {
  return (
    <section
      id="funciones"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-subtle)] scroll-mt-16"
    >
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="badge-version mb-3">Funciones</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-main)] tracking-tight">
          Más que una pizarra
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)]">
          Guarda tus referencias y apuntes, y vuelve a encontrarlos cuando los
          necesites.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {HERO_FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <article
              key={feature.id}
              className="flex flex-col rounded-[var(--radius-xl)] bg-[var(--bg-surface)] border border-[var(--border-card)] p-3 sm:p-4 shadow-[var(--shadow-sm)]"
            >
              <ThemedShot id={feature.shot} alt={feature.title} crop />
              <div className="px-2 pt-5 pb-2 flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2.5">
                  <span className="feature-card-icon !w-9 !h-9 !mb-0">
                    <Icon className="w-[18px] h-[18px]" />
                  </span>
                  <h3 className="feature-card-title">{feature.title}</h3>
                </div>
                <p className="feature-card-desc">{feature.description}</p>
                <a
                  href={`/documentacion#${feature.docs}`}
                  className="mt-auto pt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)] no-underline hover:underline"
                >
                  Cómo funciona
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Lo básico, en una línea */}
      <div className="mt-12 flex flex-col items-center gap-4 text-center">
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 m-0 p-0 list-none">
          {BASICS.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)]"
            >
              <CheckCircle2 className="w-4 h-4 text-[var(--primary)] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <a
          href="/documentacion"
          className="btn-secondary !text-sm"
        >
          Ver todas las funciones en la documentación
          <ArrowRight className="w-4 h-4 text-[var(--primary)]" />
        </a>
      </div>
    </section>
  );
}
