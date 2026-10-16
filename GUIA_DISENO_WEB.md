# Guía de Diseño y Sistema Visual para la Web de Brain Board

Este documento define el **Design System** y las directrices visuales para la página web oficial de **Brain Board**, asegurando una fidelidad idéntica a la estética de la aplicación de escritorio.

---

## 1. Filosofía Visual y Principios de Diseño

* **Dark Mode como Protagonista:** El diseño principal y predeterminado es el **Modo Oscuro**, evocando una herramienta profesional de ingeniería, creatividad y arquitectura visual. El **Modo Claro** debe estar soportado al 100% con transiciones suaves y contrastes limpios.
* **Minimalismo Funcional y Pizarra Infinita:** Estética limpia, bordes nítidos de 1px, superficies sutilmente elevadas mediante capas de gris oscuro/azulado y sombras envolventes.
* **Acentos Eléctricos de Identidad:** Uso estratégico del **Azul Eléctrico Brain Board** (`#3b82f6` / `#4262ff`) y detalles en **Índigo / Violeta** (`#6366f1` / `#818cf8`) para estados activos, focos y botones principales.
* **Tipografía Precisa:** Clara, moderna y legible, basada en fuentes geométricas sin serifa (`Inter`, `Segoe UI`, `Formular` o `-apple-system`).

---

## 2. Paleta de Colores y Tokens CSS (Dark vs Light)

### 2.1. Tabla Comparativa de Tokens

| Elemento / Rol | Modo Oscuro (Principal) | Modo Claro | Uso en la Web |
| :--- | :--- | :--- | :--- |
| **Fondo Global (Canvas/Page)** | `#0e1215` | `#f5f5f7` | Fondo principal de la página (`body`, landing) |
| **Superficie Secundaria (Navbar/Footer)** | `#14171c` | `#ffffff` | Barra de navegación superior y pie de página |
| **Superficie de Tarjeta (Card/Panel)** | `#181b20` | `#ffffff` | Tarjetas de características, contenedores |
| **Superficie Elevada (Modal/Dropdown)** | `#1e222b` | `#ffffff` | Modales flotantes, menús desplegables |
| **Estado Hover en Superficies** | `#1f242c` / `#23282c` | `#f2f4f7` / `#eaecf0` | Hover sobre cards, filas y enlaces |
| **Borde Estándar (Divider/Border)** | `#22262e` | `#e6e6e9` | Líneas divisorias, separadores de sección |
| **Borde Prominente / Tarjetas** | `#282d36` / `#2d323b` | `#d0d5dd` | Borde de tarjetas, inputs y botones neutros |
| **Borde Activo / Focus** | `#6366f1` / `#3b82f6` | `#4262ff` | Focus en inputs, tarjeta seleccionada |
| **Texto Principal (Headings/Body)** | `#f1f5f9` (Slate 100) | `#101828` / `#1a1a1a` | Títulos h1-h3, texto de lectura principal |
| **Texto Secundario (Muted/Subtitles)** | `#94a3b8` (Slate 400) | `#475467` | Subtítulos, descripciones secundarias |
| **Texto Terciario / Metadatos** | `#64748b` (Slate 500) | `#98a2b3` | Fechas, versiones, copyright, etiquetas |
| **Color Primario (Acción Principal)** | `#3b82f6` / `#4262ff` | `#4262ff` | Botón principal de Descarga, enlaces CTA |
| **Hover Primario** | `#2563eb` / `#314de0` | `#314de0` | Hover del botón CTA primario |
| **Acento Activo / Tag Badge** | `rgba(99, 102, 241, 0.16)` | `rgba(66, 98, 255, 0.10)` | Badges de versión (`v1.0.3`), pills informativos |
| **Texto de Badge Activo** | `#818cf8` | `#4262ff` | Texto dentro de badges y tags |

---

## 3. Sombras, Bordes y Radios

### Radios de Borde (`border-radius`)
* **Botones e Inputs:** `8px` (`0.5rem`)
* **Badges y Etiquetas:** `9999px` (Pill circular completo)
* **Tarjetas y Contenedores:** `12px` (`0.75rem`)
* **Ventana Mockup / Hero Container:** `16px` (`1rem`)

### Sombras (`box-shadow`)

