import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConsentManager } from './components/consent/ConsentManager';
import { MainLayout } from './layouts/MainLayout';
import { MarketplaceLayout } from './layouts/MarketplaceLayout';
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
import { WorkplacePolicyPage } from './pages/WorkplacePolicyPage';

const TeamPage = lazy(() =>
  import('./pages/TeamPage').then((m) => ({ default: m.TeamPage })),
);
const ReviewsPage = lazy(() =>
  import('./pages/ReviewsPage').then((m) => ({ default: m.ReviewsPage })),
);
const InsightsPage = lazy(() =>
  import('./pages/InsightsPage').then((m) => ({ default: m.InsightsPage })),
);
const InsightDetailPage = lazy(() =>
  import('./pages/InsightDetailPage').then((m) => ({ default: m.InsightDetailPage })),
);
const MarketplacePage = lazy(() =>
  import('./pages/MarketplacePage').then((m) => ({ default: m.MarketplacePage })),
);
const MarketplaceDetailPage = lazy(() =>
  import('./pages/MarketplaceDetailPage').then((m) => ({ default: m.MarketplaceDetailPage })),
);
const SignInPage = lazy(() =>
  import('./pages/SignInPage').then((m) => ({ default: m.SignInPage })),
);
const SignUpPage = lazy(() =>
  import('./pages/SignUpPage').then((m) => ({ default: m.SignUpPage })),
);
const AccountPage = lazy(() =>
  import('./pages/AccountPage').then((m) => ({ default: m.AccountPage })),
);

function PageLoader() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center text-brand-muted text-sm">
      Loading…
    </div>
  );
}

export function App() {
  return (
    <>
      <ConsentManager />
      <Suspense fallback={<PageLoader />}>
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
            <Route path="/workplace-policy" element={<WorkplacePolicyPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:slug" element={<InsightDetailPage />} />
            <Route element={<MarketplaceLayout />}>
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/marketplace/:slug" element={<MarketplaceDetailPage />} />
            </Route>
            <Route path="/sign-in/*" element={<SignInPage />} />
            <Route path="/sign-up/*" element={<SignUpPage />} />
            <Route path="/account/*" element={<AccountPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
