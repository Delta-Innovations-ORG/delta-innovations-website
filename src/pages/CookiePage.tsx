import React from 'react';
import { PolicyLayout } from '../components/ui/PolicyLayout';
import { cookiePolicy } from '../content/policies';

export function CookiePage() {
  return <PolicyLayout policy={cookiePolicy} />;
}
