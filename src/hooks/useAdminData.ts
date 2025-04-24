
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Partner, Client, Payment, TestQuestion } from '@/types';
import { fetchPartners } from '@/api/partnersApi';
import { safeRPC } from '@/api/utils/queryHelpers';

export const useAdminData = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      setFetchError(null);
      
      // Загружаем все данные параллельно для лучшей производительности, используя безопасные RPC функции
      const [partnersResult, clientsResult, paymentsResult, questionsResult, notificationsResult] = 
        await Promise.all([
          fetchAllPartners(),
          safeRPC('get_all_clients'),
          safeRPC('get_all_payments'),
          safeRPC('get_all_test_questions'),
          safeRPC('get_all_notifications')
        ]);

      // Обрабатываем данные партнеров
      if (partnersResult) {
        setPartners(partnersResult);
      }

      // Обрабатываем данные клиентов
      if (clientsResult.data) {
        console.log("Loaded clients:", clientsResult.data.length);
        setClients(clientsResult.data);
      }

      // Обрабатываем данные платежей
      if (paymentsResult.data) {
        console.log("Loaded payments:", paymentsResult.data.length);
        setPayments(paymentsResult.data);
      }

      // Обрабатываем данные вопросов теста
      if (questionsResult.data) {
        setTestQuestions(questionsResult.data);
      }

      // Обрабатываем данные уведомлений
      if (notificationsResult.data) {
        setNotifications(notificationsResult.data);
      }

      setFetchError(null);
    } catch (error) {
      console.error("Непредвиденная ошибка:", error);
      setFetchError("Произошла непредвиденная ошибка при загрузке данных");
      toast({
        title: "Ошибка",
        description: "Произошла непредвиденная ошибка при загрузке данных",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Повторно используем существующую функцию fetchAllPartners, так как она уже работает
  const fetchAllPartners = async () => {
    try {
      const partnerData = await fetchPartners();
      if (partnerData) {
        return partnerData.map(p => ({
          id: p.id,
          companyName: p.company_name,
          contactPerson: p.contact_person,
          email: p.email,
          partnerLevel: p.partner_level,
          joinDate: p.join_date,
          certificateId: p.certificate_id,
          testPassed: p.test_passed,
          commission: p.commission,
          role: p.role,
          phone: p.phone || ''
        }));
      }
      return [];
    } catch (error) {
      console.error("Ошибка загрузки партнеров:", error);
      return [];
    }
  };

  return {
    partners,
    setPartners,
    clients,
    payments,
    testQuestions,
    setTestQuestions,
    notifications,
    setNotifications,
    loading,
    fetchError,
    fetchData
  };
};
