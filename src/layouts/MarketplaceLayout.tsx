import React from 'react';
import { Outlet } from 'react-router-dom';
import { GithubCatalogProvider } from '../context/GithubCatalogProvider';

export function MarketplaceLayout() {
  return (
    <GithubCatalogProvider>
      <Outlet />
    </GithubCatalogProvider>
  );
}
