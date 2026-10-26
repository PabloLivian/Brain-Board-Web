import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { BrainBoardLogo } from './icons/BrainBoardLogo';

// Maqueta interactiva de la app, fiel a su interfaz: pestañas, barra superior, barra de herramientas,
// marcos, tarjetas de enlace con estrellas, tarjetas de carpeta y el botón Brain.
// Iconos copiados de app_bundle/index.html; colores de app_bundle/whiteboard/whiteboard.css (claro y oscuro).

const ICONS = {
  select: <path d="M3 3l7 18 3-7 7-3L3 3z" />,
  hand: <path d="M18 11V6a2 2 0 0 0-4 0v3M14 6a2 2 0 0 0-4 0v5M10 8a2 2 0 0 0-4 0v7a6 6 0 0 0 12 0v-4a2 2 0 0 0-4 0" />,
  note: (<><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" /></>),
  shape: <rect x="3" y="5" width="18" height="14" rx="2" />,
  text: (<><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /></>),
  connector: (<><line x1="5" y1="19" x2="19" y2="5" /><polyline points="12 5 19 5 19 12" /></>),
  pen: (<><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></>),
  frame: <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="4 2" />,
  template: (<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></>),
  comment: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  home: (<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>),
  plus: (<><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>),
  menu: (<><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>),
  undo: (<><path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" /></>),
  redo: (<><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" /></>),
  search: (<><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>),
  index: (<><line x1="9" y1="6" x2="20" y2="6" /><line x1="9" y1="12" x2="20" y2="12" /><line x1="9" y1="18" x2="20" y2="18" /><rect x="3.5" y="4.5" width="3" height="3" rx="0.6" /><rect x="3.5" y="10.5" width="3" height="3" rx="0.6" /><rect x="3.5" y="16.5" width="3" height="3" rx="0.6" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15.5 14" /></>),
  fit: <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />,
  moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
  sun: (<><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></>),
  code: (<><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>),
};

function Icon({ name, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

const TOOLS = [
  { id: 'select', label: 'Seleccionar (V)' },
  { id: 'hand', label: 'Mano (H)' },
  { id: 'note', label: 'Nota adhesiva (N)' },
  { id: 'shape', label: 'Forma (S)', flyout: true },
  { id: 'text', label: 'Texto (T)' },
  { id: 'connector', label: 'Conector (L)' },
  { id: 'pen', label: 'Lápiz (P)' },
  { id: 'frame', label: 'Marco (F)' },
  { id: 'template', label: 'Plantillas', flyout: true },
  { id: 'comment', label: 'Comentario (C)' },
];

const TABS = [
  { id: 'refs', title: 'Referencias 3D', icon: '🧊' },
  { id: 'faro', title: 'Cortometraje Faro', icon: '🎬' },
  { id: 'houdini', title: 'Houdini', icon: '🌀' },
];

const FARO_PATH = 'D:\\Proyectos\\Cortometraje Faro';
const FARO_ENTRIES = [
  ['📁', '01_Guion', true],
  ['📁', '02_Storyboard', true],
  ['📁', '03_Assets', true],
  ['📁', '04_Render', true],
  ['📁', '05_Musica', true],
  ['🧊', 'faro_layout_v12.blend', false],
  ['📄', 'notas_produccion.txt', false],
];

// ---------- Piezas del tablero ----------

function Stars({ value, onChange }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <span className="bbm-stars" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} ${n === 1 ? 'estrella' : 'estrellas'}`}
          className={`bbm-star ${n <= shown ? 'on' : ''} ${hover ? 'preview' : ''}`}
          onMouseEnter={() => setHover(n)}
          onClick={() => onChange(value === n ? 0 : n)}
        >
          <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true">
            <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
          </svg>
        </button>
      ))}
    </span>
  );
}

function Badge({ kind }) {
  if (kind === 'youtube') {
    return (
      <span className="bbm-badge">
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="3" fill="#ff0000" /><path d="M10 9l5 3-5 3z" fill="#fff" /></svg>
      </span>
    );
  }
  return <span className="bbm-badge">{kind === 'github' ? '⚡' : '🌐'}</span>;
}

function LinkCard({ card, rating, onRate, className = '' }) {
  return (
    <div className={`bbm-card ${card.thumb ? '' : 'compact'} ${className}`}>
      {card.thumb ? (
        <div className="bbm-card-thumb" style={{ background: card.thumb.bg }}>
          <span className="bbm-thumb-sub" style={{ color: card.thumb.accent }}>{card.thumb.sub}</span>
          <span className="bbm-thumb-title">{card.thumb.title}</span>
          <span className="bbm-thumb-blob" style={{ background: card.thumb.accent }} />
          <span className="bbm-card-tl"><Badge kind={card.badge} /></span>
          <span className="bbm-card-tr">
            <Stars value={rating} onChange={onRate} />
            <span className="bbm-card-open">↗</span>
          </span>
        </div>
      ) : (
        <div className="bbm-card-head">
          <Badge kind={card.badge} />
          <span className="bbm-card-domain">{card.domain}</span>
          <span className="bbm-card-tr static">
            <Stars value={rating} onChange={onRate} />
            <span className="bbm-card-open">↗</span>
          </span>
        </div>
      )}
      <div className="bbm-card-body">
        {card.thumb && <div className="bbm-card-domain">{card.domain}</div>}
        <div className="bbm-card-title">{card.title}</div>
        <div className="bbm-card-desc">{card.desc}</div>
      </div>
    </div>
  );
}

function FolderCard({ title, path, expanded, onToggle, isFile = false, entries = FARO_ENTRIES }) {
  const dirs = entries.filter((e) => e[2]).length;
  return (
    <div className="bbm-folder">
      <div className="bbm-folder-head">
        <span className="bbm-folder-emoji">{isFile ? '🧊' : '📁'}</span>
        <div className="min-w-0">
          <div className="bbm-folder-name">{title}</div>
          <div className="bbm-folder-path">{path}</div>
          <div className="bbm-folder-sum">
            {isFile ? 'Archivo · doble clic para abrirlo' : `${dirs} carpetas · ${entries.length - dirs} archivos`}
          </div>
        </div>
      </div>
      {!isFile && (
        <>
          <button type="button" className="bbm-folder-bar" onClick={onToggle}>
            {expanded ? '▾ Ocultar contenido' : '▸ Ver contenido'} ({entries.length})
          </button>
          {expanded && (
            <div className="bbm-folder-list">
              {entries.map(([emoji, name, isDir]) => (
                <div key={name} className={`bbm-folder-row ${isDir ? 'dir' : ''}`}>
                  <span>{emoji}</span>
                  <span className="truncate">{name}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Frame({ title, banner, children, className = '' }) {
  return (
    <div className={`bbm-frame ${className}`}>
      <span className="bbm-frame-tab">{title}</span>
      {banner && <div className="bbm-banner">{banner}</div>}
      {children}
    </div>
  );
}

const CARDS = {
  luz: {
    badge: 'youtube', domain: 'youtube.com', title: 'Luz de tres puntos explicada',
    desc: 'Key, fill y rim con ejemplos en Blender y Houdini.',
    thumb: { title: 'LUZ DE TRES PUNTOS', sub: 'ILUMINACIÓN · CURSO', accent: '#f59e0b', bg: 'linear-gradient(135deg, #1a2133, #3a2a1a)' },
  },
  karma: {
    badge: 'youtube', domain: 'youtube.com', title: 'Karma XPU en 10 minutos',
    desc: 'Muestreo y denoise para previsualizar rápido.',
    thumb: { title: 'KARMA XPU EN 10 MIN', sub: 'HOUDINI · RENDER', accent: '#38bdf8', bg: 'linear-gradient(135deg, #101a2b, #1f3b57)' },
  },
  blender: { badge: 'github', domain: 'github.com', title: 'blender/blender', desc: 'Código fuente de Blender: modelado, animación y render.' },
  polyhaven: { badge: 'web', domain: 'polyhaven.com', title: 'Poly Haven', desc: 'HDRIs, texturas y modelos gratuitos (CC0).' },
  pyro: {
    badge: 'youtube', domain: 'youtube.com', title: 'Pyro paso a paso',
    desc: 'Fuego y humo con el Pyro Solver sparse.',
    thumb: { title: 'PYRO PASO A PASO', sub: 'HOUDINI · FX', accent: '#fb923c', bg: 'linear-gradient(135deg, #2a1410, #4a1d0f)' },
  },
  vex: { badge: 'web', domain: 'sidefx.com', title: 'Referencia de VEX', desc: 'Funciones, tipos y contextos en la documentación oficial.' },
};

// ---------- Maqueta ----------

export function AppMockup() {
  const { theme, toggleTheme } = useTheme();
  const [tab, setTab] = useState('refs');
  const [tool, setTool] = useState('select');
  const [ratings, setRatings] = useState({ luz: 5, karma: 4, blender: 5, polyhaven: 0, pyro: 5, vex: 4 });
  const [faroOpen, setFaroOpen] = useState(true);
  const rate = (id) => (value) => setRatings((r) => ({ ...r, [id]: value }));
  const current = TABS.find((t) => t.id === tab);
  const card = (id, className = '') => (
    <LinkCard key={id} card={CARDS[id]} rating={ratings[id]} onRate={rate(id)} className={className} />
  );

  return (
    <div className="bbm-window">
      {/* Pestañas */}
      <div className="bbm-tabs">
        <span className="bbm-home"><Icon name="home" size={13} /> Inicio</span>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`bbm-tab ${tab === t.id ? 'active' : ''}`}
          >
            <span>{t.icon}</span>
            <span className="truncate">{t.title}</span>
            <span className="bbm-tab-close">✕</span>
          </button>
        ))}
        <span className="bbm-tab-new"><Icon name="plus" size={13} /></span>
      </div>

      <div className="bbm-canvas">
        {/* Barra superior */}
        <div className="bbm-topbar">
          <div className="bbm-pill">
            <span className="bbm-iconbtn"><Icon name="menu" size={16} /></span>
            <span className="bbm-brand">
              <BrainBoardLogo className="w-[18px] h-[15px] text-[#3b82f6]" />
              <span className="bbm-hide-sm">Brain Board</span>
            </span>
            <span className="bbm-thumb-mini">{current.icon}</span>
            <span className="bbm-title">{current.title}</span>
            <span className="bbm-iconbtn bbm-hide-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="5" r="2.2" /><circle cx="12" cy="12" r="2.2" /><circle cx="12" cy="19" r="2.2" /></svg>
            </span>
            <span className="bbm-saved bbm-hide-sm"><span className="bbm-dot-ok" />Guardado</span>
          </div>
          <div className="bbm-pill bbm-hide-md">
            <span className="bbm-iconbtn"><Icon name="undo" size={15} /></span>
            <span className="bbm-iconbtn"><Icon name="redo" size={15} /></span>
          </div>
          <div className="bbm-pill bbm-hide-sm">
            <span className="bbm-iconbtn"><Icon name="search" size={15} /></span>
            <span className="bbm-iconbtn"><Icon name="index" size={15} /></span>
            <span className="bbm-iconbtn"><Icon name="clock" size={15} /></span>
            <span className="bbm-iconbtn bbm-hide-md"><Icon name="fit" size={15} /></span>
            <button
              type="button"
              onClick={toggleTheme}
              className="bbm-iconbtn bbm-theme"
              title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={15} />
            </button>
            <span className="bbm-divider bbm-hide-md" />
            <span className="bbm-iconbtn bbm-hide-md"><Icon name="code" size={15} /></span>
          </div>
        </div>

        {/* Barra de herramientas */}
        <div className="bbm-toolbar">
          {TOOLS.map((t) => (
            <button
              key={t.id}
              type="button"
              title={t.label}
              onClick={() => setTool(t.id)}
              className={`bbm-tool ${tool === t.id ? 'active' : ''}`}
            >
              <Icon name={t.id} size={18} />
              {t.flyout && <span className="bbm-flyout-arrow" />}
            </button>
          ))}
        </div>

        {/* Tablero */}
        <div className="bbm-board">
          {tab === 'refs' && (
            <>
              <Frame title="Iluminación y render" banner="ILUMINACIÓN Y RENDER" className="bbm-grow">
                <div className="bbm-row">
                  {card('luz')}
                  {card('karma', 'bbm-hide-sm')}
                  <div className="bbm-col bbm-hide-lg">
                    {card('blender')}
                    {card('polyhaven')}
                  </div>
                </div>
              </Frame>
              <div className="bbm-col bbm-hide-md">
                <FolderCard title="Cortometraje Faro" path={FARO_PATH} expanded={faroOpen} onToggle={() => setFaroOpen((v) => !v)} />
              </div>
            </>
          )}

          {tab === 'faro' && (
            <>
              <FolderCard title="Cortometraje Faro" path={FARO_PATH} expanded={faroOpen} onToggle={() => setFaroOpen((v) => !v)} />
              <div className="bbm-col bbm-hide-sm">
                <FolderCard title="faro_layout_v12.blend" path={`${FARO_PATH}\\faro_layout_v12.blend`} isFile />
                <div className="bbm-row">
                  <div className="bbm-sticky" style={{ background: '#fff9b1' }}>Render de la secuencia 1 el viernes</div>
                  <div className="bbm-sticky bbm-hide-md" style={{ background: '#d1f2ff' }}>Pedir feedback del animatic</div>
                </div>
              </div>
            </>
          )}

          {tab === 'houdini' && (
            <Frame title="Pyro" banner="PYRO" className="bbm-grow">
              <div className="bbm-row">
                {card('pyro')}
                <div className="bbm-note bbm-hide-sm">
                  • Fuente con Pyro Source a partir de una malla.<br />
                  • Resolución baja para el blocking y subir al final.<br />
                  • Cachear a VDB antes de iluminar.
                </div>
                <div className="bbm-col bbm-hide-lg">{card('vex')}</div>
              </div>
            </Frame>
          )}
        </div>

        {/* Botón Brain */}
        <div className="bbm-dock">
          <BrainBoardLogo className="w-[22px] h-[19px] text-[#3b82f6]" />
          <span>Brain</span>
          <span className="bbm-dock-tag">Ollama Local</span>
        </div>
      </div>
    </div>
  );
}
