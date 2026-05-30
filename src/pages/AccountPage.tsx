import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RedirectToSignIn, useClerk, useUser } from '@clerk/react';
import { CreditCard, Package, Pencil, Check, X, ShieldCheck, Mail, CalendarDays, LogOut } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { Button } from '../components/ui/Button';
import { DeltaAvatar } from '../components/profile/DeltaAvatar';

function formatMemberSince(date: Date | null | undefined): string {
  if (!date) return '—';
  return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
}

export function AccountPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-brand-muted text-sm">
        Loading your account…
      </div>
    );
  }

  if (!isSignedIn || !user) {
    return <RedirectToSignIn redirectUrl="/account" />;
  }

  const fullName = user.fullName || user.username || user.primaryEmailAddress?.emailAddress || 'Delta member';
  const email = user.primaryEmailAddress?.emailAddress ?? '';

  const startEdit = () => {
    setFirstName(user.firstName ?? '');
    setLastName(user.lastName ?? '');
    setError(null);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setError(null);
  };

  const saveProfile = async () => {
    setSaving(true);
    setError(null);
    try {
      await user.update({ firstName: firstName.trim(), lastName: lastName.trim() });
      setEditing(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Could not save changes. Please try again.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHero
        badge="Account"
        title="Your account"
        description="View your profile, update your name, and explore marketplace access."
      />
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl space-y-8">
          {/* Header / identity card */}
          <div className="glass-card p-6 lg:p-8 border border-brand-cyan/15 relative overflow-hidden">
            <div className="absolute inset-0 bg-mesh-violet opacity-60 pointer-events-none" aria-hidden />
            <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <DeltaAvatar
                userId={user.id}
                name={fullName}
                email={email}
                size={88}
              />
              <div className="text-center sm:text-left flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-brand-light font-display truncate">
                  {fullName}
                </h2>
                {email && (
                  <p className="text-sm text-brand-muted mt-1 flex items-center justify-center sm:justify-start gap-2">
                    <Mail size={14} className="text-brand-cyan shrink-0" />
                    <span className="truncate">{email}</span>
                  </p>
                )}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-emerald/15 text-brand-emeraldLight text-xs font-semibold px-3 py-1 border border-brand-emerald/25">
                    <ShieldCheck size={13} />
                    Active member
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-navyCard text-brand-muted text-xs font-medium px-3 py-1 border border-brand-cyan/15">
                    <CalendarDays size={13} className="text-brand-cyan" />
                    Member since {formatMemberSince(user.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Editable profile details */}
          <div className="glass-card p-6 lg:p-8 border border-brand-cyan/15">
            <div className="flex items-center justify-between gap-4 mb-5">
              <h3 className="text-lg font-bold text-brand-light">Profile details</h3>
              {!editing ? (
                <button
                  type="button"
                  onClick={startEdit}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-cyan hover:text-brand-emeraldLight transition-colors"
                >
                  <Pencil size={15} />
                  Edit
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={saveProfile}
                    disabled={saving}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy bg-brand-gradient rounded-lg px-3 py-1.5 disabled:opacity-50"
                  >
                    <Check size={15} />
                    {saving ? 'Saving…' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    disabled={saving}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-muted hover:text-brand-light transition-colors px-2 py-1.5 disabled:opacity-50"
                  >
                    <X size={15} />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {error && (
              <p className="mb-4 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/25 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="firstName" className="block text-xs font-semibold uppercase tracking-wide text-brand-muted mb-1.5">
                  First name
                </label>
                {editing ? (
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-lg bg-brand-navyLight border border-brand-cyan/25 text-brand-light px-3 py-2.5 text-sm placeholder:text-brand-muted focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/25"
                    placeholder="First name"
                  />
                ) : (
                  <p className="text-brand-light text-sm py-2.5">{user.firstName || '—'}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs font-semibold uppercase tracking-wide text-brand-muted mb-1.5">
                  Last name
                </label>
                {editing ? (
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-lg bg-brand-navyLight border border-brand-cyan/25 text-brand-light px-3 py-2.5 text-sm placeholder:text-brand-muted focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/25"
                    placeholder="Last name"
                  />
                ) : (
                  <p className="text-brand-light text-sm py-2.5">{user.lastName || '—'}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-brand-muted mb-1.5">
                  Email address
                </label>
                <p className="text-brand-light text-sm py-2.5">{email || '—'}</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-brand-muted">
              You can update your first and last name here. Your email and profile icon are fixed for this account.
            </p>
          </div>

          {/* Subscription card */}
          <div className="glass-card p-6 lg:p-8 border border-brand-cyan/15">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-navyCard flex items-center justify-center shrink-0">
                <CreditCard size={24} className="text-brand-cyan" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-light">Subscription</h3>
                <p className="text-sm text-brand-muted mt-1 leading-relaxed">
                  Paid subscriptions and checkout will be available in a future release. For now,
                  contact us for marketplace licensing, custom deployments, and project proposals.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Button to="/marketplace" variant="secondary" size="sm">
                    <Package size={16} />
                    Browse marketplace
                  </Button>
                  <Button to="/contact" size="sm">
                    Contact sales
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => void signOut({ redirectUrl: '/' })}
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-muted hover:text-rose-300 transition-colors"
            >
              <LogOut size={16} />
              Sign out
            </button>
            <p className="text-center text-xs text-brand-muted">
              Need help?{' '}
              <Link to="/contact" className="text-brand-cyan hover:text-brand-emeraldLight">
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
