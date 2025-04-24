
import { useState, useEffect } from 'react';
import { Partner } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { loginPartnerWithCredentials } from '@/api/partnersApi/auth';

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
      
      // Используем функцию безопасного входа
      const partner = await loginPartnerWithCredentials(email, password);
      
      if (partner) {
        console.log("Login successful, setting partner data");
        setCurrentPartner(partner);
        return partner;
      }
      
      console.log("Login failed: Invalid credentials");
      return null;
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
