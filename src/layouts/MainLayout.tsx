import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ScrollToTop } from '../components/layout/ScrollToTop';
import { DeltaCursor } from '../components/cursor/DeltaCursor';
import { SeoStructuredData } from '../components/seo/SeoStructuredData';
import { useSeo } from '../hooks/useSeo';

export function MainLayout() {
  const location = useLocation();
  useSeo();

  return (
    <div className="min-h-screen flex flex-col bg-brand-navy text-brand-light">
      <SeoStructuredData />
      <DeltaCursor />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="sync">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
