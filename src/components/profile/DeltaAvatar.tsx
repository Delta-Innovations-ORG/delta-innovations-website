import React, { useId, useMemo } from 'react';
import { getDeltaAvatar, type DeltaAvatarVariant } from '../../lib/deltaAvatar';

type DeltaAvatarProps = {
  userId?: string | null;
  name?: string | null;
  email?: string | null;
  /** Rendered pixel size of the square tile. */
  size?: number;
  className?: string;
  /** Show the user's initials over the glyph. */
  showInitials?: boolean;
};

function GlyphPaths({ variant, accent }: { variant: DeltaAvatarVariant; accent: string }) {
  if (variant === 'impulse') {
    return (
      <>
        <path
          d="M32 12 L54 50 L10 50 Z"
          fill="rgba(255,255,255,0.92)"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="38" r="4.5" fill={accent} />
      </>
    );
  }

  if (variant === 'glyph') {
    return (
      <>
        <path
          d="M14 30 L32 22 L50 30 L42 46 L22 46 Z"
          fill="rgba(255,255,255,0.9)"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <line x1="22" y1="46" x2="42" y2="46" stroke={accent} strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="33" r="3.5" fill={accent} />
      </>
    );
  }

  // nexus (default)
  return (
    <>
      <circle
        cx="32"
        cy="32"
        r="24"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2"
        strokeDasharray="5 7"
      />
      <path
        d="M32 14 L52 48 L12 48 Z"
        fill="rgba(255,255,255,0.9)"
        stroke="rgba(255,255,255,0.95)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="36" r="4" fill={accent} />
    </>
  );
}

export function DeltaAvatar({
  userId,
  name,
  email,
  size = 48,
  className = '',
  showInitials = false,
}: DeltaAvatarProps) {
  const reactId = useId();
  const gradientId = `delta-avatar-${reactId.replace(/[^a-zA-Z0-9]/g, '')}`;

  const data = useMemo(
    () => getDeltaAvatar(userId, name, email),
    [userId, name, email],
  );

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-2xl ring-2 ring-brand-cyan/30 shadow-glow-violet ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${name || email || 'User'} avatar`}
      title={name || email || undefined}
    >
      <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={data.fromColor} />
            <stop offset="100%" stopColor={data.toColor} />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="64" height="64" fill={`url(#${gradientId})`} />
        <GlyphPaths variant={data.variant} accent={data.accent} />
        {showInitials && (
          <text
            x="32"
            y="58"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="rgba(255,255,255,0.85)"
            fontFamily="'Plus Jakarta Sans', Inter, system-ui, sans-serif"
          >
            {data.initials}
          </text>
        )}
      </svg>
    </span>
  );
}
