import React from 'react';
import AnnouncementBar from '@/components/AnnouncementBar';
import SiteHeader from '@/components/SiteHeader';
import HeroCampaignBanner from '@/components/HeroCampaignBanner';
import Top10Collections from '@/components/Top10Collections';
import WomenSection from '@/components/WomenSection';
import MenSection from '@/components/MenSection';
import ScentsSection from '@/components/ScentsSection';
import FeatureCampaignBanner from '@/components/FeatureCampaignBanner';
import TrustMetricsSection from '@/components/TrustMetricsSection';
import NewsletterSection from '@/components/NewsletterSection';
import BrandPurposeSection from '@/components/BrandPurposeSection';
import SiteFooter from '@/components/SiteFooter';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Announcement And Utility Bar */}
      <AnnouncementBar />

      {/* 2. Main Site Header */}
      <SiteHeader />

      <main className="flex-1">
        {/* 3. Hero Campaign Banner */}
        <HeroCampaignBanner />

        {/* 4. Top 10 Collections Nationwide */}
        <Top10Collections />

        {/* 5. Women Showcase */}
        <WomenSection />

        {/* 6. Men Showcase */}
        <MenSection />

        {/* 7. Scents Showcase */}
        <ScentsSection />

        {/* 8. Feature Campaign Banner: Chikankari */}
        <FeatureCampaignBanner />

        {/* 9. Trust & Metrics Banner */}
        <TrustMetricsSection />

        {/* 10. Newsletter Strip */}
        <NewsletterSection />

        {/* 11. Brand Purpose Statement */}
        <BrandPurposeSection />
      </main>

      {/* 12. Site Footer */}
      <SiteFooter />
    </div>
  );
}
