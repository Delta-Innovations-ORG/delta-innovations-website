import React from 'react';
import { PolicyLayout } from '../components/ui/PolicyLayout';
import { codeOfConductPolicy } from '../content/policies';

export function CodeOfConductPage() {
  return <PolicyLayout policy={codeOfConductPolicy} />;
}
