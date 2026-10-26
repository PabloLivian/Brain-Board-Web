# AGENT.md — Directrices de Desarrollo para Brain Board Web

Este documento define las reglas arquitectónicas, de diseño, stack tecnológico y convenciones que cualquier agente de IA debe seguir al construir o modificar la página web oficial de descarga de **Brain Board**.

---

## 1. Propósito del Proyecto

El objetivo único y principal de este proyecto es ser la **Landing Page oficial de descarga de Brain Board** (aplicación de escritorio de pizarra infinita local para Windows).
- La página debe ser **directa, rápida, visualmente impactante y orientada a la conversión (descarga del instalador `.exe`)**.
- No requiere autenticación, bases de datos ni rutas complejas: toda la experiencia se centra en presentar el producto, mostrar su interfaz mediante capturas de pantalla, destacar sus características diferenciales (100% local/offline, copias de seguridad `.rtb`, alto rendimiento) y facilitar la descarga inmediata.
- **Cohesión obligatoria:** Todo diseño, color, sombra, tipografía y componente debe respetar estrictamente el documento [`GUIA_DISENO_WEB.md`](./GUIA_DISENO_WEB.md).

---

## 2. Stack Tecnológico Obligatorio

1. **Lenguaje:** **JavaScript (ES6+ / JSX)**.
   - Usar exclusivamente archivos `.js` y `.jsx` (no utilizar TypeScript `.ts`/`.tsx` en este proyecto).
   - Código limpio, modular, basado en componentes funcionales y React Hooks (`useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`).
2. **Framework:** **React** (recomendado con **Vite** para desarrollo ultrarrápido y empaquetado optimizado).
3. **Estilos:** **Tailwind CSS** combinado con las **Variables CSS nativas (`:root` y `[data-theme="light"]`)** definidas en [`GUIA_DISENO_WEB.md`](./GUIA_DISENO_WEB.md).
4. **Iconografía:** `lucide-react` para iconos de interfaz y SVGs inline para el **isotipo oficial de Brain Board** y el logotipo de Windows.

---

## 3. Reglas de Diseño y Cohesión Visual (`GUIA_DISENO_WEB.md`)

### 3.1. Filosofía Dark-First y Sistema de Temas
- **Modo Oscuro Predeterminado:** La web arranca siempre en modo oscuro (`data-theme="dark"`), salvo que el usuario haya guardado explícitamente `'light'` en `localStorage` bajo la clave `'brainboard_theme'`.
- **Modo Claro 100% Soportado:** El cambio entre modo oscuro y claro debe ser instantáneo y fluido (`transition: 0.22s ease`), alternando el atributo `data-theme="dark" | "light"` en `document.documentElement` y la clase `dark-theme` / `light-theme` en `document.body`.

### 3.2. Uso de Tokens de Color en Tailwind CSS
Nunca usar colores arbitrarios fuera de la paleta oficial. Mapear las clases de Tailwind o utilidades personalizadas a las variables de [`GUIA_DISENO_WEB.md`](./GUIA_DISENO_WEB.md):

| Token CSS | Modo Oscuro (Default) | Modo Claro | Aplicación en Componentes |
| :--- | :--- | :--- | :--- |
| `--bg-page` | `#0e1215` | `#f5f5f7` | Fondo global de la página (`bg-[var(--bg-page)]`) |
| `--bg-surface` | `#14171c` | `#ffffff` | Navbar, Footer y marcos de ventana (`bg-[var(--bg-surface)]`) |
| `--bg-card` | `#181b20` | `#ffffff` | Tarjetas de características, contenedores y botones secundarios |
| `--bg-card-hover` | `#1f242c` | `#f8f9fa` | Estado hover en tarjetas, pestañas y botones neutros |
| `--bg-elevated` | `#1e222b` | `#ffffff` | Menú móvil desplegable, modales de capturas (Lightbox) |
| `--border-subtle` | `#22262e` | `#e6e6e9` | Divisor de navbar, separadores de sección (`border-[var(--border-subtle)]`) |
| `--border-card` | `#282d36` | `#d0d5dd` | Bordes de 1px en tarjetas, capturas y contenedores |
| `--primary` | `#3b82f6` | `#4262ff` | CTAs de descarga, enlaces activos, isotipo y bordes en foco |
| `--primary-hover` | `#2563eb` | `#314de0` | Estado hover del botón principal de descarga |
| `--text-main` | `#f1f5f9` | `#101828` | Títulos `h1`-`h3` y textos principales |
| `--text-muted` | `#94a3b8` | `#475467` | Subtítulos, descripciones de tarjetas y enlaces de navegación |
| `--text-subtle` | `#64748b` | `#98a2b3` | Metadatos, notas de versión, requisitos técnicos y copyright |

