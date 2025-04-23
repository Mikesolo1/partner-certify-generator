
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { usePartners } from '@/contexts/PartnersContext';
import PartnerForm from '@/components/PartnerForm';
import { Partner } from '@/types/partner';
import Header from '@/components/Header';

const EditPartnerPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getPartnerById, updatePartner } = usePartners();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const partner = id ? getPartnerById(id) : undefined;
  
  const handleUpdatePartner = (data: Partner) => {
    if (id) {
      updatePartner(id, data);
      navigate('/partners');
    }
  };
  
  if (!partner) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
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
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Edit Partner</CardTitle>
              <CardDescription>
                Update the details for {partner.companyName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PartnerForm 
                onSubmit={handleUpdatePartner}
                defaultValues={partner}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditPartnerPage;
