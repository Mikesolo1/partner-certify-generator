
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Partner } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const usePartnerAuth = () => {
  const [currentPartner, setCurrentPartner] = useState<Partner | null>(() => {
    try {
      const stored = localStorage.getItem('currentPartner');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error("Error parsing stored partner data:", e);
      localStorage.removeItem('currentPartner');
      return null;
    }
  });
  const { toast } = useToast();

  const loginPartner = async (email: string, password: string) => {
    try {
      // Добавим задержку для предотвращения частых запросов
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const { data, error } = await supabase
        .from('partners')
        .select('id, company_name, contact_person, email, partner_level, join_date, certificate_id, test_passed, commission, role, password')
        .eq('email', email)
        .eq('password', password)
        .single();
      
      if (error || !data) {
        console.error('Login failed:', error);
        return null;
      }
      
      const partner: Partner = {
        id: data.id,
        companyName: data.company_name,
        contactPerson: data.contact_person,
        email: data.email,
        partnerLevel: data.partner_level,
        joinDate: data.join_date,
        certificateId: data.certificate_id,
        password: data.password,
        testPassed: data.test_passed,
        commission: data.commission,
        role: data.role
      };
      
      setCurrentPartner(partner);
      
      try {
        localStorage.setItem('currentPartner', JSON.stringify(partner));
      } catch (e) {
        console.error("Error storing partner data:", e);
        toast({
          title: "Предупреждение",
          description: "Не удалось сохранить данные сессии",
          variant: "warning"
        });
      }
      
      return partner;
    } catch (error) {
      console.error('Error during login:', error);
      return null;
    }
  };

  const logoutPartner = () => {
    setCurrentPartner(null);
    try {
      localStorage.removeItem('currentPartner');
    } catch (e) {
      console.error("Error removing partner data:", e);
    }
  };

  return {
    currentPartner,
    setCurrentPartner,
    loginPartner,
    logoutPartner
  };
};
