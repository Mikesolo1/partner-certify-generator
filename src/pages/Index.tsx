
import React from 'react';
import { usePartners } from '@/contexts/PartnersContext';
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
  const { loading } = usePartners();

  // Если идет загрузка, показываем загрузку
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Загрузка...</p>
      </div>
    );
  }

  // Показываем лендинг для всех пользователей
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="overflow-hidden">
        <HeroSection />
        <div id="about">
          <CompanySection />
        </div>
        <div id="services">
          <WabaInfoSection />
          <CommissionSection />
        </div>
        <div id="benefits">
          <BenefitsSection />
          <PartnerBenefitsSection />
        </div>
        <FinalCTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
