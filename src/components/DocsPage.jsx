import { useEffect, useState } from 'react';
import { Info, TriangleAlert, ArrowRight } from 'lucide-react';
import { DOCS_SECTIONS } from '../data/docs';
import { ThemedShot } from './ThemedShot';
import { RichText } from './RichText';

function Block({ block }) {
  switch (block.type) {
    case 'p':
      return (
        <p className="text-[15px] text-[var(--text-muted)] leading-relaxed m-0">
          <RichText text={block.text} />
        </p>
      );
    case 'h3':
      return (
        <h3 id={block.id} className="text-lg font-bold text-[var(--text-main)] mt-4 m-0 scroll-mt-24">
          {block.text}
        </h3>
      );
    case 'list':
      return (
        <ul className="m-0 pl-5 space-y-2 text-[15px] text-[var(--text-muted)] leading-relaxed list-disc marker:text-[var(--primary)]">
          {block.items.map((item) => (
            <li key={item}><RichText text={item} /></li>
          ))}
        </ul>
      );
    case 'steps':
      return (
        <ol className="m-0 p-0 space-y-2 list-none">
          {block.items.map((item, i) => (
            <li key={item} className="flex items-start gap-3 text-[15px] text-[var(--text-muted)] leading-relaxed">
              <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)] text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span><RichText text={item} /></span>
            </li>
          ))}
        </ol>
      );
    case 'shot':
      return (
        <figure className="m-0 my-2">
          <ThemedShot id={block.id} alt={block.caption} />
          <figcaption className="mt-2 text-xs text-[var(--text-subtle)] text-center">
            {block.caption}
          </figcaption>
        </figure>
      );
    case 'note': {
      const warn = block.tone === 'warn';
      const Icon = warn ? TriangleAlert : Info;
      return (
        <div
          className={`flex items-start gap-3 p-4 rounded-xl border text-sm leading-relaxed ${
            warn
              ? 'bg-[#f59e0b]/10 border-[#f59e0b]/35 text-[var(--text-main)]'
              : 'bg-[var(--badge-bg)] border-[var(--badge-border)] text-[var(--text-main)]'
          }`}
        >
          <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${warn ? 'text-[#f59e0b]' : 'text-[var(--primary)]'}`} />
          <span><RichText text={block.text} /></span>
        </div>
      );
    }
    case 'table':
      return (
        <div className="overflow-x-auto rounded-xl border border-[var(--border-card)]">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg-card)]">
                {block.head.map((h) => (
                  <th key={h} className="text-left font-semibold text-[var(--text-main)] px-4 py-2.5 border-b border-[var(--border-card)]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join('|')} className="border-b border-[var(--border-subtle)] last:border-b-0">
                  {row.map((cell, i) => (
                    <td key={i} className="px-4 py-2.5 text-[var(--text-muted)] align-top">
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export function DocsPage() {
  const [active, setActive] = useState(DOCS_SECTIONS[0].id);

  useEffect(() => {
    document.title = 'Documentación · Brain Board';
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    DOCS_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
      {/* Índice lateral (escritorio) */}
      <aside className="hidden lg:block">
        <nav aria-label="Índice de la documentación" className="sticky top-24 flex flex-col gap-1">
          <span className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-[var(--text-subtle)]">
            Documentación
          </span>
          {DOCS_SECTIONS.map((s) => {
            const Icon = s.icon;
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors ${
                  isActive
                    ? 'text-[var(--primary)] bg-[var(--badge-bg)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {s.title}
              </a>
            );
          })}
        </nav>
      </aside>

      <article className="min-w-0 max-w-3xl">
        <header className="mb-10">
          <span className="badge-version mb-3">Guía de uso</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)] m-0">
            Documentación
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)] m-0">
            Todo lo que puede hacer Brain Board, con capturas del programa. Las
            capturas cambian con el tema de la web: prueba el botón de sol y
            luna.
          </p>
          {/* Índice en móvil y tableta */}
          <nav aria-label="Índice de la documentación" className="lg:hidden mt-6 flex flex-wrap gap-2">
            {DOCS_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3 py-1.5 rounded-lg text-xs font-medium no-underline bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </header>

        <div className="flex flex-col gap-16">
          {DOCS_SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <section key={s.id} id={s.id} className="scroll-mt-24 flex flex-col gap-5">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-[var(--text-main)] tracking-tight m-0">
                  <span className="feature-card-icon !w-10 !h-10 !mb-0">
                    <Icon className="w-5 h-5" />
                  </span>
                  {s.title}
                </h2>
                {s.blocks.map((block, i) => (
                  <Block key={`${s.id}-${i}`} block={block} />
                ))}
              </section>
            );
          })}
        </div>

        <div className="mt-16 p-6 rounded-[var(--radius-xl)] bg-[var(--bg-surface)] border border-[var(--border-card)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-bold text-[var(--text-main)]">¿Todavía no lo tienes?</div>
            <div className="text-sm text-[var(--text-muted)]">Brain Board es gratis para Windows 10 y 11.</div>
          </div>
          <a href="/#descarga" className="btn-primary">
            Descargar
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </article>
    </div>
  );
}
