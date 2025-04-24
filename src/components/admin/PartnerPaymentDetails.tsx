import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, BanknoteIcon, AlertCircle, Bug, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { safeRPC } from '@/api/utils/queryHelpers';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { markPartnerCommissionsPaid } from '@/api/partnersApi/payments';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

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
  const { user } = useAuth();

  const fetchPaymentDetails = async () => {
    try {
      console.log("Fetching payment details for partner:", partnerId);
      setLoading(true);
      setError(null);
      
      const { data, error } = await safeRPC(
        'get_partner_payment_details',
        { p_partner_id: partnerId },
        { 
          retries: 3, 
          delay: 1000 
        }
      );
        
      if (error) {
        console.error("Error fetching payment details:", error);
        setError("Не удалось загрузить способы получения комиссии");
        setDebugInfo(error);
        
        toast({
          title: "Ошибка загрузки данных",
          description: `Детали оплаты: ${error.message || "Неизвестная ошибка"}`,
          variant: "destructive"
        });
        return;
      }
      
      console.log("Payment details loaded:", data?.length || 0, data);
      setPaymentDetails(data || []);
      setError(null);
      setDebugInfo(null);
    } catch (error: any) {
      console.error('Error fetching payment details:', error);
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

  const renderPaymentTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'bank':
      case 'bank_account':
        return <CreditCard className="h-4 w-4 mr-2" />;
      case 'cash':
      case 'sbp':
      case 'card':
        return <BanknoteIcon className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  const handlePayCommission = async () => {
    try {
      setLoading(true);
      const result = await markPartnerCommissionsPaid(partnerId, user?.id || '');
      
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
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : error ? (
              <div className="flex items-center gap-2 text-red-500 mb-2 p-4 bg-red-50 rounded-md border border-red-100">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            ) : paymentDetails.length === 0 ? (
              <p className="text-gray-500 p-4 bg-gray-50 rounded-md border border-gray-100">
                Партнер еще не указал способы получения комиссии
              </p>
            ) : (
              <div className="grid gap-4">
                {paymentDetails.map((detail) => (
                  <div
                    key={detail.id}
                    className="flex items-start gap-4 p-4 bg-gray-50 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        {renderPaymentTypeIcon(detail.payment_type)}
                        <h3 className="font-medium">
                          {detail.payment_type}
                          {detail.is_primary && (
                            <Badge className="ml-2 bg-green-500">Основной</Badge>
                          )}
                        </h3>
                      </div>
                      {detail.details && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {Object.entries(detail.details).map(([key, value]) => (
                            <div key={key} className="flex gap-2 text-sm">
                              <span className="text-gray-500 font-medium min-w-20">{key}:</span>
                              <span>{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="commissions">
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium text-lg mb-2">Выплаты комиссий</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Здесь вы можете отметить комиссии как выплаченные партнеру. 
                  Для детальной информации о комиссиях перейдите в раздел клиентов партнера.
                </p>
                <Button 
                  onClick={handlePayCommission}
                  disabled={loading}
                >
                  {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                  Отметить комиссии как выплаченные
                </Button>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-100 rounded-md">
                <h3 className="font-medium text-green-700 mb-1">Совет</h3>
                <p className="text-sm text-green-600">
                  Чтобы отметить конкретную комиссию как выплаченную, перейдите 
                  в список клиентов партнера и отметьте соответствующие платежи.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {debugInfo && (
          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <Bug className="h-4 w-4 text-orange-500" />
              <h4 className="text-sm font-medium">Отладочная информация:</h4>
            </div>
            <div className="text-xs font-mono bg-black/5 p-2 rounded">
              <p>ID партнера: {partnerId}</p>
              <p>Код ошибки: {debugInfo.code}</p>
              <p>Сообщение: {debugInfo.message}</p>
              {debugInfo.details && <p>Детали: {debugInfo.details}</p>}
              {debugInfo.hint && <p>Подсказка: {debugInfo.hint}</p>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
