import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/react';
import { LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';
import { DeltaAvatar } from '../profile/DeltaAvatar';

export function UserMenu() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!user) return null;

  const fullName = user.fullName || user.username || user.primaryEmailAddress?.emailAddress || 'Account';
  const email = user.primaryEmailAddress?.emailAddress ?? '';

  const handleSignOut = () => {
    setOpen(false);
    void signOut(() => navigate('/'));
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full p-0.5 pr-1.5 hover:bg-brand-cyan/10 transition-colors"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open account menu"
      >
        <DeltaAvatar userId={user.id} name={fullName} email={email} size={36} />
        <ChevronDown
          size={16}
          className={`text-brand-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-60 rounded-xl bg-brand-navyCard border border-brand-cyan/20 shadow-card overflow-hidden z-50"
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b border-brand-cyan/10">
            <DeltaAvatar userId={user.id} name={fullName} email={email} size={40} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-brand-light truncate">{fullName}</p>
              {email && <p className="text-xs text-brand-muted truncate">{email}</p>}
            </div>
          </div>
          <div className="py-1">
            <Link
              to="/account"
              role="menuitem"
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-brand-light hover:bg-brand-cyan/10 transition-colors"
            >
              <LayoutDashboard size={16} className="text-brand-cyan" />
              Account
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-brand-light hover:bg-brand-cyan/10 transition-colors"
            >
              <LogOut size={16} className="text-brand-cyan" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
