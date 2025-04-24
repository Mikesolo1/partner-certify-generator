
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
import PaymentDetailsForm from '@/components/PaymentDetailsForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { safeRPC } from '@/api/utils/queryHelpers';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { currentPartner, refreshPartnerLevel } = usePartners();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [latestPaymentDate, setLatestPaymentDate] = useState<string | undefined>();
  const [showPaymentError, setShowPaymentError] = useState(false);
  const { toast } = useToast();
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

  const handlePaymentDetailsClick = () => {
    navigate('/dashboard/payment-details');
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
  
  const handleSubmitPaymentDetails = async (data: any) => {
    try {
      setIsSaving(true);
      setShowPaymentError(false);
      console.log("Saving payment details:", data);
      
      const { data: response, error } = await safeRPC('save_partner_payment_details', {
        p_partner_id: currentPartner.id,
        p_payment_type: data.payment_type,
        p_details: data.details,
        p_is_primary: true
      }, { 
        retries: 3,
        delay: 1000,
        timeoutMs: 15000
      });

      if (error) {
        console.error('Error saving payment details:', error);
        setShowPaymentError(true);
        toast({
          title: "Ошибка",
          description: `Не удалось сохранить реквизиты: ${error.message || 'Неизвестная ошибка'}`,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Успешно",
        description: "Реквизиты для выплат сохранены",
      });
    } catch (error: any) {
      console.error('Error saving payment details:', error);
      setShowPaymentError(true);
      toast({
        title: "Ошибка",
        description: `Не удалось сохранить реквизиты: ${error.message || 'Неизвестная ошибка'}`,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
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
            {currentPartnerLevel}
          </span>
        </div>
      </div>
      
      <PartnerLevelProgress className="mb-8" />
      
      <DashboardStats 
        clientCount={clientCount}
        totalCommission={totalCommission}
        testPassed={testPassed}
        latestPaymentDate={latestPaymentDate}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="h-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Реквизиты для выплат</CardTitle>
            <button 
              onClick={handlePaymentDetailsClick} 
              className="text-sm text-blue-600 hover:underline"
            >
              Подробнее
            </button>
          </CardHeader>
          <CardContent>
            {showPaymentError && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Ошибка сохранения реквизитов</AlertTitle>
                <AlertDescription>
                  Пожалуйста, попробуйте снова или обратитесь в поддержку
                </AlertDescription>
              </Alert>
            )}
            <PaymentDetailsForm 
              onSubmit={handleSubmitPaymentDetails}
              isLoading={isSaving}
            />
          </CardContent>
        </Card>
        
        <QuickActions 
          testPassed={testPassed}
          showLevelUpHint={false}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <NotificationsPanel />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
