import { marketplaceConfig } from '../../src/content/marketplace';
import { getCached } from './memoryCache';

type CatalogRepo = {
  slug: string;
  name: string;
};

const catalogCacheKey = `catalog:${marketplaceConfig.githubUsername}`;

export function resolveGithubRepoName(repoOrSlug: string): string {
  const lower = repoOrSlug.toLowerCase();
  const catalog = getCached<CatalogRepo[]>(catalogCacheKey);
  if (catalog) {
    const match = catalog.find((r) => r.slug === lower || r.name.toLowerCase() === lower);
    if (match) return match.name;
  }
  return repoOrSlug;
}

export function readmeCacheKey(repoOrSlug: string): string {
  return `readme:${resolveGithubRepoName(repoOrSlug).toLowerCase()}`;
}
