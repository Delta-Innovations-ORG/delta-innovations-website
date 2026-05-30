import React from 'react';
import { PageHero } from '../components/ui/PageHero';
import { TeamSection } from '../components/home/TeamSection';

export function TeamPage() {
  return (
    <>
      <PageHero
        badge="Team"
        title="People behind the delivery"
        description="Distributed engineers across Pakistan and Egypt — focused on written scope, secure engineering, and transparent milestones."
      />
      <TeamSection />
    </>
  );
}
