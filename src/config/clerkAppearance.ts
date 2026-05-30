import type { Appearance } from '@clerk/react';

export const clerkAppearance: Appearance = {
  variables: {
    colorPrimary: '#22d3ee',
    colorBackground: '#0a1628',
    colorInputBackground: '#0b1a30',
    colorInputText: '#f1f5f9',
    colorText: '#f1f5f9',
    colorTextSecondary: '#cbd5e1',
    colorNeutral: '#0b1a30',
    colorDanger: '#f87171',
    borderRadius: '0.75rem',
    fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif',
  },
  elements: {
    rootBox: 'mx-auto',
    card: 'bg-brand-navyCard border border-brand-cyan/20 shadow-card',
    modalContent: 'bg-brand-navyCard border border-brand-cyan/20 shadow-card',
    modalBackdrop: 'bg-brand-navy/80 backdrop-blur-sm',
    headerTitle: 'text-brand-light font-display',
    headerSubtitle: 'text-brand-mutedLight',
    socialButtonsBlockButton:
      'bg-brand-navyLight border border-brand-cyan/30 text-brand-light hover:bg-brand-cyan/10 hover:border-brand-cyan/50',
    socialButtonsBlockButtonText: 'text-brand-light font-medium',
    dividerLine: 'bg-brand-cyan/15',
    dividerText: 'text-brand-mutedLight',
    formButtonPrimary: 'bg-brand-gradient text-brand-navy font-semibold',
    footerActionLink: 'text-brand-cyan hover:text-brand-emeraldLight',
    footerActionText: 'text-brand-mutedLight',
    identityPreviewEditButton: 'text-brand-cyan',
    navbar: 'hidden',
    navbarMobileMenuButton: 'hidden',
    formFieldLabel: 'text-brand-light font-medium text-sm',
    formFieldHintText: 'text-brand-mutedLight',
    formFieldInputShowPasswordButton: 'text-brand-cyan hover:text-brand-emeraldLight',
    identityPreviewText: 'text-brand-light',
    formHeaderTitle: 'text-brand-light font-display',
    formHeaderSubtitle: 'text-brand-mutedLight',
    alternativeMethodsBlockButton:
      'border border-brand-cyan/25 text-brand-light hover:bg-brand-cyan/10',
    formResendCodeLink: 'text-brand-cyan hover:text-brand-emeraldLight',
    // One-time-code cells: bright, visible boxes. Only colors/border — no
    // sizing or opacity overrides, so Clerk's input handling stays intact.
    otpCodeFieldInput:
      '!bg-brand-navyLight !border-2 !border-[#fbbf24] !text-brand-light !font-semibold',
    formFieldErrorText: 'text-amber-300',
    formFieldWarningText: 'text-amber-300',
    footer: 'bg-transparent text-brand-mutedLight',
    footerPages: 'text-brand-mutedLight',
    logoBox: 'hidden',
    avatarBox: 'w-9 h-9 ring-2 ring-brand-cyan/30',
    // Profile image is an auto-generated delta icon -> block changing it in the
    // Clerk modal. (The app itself always renders DeltaAvatar from user.id.)
    avatarImageActionsUpload: 'hidden',
    avatarImageActionsRemove: 'hidden',
    fileDropAreaButtonPrimary: 'hidden',
  },
};
