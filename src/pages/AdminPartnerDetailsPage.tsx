
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

  console.log("AdminPartnerDetailsPage component mounted");
  console.log("URL partnerId from useParams:", partnerId);
  console.log("Current window location:", window.location.href);

  const fetchPartnerDetails = async () => {
    if (!partnerId) {
      console.error("No partnerId provided");
      setError("ID партнера не предоставлен");
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      console.log("Fetching partner details for ID:", partnerId);

      // Исправляем вызов RPC функции - используем правильное имя параметра
      const { data, error: rpcError } = await safeRPC(
        'get_partner_by_id', 
        { p_id: partnerId },
        { retries: 3, delay: 1500 }
      );

      console.log("RPC call result:", { data, error: rpcError });

      if (rpcError) {
        console.error("RPC Error fetching partner:", rpcError);
        setError(`Ошибка загрузки: ${rpcError.message || rpcError.toString()}`);
        setDebugInfo({
          method: 'RPC get_partner_by_id',
          error: rpcError,
          partnerId,
          errorCode: rpcError.code,
          errorDetails: rpcError.details
        });
        
        toast({
          title: "Ошибка",
          description: `Не удалось загрузить данные партнера: ${rpcError.message || 'Неизвестная ошибка'}`,
          variant: "destructive"
        });
        return;
      }

      console.log("Partner data response:", data);
      
      if (!data || data.length === 0) {
        console.error("No partner data returned for ID:", partnerId);
        setError("Партнер не найден в базе данных");
        setDebugInfo({
          method: 'Data validation',
          error: 'No data returned',
          partnerId,
          responseData: data
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
      
      // Проверяем наличие обязательных полей
      if (!partnerData.id || !partnerData.company_name) {
        console.error("Invalid partner data structure:", partnerData);
        setError("Некорректные данные партнера");
        setDebugInfo({
          method: 'Data structure validation',
          error: 'Missing required fields',
          partnerId,
          partnerData
        });
        return;
      }
      
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
        phone: partnerData.phone || '',
        referrerId: partnerData.referrer_id,
        referralCode: partnerData.referral_code
      });
      
      setError(null);
      setDebugInfo(null);
      console.log("Partner successfully loaded:", partnerData.company_name);
    } catch (err: any) {
      console.error("Exception in fetchPartnerDetails:", err);
      setError(`Критическая ошибка: ${err.message || "Неизвестная ошибка"}`);
      setDebugInfo({
        method: 'Exception handler',
        error: err,
        partnerId,
        stack: err.stack,
        name: err.name
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
    console.log("useEffect triggered with partnerId:", partnerId);
    if (partnerId) {
      // Проверяем валидность UUID
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(partnerId)) {
        console.error("Invalid UUID format:", partnerId);
        setError("Некорректный формат ID партнера");
        setLoading(false);
        return;
      }
      
      fetchPartnerDetails();
      fetchData();
    } else {
      console.error("partnerId is undefined in useEffect");
      setError("ID партнера не предоставлен");
      setLoading(false);
    }
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
    console.error("No partnerId provided in URL params");
    return <Navigate to="/admin" replace />;
  }

  if (loading || adminDataLoading) {
    console.log("Showing loading state");
    return <PartnerDetailsLoading partnerId={partnerId} />;
  }

  if (error || !partner) {
    console.error("Showing error state:", { error, hasPartner: !!partner });
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
