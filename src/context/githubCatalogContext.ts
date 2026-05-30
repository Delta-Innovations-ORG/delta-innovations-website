import { createContext } from 'react';
import type { MarketplaceRepo } from '../content/marketplace';

export type GithubCatalogContextValue = {
  repos: MarketplaceRepo[];
  loading: boolean;
  error: string | null;
  warning: string | null;
  refresh: () => Promise<void>;
};

export const GithubCatalogContext = createContext<GithubCatalogContextValue | null>(null);
