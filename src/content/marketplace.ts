export const marketplaceConfig = {
  githubUsername: 'sureshbarach2001',
  excludeRepos: ['Portfolio-Orbital-Movement'],
  defaultSort: 'stars' as const,
};

export type MarketplaceRepo = {
  slug: string;
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  updatedAt: string;
  topics: string[];
};

export function repoSlug(name: string): string {
  return name.toLowerCase();
}

export function getRepoBySlug(repos: MarketplaceRepo[], slug: string): MarketplaceRepo | undefined {
  return repos.find((r) => r.slug === slug.toLowerCase());
}
