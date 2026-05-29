import { Link } from 'react-router-dom';

type CookieConsentBannerProps = {
  onAccept: () => void;
  onDecline: () => void;
};

export function CookieConsentBanner({ onAccept, onDecline }: CookieConsentBannerProps) {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[100] p-4 md:p-6"
      role="dialog"
      aria-label="Cookie consent"
      data-cursor="none"
    >
      <div className="container mx-auto max-w-4xl rounded-2xl border border-white/10 bg-brand-navy/95 backdrop-blur-md shadow-2xl p-5 md:p-6">
        <p className="text-sm md:text-base text-brand-light/90 leading-relaxed">
          We use optional analytics cookies (Vercel Web Analytics and Speed Insights) to understand
          traffic and improve performance. They load only if you accept. See our{' '}
          <Link to="/cookies" className="text-brand-cyan hover:underline">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onAccept}
            className="px-5 py-2.5 rounded-lg bg-brand-cyan text-brand-navy font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Accept analytics
          </button>
          <button
            type="button"
            onClick={onDecline}
            className="px-5 py-2.5 rounded-lg border border-white/20 text-brand-light text-sm hover:bg-white/5 transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
