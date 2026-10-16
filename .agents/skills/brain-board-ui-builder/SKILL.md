---
name: brain-board-ui-builder
description: >-
  Guía paso a paso y sistema de construcción para la Landing Page de descarga de
  Brain Board usando React (JavaScript JSX) y Tailwind CSS. Úsala siempre que se
  inicialice el proyecto, se implemente la navbar reactiva, la galería de capturas
  de pantalla, los botones de descarga o el sistema de temas Dark/Light basado en
  GUIA_DISENO_WEB.md.
---

# Brain Board UI Builder Skill

Esta skill proporciona el flujo de trabajo exacto, mapeo de tokens CSS a Tailwind y arquitectura de componentes en React (JavaScript `.jsx`) para desarrollar y mantener la página de descarga de **Brain Board** con cohesión total hacia [`GUIA_DISENO_WEB.md`](../../../GUIA_DISENO_WEB.md) y [`agent.md`](../../../agent.md).

---

## Cuándo activar esta Skill

Activa esta skill cuando el usuario solicite:
1. Inicializar o estructurar el proyecto React + Vite + Tailwind CSS de Brain Board Web.
2. Construir o editar la **Navbar reactiva** (con ScrollSpy, estado scrolled, menú móvil y toggle de tema).
3. Implementar o actualizar el **Apartado de Capturas de Pantalla** (`ScreenshotsSection.jsx`) con pestañas interactivas, marco de ventana estilo Brain Board y visor Lightbox.
4. Crear o ajustar la sección **Hero**, **Grid de Características** o **Sección de Descarga** del instalador `.exe`.
5. Verificar que los colores, sombras y bordes cumplan al 100% con [`GUIA_DISENO_WEB.md`](../../../GUIA_DISENO_WEB.md).

---

## Flujo de Trabajo Paso a Paso

### Paso 1: Configuración de Tokens CSS y Tailwind (`src/index.css`)
1. Importa Tailwind CSS al inicio de `src/index.css`.
2. Declara todas las variables CSS de `:root` (Modo Oscuro por defecto) y `[data-theme="light"], body.light-theme` exactamente como se especifican en la Sección 5 de [`GUIA_DISENO_WEB.md`](../../../GUIA_DISENO_WEB.md).
3. Añade las clases utilitarias maestras (`.btn-primary`, `.btn-secondary`, `.btn-theme-toggle`, `.badge-version`, `.feature-card`, `.app-mockup-window`, `.app-mockup-tabs`, `.app-mockup-canvas`) para combinarlas libremente con utilidades de layout y responsive de Tailwind (`flex`, `grid`, `md:flex`, `px-6`, etc.).

### Paso 2: Gestión Reactiva del Tema (`src/context/ThemeContext.jsx`)
1. Crea el contexto en JavaScript puro (`ThemeContext.jsx`) que lea `localStorage.getItem('brainboard_theme') || 'dark'`.
2. Sincroniza el estado `theme` con:
   - `document.documentElement.setAttribute('data-theme', theme)`
   - `document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme'`
   - `localStorage.setItem('brainboard_theme', theme)`
3. Expón `{ theme, toggleTheme }` mediante el hook `useTheme()`.

### Paso 3: Construcción de la Navbar Reactiva (`src/components/Navbar.jsx`)
La Navbar debe cumplir 4 comportamientos reactivos:
1. **Detección de Scroll:** Listener de `window.scrollY > 16` para alternar entre fondo transparente e interfaz elevada con `backdrop-blur-md`, `bg-[var(--bg-surface)]/85` y borde inferior `border-[var(--border-subtle)]`.
2. **ScrollSpy Automático:** `IntersectionObserver` observando las secciones `#inicio`, `#capturas`, `#caracteristicas` y `#descarga` para resaltar el enlace activo en tiempo real.
3. **Toggle de Tema (`38x38px`):** Muestra el icono `<Sun className="w-4 h-4 text-[#fbbf24]" />` en modo oscuro y `<Moon className="w-4 h-4 text-[#64748b]" />` en modo claro.
4. **Menú Móvil Colapsable:** Panel desplegable en `< 768px` que se cierra al seleccionar una sección o al cambiar el tamaño de pantalla.

> Consulta la implementación de referencia en [`references/component-patterns.md`](./references/component-patterns.md).

### Paso 4: Construcción del Apartado de Capturas (`src/components/ScreenshotsSection.jsx`)
El apartado de capturas de pantalla debe incluir:
1. **Selector Reactivo de Vistas (Tabs/Pills):** Permite alternar entre diferentes capturas del programa (ej. *Pizarra Infinita*, *Organización y Pestañas*, *Copias de Seguridad .RTB*, *Modo Oscuro vs Claro*).
2. **Marco Nativo Brain Board (`.app-mockup-window`):**
   - Cabecera superior imitando las pestañas de Brain Board (`Inicio`, `Recursos`, `DEV / AI`) y controles de ventana.
   - Contenedor de imagen con soporte para capturas reales en `/screenshots/*.png` y **fallback visual interactivo** (canvas con cuadrícula de puntos y notas adhesivas) si la imagen aún no existe en `public/screenshots/`.
3. **Modal Lightbox (Zoom a Pantalla Completa):**
   - Al hacer clic en la captura, abre un visor modal con fondo `backdrop-blur-md bg-black/80`.
   - Soporta navegación con botones Anterior/Siguiente y atajos de teclado (`Escape`, `ArrowLeft`, `ArrowRight`).

> Consulta la plantilla completa del componente en [`references/component-patterns.md`](./references/component-patterns.md).

### Paso 5: Secciones de Conversión y Descarga
1. **Hero (`HeroSection.jsx`):** Badge `"⚡ 100% Local • Offline • Sin Nube Obligatoria"`, H1 con gradiente, botón principal de descarga para Windows (64-bit) con versión `v1.0.3` y botón secundario hacia `#capturas`.
2. **Características (`FeaturesGrid.jsx`):** Grid de 3 columnas (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`) con las 6 tarjetas oficiales.
3. **Bloque de Descarga (`DownloadSection.jsx`):** Tarjeta destacada con enlace directo al instalador `Brain Board Setup 1.0.3.exe`, requisitos del sistema (Windows 10/11 64-bit, 100% offline) y enlace al Changelog.

---

## Lista de Validación (Checklist de Calidad)

Antes de dar por finalizada cualquier tarea en la web, verifica:
- [ ] **Cero TypeScript:** Todos los archivos de código son `.js` o `.jsx`.
- [ ] **Modo Oscuro por Defecto:** Al abrir la web sin `localStorage` previo, se carga con `--bg-page: #0e1215` y `data-theme="dark"`.
- [ ] **Cohesión de Tokens:** No existen colores hardcodeados que rompan el modo claro al pulsar el botón Sol/Luna.
- [ ] **Navbar Reactiva:** El enlace activo cambia al hacer scroll por las secciones y el menú móvil se abre/cierra correctamente.
- [ ] **Apartado de Capturas Funcional:** Permite cambiar entre capturas, abrir el zoom Lightbox y nunca muestra iconos de imagen rota si falta un archivo en `public/screenshots/`.
- [ ] **Isotipo Oficial:** Se utiliza el `<svg viewBox="0 0 620.95 522.11">` exacto de [`GUIA_DISENO_WEB.md`](../../../GUIA_DISENO_WEB.md).
