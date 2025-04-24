
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { safeRPC } from '@/api/utils/queryHelpers';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { markPartnerCommissionsPaid } from '@/api/partnersApi/payments';
import { usePartnerAuth } from '@/hooks/usePartnerAuth';
import { PaymentMethodsList } from './partner-payment/PaymentMethodsList';
import { CommissionsPanel } from './partner-payment/CommissionsPanel';
import { DebugInfo } from './partner-payment/DebugInfo';

interface PaymentDetails {
  id: string;
  payment_type: string;
  details: any;
  is_primary: boolean;
}

interface PartnerPaymentDetailsProps {
  partnerId: string;
}

export const PartnerPaymentDetails: React.FC<PartnerPaymentDetailsProps> = ({ partnerId }) => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("payment-methods");
  const { currentPartner } = usePartnerAuth();

  const fetchPaymentDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await safeRPC(
        'get_partner_payment_details',
        { p_partner_id: partnerId },
        { retries: 3, delay: 1000 }
      );
        
      if (error) {
        setError("Не удалось загрузить способы получения комиссии");
        setDebugInfo(error);
        
        toast({
          title: "Ошибка загрузки данных",
          description: `Детали оплаты: ${error.message || "Неизвестная ошибка"}`,
          variant: "destructive"
        });
        return;
      }
      
      setPaymentDetails(data || []);
      setError(null);
      setDebugInfo(null);
    } catch (error: any) {
      setError(`Ошибка: ${error.message || "Неизвестная ошибка"}`);
      setDebugInfo(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (partnerId) {
      fetchPaymentDetails();
    } else {
      setLoading(false);
      setError("ID партнера не указан");
    }
  }, [partnerId]);

  const handlePayCommission = async () => {
    try {
      setLoading(true);
      const result = await markPartnerCommissionsPaid(partnerId, currentPartner?.id || '');
      
      if (result.updated_count > 0) {
        toast({
          title: "Комиссии отмечены как выплаченные",
          description: `Выплачено ${result.total_amount.toLocaleString('ru-RU')} ₽ за ${result.updated_count} платежей`,
          variant: "default"
        });
        fetchPaymentDetails();
      } else {
        toast({
          title: "Нет платежей для обработки",
          description: "Все комиссии уже отмечены как выплаченные",
          variant: "default"
        });
      }
    } catch (error: any) {
      console.error('Error paying commissions:', error);
      toast({
        title: "Ошибка при обработке комиссий",
        description: error.message || "Произошла неизвестная ошибка",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Финансовая информация</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchPaymentDetails}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Обновить
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="payment-methods" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="payment-methods">Способы получения</TabsTrigger>
            <TabsTrigger value="commissions">Комиссии</TabsTrigger>
          </TabsList>
          
          <TabsContent value="payment-methods">
            <PaymentMethodsList 
              loading={loading}
              error={error}
              paymentDetails={paymentDetails}
            />
          </TabsContent>
          
          <TabsContent value="commissions">
            <CommissionsPanel
              loading={loading}
              onPayCommission={handlePayCommission}
            />
          </TabsContent>
        </Tabs>
        
        <DebugInfo debugInfo={debugInfo} partnerId={partnerId} />
      </CardContent>
    </Card>
  );
};
