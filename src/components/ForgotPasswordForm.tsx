
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
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  email: z.string().email({
    message: "Пожалуйста, введите корректный email адрес.",
  }),
});

const ForgotPasswordForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      console.log("Requesting password reset for email:", data.email);
      
      // Используем нашу Edge Function для отправки письма восстановления
      const { data: result, error } = await supabase.functions.invoke('send-password-reset', {
        body: { email: data.email }
      });
      
      if (error) {
        console.error("Password reset error:", error);
        toast({
          title: "Ошибка",
          description: "Произошла ошибка при отправке письма. Попробуйте снова.",
          variant: "destructive",
        });
        return;
      }
      
      console.log("Password reset email sent successfully");
      setEmailSent(true);
      toast({
        title: "Письмо отправлено",
        description: "Проверьте вашу почту для получения ссылки восстановления пароля.",
      });
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

  if (emailSent) {
    return (
      <div className="text-center space-y-4">
        <div className="text-green-600 text-lg font-medium">
          ✓ Письмо отправлено!
        </div>
        <p className="text-gray-600">
          Мы отправили ссылку для восстановления пароля на адрес <strong>{form.getValues('email')}</strong>
        </p>
        <p className="text-sm text-gray-500">
          Проверьте папку "Спам", если письмо не появилось в течение нескольких минут.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="ivan@example.com" 
                  type="email" 
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
          {isLoading ? "Отправляем..." : "Отправить ссылку восстановления"}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
