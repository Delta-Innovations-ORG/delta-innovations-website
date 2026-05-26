import React from 'react';

type OrbitalBackgroundProps = {
  className?: string;
};

export function OrbitalBackground({ className = '' }: OrbitalBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <circle cx="20%" cy="30%" r="2" fill="#22D3EE" opacity="0.8">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="80%" cy="20%" r="2" fill="#10B981" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="70%" cy="70%" r="2" fill="#8B5CF6" opacity="0.7">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="30%" cy="80%" r="1.5" fill="#F59E0B" opacity="0.7">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="4.5s" repeatCount="indefinite" />
        </circle>
        <line x1="20%" y1="30%" x2="80%" y2="20%" stroke="url(#orbitGrad)" strokeWidth="0.5" opacity="0.3" />
        <line x1="80%" y1="20%" x2="70%" y2="70%" stroke="url(#orbitGrad)" strokeWidth="0.5" opacity="0.3" />
        <line x1="70%" y1="70%" x2="30%" y2="80%" stroke="url(#orbitGrad)" strokeWidth="0.5" opacity="0.3" />
      </svg>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl animate-pulseGlow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-emerald/10 rounded-full blur-3xl animate-pulseGlow" />
      <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-brand-violet/10 rounded-full blur-3xl animate-pulseGlow" />
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-brand-amber/10 rounded-full blur-3xl animate-pulseGlow" />
    </div>
  );
}
