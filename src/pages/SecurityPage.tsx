import React from 'react';
import { PolicyLayout } from '../components/ui/PolicyLayout';
import { securityPolicy } from '../content/policies';

export function SecurityPage() {
  return <PolicyLayout policy={securityPolicy} />;
}
