
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
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      setFetchError(null);
      
      // Load all data in parallel for better performance using our new RPC functions
      const [partnersResult, clientsResult, paymentsResult, questionsResult, notificationsResult] = 
        await Promise.all([
          fetchAllPartners(),
          supabase.rpc('get_all_clients'),
          supabase.rpc('get_all_payments'),
          supabase.rpc('get_all_test_questions'),
          supabase.rpc('get_all_notifications')
        ]);

      // Handle partners data
      if (partnersResult) {
        setPartners(partnersResult);
      }

      // Handle clients data
      if (clientsResult.data) {
        console.log("Loaded clients:", clientsResult.data.length);
        setClients(clientsResult.data);
      }

      // Handle payments data
      if (paymentsResult.data) {
        console.log("Loaded payments:", paymentsResult.data.length);
        setPayments(paymentsResult.data);
      }

      // Handle test questions data
      if (questionsResult.data) {
        setTestQuestions(questionsResult.data);
      }

      // Handle notifications data
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

  // Reuse existing fetchAllPartners function since it's already working
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
