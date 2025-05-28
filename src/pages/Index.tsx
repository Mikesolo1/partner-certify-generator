
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/landing/HeroSection';
import WabaInfoSection from '@/components/landing/WabaInfoSection';
import CommissionSection from '@/components/landing/CommissionSection';
import CompanySection from '@/components/landing/CompanySection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import PartnerBenefitsSection from '@/components/landing/PartnerBenefitsSection';
import FinalCTASection from '@/components/landing/FinalCTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="overflow-hidden">
        <HeroSection />
        <WabaInfoSection />
        <CommissionSection />
        <CompanySection />
        <BenefitsSection />
        <PartnerBenefitsSection />
        <FinalCTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
