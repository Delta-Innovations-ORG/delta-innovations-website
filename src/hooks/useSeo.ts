import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { defaultOgImage, siteName, siteUrl } from '../content/seoConfig';
import { getSeoForPath } from '../content/routeSeo';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useSeo() {
  const { pathname } = useLocation();
  const meta = getSeoForPath(pathname);

  useEffect(() => {
    const path = pathname === '/' ? '' : pathname;
    const url = `${siteUrl}${path}`;
    const imagePath = meta.ogImage ?? defaultOgImage;
    const image = `${siteUrl}${imagePath}`;

    document.title = meta.title;

    setMeta('name', 'description', meta.description);
    if (meta.keywords) {
      setMeta('name', 'keywords', meta.keywords);
    }
    setMeta('name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow');

    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', siteName);
    setMeta('property', 'og:locale', 'en_US');

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);
    setMeta('name', 'twitter:image', image);

    setCanonical(url);
  }, [pathname, meta]);
}
