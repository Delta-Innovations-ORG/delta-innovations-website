import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { PolicyLayout } from '../components/ui/PolicyLayout';
import { securityPolicy } from '../content/policies';

export function SecurityPage() {
  usePageTitle('Security Policy');
  return <PolicyLayout policy={securityPolicy} />;
}
