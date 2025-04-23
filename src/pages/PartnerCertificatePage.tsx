
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import CertificateGenerator from '@/components/CertificateGenerator';
import { usePartners } from '@/contexts/PartnersContext';
import { Navigate } from 'react-router-dom';

const PartnerCertificatePage = () => {
  const { currentPartner } = usePartners();
  
  if (!currentPartner?.testPassed) {
    return <Navigate to="/dashboard/test" />;
  }
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Ваш сертификат S3</h1>
        <p className="text-gray-600">
          Здесь вы можете просмотреть и скачать ваш сертификат официального партнера S3
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <CertificateGenerator partner={currentPartner} />
      </div>
    </DashboardLayout>
  );
};

export default PartnerCertificatePage;
