
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
import { Partner } from '@/types';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  contactPerson: z.string().min(2, {
    message: "Contact person name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  joinDate: z.string(),
  certificateId: z.string().optional(),
  phone: z.string().optional(),
});

interface PartnerFormProps {
  onSubmit: (data: Partner) => void;
  defaultValues?: Partial<Partner>;
}

const PartnerForm = ({ onSubmit, defaultValues }: PartnerFormProps) => {
  const { toast } = useToast();
  const form = useForm<Partner>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: defaultValues?.companyName || '',
      contactPerson: defaultValues?.contactPerson || '',
      email: defaultValues?.email || '',
      joinDate: defaultValues?.joinDate || new Date().toISOString().split('T')[0],
      certificateId: defaultValues?.certificateId || `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
      phone: defaultValues?.phone || '',
    },
  });

  const handleSubmit = (data: Partner) => {
    try {
      onSubmit(data);
      if (!defaultValues) {
        form.reset();
        toast({
          title: "Partner added successfully",
          description: "The partner has been registered and can now receive certificates.",
        });
      } else {
        toast({
          title: "Partner updated successfully",
          description: "The partner information has been updated.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving the partner information.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
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
              <FormLabel>Contact Person</FormLabel>
              <FormControl>
                <Input placeholder="John Smith" {...field} />
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
                <Input placeholder="john@example.com" type="email" {...field} />
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
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="+7 (999) 123-45-67" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="joinDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Join Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="certificateId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certificate ID</FormLabel>
              <FormControl>
                <Input readOnly {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-certificate-blue to-certificate-darkBlue hover:from-certificate-darkBlue hover:to-certificate-blue transition-all duration-300"
        >
          {defaultValues ? 'Update Partner' : 'Add Partner'}
        </Button>
      </form>
    </Form>
  );
};

export default PartnerForm;
