
import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, BanknotesIcon } from 'lucide-react';

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

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('payment_details')
          .select('*')
          .eq('partner_id', partnerId);
          
        if (error) throw error;
        setPaymentDetails(data || []);
      } catch (error) {
        console.error('Error fetching payment details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [partnerId]);

  const renderPaymentTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'bank':
        return <CreditCard className="h-4 w-4 mr-2" />;
      case 'cash':
        return <BanknotesIcon className="h-4 w-4 mr-2" />;
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
          <CardTitle>Загрузка способов получения комиссии...</CardTitle>
        </CardHeader>
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
