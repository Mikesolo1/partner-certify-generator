
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Partner, Client, Payment, TestQuestion } from '@/types';
import { fetchPartners } from '@/api/partnersApi';
import { simpleQuery } from "@/api/utils/queryHelpers";

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
      
      // Load all data in parallel for better performance
      await Promise.all([
        fetchAllPartners(),
        fetchAllClients(),
        fetchAllPayments(),
        fetchAllTestQuestions(),
        fetchAllNotifications()
      ]);
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

  // Split functions for better parallel execution and error isolation
  const fetchAllPartners = async () => {
    try {
      const partnerData = await fetchPartners();
      if (partnerData) {
        const formattedPartners = partnerData.map(p => ({
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
        setPartners(formattedPartners);
      }
    } catch (error) {
      console.error("Ошибка загрузки партнеров:", error);
    }
  };

  const fetchAllClients = async () => {
    try {
      // Используем RPC вызов вместо прямого запроса к таблице
      const { data, error } = await supabase.rpc("get_all_clients");
      
      if (error) {
        console.error("Ошибка загрузки клиентов:", error);
      } else if (data) {
        console.log("Loaded clients:", data.length);
        const formattedClients = data.map(c => ({
          id: c.id,
          name: c.name,
          email: c.email,
          phone: c.phone || '',
          registrationDate: c.registration_date,
          partner_id: c.partner_id
        }));
        setClients(formattedClients);
      }
    } catch (error) {
      console.error("Ошибка загрузки клиентов:", error);
    }
  };

  const fetchAllPayments = async () => {
    try {
      // Используем RPC вызов вместо прямого запроса к таблице
      const { data, error } = await supabase.rpc("get_all_payments");
        
      if (error) {
        console.error("Ошибка загрузки платежей:", error);
      } else if (data) {
        console.log("Loaded payments:", data.length);
        const formattedPayments = data.map(p => ({
          id: p.id,
          client_id: p.client_id,
          amount: p.amount,
          date: p.date,
          status: p.status,
          commission_amount: p.commission_amount
        }));
        setPayments(formattedPayments);
      }
    } catch (error) {
      console.error("Ошибка загрузки платежей:", error);
    }
  };

  const fetchAllTestQuestions = async () => {
    try {
      // Используем RPC вызов вместо прямого запроса к таблице
      const { data, error } = await supabase.rpc("get_all_test_questions");
        
      if (error) {
        console.error("Ошибка загрузки вопросов теста:", error);
      } else if (data) {
        const formattedQuestions = data.map(q => ({
          id: q.id,
          question: q.question,
          options: q.options,
          correctAnswer: q.correct_answer
        }));
        setTestQuestions(formattedQuestions);
      }
    } catch (error) {
      console.error("Ошибка загрузки вопросов теста:", error);
    }
  };

  const fetchAllNotifications = async () => {
    try {
      // Используем RPC вызов вместо прямого запроса к таблице
      const { data, error } = await supabase.rpc("get_all_notifications");
        
      if (error) {
        console.error("Ошибка загрузки уведомлений:", error);
      } else if (data) {
        setNotifications(data);
      }
    } catch (error) {
      console.error("Ошибка загрузки уведомлений:", error);
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
