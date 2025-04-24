
import React, { useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import CertificateGenerator from '@/components/CertificateGenerator';
import { usePartners } from '@/contexts/PartnersContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const PartnerCertificatePage = () => {
  const { currentPartner, getPartnerById } = usePartners();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Refresh partner data to ensure we have the latest test_passed status
    const refreshPartnerData = async () => {
      if (currentPartner?.id) {
        try {
          await getPartnerById(currentPartner.id);
        } catch (error) {
          console.error("Error refreshing partner data:", error);
        }
      }
    };
    
    refreshPartnerData();
  }, [currentPartner?.id, getPartnerById]);
  
  if (!currentPartner) {
    return <Navigate to="/login" />;
  }
  
  if (!currentPartner.testPassed) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Для получения сертификата необходимо пройти тест</h1>
          <p className="text-gray-600 mb-8">
            Чтобы получить доступ к сертификату, вам необходимо успешно пройти тест для партнеров S3.
          </p>
          <Button 
            onClick={() => navigate('/dashboard/test')}
            className="bg-gradient-to-r from-certificate-blue to-certificate-darkBlue"
          >
            Пройти тест
          </Button>
        </div>
      </DashboardLayout>
    );
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
