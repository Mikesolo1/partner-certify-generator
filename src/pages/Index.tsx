
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/landing/HeroSection';
import WabaInfoSection from '@/components/landing/WabaInfoSection';
import CommissionSection from '@/components/landing/CommissionSection';
import CompanySection from '@/components/landing/CompanySection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import PartnerBenefitsSection from '@/components/landing/PartnerBenefitsSection';
import FinalCTASection from '@/components/landing/FinalCTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div>
        <HeroSection />
        <WabaInfoSection />
        <CommissionSection />
        <CompanySection />
        <BenefitsSection />
        <PartnerBenefitsSection />
        <FinalCTASection />
      </div>
    </div>
  );
};

export default Index;
