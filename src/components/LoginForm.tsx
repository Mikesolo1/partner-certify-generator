
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
import { useNavigate, Link } from 'react-router-dom';
import { usePartners } from '@/contexts/PartnersContext';

const formSchema = z.object({
  email: z.string().email({
    message: "Пожалуйста, введите корректный email адрес.",
  }),
  password: z.string().min(6, {
    message: "Пароль должен быть не менее 6 символов.",
  }),
});

const LoginForm = () => {
  const { loginPartner } = usePartners();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      console.log("Attempting to login with email:", data.email);
      
      const partner = await loginPartner(data.email, data.password);
      
      if (partner) {
        console.log("Login successful:", partner.contactPerson || partner.contact_person);
        toast({
          title: "Успешный вход",
          description: `Добро пожаловать, ${partner.contactPerson || partner.contact_person}!`,
        });
        navigate('/dashboard');
      } else {
        console.warn("Login failed: Invalid credentials");
        toast({
          title: "Ошибка входа",
          description: "Неверный email или пароль. Пожалуйста, проверьте введенные данные.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Ошибка входа",
        description: "Произошла ошибка при входе. Пожалуйста, попробуйте снова.",
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

        <div className="text-right">
          <Link 
            to="/forgot-password" 
            className="text-sm text-certificate-blue hover:underline"
          >
            Забыли пароль?
          </Link>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-certificate-blue to-certificate-darkBlue hover:from-certificate-darkBlue hover:to-certificate-blue transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Вход..." : "Войти"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
