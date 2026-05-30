import type { MarketplaceRepo } from '../content/marketplace';

const CATALOG_KEY = 'delta_github_catalog';
const README_PREFIX = 'delta_github_readme:';
const CATALOG_TTL_MS = 10 * 60 * 1000;
const README_TTL_MS = 30 * 60 * 1000;

type Stored<T> = {
  value: T;
  expiresAt: number;
};

function readStorage<T>(key: string): T | null {
  if (typeof sessionStorage === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored<T>;
    if (Date.now() > parsed.expiresAt) {
      sessionStorage.removeItem(key);
      return null;
    }
    return parsed.value;
  } catch {
    return null;
  }
}

function writeStorage<T>(key: string, value: T, ttlMs: number): void {
  if (typeof sessionStorage === 'undefined') return;
  try {
    const payload: Stored<T> = { value, expiresAt: Date.now() + ttlMs };
    sessionStorage.setItem(key, JSON.stringify(payload));
  } catch {
    // sessionStorage full or blocked
  }
}

export function getCachedCatalog(): MarketplaceRepo[] | null {
  return readStorage<MarketplaceRepo[]>(CATALOG_KEY);
}

export function setCachedCatalog(repos: MarketplaceRepo[]): void {
  writeStorage(CATALOG_KEY, repos, CATALOG_TTL_MS);
}

export function getCachedReadme(repo: string): string | null {
  return readStorage<string>(`${README_PREFIX}${repo.toLowerCase()}`);
}

export function setCachedReadme(repo: string, markdown: string): void {
  writeStorage(`${README_PREFIX}${repo.toLowerCase()}`, markdown, README_TTL_MS);
}

export function prefetchReadme(repoName: string, slug?: string): void {
  const storageKey = (slug ?? repoName).toLowerCase();
  if (getCachedReadme(storageKey)) return;
  void fetch(`/api/catalog/github/readme?repo=${encodeURIComponent(repoName)}`).then(async (res) => {
    if (!res.ok) return;
    const data = (await res.json()) as { markdown?: string | null };
    if (data.markdown) setCachedReadme(storageKey, data.markdown);
  });
}
