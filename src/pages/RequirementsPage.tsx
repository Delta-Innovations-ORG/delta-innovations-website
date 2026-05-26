import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { PolicyLayout } from '../components/ui/PolicyLayout';
import { requirementsPolicy } from '../content/policies';
import { Button } from '../components/ui/Button';

export function RequirementsPage() {
  usePageTitle('Project Requirements');

  return (
    <>
      <PolicyLayout policy={requirementsPolicy} />
      <section className="pb-16">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl text-center">
          <Button to="/contact">Submit Your Requirements</Button>
        </div>
      </section>
    </>
  );
}
