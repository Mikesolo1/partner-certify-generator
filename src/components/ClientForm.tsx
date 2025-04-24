
import React from 'react';
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
import { Client } from '@/types';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Название компании должно содержать не менее 2 символов.",
  }),
  email: z.string().email({
    message: "Пожалуйста, введите корректный email адрес.",
  }),
  phone: z.string().min(6, {
    message: "Номер телефона должен содержать не менее 6 символов.",
  }).optional(),
});

interface ClientFormProps {
  onSubmit: (data: Omit<Client, "id" | "partner_id" | "registrationDate" | "payments">) => void;
  defaultValues?: Partial<Client>;
  isEditing?: boolean;
}

const ClientForm = ({ onSubmit, defaultValues, isEditing = false }: ClientFormProps) => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      email: defaultValues?.email || '',
      phone: defaultValues?.phone || '',
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      console.log("Form submitted with data:", data);
      // Передаем только необходимые данные в колбэк
      onSubmit({
        name: data.name,
        email: data.email,
        phone: data.phone || '',
      });
      
      if (!isEditing) {
        form.reset();
      }
    } catch (error) {
      console.error("Error submitting client form:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить данные клиента. Пожалуйста, попробуйте снова.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название компании / ФИО</FormLabel>
              <FormControl>
                <Input placeholder="ООО Клиент" {...field} />
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
                <Input placeholder="client@example.com" type="email" {...field} />
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
                <Input placeholder="+7 (999) 123-45-67" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="bg-gradient-to-r from-certificate-blue to-certificate-darkBlue hover:from-certificate-darkBlue hover:to-certificate-blue transition-all duration-300"
        >
          {isEditing ? 'Сохранить изменения' : 'Добавить клиента'}
        </Button>
      </form>
    </Form>
  );
};

export default ClientForm;
