
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import PaymentDetailsForm from '@/components/PaymentDetailsForm';
import { useToast } from '@/hooks/use-toast';
import { safeRPC } from '@/api/utils/queryHelpers';

interface PaymentDetailsCardProps {
  partnerId: string;
}

const PaymentDetailsCard = ({ partnerId }: PaymentDetailsCardProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [showPaymentError, setShowPaymentError] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmitPaymentDetails = async (data: any) => {
    try {
      setIsSaving(true);
      setShowPaymentError(false);
      console.log("Saving payment details:", data);
      
      const { data: response, error } = await safeRPC('save_partner_payment_details', {
        p_partner_id: partnerId,
        p_payment_type: data.payment_type,
        p_details: data.details,
        p_is_primary: true
      }, { 
        retries: 3,
        delay: 1000,
        timeoutMs: 15000
      });

      if (error) {
        console.error('Error saving payment details:', error);
        setShowPaymentError(true);
        toast({
          title: "Ошибка",
          description: `Не удалось сохранить реквизиты: ${error.message || 'Неизвестная ошибка'}`,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Успешно",
        description: "Реквизиты для выплат сохранены",
      });
    } catch (error: any) {
      console.error('Error saving payment details:', error);
      setShowPaymentError(true);
      toast({
        title: "Ошибка",
        description: `Не удалось сохранить реквизиты: ${error.message || 'Неизвестная ошибка'}`,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePaymentDetailsClick = () => {
    navigate('/dashboard/payment-details');
  };

  return (
    <Card className="h-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Реквизиты для выплат</CardTitle>
        <button 
          onClick={handlePaymentDetailsClick} 
          className="text-sm text-blue-600 hover:underline"
        >
          Подробнее
        </button>
      </CardHeader>
      <CardContent>
        {showPaymentError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Ошибка сохранения реквизитов</AlertTitle>
            <AlertDescription>
              Пожалуйста, попробуйте снова или обратитесь в поддержку
            </AlertDescription>
          </Alert>
        )}
        <PaymentDetailsForm 
          onSubmit={handleSubmitPaymentDetails}
          isLoading={isSaving}
        />
      </CardContent>
    </Card>
  );
};

export default PaymentDetailsCard;
