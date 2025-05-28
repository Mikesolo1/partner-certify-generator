
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { usePartners } from '@/contexts/PartnersContext';
import CertificateGenerator from '@/components/CertificateGenerator';
import Header from '@/components/Header';
import { Partner } from '@/types';

const CertificatePage = () => {
  const { id } = useParams<{ id: string }>();
  const { getPartnerById } = usePartners();
  const navigate = useNavigate();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchPartner = async () => {
      if (id) {
        try {
          const partnerData = await getPartnerById(id);
          setPartner(partnerData);
        } catch (error) {
          console.error("Error fetching partner:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchPartner();
  }, [id, getPartnerById]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header variant="light" />
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!partner) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header variant="light" />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Partner Not Found</h1>
          <p className="text-gray-600 mb-6">The partner you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/partners')}
            className="text-certificate-blue hover:underline"
          >
            Return to Partners
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="light" />
      
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/partners')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Partners
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Certificate for {partner.companyName || partner.company_name}
              </CardTitle>
              <CardDescription>
                Сертифицированный партнер - Certificate ID: {partner.certificateId || partner.certificate_id}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CertificateGenerator partner={partner} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
