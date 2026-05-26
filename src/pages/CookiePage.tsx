import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { PolicyLayout } from '../components/ui/PolicyLayout';
import { cookiePolicy } from '../content/policies';

export function CookiePage() {
  usePageTitle('Cookie Policy');
  return <PolicyLayout policy={cookiePolicy} />;
}
