
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { usePartners } from '@/contexts/PartnersContext';
import PaymentDetailsForm from '@/components/PaymentDetailsForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { safeRPC } from '@/api/utils/queryHelpers';
import { Loader2 } from 'lucide-react';

const PaymentDetailsPage = () => {
  const { currentPartner } = usePartners();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentPartner?.testPassed) {
      navigate('/dashboard/test');
      return;
    }

    const fetchPaymentDetails = async () => {
      try {
        setLoading(true);
        
        if (!currentPartner?.id) {
          setError("ID партнера не определен");
          return;
        }

        const { data, error } = await safeRPC('get_partner_payment_details', {
          p_partner_id: currentPartner.id
        });

        if (error) {
          console.error("Ошибка загрузки данных оплаты:", error);
          setError("Не удалось загрузить реквизиты для выплат");
          toast({
            title: "Ошибка загрузки данных",
            description: "Не удалось загрузить реквизиты для выплат",
            variant: "destructive"
          });
          return;
        }

        if (data && data.length > 0) {
          console.log("Загружены данные для выплат:", data[0]);
          setPaymentDetails(data[0]);
        } else {
          console.log("Данные для выплат не найдены");
        }
        
        setError(null);
      } catch (error) {
        console.error("Ошибка загрузки данных оплаты:", error);
        setError("Произошла ошибка при загрузке реквизитов для выплат");
      } finally {
        setLoading(false);
      }
    };

    if (currentPartner?.id) {
      fetchPaymentDetails();
    }
  }, [currentPartner, navigate, toast]);

  const handleSubmit = async (data) => {
    try {
      if (!currentPartner?.id) {
        throw new Error("ID партнера не определен");
      }
      
      setLoading(true);
      console.log("Сохранение реквизитов:", data);
      
      // Используем RPC функцию для сохранения данных
      const { error } = await safeRPC('save_partner_payment_details', {
        p_partner_id: currentPartner.id,
        p_payment_type: data.payment_type,
        p_details: data.details,
        p_is_primary: true
      });

      if (error) {
        console.error("Ошибка сохранения реквизитов:", error);
        throw new Error("Ошибка сохранения реквизитов: " + error.message);
      }
      
      toast({
        title: "Успешно",
        description: "Реквизиты для выплат сохранены",
      });
      
      // Обновляем отображаемые данные
      setPaymentDetails({
        partner_id: currentPartner.id,
        payment_type: data.payment_type,
        details: data.details,
        is_primary: true
      });
    } catch (error) {
      console.error('Error saving payment details:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить реквизиты",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="p-4 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            ) : (
              <PaymentDetailsForm 
                onSubmit={handleSubmit}
                defaultValues={paymentDetails}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PaymentDetailsPage;