### 3.3. Geometría, Bordes y Sombras
- **Bordes nítidos de `1px`** en tarjetas, ventanas mockup y botones.
- **Radios de borde consistentes:**
  - Botones e inputs: `8px` - `10px` (`rounded-[10px]`)
  - Badges / Pills: `9999px` (`rounded-full`)
  - Tarjetas: `12px` - `14px` (`rounded-[14px]`)
  - Marco de ventana / Capturas: `16px` - `18px` (`rounded-[18px]`)
- **Efecto Glow en CTAs:** Los botones primarios de descarga deben incluir el resplandor azul (`--primary-glow`) al hacer hover y una ligera elevación (`-translate-y-[1px]`).

---

## 4. Arquitectura de Secciones y Requisitos Funcionales

### 4.1. Navbar Reactiva (`Navbar.jsx`)
La barra de navegación superior debe ser completamente reactiva y adaptable:
1. **Comportamiento Sticky + Scroll Reactivo:**
   - Fija en la parte superior (`sticky top-0 z-50`).
   - Detecta el desplazamiento vertical (`window.scrollY > 16`): cuando el usuario hace scroll, aplica fondo translúcido con desenfoque (`backdrop-blur-md`), borde inferior `1px solid var(--border-subtle)` y sombra sutil.
2. **ScrollSpy (Detección de Sección Activa):**
   - Utiliza `IntersectionObserver` para detectar qué sección está visible en pantalla (`#inicio`, `#funciones`, `#descarga`; en `/documentacion` se marca "Documentación") y resalta automáticamente el enlace correspondiente en la barra de navegación con color `var(--primary)` o indicador activo.
3. **Identidad de Marca (Izquierda):**
   - Isotipo oficial SVG de Brain Board (`#3b82f6`) + texto **Brain Board** + Badge pill de versión (`v1.0.3`).
4. **Acciones y Controles (Derecha):**
   - **Toggle de Tema Reactivo (`38x38px`):** Muestra el icono de Sol en amarillo dorado (`#fbbf24`) cuando está en modo oscuro y el icono de Luna (`#64748b`) en modo claro.
   - **CTA "Descargar":** Botón primario con icono de Windows que lleva o inicia la descarga.
5. **Menú Móvil Responsivo:**
   - En pantallas pequeñas (`< 768px`), oculta los enlaces centrales y muestra un botón de menú (hamburguesa / cerrar) con transición suave, cerrándose automáticamente al hacer clic en cualquier enlace de navegación.

### 4.2. Sección Hero y Descarga Principal (`HeroSection.jsx`)
- **Badge superior:** `"⚡ 100% Local • Offline • Sin Nube Obligatoria"`.
- **Título H1 con gradiente sutil:** *"Tu pizarra infinita local. Rápida, privada y sin límites."*
- **Subtítulo de valor:** Explicación clara de la herramienta de escritorio y su sistema nativo de copias de seguridad locales (`.rtb`).
- **Botones CTA:**
  - **Primario:** `Descargar Brain Board para Windows (64-bit)` con icono de Windows, versión actual (`v1.0.3`) y enlace directo al instalador.
  - **Secundario:** `Ver Capturas del Programa` / `Explorar en GitHub`.
- **Vista Previa / Mockup Principal:** Ventana estilo aplicación de escritorio con barra de pestañas (`Inicio`, `Recursos`, `DEV / AI`) y fondo de cuadrícula de puntos (`radial-gradient`).

### 4.3. Funciones HERO (`HeroFeatures.jsx`)
- Sección `id="funciones"` de la portada: 6 tarjetas en 2 columnas, cada una con una captura real, título, una frase y enlace "Cómo funciona" a su apartado de la documentación. Datos en `HERO_FEATURES` (`src/data/content.js`).
- Debajo, lo básico en una sola línea (`BASICS`) y un botón a la documentación. La portada debe seguir siendo ligera: lo detallado va en la documentación.

