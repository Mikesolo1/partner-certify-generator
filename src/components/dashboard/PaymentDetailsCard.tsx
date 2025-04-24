
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import PaymentDetailsForm from '@/components/PaymentDetailsForm';
import { useToast } from '@/hooks/use-toast';
import { safeRPC } from '@/api/utils/queryHelpers';
import { Button } from '@/components/ui/button';
import { Edit, Save } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface PaymentDetailsCardProps {
  partnerId: string;
}

const PaymentDetailsCard = ({ partnerId }: PaymentDetailsCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [showPaymentError, setShowPaymentError] = useState(false);
  const { toast } = useToast();

  const fetchPaymentDetails = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await safeRPC('get_partner_payment_details', {
        p_partner_id: partnerId
      });

      if (error) {
        console.error('Error fetching payment details:', error);
        setShowPaymentError(true);
        return;
      }

      if (data && data.length > 0) {
        setPaymentDetails(data[0]);
      }
    } catch (error) {
      console.error('Error fetching payment details:', error);
      setShowPaymentError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentDetails();
  }, [partnerId]);

  const handleSubmitPaymentDetails = async (data: any) => {
    try {
      setIsSaving(true);
      setShowPaymentError(false);
      
      const { data: response, error } = await safeRPC('save_partner_payment_details', {
        p_partner_id: partnerId,
        p_payment_type: data.payment_type,
        p_details: data.details,
        p_is_primary: true
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

      setPaymentDetails(response);
      setIsEditing(false);
      await fetchPaymentDetails();
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

  const renderPaymentInfo = () => {
    if (!paymentDetails) {
      return (
        <p className="text-gray-500">
          Реквизиты для выплат еще не указаны. Нажмите кнопку "Изменить" чтобы добавить их.
        </p>
      );
    }

    return (
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-500">Способ получения выплат</p>
          <p className="text-base">{paymentDetails.payment_type}</p>
        </div>
        {paymentDetails.details && (
          <>
            <div>
              <p className="text-sm font-medium text-gray-500">Получатель платежа</p>
              <p className="text-base">{paymentDetails.details.recipient_name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Реквизиты</p>
              <p className="text-base">{paymentDetails.details.account_details}</p>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <Card className="h-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Реквизиты для выплат</CardTitle>
        {!isEditing && (
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(true)}
            className="gap-2"
          >
            <Edit className="h-4 w-4" />
            Изменить
          </Button>
        )}
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

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : isEditing ? (
          <div className="space-y-4">
            <PaymentDetailsForm 
              onSubmit={handleSubmitPaymentDetails}
              isLoading={isSaving}
              defaultValues={paymentDetails}
            />
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
            >
              Отмена
            </Button>
          </div>
        ) : (
          renderPaymentInfo()
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentDetailsCard;
