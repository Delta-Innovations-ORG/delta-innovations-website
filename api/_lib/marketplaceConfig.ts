/** Server-side marketplace config (kept under api/ for Vercel bundling). */
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
