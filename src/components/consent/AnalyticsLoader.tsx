import { useEffect } from 'react';

type AnalyticsLoaderProps = {
  enabled: boolean;
};

/**
 * Loads Vercel analytics scripts only after explicit consent.
 * Script load failures (ad-blockers) are swallowed — no console warnings from our code.
 */
export function AnalyticsLoader({ enabled }: AnalyticsLoaderProps) {
  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    async function load() {
      const [{ inject }, { injectSpeedInsights }] = await Promise.all([
        import('@vercel/analytics'),
        import('@vercel/speed-insights'),
      ]);

      if (cancelled) return;

      try {
        inject({ debug: false });
      } catch {
        // Ad-blocker or network — ignore
      }

      try {
        injectSpeedInsights({ debug: false });
      } catch {
        // Ad-blocker or network — ignore
      }
    }

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => {
        void load();
      });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const id = window.setTimeout(() => {
      void load();
    }, 1500);

    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [enabled]);

  return null;
}
