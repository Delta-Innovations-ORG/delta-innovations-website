import React from 'react';
import { PolicyLayout } from '../components/ui/PolicyLayout';
import { privacyPolicy } from '../content/policies';

export function PrivacyPage() {
  return <PolicyLayout policy={privacyPolicy} />;
}
