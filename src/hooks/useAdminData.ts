
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Partner, Client, Payment, TestQuestion, Notification } from '@/types';
import { fetchPartners } from '@/api/partnersApi';
import { safeRPC } from '@/api/utils/queryHelpers';

export const useAdminData = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      setFetchError(null);
      
      const [partnersResult, clientsResult, paymentsResult, questionsResult, notificationsResult] = 
        await Promise.all([
          fetchAllPartners(),
          safeRPC('get_all_clients'),
          safeRPC('get_all_payments'),
          safeRPC('get_all_test_questions'),
          safeRPC('get_all_notifications')
        ]);

      if (partnersResult) {
        setPartners(partnersResult);
      }

      if (clientsResult.data) {
        console.log("Loaded clients:", clientsResult.data.length);
        setClients(clientsResult.data);
      }

      if (paymentsResult.data) {
        console.log("Loaded payments:", paymentsResult.data.length);
        setPayments(paymentsResult.data);
      }

      if (questionsResult.data) {
        const formattedQuestions: TestQuestion[] = questionsResult.data.map((q: any) => ({
          id: q.id,
          question: q.question,
          options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
          correctAnswer: q.correct_answer
        }));
        setTestQuestions(formattedQuestions);
      }

      if (notificationsResult.data) {
        const formattedNotifications: Notification[] = notificationsResult.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          content: item.content,
          images: item.images ? (typeof item.images === 'string' ? JSON.parse(item.images) : item.images) : [],
          created_at: item.created_at,
          updated_at: item.updated_at
        }));
        setNotifications(formattedNotifications);
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
