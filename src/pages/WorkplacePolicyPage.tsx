import React from 'react';
import { PolicyLayout } from '../components/ui/PolicyLayout';
import { workplacePolicy } from '../content/policies';

export function WorkplacePolicyPage() {
  return <PolicyLayout policy={workplacePolicy} />;
}
