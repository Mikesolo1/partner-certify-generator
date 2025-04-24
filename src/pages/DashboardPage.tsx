
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Client } from '@/types';
import NotificationsPanel from '@/components/NotificationsPanel';
import { usePartners } from '@/contexts/PartnersContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStatistics from '@/components/dashboard/DashboardStatistics';
import PaymentDetailsCard from '@/components/dashboard/PaymentDetailsCard';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { currentPartner, refreshPartnerLevel } = usePartners();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [latestPaymentDate, setLatestPaymentDate] = useState<string | undefined>();
  const navigate = useNavigate();
  
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

  useEffect(() => {
    const findLatestPaymentDate = () => {
      let latestDate: Date | undefined;
      
      clients.forEach(client => {
        client.payments?.forEach(payment => {
          if (payment.status === 'оплачено') {
            const paymentDate = new Date(payment.date);
            if (!latestDate || paymentDate > latestDate) {
              latestDate = paymentDate;
            }
          }
        });
      });
      
      if (latestDate) {
        setLatestPaymentDate(latestDate.toISOString());
      }
    };

    findLatestPaymentDate();
  }, [clients]);
  
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
      return sum + (payment.status === 'оплачено' ? (payment.commission_amount || 0) : 0);
    }, 0) || 0;
    return total + clientTotal;
  }, 0);
  
  const clientCount = clients.length || 0;
  const contactPersonName = currentPartner.contactPerson || currentPartner.contact_person || 'партнер';
  const currentPartnerLevel = currentPartner.partnerLevel || currentPartner.partner_level || 'Бронзовый';
  const testPassed = currentPartner.testPassed || currentPartner.test_passed || false;
  
  return (
    <DashboardLayout>
      <DashboardHeader 
        contactPersonName={contactPersonName}
        currentPartnerLevel={currentPartnerLevel}
      />
      
      <DashboardStatistics
        clientCount={clientCount}
        totalCommission={totalCommission}
        testPassed={testPassed}
        latestPaymentDate={latestPaymentDate}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PaymentDetailsCard partnerId={currentPartner.id} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <NotificationsPanel />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
