
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePartners } from '@/contexts/PartnersContext';
import PartnerForm from '@/components/PartnerForm';
import { Partner } from '@/types';
import Header from '@/components/Header';

const AddPartnerPage = () => {
  const { addPartner } = usePartners();
  const navigate = useNavigate();

  const handleAddPartner = (data: Partner) => {
    addPartner(data);
    navigate('/partners');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Add New Partner</CardTitle>
              <CardDescription>
                Enter the partner details to register them and generate a certificate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PartnerForm onSubmit={handleAddPartner} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddPartnerPage;
