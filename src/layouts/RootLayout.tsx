import React from 'react';
import { ClerkProvider } from '@clerk/react';
import { useNavigate } from 'react-router-dom';
import { clerkAppearance } from '../config/clerkAppearance';

type RootLayoutProps = {
  children: React.ReactNode;
};

export function RootLayout({ children }: RootLayoutProps) {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      afterSignOutUrl="/"
      telemetry={false}
      appearance={clerkAppearance}
      localization={{
        applicationName: 'Delta Innovations',
        signIn: {
          start: {
            title: 'Sign in to Delta Innovations',
            subtitle: 'Welcome back! Please sign in to continue.',
          },
        },
        signUp: {
          start: {
            title: 'Create your Delta Innovations account',
            subtitle: 'Welcome! Please fill in the details to get started.',
          },
        },
      }}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
    >
      {children}
    </ClerkProvider>
  );
}
