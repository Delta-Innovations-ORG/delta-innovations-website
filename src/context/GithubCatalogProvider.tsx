import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { MarketplaceRepo } from '../content/marketplace';
import { getCachedCatalog, setCachedCatalog } from '../lib/githubCatalogCache';
import { GithubCatalogContext } from './githubCatalogContext';

type CatalogResponse = {
  repos: MarketplaceRepo[];
  warning?: string;
  error?: string;
};

function catalogErrorMessage(status: number, data?: CatalogResponse): string {
  if (data?.warning === 'GITHUB_TOKEN not configured') {
    return 'GITHUB_TOKEN is not configured on the server.';
  }
  if (data?.error) return data.error;
  if (status === 429) return 'Too many requests. Please try again in a few minutes.';
  if (status >= 500) {
    return 'The project catalog API is unavailable. Redeploy after setting server env vars in Vercel.';
  }
  return 'Failed to load projects.';
}

export function GithubCatalogProvider({ children }: { children: React.ReactNode }) {
  const initialCached = getCachedCatalog();
  const [repos, setRepos] = useState<MarketplaceRepo[]>(initialCached ?? []);
  const [loading, setLoading] = useState(!initialCached);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const fetchCatalog = useCallback(async (background = false) => {
    if (!background) setLoading(true);
    try {
      let res: Response | null = null;
      for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
          res = await fetch('/api/catalog/github');
          break;
        } catch {
          if (attempt === 2) throw new Error('network');
          await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
        }
      }
      if (!res) throw new Error('network');

      let data: CatalogResponse = { repos: [] };
      try {
        data = (await res.json()) as CatalogResponse;
      } catch {
        setError(catalogErrorMessage(res.status));
        return;
      }

      if (data.warning) setWarning(data.warning);
      if (data.error) {
        setError(data.error);
        return;
      }

      if (!res.ok) {
        setError(catalogErrorMessage(res.status, data));
        return;
      }

      const list = data.repos ?? [];
      setRepos(list);
      setCachedCatalog(list);
      setError(null);
    } catch {
      const isLocalhost =
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      setError(
        isLocalhost
          ? 'Unable to reach the project catalog. Use npm run dev:api for local API routes.'
          : 'Unable to reach the project catalog. Confirm Vercel API routes are deployed and GITHUB_TOKEN is set.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCatalog(Boolean(initialCached));
  }, [fetchCatalog, initialCached]);

  const value = useMemo(
    () => ({
      repos,
      loading,
      error,
      warning,
      refresh: () => fetchCatalog(false),
    }),
    [repos, loading, error, warning, fetchCatalog],
  );

  return (
    <GithubCatalogContext.Provider value={value}>{children}</GithubCatalogContext.Provider>
  );
}
