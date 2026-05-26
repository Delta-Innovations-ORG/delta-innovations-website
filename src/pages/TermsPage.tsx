import React from 'react';
import { PolicyLayout } from '../components/ui/PolicyLayout';
import { termsPolicy } from '../content/policies';

export function TermsPage() {
  return <PolicyLayout policy={termsPolicy} />;
}
