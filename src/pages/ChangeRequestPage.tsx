import React from 'react';
import { PolicyLayout } from '../components/ui/PolicyLayout';
import { changeRequestPolicy } from '../content/policies';

export function ChangeRequestPage() {
  return <PolicyLayout policy={changeRequestPolicy} />;
}
