
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { ClientsList } from '@/components/admin/ClientsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminData } from '@/hooks/useAdminData';
import { PartnerPaymentDetails } from '@/components/admin/PartnerPaymentDetails';

const AdminPartnerDetailsPage = () => {
  const { partnerId } = useParams();
  const { partners, clients, payments, loading } = useAdminData();
  const { toast } = useToast();

  const partner = partners.find(p => p.id === partnerId);
  
  if (!partnerId) {
    return <Navigate to="/admin" />;
  }

  if (!partner) {
    toast({
      title: "Ошибка",
      description: "Партнер не найден",
      variant: "destructive"
    });
    return <Navigate to="/admin" />;
  }

  const partnerClients = clients.filter(client => client.partner_id === partnerId);
  const getClientPayments = (clientId: string) => {
    return payments.filter(payment => payment.client_id === clientId);
  };

  return (
    <div className="min-h-screen bg-brand-light">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Детали партнера: {partner.companyName || partner.company_name}
          </h1>
          <p className="text-gray-600">
            {partner.contactPerson || partner.contact_person} • {partner.email}
          </p>
        </div>

        <div className="grid gap-6">
          <PartnerPaymentDetails partnerId={partnerId} />

          <Card>
            <CardHeader>
              <CardTitle>Клиенты партнера</CardTitle>
            </CardHeader>
            <CardContent>
              <ClientsList
                clients={partnerClients}
                getClientPayments={getClientPayments}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPartnerDetailsPage;
