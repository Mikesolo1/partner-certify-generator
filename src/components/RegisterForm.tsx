import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { usePartners } from '@/contexts/PartnersContext';
import { Partner } from '@/types';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "Название компании должно содержать не менее 2 символов.",
  }),
  contactPerson: z.string().min(2, {
    message: "Имя контактного лица должно содержать не менее 2 символов.",
  }),
  email: z.string().email({
    message: "Пожалуйста, введите корректный email адрес.",
  }),
  password: z.string().min(6, {
    message: "Пароль должен быть не менее 6 символов.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Подтверждение пароля должно быть не менее 6 символов.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { addPartner, loginPartner } = usePartners();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      contactPerson: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      
      // Check if partner already exists before registration
      const { data: existsData, error: existsError } = await supabase.rpc('check_partner_exists', { 
        p_email: data.email 
      });

      if (existsError) {
        throw new Error("Ошибка проверки существующего пользователя");
      }

      if (existsData) {
        toast({
          title: "Ошибка регистрации",
          description: "Партнер с таким email уже существует",
          variant: "destructive",
        });
        return;
      }
      
      // Create new partner
      const newPartner: Partner = {
        companyName: data.companyName,
        contactPerson: data.contactPerson,
        email: data.email,
        password: data.password,
        partnerLevel: 'Бронзовый',
        joinDate: new Date().toISOString().split('T')[0],
        certificateId: `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
        testPassed: false,
        role: 'user',
        commission: 20
      };
      
      console.log("Attempting to register new partner:", {
        ...newPartner,
        password: '[REDACTED]'
      });
      
      const createdPartner = await addPartner(newPartner);
      
      // Auto login after registration
      const loggedInPartner = await loginPartner(data.email, data.password);
      
      if (loggedInPartner) {
        toast({
          title: "Регистрация успешна",
          description: "Добро пожаловать в партнерскую программу S3!",
        });
        
        if (onSuccess) {
          onSuccess();
        }
        
        navigate('/dashboard');
      } else {
        toast({
          title: "Ошибка входа",
          description: "Регистрация выполнена успешно, но не удалось автоматически войти в систему.",
          variant: "default",
        });
        navigate('/login');
      }
    } catch (error) {
      console.error("Error during registration:", error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Не удалось зарегистрироваться. Пожалуйста, попробуйте снова.";
      
      toast({
        title: "Ошибка регистрации",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название компании</FormLabel>
              <FormControl>
                <Input placeholder="ООО Техно" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Контактное лицо</FormLabel>
              <FormControl>
                <Input placeholder="Иван Иванов" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="ivan@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтверждение пароля</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-certificate-blue to-certificate-darkBlue hover:from-certificate-darkBlue hover:to-certificate-blue transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Регистрация..." : "Зарегистрироваться"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
