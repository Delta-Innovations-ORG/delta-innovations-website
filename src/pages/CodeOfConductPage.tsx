import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { PolicyLayout } from '../components/ui/PolicyLayout';
import { codeOfConductPolicy } from '../content/policies';

export function CodeOfConductPage() {
  usePageTitle('Code of Conduct');
  return <PolicyLayout policy={codeOfConductPolicy} />;
}
