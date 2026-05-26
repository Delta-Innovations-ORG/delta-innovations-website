import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { PolicyLayout } from '../components/ui/PolicyLayout';
import { changeRequestPolicy } from '../content/policies';

export function ChangeRequestPage() {
  usePageTitle('Change Request Policy');
  return <PolicyLayout policy={changeRequestPolicy} />;
}
