import { ThemeProvider } from './context/ThemeContext';
import { ReleaseProvider } from './context/ReleaseContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ScreenshotsSection } from './components/ScreenshotsSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { DownloadSection } from './components/DownloadSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <ReleaseProvider>
        <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-main)] selection:bg-[var(--primary)] selection:text-white">
          <Navbar />
          <main className="flex-1">
            <HeroSection />
            <ScreenshotsSection />
            <FeaturesGrid />
            <DownloadSection />
          </main>
          <Footer />
        </div>
      </ReleaseProvider>
    </ThemeProvider>
  );
}
