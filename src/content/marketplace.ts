import {
  marketplaceConfig,
  type MarketplaceRepo,
} from '../../api/_lib/marketplaceConfig';

export { marketplaceConfig, type MarketplaceRepo };

export function repoSlug(name: string): string {
  return name.toLowerCase();
}

export function getRepoBySlug(repos: MarketplaceRepo[], slug: string): MarketplaceRepo | undefined {
  return repos.find((r) => r.slug === slug.toLowerCase());
}
