/**
 * Deterministic "Delta" avatar generator.
 *
 * Each customer gets a stable, unique-ish identicon derived purely from their
 * Clerk user id. The result never changes for a given id and there is no upload
 * path, so the avatar is effectively non-changeable by the user.
 */

export type DeltaAvatarVariant = 'nexus' | 'impulse' | 'glyph';

export type DeltaAvatarData = {
  fromColor: string;
  toColor: string;
  accent: string;
  variant: DeltaAvatarVariant;
  initials: string;
};

/** Brand-aligned gradient pairs (from -> to) with a contrasting accent. */
const GRADIENTS: ReadonlyArray<{ from: string; to: string; accent: string }> = [
  { from: '#22D3EE', to: '#10B981', accent: '#A7F3D0' }, // cyan -> emerald
  { from: '#8B5CF6', to: '#22D3EE', accent: '#C4B5FD' }, // violet -> cyan
  { from: '#06B6D4', to: '#8B5CF6', accent: '#67E8F9' }, // cyanDark -> violet
  { from: '#10B981', to: '#8B5CF6', accent: '#6EE7B7' }, // emerald -> violet
  { from: '#F59E0B', to: '#FB7185', accent: '#FCD34D' }, // amber -> rose
  { from: '#34D399', to: '#22D3EE', accent: '#A7F3D0' }, // emeraldLight -> cyan
];

const VARIANTS: ReadonlyArray<DeltaAvatarVariant> = ['nexus', 'impulse', 'glyph'];

/** Small, fast, deterministic FNV-1a style string hash. */
export function hashString(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function getInitials(name?: string | null, email?: string | null): string {
  const source = (name ?? '').trim();
  if (source) {
    const parts = source.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  const handle = (email ?? '').trim();
  if (handle) return handle.slice(0, 2).toUpperCase();
  return 'DI';
}

export function getDeltaAvatar(
  userId: string | null | undefined,
  name?: string | null,
  email?: string | null,
): DeltaAvatarData {
  const seed = userId && userId.length > 0 ? userId : email || 'delta-innovations';
  const hash = hashString(seed);
  const gradient = GRADIENTS[hash % GRADIENTS.length];
  const variant = VARIANTS[(hash >>> 8) % VARIANTS.length];

  return {
    fromColor: gradient.from,
    toColor: gradient.to,
    accent: gradient.accent,
    variant,
    initials: getInitials(name, email),
  };
}
