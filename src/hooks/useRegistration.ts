
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Partner } from '@/types';
import { usePartners } from '@/contexts/PartnersContext';
import { RegisterFormValues } from '@/validations/authSchemas';

export const useRegistration = () => {
  const { addPartner, loginPartner } = usePartners();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const registerPartner = async (formData: RegisterFormValues & { referralCode?: string }) => {
    try {
      setIsLoading(true);
      
      console.log("Starting registration process for:", formData.email);
      
      // Create new partner object with explicit field mapping
      const newPartner: Partner = {
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        partnerLevel: 'Бронзовый',
        joinDate: new Date().toISOString(),
        certificateId: `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
        testPassed: false,
        role: 'partner',  // Explicitly set to 'partner'
        commission: 20,
        phone: formData.phone || '', // Include phone with default empty string
        // Добавляем реферальный код если он есть
        ...(formData.referralCode && { referralCode: formData.referralCode })
      };
      
      try {
        // Add partner to database
        const createdPartner = await addPartner(newPartner);
        
        if (!createdPartner) {
          throw new Error("Не удалось создать аккаунт партнера");
        }
        
        console.log("Partner created successfully with ID:", createdPartner.id);
        
        // Attempt automatic login
        console.log("Attempting to login new partner:", formData.email);
        const loggedInPartner = await loginPartner(formData.email, formData.password);
        
        if (loggedInPartner) {
          console.log("Login successful for new partner");
          toast({
            title: "Регистрация успешна",
            description: formData.referralCode 
              ? "Добро пожаловать в партнерскую программу S3! Вы зарегистрированы по реферальной ссылке."
              : "Добро пожаловать в партнерскую программу S3!",
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
            success: true,
            message: "Регистрация успешна, но вход не удался"
          };
        }
      } catch (error: any) {
        console.error("Error creating partner:", error);
        const errorMessage = error?.message || "Не удалось создать аккаунт партнера";
        
        toast({
          title: "Ошибка регистрации",
          description: errorMessage,
          variant: "destructive",
        });
        
        return {
          success: false,
          message: errorMessage
        };
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registerPartner,
    isLoading
  };
};
