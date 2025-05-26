
import React, { useEffect, useState } from 'react';
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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { registerFormSchema, RegisterFormValues } from '@/validations/authSchemas';
import { useRegistration } from '@/hooks/useRegistration';
import { toast } from '@/hooks/use-toast';
import { validateReferralCode } from '@/api/utils/referralValidation';

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { registerPartner, isLoading } = useRegistration();
  const [referralCode, setReferralCode] = useState<string>('');
  const [isValidatingReferral, setIsValidatingReferral] = useState(false);
  const [referralValidation, setReferralValidation] = useState<{
    isValid: boolean;
    referrerName?: string;
    referrerCompany?: string;
    error?: string;
  } | null>(null);
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      companyName: '',
      contactPerson: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      referralCode: '',
    },
  });

  useEffect(() => {
    const refCode = searchParams.get('ref');
    if (refCode) {
      setReferralCode(refCode);
      form.setValue('referralCode', refCode);
      validateReferral(refCode);
      toast({
        title: "Реферальный код применен",
        description: `Вы регистрируетесь по реферальному коду: ${refCode}`,
      });
    }
  }, [searchParams, form]);

  const validateReferral = async (code: string) => {
    if (!code || code.trim() === '') {
      setReferralValidation(null);
      return;
    }

    setIsValidatingReferral(true);
    try {
      const result = await validateReferralCode(code);
      setReferralValidation(result);
      
      if (result.isValid) {
        toast({
          title: "Реферальный код действителен",
          description: `Реферер: ${result.referrerName} (${result.referrerCompany})`,
        });
      } else {
        toast({
          title: "Ошибка реферального кода",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error validating referral code:', error);
      setReferralValidation({
        isValid: false,
        error: 'Произошла ошибка при проверке кода'
      });
    } finally {
      setIsValidatingReferral(false);
    }
  };

  const handleReferralCodeChange = (value: string) => {
    setReferralCode(value);
    form.setValue('referralCode', value);
    
    // Валидируем код с задержкой
    const timeoutId = setTimeout(() => {
      validateReferral(value);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const handleSubmit = async (data: RegisterFormValues) => {
    try {
      console.log("Form submitted with data:", { 
        ...data, 
        password: '[REDACTED]',
        confirmPassword: '[REDACTED]',
        referralCode: data.referralCode 
      });

      // Проверяем реферальный код перед регистрацией
      if (data.referralCode && data.referralCode.trim() !== '') {
        if (!referralValidation || !referralValidation.isValid) {
          toast({
            title: "Ошибка регистрации",
            description: "Указанный реферальный код недействителен",
            variant: "destructive",
          });
          return;
        }
      }
      
      const result = await registerPartner({ ...data, referralCode: data.referralCode });
      
      if (result?.success) {
        console.log("Registration successful, redirecting to dashboard");
        toast({
          title: "Регистрация успешна",
          description: data.referralCode 
            ? "Добро пожаловать в партнерскую программу S3! Вы зарегистрированы по реферальной ссылке."
            : "Добро пожаловать в партнерскую программу S3!",
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
        {referralCode && referralValidation?.isValid && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-800">
              <strong>Реферальный код:</strong> {referralCode}
            </p>
            <p className="text-xs text-green-600 mt-1">
              Реферер: {referralValidation.referrerName} ({referralValidation.referrerCompany})
            </p>
          </div>
        )}

        {referralCode && referralValidation && !referralValidation.isValid && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-800">
              <strong>Ошибка реферального кода:</strong> {referralValidation.error}
            </p>
          </div>
        )}

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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input placeholder="+7 (999) 123-45-67" type="tel" {...field} />
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
          name="referralCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Реферальный код (необязательно)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Введите реферальный код" 
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleReferralCodeChange(e.target.value);
                  }}
                  disabled={isValidatingReferral}
                />
              </FormControl>
              {isValidatingReferral && (
                <p className="text-xs text-gray-500">Проверка реферального кода...</p>
              )}
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
          disabled={isLoading || isValidatingReferral || (referralCode && referralValidation && !referralValidation.isValid)}
        >
          {isLoading ? "Регистрация..." : "Зарегистрироваться"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
