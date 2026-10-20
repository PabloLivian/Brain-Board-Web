import { createContext, useContext, useEffect, useState } from 'react';
import { APP_INFO, CHANGELOG_LATEST } from '../data/content';

const GITHUB_REPO = 'PabloLivian/BrainBoard';
const GITHUB_RELEASES_API = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;

const initialReleaseState = {
  version: APP_INFO.version,
  installerName: APP_INFO.installerName,
  downloadUrl: APP_INFO.directDownloadFile,
  size: APP_INFO.size,
  publishedAt: null,
  htmlUrl: `https://github.com/${GITHUB_REPO}/releases/latest`,
  githubUrl: APP_INFO.githubUrl,
  changelog: CHANGELOG_LATEST,
  isLoading: false,
};

const ReleaseContext = createContext(initialReleaseState);

export function ReleaseProvider({ children }) {
  const [release, setRelease] = useState({
    ...initialReleaseState,
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchLatestRelease() {
      try {
        const response = await fetch(GITHUB_RELEASES_API);
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        const data = await response.json();

        // Buscar el archivo .exe correspondiente al instalador
        const exeAsset = data.assets?.find(
          (asset) =>
            typeof asset.name === 'string' &&
            asset.name.toLowerCase().endsWith('.exe') &&
            !asset.name.toLowerCase().includes('.blockmap')
        );

        if (isMounted && data) {
          const versionTag = data.tag_name || APP_INFO.version;
          const formattedSize = exeAsset?.size
            ? `${(exeAsset.size / (1024 * 1024)).toFixed(1)} MB`
            : APP_INFO.size;

          // Si la release en GitHub tiene notas en el body, las parseamos; si no, mantenemos el fallback
          let parsedChangelog = CHANGELOG_LATEST;
          if (data.body && typeof data.body === 'string' && data.body.trim().length > 0) {
            const lines = data.body
              .split('\n')
              .map((line) => line.replace(/^[-*•]\s*/, '').trim())
              .filter((line) => line.length > 0 && !line.startsWith('#'));
            if (lines.length > 0) {
              parsedChangelog = lines;
            }
          }

          setRelease({
            version: versionTag,
            installerName: exeAsset?.name || APP_INFO.installerName,
            downloadUrl:
              exeAsset?.browser_download_url ||
              `https://github.com/${GITHUB_REPO}/releases/download/${versionTag}/${exeAsset?.name || APP_INFO.installerName}`,
            size: formattedSize,
            publishedAt: data.published_at,
            htmlUrl: data.html_url || `https://github.com/${GITHUB_REPO}/releases/latest`,
            githubUrl: `https://github.com/${GITHUB_REPO}`,
            changelog: parsedChangelog,
            isLoading: false,
          });
        }
      } catch (err) {
        console.warn('Usando versión de respaldo (fallback) para Brain Board:', err);
        if (isMounted) {
          setRelease((prev) => ({ ...prev, isLoading: false }));
        }
      }
    }

    fetchLatestRelease();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ReleaseContext.Provider value={release}>
      {children}
    </ReleaseContext.Provider>
  );
}

export function useRelease() {
  const context = useContext(ReleaseContext);
  if (!context) {
    throw new Error('useRelease debe usarse dentro de un ReleaseProvider');
  }
  return context;
}
