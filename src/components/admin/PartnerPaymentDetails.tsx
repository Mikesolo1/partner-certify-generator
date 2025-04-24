
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, BanknoteIcon, AlertCircle, Bug, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { safeRPC } from '@/api/utils/queryHelpers';
import { Button } from '@/components/ui/button';

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

  const fetchPaymentDetails = async () => {
    try {
      console.log("Fetching payment details for partner:", partnerId);
      setLoading(true);
      
      // Updated to include delay property and use RPC
      const { data, error } = await safeRPC(
        'get_partner_payment_details',
        { p_partner_id: partnerId },
        { 
          retries: 3, 
          delay: 1000 // Add a 1-second delay between retries
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

  const renderPaymentDetails = (details: any) => {
    if (!details) return null;

    return Object.entries(details).map(([key, value]) => (
      <div key={key} className="flex gap-2 text-sm">
        <span className="text-gray-500">{key}:</span>
        <span>{String(value)}</span>
      </div>
    ));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Способы получения комиссии</CardTitle>
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
        {loading ? (
          <div className="flex justify-center py-6">
            <div className="h-8 w-8 border-4 border-t-blue-500 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 text-red-500 mb-2">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        ) : paymentDetails.length === 0 ? (
          <p className="text-gray-500">
            Партнер еще не указал способы получения комиссии
          </p>
        ) : (
          <div className="grid gap-4">
            {paymentDetails.map((detail) => (
              <div
                key={detail.id}
                className="flex items-start gap-4 p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {renderPaymentTypeIcon(detail.payment_type)}
                    <h3 className="font-medium">
                      {detail.payment_type}
                      {detail.is_primary && (
                        <Badge className="ml-2 bg-green-500">Основной</Badge>
                      )}
                    </h3>
                  </div>
                  {detail.details && 
                    Object.entries(detail.details).map(([key, value]) => (
                      <div key={key} className="flex gap-2 text-sm">
                        <span className="text-gray-500">{key}:</span>
                        <span>{String(value)}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        )}
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
