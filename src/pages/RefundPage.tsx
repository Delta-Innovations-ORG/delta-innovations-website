import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { PolicyLayout } from '../components/ui/PolicyLayout';
import { refundPolicy } from '../content/policies';

export function RefundPage() {
  usePageTitle('Refund Policy');
  return <PolicyLayout policy={refundPolicy} />;
}