```css
/* Modo Oscuro (Sombras densas con iluminación ambiental) */
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.4);
--shadow-md: 0 4px 14px rgba(0, 0, 0, 0.45);
--shadow-lg: 0 12px 28px rgba(0, 0, 0, 0.6);
--shadow-glow: 0 0 25px rgba(59, 130, 246, 0.25); /* Resplandor azul en hover de CTAs */

/* Modo Claro (Sombras suaves y sutiles) */
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
--shadow-lg: 0 12px 24px -4px rgba(0, 0, 0, 0.12), 0 6px 12px -2px rgba(0, 0, 0, 0.06);
--shadow-glow: 0 0 20px rgba(66, 98, 255, 0.2);
```

---

## 4. Estructura y Secciones de la Web

La landing page debe comunicar la potencia de Brain Board con la misma pulcritud que la aplicación.

### 4.1. Barra de Navegación (Header / Navbar)
* **Izquierda:** Isotipo SVG de Brain Board (`#3b82f6`) + Logotipo tipográfico `Brain Board` + Badge de versión `v1.0.3` (estilo pill con fondo translúcido).
* **Centro:** Enlaces de ancla suaves: *Características*, *Compatibilidad RTB*, *Rendimiento*, *Privacidad Offline*.
* **Derecha:**
  * **Botón Toggle de Tema:** Botón cuadrado de `36x36px` con borde sutil. En modo oscuro muestra el icono de Sol en tono amarillo dorado (`#fbbf24`), y en modo claro muestra la Luna (`#64748b`).
  * **Botón CTA "Descargar":** Botón `.btn-primary` azul con icono de descarga de Windows.

### 4.2. Sección Hero
* **Badge superior:** `"⚡ 100% Local • Offline • Sin Nube Obligatoria"`.
* **Título H1:** Impactante, con gradiente sutil de blanco a gris azulado en modo oscuro:
  * *Tu pizarra infinita local. Rápida, privada y sin límites.*
* **Subtítulo:** Explicación clara de valor: *La herramienta de escritorio definitiva para organizar tus ideas, notas y referencias visuales con sistema completo de copias de seguridad locales (.rtb).*
* **Botones de Acción (CTAs):**
  1. **Primario:** `Descargar Brain Board para Windows (64-bit)` con icono de Windows y tamaño de versión.
  2. **Secundario:** `Explorar Código en GitHub` o `Ver Documentación`.
* **Mockup de la Aplicación (Visual Showcase):**
  * Marco de ventana con la barra de pestañas horizontal idéntica a Brain Board (`Inicio`, `Recursos`, `DEV / AI`).
  * Canvas central mostrando notas adhesivas con colores suaves (amarillo suave, azul pastel, menta), tarjetas de imágenes y conectores limpios.

### 4.3. Sección de Características (Feature Grid)
Rejilla de tarjetas (`3 columnas`) con el estilo de tarjetas de Brain Board:
1. **100% Privado y Offline:** Todos tus tableros se almacenan en tu equipo (`IndexedDB` + archivos JSON físicos locales). Nada se envía a servidores de terceros.
2. **Importación y Exportación RTB Completa:** Abre y genera archivos `.rtb` con imágenes incrustadas de alta resolución de forma instantánea.
3. **Motor Canvas 2D de Alto Rendimiento:** Zoom suave, pan fluido y soporte para miles de objetos e imágenes pesadas sin ralentización.
4. **Modo Oscuro Nativo Dual:** Diseñado desde cero para largas sesiones de trabajo creativo con confort visual garantizado.
5. **Auto-guardado Inmediato:** Cada modificación en la pizarra se persiste al milisegundo en disco local para que nunca pierdas tu trabajo.
6. **Búsqueda y Categorización Inteligente:** Panel lateral de inicio para ordenar tableros por categorías y espacios de trabajo.

### 4.4. Sección de Descarga y Requisitos
* Caja central destacada con borde suave.
* Enlace de descarga directa del instalador `Brain Board Setup X.Y.Z.exe`.
* Requisitos del sistema: Windows 10/11 (64-bit), no requiere conexión a Internet tras la descarga.
* Enlace a las notas de versión (Changelog de `v1.0.3`).

### 4.5. Footer
* Línea divisoria de `1px` (`#22262e` en oscuro / `#e6e6e9` en claro).
* Logotipo reducido y texto legal / autoría.
* Selector rápido de idioma o tema y enlaces a GitHub Releases.

---

## 5. Implementación de Referencia en Código CSS

