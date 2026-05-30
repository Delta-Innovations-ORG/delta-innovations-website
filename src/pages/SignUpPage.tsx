import React from 'react';
import { SignUp } from '@clerk/react';
import { PageHero } from '../components/ui/PageHero';
import { clerkAppearance } from '../config/clerkAppearance';

export function SignUpPage() {
  return (
    <>
      <PageHero
        badge="Account"
        title="Create account"
        description="Register to track inquiries, marketplace interest, and account settings."
      />
      <section className="py-16 lg:py-24 flex justify-center">
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          appearance={clerkAppearance}
        />
      </section>
    </>
  );
}
