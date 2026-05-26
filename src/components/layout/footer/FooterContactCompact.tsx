import React from 'react';
import type { LucideIcon } from 'lucide-react';

type FooterContactCompactProps = {
  icon: LucideIcon;
  children: React.ReactNode;
};

export function FooterContactCompact({ icon: Icon, children }: FooterContactCompactProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-brand-muted">
      <Icon size={14} className="shrink-0 text-brand-cyan" aria-hidden />
      <span className="min-w-0">{children}</span>
    </div>
  );
}
