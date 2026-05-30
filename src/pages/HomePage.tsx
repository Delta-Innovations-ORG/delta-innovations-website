import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustBar } from '../components/home/TrustBar';
import { TechStackMarquee } from '../components/home/TechStackMarquee';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { HowWeWork } from '../components/home/HowWeWork';
import { PortfolioSection } from '../components/home/PortfolioSection';
import { TeamSection } from '../components/home/TeamSection';
import { ClientReviewsSection } from '../components/home/ClientReviewsSection';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { CtaSection } from '../components/home/CtaSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <TechStackMarquee />
      <ServicesPreview />
      <HowWeWork />
      <PortfolioSection />
      <TeamSection preview />
      <ClientReviewsSection />
      <WhyChooseUsSection />
      <CtaSection />
    </>
  );
}
