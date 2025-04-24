
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { usePartners } from '@/contexts/PartnersContext';
import PaymentDetailsForm from '@/components/PaymentDetailsForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const PaymentDetailsPage = () => {
  const { currentPartner } = usePartners();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    if (!currentPartner?.testPassed) {
      navigate('/dashboard/test');
    }

    const fetchPaymentDetails = async () => {
      const { data, error } = await supabase
        .from('payment_details')
        .select('*')
        .eq('partner_id', currentPartner?.id)
        .single();

      if (!error && data) {
        setPaymentDetails(data);
      }
    };

    if (currentPartner?.id) {
      fetchPaymentDetails();
    }
  }, [currentPartner, navigate]);

  const handleSubmit = async (data) => {
    try {
      const { error } = await supabase
        .from('payment_details')
        .upsert({
          partner_id: currentPartner?.id,
          payment_type: data.payment_type,
          details: data.details,
          is_primary: true,
        });

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Реквизиты для выплат сохранены",
      });
    } catch (error) {
      console.error('Error saving payment details:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить реквизиты",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Реквизиты для выплат</h1>
        <p className="text-gray-600">
          Укажите реквизиты для получения партнерских выплат
        </p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Реквизиты для выплат</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentDetailsForm 
              onSubmit={handleSubmit}
              defaultValues={paymentDetails}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PaymentDetailsPage;
