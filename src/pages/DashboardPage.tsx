
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
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (currentPartner?.id) {
      const loadData = async () => {
        try {
          await refreshPartnerLevel(currentPartner.id);
          await fetchPartnerClients(currentPartner.id);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadData();
    } else {
      setIsLoading(false);
    }
  }, [currentPartner?.id, refreshPartnerLevel]);
  
  const fetchPartnerClients = async (partnerId: string) => {
    try {
      console.log("Fetching clients for partner:", partnerId);
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
        console.log("Clients fetched:", data);
        setClients(data || []);
      }
    } catch (error) {
      console.error("Error fetching partner clients:", error);
    }
  };
  
  if (isLoading) {
    return <DashboardLayout>
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Загрузка данных...</p>
      </div>
    </DashboardLayout>;
  }
  
  if (!currentPartner) {
    return <DashboardLayout>
      <div className="p-6 bg-red-50 border border-red-200 rounded-md">
        <h2 className="text-xl font-bold text-red-700 mb-2">Ошибка сессии</h2>
        <p className="text-red-600">Сессия не найдена. Пожалуйста, войдите в систему снова.</p>
      </div>
    </DashboardLayout>;
  }
  
  const totalCommission = clients.reduce((total, client) => {
    const clientTotal = client.payments?.reduce((sum, payment) => {
      return sum + (payment.status === 'оплачено' ? (payment.commissionAmount || 0) : 0);
    }, 0) || 0;
    return total + clientTotal;
  }, 0);
  
  const clientCount = clients.length || 0;
  
  const contactPersonName = currentPartner.contactPerson || 'партнер';
  const partnerLevel = currentPartner.partnerLevel || 'Бронзовый';
  const testPassed = currentPartner.testPassed || false;
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Добро пожаловать, {contactPersonName}!
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">
            Ваш партнерский уровень: 
          </span>
          <span className="font-semibold">
            {partnerLevel}
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
        testPassed={testPassed}
      />
      
      <QuickActions 
        testPassed={testPassed}
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
