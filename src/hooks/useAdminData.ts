
import { useState } from 'react';
import { supabase, retryQuery, safeQuery } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Partner, Client, Payment, TestQuestion } from '@/types';
import { fetchPartners } from '@/api/partnersApi';

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
      
      // Используем функцию fetchPartners, которая уже есть в API
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
        // Не прерываем выполнение, загружаем другие данные
      }
      
      // Загружаем клиентов напрямую из таблицы
      try {
        const { data: clientData, error: clientError } = await retryQuery(() => 
          supabase.from("clients").select("*")
        );
        
        if (clientError) {
          console.error("Ошибка загрузки клиентов:", clientError);
        } else if (clientData) {
          const formattedClients = clientData.map(c => ({
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
        // Не прерываем выполнение, загружаем другие данные
      }
      
      // Загружаем платежи напрямую из таблицы
      try {
        const { data: paymentData, error: paymentError } = await retryQuery(() => 
          supabase.from("payments").select("*")
        );
          
        if (paymentError) {
          console.error("Ошибка загрузки платежей:", paymentError);
        } else if (paymentData) {
          const formattedPayments = paymentData.map(p => ({
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
        // Не прерываем выполнение, загружаем другие данные
      }
      
      // Загружаем вопросы теста напрямую из таблицы
      try {
        const { data: questionsData, error: questionsError } = await retryQuery(() => 
          supabase.from("test_questions").select("*")
        );
          
        if (questionsError) {
          console.error("Ошибка загрузки вопросов теста:", questionsError);
        } else if (questionsData) {
          const formattedQuestions = questionsData.map(q => ({
            id: q.id,
            question: q.question,
            options: q.options,
            correctAnswer: q.correct_answer
          }));
          setTestQuestions(formattedQuestions);
        }
      } catch (error) {
        console.error("Ошибка загрузки вопросов теста:", error);
        // Не прерываем выполнение, загружаем другие данные
      }
      
      // Загружаем уведомления напрямую из таблицы
      try {
        const { data: notificationsData, error: notificationsError } = await retryQuery(() => 
          supabase.from("notifications").select("*").order('created_at', { ascending: false })
        );
          
        if (notificationsError) {
          console.error("Ошибка загрузки уведомлений:", notificationsError);
        } else if (notificationsData) {
          setNotifications(notificationsData);
        }
      } catch (error) {
        console.error("Ошибка загрузки уведомлений:", error);
        // Не прерываем выполнение, загружаем другие данные
      }
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
