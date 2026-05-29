import { CookieConsentBanner } from './CookieConsentBanner';
import { AnalyticsLoader } from './AnalyticsLoader';
import { useCookieConsent } from '../../hooks/useCookieConsent';

export function ConsentManager() {
  const { showBanner, accept, decline, analyticsAllowed } = useCookieConsent();

  return (
    <>
      <AnalyticsLoader enabled={analyticsAllowed} />
      {showBanner ? <CookieConsentBanner onAccept={accept} onDecline={decline} /> : null}
    </>
  );
}
