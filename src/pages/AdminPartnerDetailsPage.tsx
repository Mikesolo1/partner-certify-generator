
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { ClientsList } from '@/components/admin/ClientsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminData } from '@/hooks/useAdminData';
import { PartnerPaymentDetails } from '@/components/admin/PartnerPaymentDetails';
import { supabase } from "@/integrations/supabase/client";
import { Partner } from '@/types';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AdminPartnerDetailsPage = () => {
  const { partnerId } = useParams();
  const { clients, payments, loading: adminDataLoading } = useAdminData();
  const { toast } = useToast();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartnerDetails = async () => {
      if (!partnerId) return;
      
      try {
        setLoading(true);
        // Using the secure RPC function to bypass RLS
        const { data, error } = await supabase
          .rpc('get_partner_by_id', { p_id: partnerId });

        if (error) {
          console.error("Error fetching partner:", error);
          setError("Не удалось загрузить данные партнера");
          toast({
            title: "Ошибка",
            description: "Не удалось загрузить данные партнера",
            variant: "destructive"
          });
          return;
        }

        if (!data || data.length === 0) {
          setError("Партнер не найден");
          toast({
            title: "Ошибка",
            description: "Партнер не найден",
            variant: "destructive"
          });
          return;
        }

        const partnerData = data[0];
        setPartner({
          id: partnerData.id,
          companyName: partnerData.company_name,
          contactPerson: partnerData.contact_person,
          email: partnerData.email,
          partnerLevel: partnerData.partner_level,
          joinDate: partnerData.join_date,
          certificateId: partnerData.certificate_id,
          testPassed: partnerData.test_passed,
          commission: partnerData.commission,
          role: partnerData.role,
          phone: partnerData.phone || ''
        });
        setError(null);
      } catch (err) {
        console.error("Error in fetchPartnerDetails:", err);
        setError("Произошла ошибка при загрузке данных партнера");
        toast({
          title: "Ошибка",
          description: "Произошла ошибка при загрузке данных партнера",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerDetails();
  }, [partnerId, toast]);
  
  if (!partnerId) {
    return <Navigate to="/admin" />;
  }

  if (loading || adminDataLoading) {
    return (
      <div className="min-h-screen bg-brand-light">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Загрузка данных партнера...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error || !partner) {
    return (
      <div className="min-h-screen bg-brand-light">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <Button variant="outline" asChild className="mb-4">
              <Link to="/admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Вернуться к списку
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-red-600">{error || "Партнер не найден"}</h1>
          </div>
        </div>
      </div>
    );
  }

  const partnerClients = clients.filter(client => client.partner_id === partnerId);
  const getClientPayments = (clientId: string) => {
    return payments.filter(payment => payment.client_id === clientId);
  };

  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'admin':
        return <Badge className="bg-purple-600">Администратор</Badge>;
      case 'partner':
        return <Badge className="bg-blue-600">Партнер</Badge>;
      default:
        return <Badge className="bg-gray-600">Пользователь</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-brand-light">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button variant="outline" asChild className="mb-4">
            <Link to="/admin">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Вернуться к списку
            </Link>
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">
              {partner.companyName}
            </h1>
            {getRoleBadge(partner.role || 'partner')}
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-gray-600">
            <p>{partner.contactPerson} • {partner.email}</p>
            {partner.phone && <p>Телефон: {partner.phone}</p>}
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Информация о партнере</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Уровень партнера</p>
                  <p className="font-medium">{partner.partnerLevel}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Процент комиссии</p>
                  <p className="font-medium">{partner.commission}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Дата регистрации</p>
                  <p className="font-medium">{new Date(partner.joinDate).toLocaleDateString('ru-RU')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">ID сертификата</p>
                  <p className="font-medium">{partner.certificateId || 'Не выдан'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

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
