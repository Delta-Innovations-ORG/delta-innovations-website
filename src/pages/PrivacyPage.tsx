import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { PolicyLayout } from '../components/ui/PolicyLayout';
import { privacyPolicy } from '../content/policies';

export function PrivacyPage() {
  usePageTitle('Privacy Policy');
  return <PolicyLayout policy={privacyPolicy} />;
}
