
import { useState, useEffect } from 'react';
import { Partner } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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

  useEffect(() => {
    if (currentPartner) {
      try {
        localStorage.setItem('currentPartner', JSON.stringify(currentPartner));
      } catch (e) {
        console.error("Error storing partner data:", e);
        toast({
          title: "Предупреждение",
          description: "Не удалось сохранить данные сессии",
          variant: "default"
        });
      }
    } else {
      try {
        localStorage.removeItem('currentPartner');
      } catch (e) {
        console.error("Error removing partner data:", e);
      }
    }
  }, [currentPartner, toast]);

  const loginPartner = async (email: string, password: string) => {
    try {
      console.log("Attempting to login with email:", email);
      
      // Use direct query instead of security definer function to avoid infinite recursion
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .maybeSingle();
      
      if (error) {
        console.error('Login failed:', error);
        return null;
      }
      
      if (!data) {
        console.log('No partner found with these credentials');
        return null;
      }
      
      console.log("Login successful, partner data:", {
        ...data,
        password: '[REDACTED]'
      });
      
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
      return partner;
    } catch (error) {
      console.error('Error during login:', error);
      return null;
    }
  };

  const logoutPartner = () => {
    setCurrentPartner(null);
  };

  return {
    currentPartner,
    setCurrentPartner,
    loginPartner,
    logoutPartner
  };
};
