import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PageBackBar } from '../components/ui/PageBackBar';
import { ScrollToTop } from '../components/layout/ScrollToTop';
import { DeltaCursor } from '../components/cursor/DeltaCursor';
import { SeoStructuredData } from '../components/seo/SeoStructuredData';
import { useSeo } from '../hooks/useSeo';

export function MainLayout() {
  useSeo();

  return (
    <div className="min-h-screen flex flex-col bg-brand-navy text-brand-light">
      <SeoStructuredData />
      <DeltaCursor />
      <ScrollToTop />
      <Navbar />
      <PageBackBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
