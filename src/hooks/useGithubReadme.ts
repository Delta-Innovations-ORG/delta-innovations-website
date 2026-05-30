import { useEffect, useMemo, useRef, useState } from 'react';
import type { MarketplaceRepo } from '../content/marketplace';
import { getCachedCatalog, getCachedReadme, setCachedReadme } from '../lib/githubCatalogCache';

type ReadmeResponse = {
  markdown: string | null;
  message?: string;
  error?: string;
};

function resolveRepoName(slugOrName: string, catalogRepos?: MarketplaceRepo[]): string {
  const lower = slugOrName.toLowerCase();
  const fromList = catalogRepos?.find(
    (r) => r.slug === lower || r.name.toLowerCase() === lower,
  );
  if (fromList) return fromList.name;

  const cachedCatalog = getCachedCatalog();
  const fromCache = cachedCatalog?.find(
    (r) => r.slug === lower || r.name.toLowerCase() === lower,
  );
  if (fromCache) return fromCache.name;

  return slugOrName;
}

function cacheSlug(slugOrName: string, catalogRepos?: MarketplaceRepo[]): string {
  const lower = slugOrName.toLowerCase();
  const fromList = catalogRepos?.find(
    (r) => r.slug === lower || r.name.toLowerCase() === lower,
  );
  if (fromList) return fromList.slug;

  const cachedCatalog = getCachedCatalog();
  const fromCache = cachedCatalog?.find(
    (r) => r.slug === lower || r.name.toLowerCase() === lower,
  );
  if (fromCache) return fromCache.slug;

  return lower;
}

export function useGithubReadme(
  slugOrName: string | undefined,
  catalogRepos?: MarketplaceRepo[],
) {
  const catalogRef = useRef(catalogRepos);
  catalogRef.current = catalogRepos;

  const storageKey = useMemo(
    () => (slugOrName ? cacheSlug(slugOrName, catalogRepos) : undefined),
    [slugOrName, catalogRepos],
  );

  const initialCached = storageKey ? getCachedReadme(storageKey) : null;
  const [markdown, setMarkdown] = useState<string | null>(initialCached);
  const [loading, setLoading] = useState(Boolean(slugOrName) && !initialCached);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slugOrName || !storageKey) {
      setLoading(false);
      return;
    }

    const cached = getCachedReadme(storageKey);
    if (cached) {
      setMarkdown(cached);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setMarkdown(null);

    async function load() {
      const name = resolveRepoName(slugOrName, catalogRef.current);
      try {
        const res = await fetch(
          `/api/catalog/github/readme?repo=${encodeURIComponent(name)}`,
        );
        const data = (await res.json()) as ReadmeResponse;
        if (cancelled) return;

        if (data.error) {
          setError(data.error);
          return;
        }

        if (data.markdown) {
          setMarkdown(data.markdown);
          setCachedReadme(storageKey, data.markdown);
        } else {
          setError(data.message ?? 'No README available for this project.');
        }
      } catch {
        if (!cancelled) {
          setError('Unable to load project details. Use npm run dev:api for local API routes.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [slugOrName, storageKey]);

  return { markdown, loading, error };
}
