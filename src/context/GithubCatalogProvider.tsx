import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { MarketplaceRepo } from '../content/marketplace';
import { getCachedCatalog, setCachedCatalog } from '../lib/githubCatalogCache';
import { GithubCatalogContext } from './githubCatalogContext';

type CatalogResponse = {
  repos: MarketplaceRepo[];
  warning?: string;
  error?: string;
};

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

      const data = (await res.json()) as CatalogResponse;

      if (data.warning) setWarning(data.warning);
      if (data.error) {
        setError(data.error);
        return;
      }

      if (!res.ok) {
        setError('Failed to load projects.');
        return;
      }

      const list = data.repos ?? [];
      setRepos(list);
      setCachedCatalog(list);
      setError(null);
    } catch {
      setError('Unable to reach the project catalog. Use npm run dev:api for local API routes.');
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
