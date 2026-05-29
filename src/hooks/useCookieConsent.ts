import { useCallback, useEffect, useState } from 'react';

export type CookieConsentStatus = 'unknown' | 'accepted' | 'declined';

const STORAGE_KEY = 'delta_cookie_consent';

function readConsent(): CookieConsentStatus {
  if (typeof window === 'undefined') return 'unknown';
  const value = localStorage.getItem(STORAGE_KEY);
  if (value === 'accepted' || value === 'declined') return value;
  return 'unknown';
}

export function useCookieConsent() {
  const [status, setStatus] = useState<CookieConsentStatus>(readConsent);
  const [showBanner, setShowBanner] = useState(() => readConsent() === 'unknown');

  useEffect(() => {
    const current = readConsent();
    setStatus(current);
    setShowBanner(current === 'unknown');
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setStatus('accepted');
    setShowBanner(false);
  }, []);

  const decline = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setStatus('declined');
    setShowBanner(false);
  }, []);

  const resetConsent = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setStatus('unknown');
    setShowBanner(true);
  }, []);

  return {
    status,
    showBanner,
    accept,
    decline,
    resetConsent,
    analyticsAllowed: status === 'accepted',
  };
}
