
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Partner } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const usePartnerAuth = () => {
  const [currentPartner, setCurrentPartner] = useState<Partner | null>(() => {
    const stored = localStorage.getItem('currentPartner');
    return stored ? JSON.parse(stored) : null;
  });
  const { toast } = useToast();

  const loginPartner = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
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
      localStorage.setItem('currentPartner', JSON.stringify(partner));
      
      return partner;
    } catch (error) {
      console.error('Error during login:', error);
      return null;
    }
  };

  const logoutPartner = () => {
    setCurrentPartner(null);
    localStorage.removeItem('currentPartner');
  };

  return {
    currentPartner,
    setCurrentPartner,
    loginPartner,
    logoutPartner
  };
};
