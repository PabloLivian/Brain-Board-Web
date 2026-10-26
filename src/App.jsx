import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ReleaseProvider } from './context/ReleaseContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HeroFeatures } from './components/HeroFeatures';
import { DownloadSection } from './components/DownloadSection';
import { DocsPage } from './components/DocsPage';
import { Footer } from './components/Footer';

// Dos páginas: la portada (/) y la documentación (/documentacion)
const isDocsPage = () =>
  typeof window !== 'undefined' &&
  window.location.pathname.replace(/\/+$/, '') === '/documentacion';

export default function App() {
  const page = isDocsPage() ? 'docs' : 'home';

  // Al llegar con un ancla (/#funciones, /documentacion#cerebro) el navegador intenta saltar antes de que
  // React pinte la página: saltar ahora que ya existe
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash) requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView());
  }, []);

  return (
    <ThemeProvider>
      <ReleaseProvider>
        <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-main)] selection:bg-[var(--primary)] selection:text-white">
          <Navbar page={page} />
          <main className="flex-1">
            {page === 'docs' ? (
              <DocsPage />
            ) : (
              <>
                <HeroSection />
                <HeroFeatures />
                <DownloadSection />
              </>
            )}
          </main>
          <Footer />
        </div>
      </ReleaseProvider>
    </ThemeProvider>
  );
}
