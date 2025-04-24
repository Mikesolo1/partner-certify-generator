
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
import { ArrowLeft, AlertCircle } from 'lucide-react';
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
        console.log("Fetching partner details for ID:", partnerId);
        
        // Using the secure RPC function to bypass RLS
        const { data, error: rpcError } = await supabase
          .rpc('get_partner_by_id', { p_id: partnerId });

        if (rpcError) {
          console.error("RPC Error fetching partner:", rpcError);
          setError(`Ошибка загрузки: ${rpcError.message}`);
          toast({
            title: "Ошибка",
            description: `Не удалось загрузить данные партнера: ${rpcError.message}`,
            variant: "destructive"
          });
          return;
        }

        if (!data || data.length === 0) {
          console.error("No partner data returned for ID:", partnerId);
          setError("Партнер не найден в базе данных");
          toast({
            title: "Ошибка",
            description: "Партнер не найден в базе данных",
            variant: "destructive"
          });
          return;
        }

        console.log("Partner data received:", data[0]);
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
      } catch (err: any) {
        console.error("Exception in fetchPartnerDetails:", err);
        setError(`Критическая ошибка: ${err.message || "Неизвестная ошибка"}`);
        toast({
          title: "Критическая ошибка",
          description: err.message || "Произошла неизвестная ошибка",
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
          <Button variant="outline" asChild className="mb-4">
            <Link to="/admin">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Вернуться к списку
            </Link>
          </Button>
          
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="h-12 w-12 border-4 border-t-blue-600 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold mb-2">Загрузка данных партнера...</h2>
              <p className="text-gray-500">Пожалуйста, подождите</p>
            </div>
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
            
            <div className="p-6 bg-white rounded-lg shadow-sm border border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <h1 className="text-2xl font-bold text-red-600">Ошибка</h1>
              </div>
              <p className="text-lg mb-2">{error || "Партнер не найден"}</p>
              <p className="text-gray-500">Проверьте ID партнера или повторите попытку позже</p>
              <p className="text-gray-500 text-sm mt-4">ID: {partnerId}</p>
            </div>
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
