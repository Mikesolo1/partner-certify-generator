
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
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
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      
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
      
      const { data: clientData, error: clientError } = await supabase.rpc("get_all_clients");
      
      if (clientError) {
        console.error("Error fetching clients:", clientError);
        toast({
          title: "Ошибка загрузки",
          description: "Не удалось загрузить список клиентов",
          variant: "destructive",
        });
      } else {
        setClients(clientData || []);
      }
      
      const { data: paymentData, error: paymentError } = await supabase.rpc("get_all_payments");
        
      if (paymentError) {
        console.error("Error fetching payments:", paymentError);
      } else {
        setPayments(paymentData || []);
      }
      
      const { data: questionsData, error: questionsError } = await supabase.from("test_questions").select("*");
        
      if (questionsError) {
        console.error("Error fetching test questions:", questionsError);
      } else {
        const formattedQuestions = questionsData.map(q => ({
          id: q.id,
          question: q.question,
          options: q.options,
          correctAnswer: q.correct_answer
        }));
        setTestQuestions(formattedQuestions);
      }
      
      const { data: notificationsData, error: notificationsError } = await supabase
        .from("notifications")
        .select("*")
        .order('created_at', { ascending: false });
        
      if (notificationsError) {
        console.error("Error fetching notifications:", notificationsError);
      } else {
        setNotifications(notificationsData || []);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
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
    fetchData
  };
};
