
import React from 'react';
import { useForm } from 'react-hook-form';
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
import { useNavigate } from 'react-router-dom';
import { registerFormSchema, RegisterFormValues } from '@/validations/authSchemas';
import { useRegistration } from '@/hooks/useRegistration';
import { toast } from '@/hooks/use-toast';

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const navigate = useNavigate();
  const { registerPartner, isLoading } = useRegistration();
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      companyName: '',
      contactPerson: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (data: RegisterFormValues) => {
    try {
      console.log("Form submitted with data:", { 
        ...data, 
        password: '[REDACTED]',
        confirmPassword: '[REDACTED]' 
      });
      
      const result = await registerPartner(data);
      
      if (result?.success) {
        console.log("Registration successful, redirecting to dashboard");
        toast({
          title: "Регистрация успешна",
          description: "Добро пожаловать в партнерскую программу S3!",
        });
        if (onSuccess) {
          onSuccess();
        }
        navigate('/dashboard');
      } else if (result?.success === false && result?.message?.includes("Регистрация успешна")) {
        console.log("Registration successful but login failed, redirecting to login page");
        toast({
          title: "Регистрация успешна",
          description: "Аккаунт создан, но автоматический вход не удался. Попробуйте войти вручную.",
          variant: "default",
        });
        navigate('/login');
      } else {
        console.log("Registration failed:", result?.message);
        toast({
          title: "Ошибка регистрации",
          description: result?.message || "Не удалось зарегистрироваться. Пожалуйста, попробуйте снова.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Unexpected error during form submission:", error);
      let errorMessage = "Произошла неожиданная ошибка при регистрации. Пожалуйста, попробуйте еще раз.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Ошибка регистрации",
        description: errorMessage,
        variant: "destructive"
      });
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
