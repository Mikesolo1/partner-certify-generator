
import React, { useEffect, useState } from 'react';
import { supabase, retryQuery } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, BanknoteIcon, AlertCircle } from 'lucide-react';

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

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        console.log("Fetching payment details for partner:", partnerId);
        setLoading(true);
        
        // Using retryQuery for better error handling with RLS issues
        const { data, error } = await retryQuery(() => 
          supabase
            .from('payment_details')
            .select('*')
            .eq('partner_id', partnerId)
        );
          
        if (error) {
          console.error("Error fetching payment details:", error);
          setError("Не удалось загрузить способы получения комиссии");
          throw error;
        }
        
        console.log("Payment details loaded:", data?.length || 0, data);
        setPaymentDetails(data || []);
        setError(null);
      } catch (error: any) {
        console.error('Error fetching payment details:', error);
        setError(`Ошибка: ${error.message || "Неизвестная ошибка"}`);
      } finally {
        setLoading(false);
      }
    };

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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Способы получения комиссии</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-6">
            <div className="h-8 w-8 border-4 border-t-blue-500 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-center text-gray-500">Загрузка способов получения комиссии...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Способы получения комиссии</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-red-500 mb-2">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
          <p className="text-gray-500">
            Попробуйте перезагрузить страницу или обратитесь к администратору
          </p>
        </CardContent>
      </Card>
    );
  }

  if (paymentDetails.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Способы получения комиссии</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Партнер еще не указал способы получения комиссии
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Способы получения комиссии</CardTitle>
      </CardHeader>
      <CardContent>
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
                {renderPaymentDetails(detail.details)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
