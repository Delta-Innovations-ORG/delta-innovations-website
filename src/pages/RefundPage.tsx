import React from 'react';
import { PolicyLayout } from '../components/ui/PolicyLayout';
import { refundPolicy } from '../content/policies';

export function RefundPage() {
  return <PolicyLayout policy={refundPolicy} />;
}
