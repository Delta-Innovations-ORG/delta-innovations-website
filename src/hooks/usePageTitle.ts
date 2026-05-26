import { useEffect } from 'react';
import { siteConfig } from '../content/siteConfig';

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  }, [title]);
}