### 4.4. Documentación (`DocsPage.jsx`, ruta `/documentacion`)
- Página propia con índice lateral (en móvil, arriba) y secciones con capturas y explicación de todas las funciones. Contenido en `src/data/docs.js` (bloques `p`, `list`, `steps`, `shot`, `note`, `table`, `h3`; formato `**negrita**`, `` `código` `` y `{{Ctrl+K}}` para teclas).
- `App.jsx` elige la página por la ruta; `vercel.json` reescribe `/documentacion` a `index.html`.
- **Capturas:** `public/assets/capturas/<id>-light.webp` y `<id>-dark.webp`, siempre las dos. `ThemedShot.jsx` enseña la del tema activo y la amplía al pulsarla. Se generan con tableros de demostración (nunca con datos reales) mediante `node scripts/web_screenshots/generate.js --out <web>/public/assets/capturas` del repositorio de la app.
- **Ser honestos:** no prometer "100% privado" sin matices. Los tableros se guardan en el equipo, pero el Cerebro IA envía datos al proveedor que se elija (salvo Ollama).

### 4.5. Sección de Descarga Directa y Requisitos (`DownloadSection.jsx`)
- Tarjeta destacada central (`id="descarga"`) con borde suave y resplandor ambiental.
- Botón grande de descarga directa para **`Brain Board Setup 1.0.3.exe`**.
- Especificaciones técnicas claras:
  - **Sistema Operativo:** Windows 10 / Windows 11 (64-bit).
  - **Privacidad:** 100% Local (sin cuenta obligatoria ni conexión a Internet tras instalar).
  - **Versión actual:** `v1.0.3` con resumen o enlace a notas de versión (Changelog).

### 4.6. Footer (`Footer.jsx`)
- Borde superior de `1px` (`--border-subtle`), isotipo + nombre reducidos, información de versión/licencia y enlaces rápidos (Descargar, Capturas, Características, GitHub Releases).

---

## 5. Estructura de Carpetas Recomendada

```text
Brain_Board_Web/
├── public/
│   └── assets/capturas/      # Capturas del programa: <id>-light.webp y <id>-dark.webp
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # Navbar reactiva con ScrollSpy, menú móvil y toggle de tema
│   │   ├── HeroSection.jsx       # Hero principal con CTA de descarga y mockup
│   │   ├── HeroFeatures.jsx      # Las 6 funciones HERO de la portada
│   │   ├── DocsPage.jsx          # Página /documentacion
│   │   ├── ThemedShot.jsx        # Captura que sigue el tema y se amplía al pulsarla
│   │   ├── RichText.jsx          # Negrita, código y teclas en los textos de la documentación
│   │   ├── DownloadSection.jsx   # Bloque final de descarga y requisitos de Windows
│   │   ├── Footer.jsx            # Pie de página minimalista
│   │   └── icons/
│   │       └── BrainBoardLogo.jsx# Isotipo SVG oficial y logo de Windows
│   ├── context/
│   │   └── ThemeContext.jsx      # Proveedor reactivo de tema (dark por defecto + localStorage)
│   ├── data/
│   │   ├── content.js            # Versión, enlaces, funciones HERO y changelog de respaldo
│   │   └── docs.js               # Contenido de la documentación
│   ├── App.jsx                   # Composición principal de la Landing Page
│   ├── main.jsx                  # Punto de entrada de React
│   └── index.css                 # Directivas de Tailwind + Variables CSS de GUIA_DISENO_WEB.md
├── GUIA_DISENO_WEB.md        # Especificación oficial del sistema de diseño
├── agent.md                  # Este archivo de reglas y arquitectura
├── package.json
└── vite.config.js
```

---

## 6. Buenas Prácticas y Convenciones de Código

- **Componentes en PascalCase:** Archivos de componentes en `src/components/` con extensión `.jsx` (ej. `Navbar.jsx`, `ScreenshotsSection.jsx`).
- **Datos Desacoplados:** Mantener las rutas de las capturas de pantalla, textos de características, número de versión (`v1.0.3`) y URL del instalador centralizados en `src/data/content.js` para facilitar futuras actualizaciones de versión sin tocar la lógica de los componentes.
- **Accesibilidad (a11y) y UX:**
  - Incluir atributos `aria-label` en botones de solo icono (toggle de tema, abrir menú móvil, cerrar lightbox).
  - Navegación fluida por anclas (`scroll-behavior: smooth`).
- **Uso de la Skill del Proyecto:** Cuando se vayan a crear o modificar secciones visuales de la web, consultar y activar la skill local `brain-board-ui-builder` ubicada en `.agents/skills/brain-board-ui-builder/SKILL.md`.
