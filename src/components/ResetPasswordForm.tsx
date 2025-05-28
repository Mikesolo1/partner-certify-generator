
import React, { useState, useEffect } from 'react';
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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  password: z.string().min(6, {
    message: "Пароль должен быть не менее 6 символов.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

const ResetPasswordForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    // Проверяем, что пользователь пришел по правильной ссылке восстановления пароля
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsValidSession(true);
      } else {
        toast({
          title: "Недействительная ссылка",
          description: "Ссылка для восстановления пароля недействительна или истекла.",
          variant: "destructive",
        });
        navigate('/forgot-password');
      }
    };

    checkSession();
  }, [navigate, toast]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      console.log("Updating password");
      
      const { error } = await supabase.auth.updateUser({
        password: data.password
      });
      
      if (error) {
        console.error("Password update error:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось обновить пароль. Попробуйте снова.",
          variant: "destructive",
        });
        return;
      }
      
      console.log("Password updated successfully");
      toast({
        title: "Пароль обновлен",
        description: "Ваш пароль успешно изменен. Теперь вы можете войти с новым паролем.",
      });
      
      // Выходим из системы, чтобы пользователь мог войти с новым паролем
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Ошибка",
        description: "Произошла неожиданная ошибка. Попробуйте снова.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidSession) {
    return (
      <div className="text-center space-y-4">
        <div className="text-red-600 text-lg font-medium">
          Недействительная ссылка
        </div>
        <p className="text-gray-600">
          Ссылка для восстановления пароля недействительна или истекла.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Новый пароль</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="••••••" 
                  {...field} 
                  disabled={isLoading}
                />
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
              <FormLabel>Подтвердите пароль</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="••••••" 
                  {...field} 
                  disabled={isLoading}
                />
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
          {isLoading ? "Обновляем..." : "Обновить пароль"}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
