import React from 'react';
import { Header } from '@/components/trading-championship/Header';
import { HeroSection } from '@/components/trading-championship/HeroSection';
import { AboutSection } from '@/components/trading-championship/AboutSection';
import { RankingSection } from '@/components/trading-championship/RankingSection';
import { HowItWorksSection } from '@/components/trading-championship/HowItWorksSection';
import { PrizesSection } from '@/components/trading-championship/PrizesSection';
import { Footer } from '@/components/trading-championship/Footer';

/**
 * A page component that serves as the main landing page for the Trading Championship.
 *
 * This component assembles the various sections of the page in the correct
 * order, including the header, hero section, about section, ranking, how it
 * works, prizes, and the footer. It acts as the primary layout container for
 * the championship's public-facing content.
 *
 * @returns {JSX.Element} The fully assembled Trading Championship landing page.
 */
export default function TradingChampionship() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <RankingSection />
        <HowItWorksSection />
        <PrizesSection />
      </main>
      <Footer />
    </div>
  );
}