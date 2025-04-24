
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Partner } from '@/types';
import { usePartners } from '@/contexts/PartnersContext';
import { RegisterFormValues } from '@/validations/authSchemas';

export const useRegistration = () => {
  const { addPartner, loginPartner } = usePartners();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const checkPartnerExists = async (email: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('check_partner_exists', { p_email: email });
      
      if (error) {
        console.error("Error checking partner exists:", error);
        throw new Error("Ошибка проверки существующего пользователя");
      }
      
      return !!data;
    } catch (error) {
      console.error("Exception checking partner exists:", error);
      throw error;
    }
  };

  const registerPartner = async (formData: RegisterFormValues) => {
    try {
      setIsLoading(true);
      
      // Проверяем существование партнера с таким email
      console.log("Checking if partner exists with email:", formData.email);
      const exists = await checkPartnerExists(formData.email);
      
      if (exists) {
        console.log("Partner already exists with email:", formData.email);
        toast({
          title: "Ошибка регистрации",
          description: "Партнер с таким email уже существует",
          variant: "destructive",
        });
        return null;
      }
      
      // Создаем нового партнера
      const newPartner: Partner = {
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        password: formData.password,
        partnerLevel: 'Бронзовый',
        joinDate: new Date().toISOString().split('T')[0],
        certificateId: `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
        testPassed: false,
        role: 'user',
        commission: 20
      };
      
      console.log("Creating new partner:", {
        ...newPartner,
        password: '[REDACTED]'
      });
      
      // Добавляем партнера в базу данных
      const createdPartner = await addPartner(newPartner);
      
      if (!createdPartner) {
        throw new Error("Не удалось создать аккаунт партнера");
      }
      
      console.log("Partner created successfully with ID:", createdPartner.id);
      
      // Автоматически логиним пользователя
      console.log("Attempting to login new partner:", formData.email);
      const loggedInPartner = await loginPartner(formData.email, formData.password);
      
      if (loggedInPartner) {
        console.log("Login successful for new partner");
        toast({
          title: "Регистрация успешна",
          description: "Добро пожаловать в партнерскую программу S3!",
        });
        
        return {
          success: true,
          partner: loggedInPartner
        };
      } else {
        console.warn("Auto-login failed for new partner");
        toast({
          title: "Регистрация успешна",
          description: "Аккаунт создан, но автоматический вход не удался. Попробуйте войти вручную.",
          variant: "default",
        });
        
        return {
          success: false,
          message: "Регистрация успешна, но вход не удался"
        };
      }
    } catch (error) {
      console.error("Registration error:", error);
      
      let errorMessage = "Не удалось зарегистрироваться. Пожалуйста, попробуйте снова.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Ошибка регистрации",
        description: errorMessage,
        variant: "destructive",
      });
      
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registerPartner,
    isLoading
  };
};
