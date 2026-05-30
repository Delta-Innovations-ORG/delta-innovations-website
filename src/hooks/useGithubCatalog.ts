import { useContext } from 'react';
import { GithubCatalogContext } from '../context/githubCatalogContext';

export function useGithubCatalog() {
  const ctx = useContext(GithubCatalogContext);
  if (!ctx) {
    throw new Error('useGithubCatalog must be used within GithubCatalogProvider');
  }
  return ctx;
}

export { useGithubReadme } from './useGithubReadme';
