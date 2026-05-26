import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { PolicyLayout } from '../components/ui/PolicyLayout';
import { termsPolicy } from '../content/policies';

export function TermsPage() {
  usePageTitle('Terms and Conditions');
  return <PolicyLayout policy={termsPolicy} />;
}
