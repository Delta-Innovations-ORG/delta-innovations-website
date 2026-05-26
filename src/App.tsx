import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { RefundPage } from './pages/RefundPage';
import { SecurityPage } from './pages/SecurityPage';
import { CodeOfConductPage } from './pages/CodeOfConductPage';
import { RequirementsPage } from './pages/RequirementsPage';
import { CookiePage } from './pages/CookiePage';
import { ChangeRequestPage } from './pages/ChangeRequestPage';

export function App() {
  return (
    <BrowserRouter>
      <SpeedInsights />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/refund" element={<RefundPage />} />
          <Route path="/cookies" element={<CookiePage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/code-of-conduct" element={<CodeOfConductPage />} />
          <Route path="/change-requests" element={<ChangeRequestPage />} />
          <Route path="/requirements" element={<RequirementsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
