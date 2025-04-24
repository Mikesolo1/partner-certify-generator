
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { usePartners } from '@/contexts/PartnersContext';
import PaymentDetailsForm from '@/components/PaymentDetailsForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { safeRPC } from '@/api/utils/queryHelpers';
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const PaymentDetailsPage = () => {
  const { currentPartner } = usePartners();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchPaymentDetails = async (showToast = false) => {
    try {
      setLoading(true);
      setIsRefreshing(true);
      
      if (!currentPartner?.id) {
        setError("ID партнера не определен");
        return;
      }

      const { data, error } = await safeRPC('get_partner_payment_details', {
        p_partner_id: currentPartner.id
      }, {
        retries: 3,
        delay: 1000,
        timeoutMs: 15000
      });

      if (error) {
        console.error("Ошибка загрузки данных оплаты:", error);
        setError(`Не удалось загрузить реквизиты для выплат: ${error.message || "Неизвестная ошибка"}`);
        
        if (showToast) {
          toast({
            title: "Ошибка загрузки данных",
            description: `Не удалось загрузить реквизиты: ${error.message || "Неизвестная ошибка"}`,
            variant: "destructive"
          });
        }
        return;
      }

      if (data && data.length > 0) {
        console.log("Загружены данные для выплат:", data[0]);
        setPaymentDetails(data[0]);
        
        if (showToast) {
          toast({
            title: "Данные обновлены",
            description: "Реквизиты успешно загружены",
          });
        }
      } else {
        console.log("Данные для выплат не найдены");
      }
      
      setError(null);
    } catch (error: any) {
      console.error("Ошибка загрузки данных оплаты:", error);
      setError(`Произошла ошибка при загрузке реквизитов: ${error.message || "Неизвестная ошибка"}`);
      
      if (showToast) {
        toast({
          title: "Ошибка загрузки",
          description: "Не удалось обновить данные",
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (!currentPartner?.testPassed) {
      navigate('/dashboard/test');
      return;
    }

    if (currentPartner?.id) {
      fetchPaymentDetails();
    }
  }, [currentPartner, navigate]);

  const handleSubmit = async (data: any) => {
    try {
      if (!currentPartner?.id) {
        throw new Error("ID партнера не определен");
      }
      
      setIsSaving(true);
      console.log("Сохранение реквизитов:", data);
      
      // Use safe RPC function with retries for saving data
      const { data: response, error } = await safeRPC('save_partner_payment_details', {
        p_partner_id: currentPartner.id,
        p_payment_type: data.payment_type,
        p_details: data.details,
        p_is_primary: true
      }, {
        retries: 3,
        delay: 1000,
        timeoutMs: 15000
      });

      if (error) {
        console.error("Ошибка сохранения реквизитов:", error);
        throw new Error(`Ошибка сохранения реквизитов: ${error.message || "Неизвестная ошибка"}`);
      }
      
      toast({
        title: "Успешно",
        description: "Реквизиты для выплат сохранены",
      });
      
      // Update displayed data
      setPaymentDetails({
        partner_id: currentPartner.id,
        payment_type: data.payment_type,
        details: data.details,
        is_primary: true
      });
      
      // Refresh data after saving
      await fetchPaymentDetails(false);
    } catch (error: any) {
      console.error('Error saving payment details:', error);
      toast({
        title: "Ошибка",
        description: `Не удалось сохранить реквизиты: ${error.message || "Неизвестная ошибка"}`,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
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
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Ошибка</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Реквизиты для выплат</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => fetchPaymentDetails(true)}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Обновить
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : (
              <PaymentDetailsForm 
                onSubmit={handleSubmit}
                defaultValues={paymentDetails}
                isLoading={isSaving}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PaymentDetailsPage;
