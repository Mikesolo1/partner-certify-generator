
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { ClientsList } from '@/components/admin/ClientsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminData } from '@/hooks/useAdminData';
import { PartnerPaymentDetails } from '@/components/admin/PartnerPaymentDetails';
import { Partner } from '@/types';
import { PartnerHeader } from '@/components/admin/PartnerHeader';
import { PartnerInfo } from '@/components/admin/PartnerInfo';
import { ErrorDisplay } from '@/components/admin/ErrorDisplay';
import { safeRPC } from '@/api/utils/queryHelpers';

const AdminPartnerDetailsPage = () => {
  const { partnerId } = useParams();
  const { clients, payments, loading: adminDataLoading } = useAdminData();
  const { toast } = useToast();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    const fetchPartnerDetails = async () => {
      if (!partnerId) return;
      
      try {
        setLoading(true);
        console.log("Fetching partner details for ID:", partnerId);

        // Updated to include delay property
        const { data, error: rpcError } = await safeRPC(
          'get_partner_by_id', 
          { p_id: partnerId },
          { 
            retries: 2, 
            delay: 1000 // Add a 1-second delay between retries
          }
        );

        if (rpcError) {
          console.error("RPC Error fetching partner:", rpcError);
          setError(`Ошибка загрузки: ${rpcError.message}`);
          setDebugInfo({
            method: 'RPC get_partner_by_id',
            error: rpcError
          });
          
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
          setDebugInfo({
            method: 'Data check',
            error: 'No data returned',
            partnerId
          });
          
          toast({
            title: "Ошибка",
            description: "Партнер не найден в базе данных",
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
        setDebugInfo(null);
      } catch (err: any) {
        console.error("Exception in fetchPartnerDetails:", err);
        setError(`Критическая ошибка: ${err.message || "Неизвестная ошибка"}`);
        setDebugInfo({
          method: 'Exception',
          error: err
        });
        
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
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="h-12 w-12 border-4 border-t-blue-600 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold mb-2">Загрузка данных партнера...</h2>
              <p className="text-gray-500">ID: {partnerId}</p>
              <p className="text-gray-500 text-sm mt-4">Пожалуйста, подождите</p>
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
          <ErrorDisplay 
            error={error || "Партнер не найден"} 
            partnerId={partnerId}
            debugInfo={debugInfo}
          />
        </div>
      </div>
    );
  }

  const partnerClients = clients.filter(client => client.partner_id === partnerId);
  const getClientPayments = (clientId: string) => {
    return payments.filter(payment => payment.client_id === clientId);
  };

  return (
    <div className="min-h-screen bg-brand-light">
      <Header />
      <div className="container mx-auto px-4 py-12">
        {loading || adminDataLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="h-12 w-12 border-4 border-t-blue-600 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold mb-2">Загрузка данных партнера...</h2>
              <p className="text-gray-500">ID: {partnerId}</p>
              <p className="text-gray-500 text-sm mt-4">Пожалуйста, подождите</p>
            </div>
          </div>
        ) : error || !partner ? (
          <ErrorDisplay 
            error={error || "Партнер не найден"} 
            partnerId={partnerId}
            debugInfo={debugInfo}
          />
        ) : (
          <>
            <PartnerHeader partner={partner} />
            <div className="grid gap-6">
              <PartnerInfo partner={partner} />
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
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPartnerDetailsPage;
