import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function getFallbackPath(pathname: string): string {
  if (pathname.startsWith('/marketplace/')) return '/marketplace';
  if (pathname.startsWith('/insights/')) return '/insights';
  if (pathname === '/sign-in' || pathname === '/sign-up' || pathname === '/account') return '/';
  return '/';
}

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

export function PageBackBar() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/') return null;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(getFallbackPath(location.pathname));
    }
    requestAnimationFrame(scrollToTop);
  };

  return (
    <div className="pt-20 border-b border-brand-cyan/10 bg-brand-navy/80 backdrop-blur-sm relative z-40">
      <div className="container mx-auto px-6 lg:px-8 py-2">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-brand-mutedLight hover:text-brand-cyan hover:bg-brand-cyan/10 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>
    </div>
  );
}
