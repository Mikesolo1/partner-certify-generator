
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
  const { id } = useParams(); // Используем 'id' вместо 'partnerId'
  const { clients, payments, loading: adminDataLoading, fetchData } = useAdminData();
  const { toast } = useToast();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  console.log("AdminPartnerDetailsPage component mounted with id:", id);

  const fetchPartnerDetails = async (partnerId: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching partner details for ID:", partnerId);

      // Используем правильное имя параметра для RPC функции
      const { data, error: rpcError } = await safeRPC(
        'get_partner_by_id', 
        { p_id: partnerId },
        { retries: 2, delay: 1000 }
      );

      console.log("Partner data response:", { data, error: rpcError });

      if (rpcError) {
        console.error("RPC Error:", rpcError);
        setError(`Ошибка загрузки: ${rpcError.message}`);
        toast({
          title: "Ошибка",
          description: `Не удалось загрузить данные партнера: ${rpcError.message}`,
          variant: "destructive"
        });
        return;
      }

      if (!data || data.length === 0) {
        console.error("No partner data returned");
        setError("Партнер не найден");
        toast({
          title: "Ошибка",
          description: "Партнер не найден в базе данных",
          variant: "destructive"
        });
        return;
      }

      const partnerData = data[0];
      console.log("Setting partner data:", partnerData);
      
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
      
    } catch (err: any) {
      console.error("Exception in fetchPartnerDetails:", err);
      setError(`Критическая ошибка: ${err.message}`);
      toast({
        title: "Критическая ошибка",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered with id:", id);
    
    if (!id) {
      console.error("No id parameter in URL");
      setError("ID партнера не предоставлен");
      setLoading(false);
      return;
    }

    // Проверяем валидность UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      console.error("Invalid UUID format:", id);
      setError("Некорректный формат ID партнера");
      setLoading(false);
      return;
    }
    
    fetchPartnerDetails(id);
    fetchData();
  }, [id]);

  const handleRefresh = async () => {
    if (!id) return;
    
    setRefreshing(true);
    await Promise.all([fetchPartnerDetails(id), fetchData()]);
    setRefreshing(false);
    
    toast({
      title: "Данные обновлены",
      description: "Информация о партнере успешно обновлена"
    });
  };
  
  if (!id) {
    console.error("No id provided in URL params");
    return <Navigate to="/admin" replace />;
  }

  if (loading || adminDataLoading) {
    console.log("Showing loading state");
    return <PartnerDetailsLoading partnerId={id} />;
  }

  if (error || !partner) {
    console.error("Showing error state:", { error, hasPartner: !!partner });
    return (
      <PartnerDetailsError 
        error={error} 
        partnerId={id}
        debugInfo={null}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    );
  }

  console.log("Rendering partner details content for:", partner.companyName);
  
  const partnerClients = clients.filter(client => client.partner_id === id);
  console.log("Partner clients found:", partnerClients.length);
  
  const getClientPayments = (clientId: string) => {
    return payments.filter(payment => payment.client_id === clientId);
  };

  return (
    <PartnerDetailsContent 
      partner={partner}
      partnerClients={partnerClients}
      partnerId={id}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      getClientPayments={getClientPayments}
    />
  );
};

export default AdminPartnerDetailsPage;