A continuación se presenta el bloque CSS maestro listo para utilizar en la web (compatible con HTML puro o frameworks como React / Astro / Next.js):

```css
/* ==========================================================================
   BRAIN BOARD WEB - VARIABLES DE TEMA Y ESTILOS BASE
   ========================================================================== */

/* Variables por defecto: MODO OSCURO (Predeterminado) */
:root {
  --bg-page: #0e1215;
  --bg-surface: #14171c;
  --bg-card: #181b20;
  --bg-card-hover: #1f242c;
  --bg-elevated: #1e222b;
  --border-subtle: #22262e;
  --border-card: #282d36;
  --border-focus: #3b82f6;

  --text-main: #f1f5f9;
  --text-muted: #94a3b8;
  --text-subtle: #64748b;

  --primary: #3b82f6;
  --primary-hover: #2563eb;
  --primary-glow: rgba(59, 130, 246, 0.25);

  --badge-bg: rgba(99, 102, 241, 0.16);
  --badge-text: #818cf8;
  --badge-border: rgba(99, 102, 241, 0.3);

  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 14px rgba(0, 0, 0, 0.45);
  --shadow-lg: 0 12px 28px rgba(0, 0, 0, 0.6);

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 18px;
  --radius-pill: 9999px;

  --transition-theme: background 0.22s ease, border-color 0.22s ease, color 0.22s ease, box-shadow 0.22s ease;
}

/* Modificador de MODO CLARO */
[data-theme="light"],
body.light-theme {
  --bg-page: #f5f5f7;
  --bg-surface: #ffffff;
  --bg-card: #ffffff;
  --bg-card-hover: #f8f9fa;
  --bg-elevated: #ffffff;
  --border-subtle: #e6e6e9;
  --border-card: #d0d5dd;
  --border-focus: #4262ff;

  --text-main: #101828;
  --text-muted: #475467;
  --text-subtle: #98a2b3;

  --primary: #4262ff;
  --primary-hover: #314de0;
  --primary-glow: rgba(66, 98, 255, 0.2);

  --badge-bg: rgba(66, 98, 255, 0.08);
  --badge-text: #4262ff;
  --badge-border: rgba(66, 98, 255, 0.2);

  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 12px 24px -4px rgba(0, 0, 0, 0.12), 0 6px 12px -2px rgba(0, 0, 0, 0.06);
}

/* ==========================================================================
   ESTILOS GENERALES
   ========================================================================== */
html {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", Helvetica, Arial, sans-serif;
  background-color: var(--bg-page);
  color: var(--text-main);
  transition: var(--transition-theme);
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  line-height: 1.55;
  background-color: var(--bg-page);
  color: var(--text-main);
}

/* ==========================================================================
   COMPONENTES CLAVE
   ========================================================================== */

/* Botón Primario (CTA) */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--primary);
  color: #ffffff;
  border: 1px solid transparent;
  padding: 10px 20px;
  border-radius: var(--radius-md);
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  box-shadow: var(--shadow-sm);
  transition: background 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease;
}

.btn-primary:hover {
  background: var(--primary-hover);
  box-shadow: var(--shadow-md), 0 0 18px var(--primary-glow);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
}

/* Botón Secundario / Contorno */
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--bg-card);
  color: var(--text-main);
  border: 1px solid var(--border-card);
  padding: 10px 20px;
  border-radius: var(--radius-md);
  font-size: 14.5px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.15s ease;
}

.btn-secondary:hover {
  background: var(--bg-card-hover);
  border-color: var(--text-muted);
  color: var(--text-main);
}

/* Botón Conmutador de Tema (Sol/Luna) */
.btn-theme-toggle {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-md);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-theme-toggle:hover {
  background: var(--bg-card-hover);
  color: var(--text-main);
  border-color: var(--text-muted);
}

/* Badges (Versión y Etiquetas) */
.badge-version {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: var(--radius-pill);
  background: var(--badge-bg);
  color: var(--badge-text);
  border: 1px solid var(--badge-border);
  letter-spacing: 0.2px;
}

/* Tarjetas de Características (Cards) */
.feature-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature-card:hover {
  background: var(--bg-card-hover);
  border-color: #3b82f6;
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.feature-card-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: var(--badge-bg);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}

.feature-card-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-main);
  margin: 0;
}

.feature-card-desc {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0;
}

/* Mockup de la Ventana Brain Board */
.app-mockup-window {
  background: var(--bg-surface);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.app-mockup-tabs {
  background: var(--bg-page);
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: flex-end;
  padding: 8px 12px 0 12px;
  gap: 4px;
}

.app-mockup-canvas {
  height: 420px;
  position: relative;
  background-color: var(--bg-page);
  background-image: radial-gradient(var(--border-subtle) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

---

## 6. Lógica de Cambio de Tema (JavaScript)

Para respetar que el **Modo Oscuro sea el principal y predeterminado**, este script comprueba si hay preferencia guardada en `localStorage`; si no la hay, activa `dark`:

```javascript
// Theme Manager para Brain Board Web
(function initTheme() {
  const savedTheme = localStorage.getItem('brainboard_theme') || 'dark';
  applyTheme(savedTheme);

  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('btn-theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    }
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    localStorage.setItem('brainboard_theme', theme);

    // Actualizar iconos Sol / Luna
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    if (sunIcon && moonIcon) {
      if (theme === 'dark') {
        sunIcon.style.display = 'inline-block';
        moonIcon.style.display = 'none';
      } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline-block';
      }
    }
  }
})();
```

---

## 7. Activos y Logotipo Oficial SVG

Para mantener la identidad exacta de Brain Board, se utiliza el isotipo de la red neuronal/cerebro con el color característico:

```xml
<svg width="28" height="24" viewBox="0 0 620.95 522.11" fill="currentColor" class="brainboard-logo">
  <path d="M0,228.49c-.21-23.92,7.34-45.33,20.15-65.04,8.65-13.29,16.23-26.99,22.23-41.79,11.47-28.31,32.76-45.92,62.5-53.19,7.12-1.74,14.19-3.66,21.34-5.28,14.28-3.24,24.88-12.37,35.26-21.83,17.38-15.85,38.13-23.18,61.31-24.57,16.22-.97,31.84,2.5,47.3,6.64,12.5,3.35,23.5,1.01,34.07-6.19,13.09-8.92,27.34-15.26,43.35-16.79,24.32-2.32,45.79,4.52,64.3,20.38,6.71,5.75,12.83,12.21,18.05,19.33,10.48,14.29,25.02,20.15,42.03,21.82,19.61,1.92,38.28,6.64,54.92,18.06,14.86,10.2,24.8,23.9,31.05,40.53,2.23,5.92,4.25,11.95,5.11,18.26,2.53,18.52,11.42,33.78,23.49,47.67,11.63,13.38,22.08,27.69,27.72,44.75,11.98,36.21,8.66,70.41-15.16,101.16-8.03,10.36-18.34,18.5-31.27,22.32-8.15,2.4-12.49,7.19-13.51,15.83-1.93,16.42-7.08,31.77-16.44,45.62-13.77,20.38-32.82,33.25-56.24,39.85-17.27,4.87-34.83,7.47-52.84,5.21-.82-.1-1.67-.11-2.5-.08-2.13,.08-4.63-.44-5.93,1.75-1.38,2.34,.68,4.1,1.83,5.8,3.93,5.79,8.12,11.4,11.99,17.22,7.14,10.75,7.08,19.48,.03,28-6.72,8.12-18.48,10.49-29.21,5.83-5.31-2.31-9.46-5.89-12.89-10.67-22.62-31.53-45.36-62.97-68.16-94.37-6.05-8.34-15.57-11.12-25.69-8.48-16.1,4.2-31.88,9.64-48.56,11.51-48.25,5.43-88.82-24.67-99.36-66.25-3.24-12.77-6.45-15.08-19.61-14.14-26.06,1.87-50.88-2.7-73.69-15.6C20.8,301.28,1.39,270.31,0,228.49Zm576.46,40.19c.65-16.58-6.11-30.97-16.01-44.24-8.36-11.2-18.05-21.37-25.32-33.42-8.7-14.44-12.1-30.61-15.43-46.75-3.92-19-15.03-30.64-33.81-35.17-9.73-2.34-19.66-3.56-29.53-5.11-16.03-2.51-31.05-7.26-43.53-18.39-7.64-6.81-13.97-14.75-20.45-22.54-8.14-9.78-18.18-15.86-30.81-17.78-16.65-2.53-34.94,6.1-41.12,19.45-2.76,5.97-2.67,11.42,1.53,16.82,9.08,11.67,9.59,24.53,4.2,37.76-1.46,3.58-1.21,6.33,.87,9.29,8.14,11.58,16.33,23.12,24.32,34.81,2.35,3.44,5.18,4.68,9.26,4.43,9.7-.58,18.61,1.38,27.03,6.89,14.05,9.19,22.62,27.99,19.49,44.63-3.78,20.07-18.01,32.83-35.34,36.53-15.83,3.38-29.24-2.37-40.3-13.59-3.18-3.22-5.97-3.88-10.11-2.48-17.21,5.78-34.49,11.36-51.78,16.92-3.57,1.15-5.53,3.17-6.02,7.02-3.05,24.07-25.74,40.74-48.89,37.5-7.83-1.1-13.35,2.2-16.73,9-7.09,14.24-6.51,28.51,1.67,41.97,9.45,15.56,29.13,23.34,47.84,19.96,16.78-3.03,32.74-9,49.13-13.41,13.02-3.5,19.85-11.19,21.83-24.6,2.28-15.44,14.4-27.49,28.74-30.34,15.9-3.17,30.84,2.97,39.52,17.06,2.81,4.56,5.43,5.33,10.1,3.47,18.38-7.32,37.55-9.94,57.26-9.45,10.82,.26,21.64,.08,32.46,.75,6.01,.37,6.64-.79,4.5-6.23-5.3-13.48-10.75-26.91-15.87-40.46-1.46-3.86-3.51-5.63-7.72-6.43-25.88-4.94-38.15-30.32-26.08-53.42,8.53-16.34,29.93-23.3,46.07-15.16,18.79,9.48,25.95,31.93,16.99,47.33-5.97,10.26-6.66,18.77-1.05,28.5,.08,.14,.11,.31,.17,.47,4.28,10.48,8,21.24,15.36,30.15,15.26,18.47,37.27,18.76,49.98-2.19,5.38-8.86,7.95-18.63,7.59-29.55ZM45.39,225.98c.63,22.26,9.38,40.34,28.32,52.61,22.02,14.26,46.26,17.78,71.4,11.35,17.09-4.37,29.28-14.99,31.9-33.69,.81-5.78,1.57-11.55,3.18-17.17,1.11-3.86,.36-7.16-2.33-10.17-4.32-4.84-8.61-9.72-12.76-14.7-2.73-3.27-5.63-4.23-10.04-3.27-16.43,3.58-31.65-3.18-39.36-18.48-7.4-14.66-5.88-26.68,5.77-40.72,6.43-7.74,15.66-12.21,26.14-11.38,25.57,2.02,39.92,22.62,33.37,47.53-.72,2.73-.39,4.77,1.4,6.86,4.98,5.81,9.91,11.66,15.36,17.06,2.57,2.54,5.07,3.23,8.52,2.18,18.69-5.66,34.5-.85,47.36,13.63,2.6,2.92,5.13,3.74,8.76,2.53,17.85-5.95,35.73-11.8,53.6-17.67,2.64-.87,4.06-2.55,4.46-5.39,1.07-7.53,3.6-14.56,7.95-20.82,2.44-3.5,2.16-6.58-.04-10.13-5.96-9.65-13.19-18.43-19.13-28.06-3.85-6.25-8.53-8.29-15.89-8.28-14.87,.02-25.62-7.64-31.57-21.24-5.41-12.35-4.27-24.32,3.61-35.5,5.05-7.16,4.19-10.83-3.73-14.42-15.12-6.87-31.01-8.87-47.32-5.97-11.48,2.04-21.18,7.79-29.18,16.27-11.23,11.9-24.57,20.32-40.34,24.84-12.49,3.57-25.02,7-37.43,10.82-11.16,3.43-19.79,10.5-23.16,21.7-5.67,18.83-15.47,35.26-26.56,51.19-7.99,11.47-12.49,24.23-12.24,38.49Zm402.24,126.08v.07c-13.15,0-26.31-.3-39.44,.11-7.56,.24-15.46,1.82-19.9,8.57-5.86,8.9-13.37,15-23.26,18.66-5.42,2-6.57,6.04-3.16,10.7,3.34,4.56,7.28,8.62,12.28,11.53,10.68,6.2,22.44,9.25,34.36,11.64,21.09,4.24,42.2,5.73,63.19-.75,16.21-5.01,28.26-14.48,33.91-31.04,4.87-14.28-1.7-30.11-20.54-29.56-12.47,.36-24.97,.07-37.45,.07Z"/>
</svg>
```
