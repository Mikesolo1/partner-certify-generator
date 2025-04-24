
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAdminData } from '@/hooks/useAdminData';
import { Partner } from '@/types';
import { safeRPC } from '@/api/utils/queryHelpers';
import { PartnerDetailsLoading } from '@/components/admin/partner-details/PartnerDetailsLoading';
import { PartnerDetailsError } from '@/components/admin/partner-details/PartnerDetailsError';
import { PartnerDetailsContent } from '@/components/admin/partner-details/PartnerDetailsContent';

const AdminPartnerDetailsPage = () => {
  const { partnerId } = useParams();
  const { clients, payments, loading: adminDataLoading, fetchData } = useAdminData();
  const { toast } = useToast();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPartnerDetails = async () => {
    if (!partnerId) return;
    
    try {
      setLoading(true);
      console.log("Fetching partner details for ID:", partnerId);

      const { data, error: rpcError } = await safeRPC(
        'get_partner_by_id', 
        { p_id: partnerId },
        { retries: 3, delay: 1500 }
      );

      if (rpcError) {
        console.error("RPC Error fetching partner:", rpcError);
        setError(`Ошибка загрузки: ${rpcError.message}`);
        setDebugInfo({
          method: 'RPC get_partner_by_id',
          error: rpcError,
          partnerId
        });
        
        toast({
          title: "Ошибка",
          description: `Не удалось загрузить данные партнера: ${rpcError.message}`,
          variant: "destructive"
        });
        return;
      }

      // Add additional debug logging
      console.log("Partner data response:", data);
      
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
      console.log("Partner data found:", partnerData);
      
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
        error: err,
        partnerId
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

  useEffect(() => {
    console.log("AdminPartnerDetailsPage mounted with partnerId:", partnerId);
    fetchPartnerDetails();
    // Fetch admin data on mount to ensure we have clients and payments
    fetchData();
  }, [partnerId]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchPartnerDetails(), fetchData()]);
    setRefreshing(false);
    
    toast({
      title: "Данные обновлены",
      description: "Информация о партнере успешно обновлена"
    });
  };
  
  if (!partnerId) {
    console.error("No partnerId provided in URL");
    return <Navigate to="/admin" />;
  }

  if (loading || adminDataLoading) {
    return <PartnerDetailsLoading partnerId={partnerId} />;
  }

  if (error || !partner) {
    console.error("Error or no partner data:", error, partner);
    return (
      <PartnerDetailsError 
        error={error} 
        partnerId={partnerId}
        debugInfo={debugInfo}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    );
  }

  // Add additional logging before rendering content
  console.log("Rendering partner details content for:", partner.companyName);
  console.log("Available clients:", clients.length);
  
  const partnerClients = clients.filter(client => client.partner_id === partnerId);
  console.log("Filtered partner clients:", partnerClients.length);
  
  const getClientPayments = (clientId: string) => {
    return payments.filter(payment => payment.client_id === clientId);
  };

  return (
    <PartnerDetailsContent 
      partner={partner}
      partnerClients={partnerClients}
      partnerId={partnerId}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      getClientPayments={getClientPayments}
    />
  );
};

export default AdminPartnerDetailsPage;
