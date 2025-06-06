
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

  // Функция для обновления данных партнера с сохранением в localStorage
  const updateCurrentPartner = (partner: Partner | null) => {
    console.log("Updating currentPartner:", partner?.id, partner?.referralAccessEnabled);
    setCurrentPartner(partner);
    if (partner) {
      try {
        localStorage.setItem('currentPartner', JSON.stringify(partner));
        console.log("Updated partner data in localStorage:", partner.id);
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
  };

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
        // Ensure all required fields are present including phone
        const completePartner: Partner = {
          ...partner,
          phone: partner.phone || ''
        };
        updateCurrentPartner(completePartner);
        return completePartner;
      }
      
      console.log("Login failed: Invalid credentials");
      return null;
    } catch (error) {
      console.error('Error during login:', error);
      return null;
    }
  };

  const logoutPartner = () => {
    updateCurrentPartner(null);
  };

  return {
    currentPartner,
    setCurrentPartner: updateCurrentPartner,
    loginPartner,
    logoutPartner
  };
};
