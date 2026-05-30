import React from 'react';
import { SignIn } from '@clerk/react';
import { PageHero } from '../components/ui/PageHero';
import { clerkAppearance } from '../config/clerkAppearance';

export function SignInPage() {
  return (
    <>
      <PageHero
        badge="Account"
        title="Sign in"
        description="Access your Delta Innovations account for marketplace and project updates."
      />
      <section className="py-16 lg:py-24 flex justify-center">
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          appearance={clerkAppearance}
        />
      </section>
    </>
  );
}
