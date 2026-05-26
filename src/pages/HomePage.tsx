import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { HeroSection } from '../components/home/HeroSection';
import { TrustBar } from '../components/home/TrustBar';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { HowWeWork } from '../components/home/HowWeWork';
import { PortfolioSection } from '../components/home/PortfolioSection';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { CtaSection } from '../components/home/CtaSection';

export function HomePage() {
  usePageTitle('Home');
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesPreview />
      <HowWeWork />
      <PortfolioSection />
      <WhyChooseUsSection />
      <CtaSection />
    </>
  );
}
