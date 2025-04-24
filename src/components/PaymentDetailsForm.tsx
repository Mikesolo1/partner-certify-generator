
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const paymentDetailsSchema = z.object({
  payment_type: z.enum(['bank_account', 'sbp', 'card']),
  details: z.object({
    recipient_name: z.string().min(2, 'Укажите получателя платежа'),
    account_details: z.string().min(2, 'Укажите реквизиты'),
  }),
});

type PaymentDetailsFormValues = z.infer<typeof paymentDetailsSchema>;

interface PaymentDetailsFormProps {
  onSubmit: (data: PaymentDetailsFormValues) => void;
  defaultValues?: PaymentDetailsFormValues;
}

const PaymentDetailsForm = ({ onSubmit, defaultValues }: PaymentDetailsFormProps) => {
  const form = useForm<PaymentDetailsFormValues>({
    resolver: zodResolver(paymentDetailsSchema),
    defaultValues: defaultValues || {
      payment_type: 'bank_account',
      details: {
        recipient_name: '',
        account_details: '',
      },
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="payment_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Способ получения выплат</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите способ получения выплат" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bank_account">Банковский счет ИП/ООО</SelectItem>
                  <SelectItem value="sbp">Система быстрых платежей (СБП)</SelectItem>
                  <SelectItem value="card">Банковская карта</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="details.recipient_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Получатель платежа</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ИП Иванов И.И. или ООО 'Компания'" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="details.account_details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Реквизиты для выплат</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Номер счета/карты/телефона" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Сохранить реквизиты</Button>
      </form>
    </Form>
  );
};

export default PaymentDetailsForm;
