
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Trophy } from 'lucide-react';
import PartnerLevelProgress from '@/components/PartnerLevelProgress';
import { Client } from '@/types';
import NotificationsPanel from '@/components/NotificationsPanel';
import { supabase } from '@/integrations/supabase/client';
import DashboardStats from '@/components/dashboard/DashboardStats';
import QuickActions from '@/components/dashboard/QuickActions';
import { usePartners } from '@/contexts/PartnersContext';

const DashboardPage = () => {
  const { currentPartner, refreshPartnerLevel, partnerLevel } = usePartners();
  const [clients, setClients] = useState<Client[]>([]);
  
  useEffect(() => {
    if (currentPartner?.id) {
      refreshPartnerLevel(currentPartner.id);
      fetchPartnerClients(currentPartner.id);
    }
  }, [currentPartner?.id, refreshPartnerLevel]);
  
  const fetchPartnerClients = async (partnerId: string) => {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select(`
          *,
          payments(*)
        `)
        .eq("partner_id", partnerId);
      
      if (error) {
        console.error("Error fetching clients:", error);
      } else {
        setClients(data || []);
      }
    } catch (error) {
      console.error("Error fetching partner clients:", error);
    }
  };
  
  if (!currentPartner) {
    return <div>Загрузка...</div>;
  }
  
  const totalCommission = clients.reduce((total, client) => {
    const clientTotal = client.payments?.reduce((sum, payment) => {
      return sum + (payment.status === 'оплачено' ? (payment.commissionAmount || payment.commission_amount || 0) : 0);
    }, 0) || 0;
    return total + clientTotal;
  }, 0);
  
  const clientCount = clients.length || 0;
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Добро пожаловать, {currentPartner?.contactPerson || currentPartner?.contact_person}!
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">
            Ваш партнерский уровень: 
          </span>
          <span className="font-semibold">
            {currentPartner?.partnerLevel || currentPartner?.partner_level}
          </span>
        </div>
      </div>
      
      <PartnerLevelProgress className="mb-8" />
      
      {partnerLevel && partnerLevel.progress === 0 && partnerLevel.level !== "Бронзовый" && (
        <Alert className="mb-8 border-green-500 bg-green-50">
          <Trophy className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-700">Поздравляем!</AlertTitle>
          <AlertDescription className="text-green-600">
            Вы достигли нового уровня: <strong>{partnerLevel.level}</strong>! 
            Ваша комиссия с платежей увеличена до <strong>{partnerLevel.commission}%</strong>.
          </AlertDescription>
        </Alert>
      )}

      <DashboardStats 
        clientCount={clientCount}
        totalCommission={totalCommission}
        testPassed={currentPartner?.testPassed || currentPartner?.test_passed}
      />
      
      <QuickActions 
        testPassed={currentPartner?.testPassed || currentPartner?.test_passed || false}
        showLevelUpHint={!!(partnerLevel && partnerLevel.progress >= 50 && partnerLevel.nextLevelAt)}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <NotificationsPanel />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
