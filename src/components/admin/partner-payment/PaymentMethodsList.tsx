
import React from 'react';
import { CreditCard, BanknoteIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

interface PaymentDetails {
  id: string;
  payment_type: string;
  details: any;
  is_primary: boolean;
}

interface PaymentMethodsListProps {
  loading: boolean;
  error: string | null;
  paymentDetails: PaymentDetails[];
}

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

export const PaymentMethodsList: React.FC<PaymentMethodsListProps> = ({
  loading,
  error,
  paymentDetails,
}) => {
  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-500 mb-2 p-4 bg-red-50 rounded-md border border-red-100">
        <AlertCircle className="h-5 w-5" />
        <p>{error}</p>
      </div>
    );
  }

  if (paymentDetails.length === 0) {
    return (
      <p className="text-gray-500 p-4 bg-gray-50 rounded-md border border-gray-100">
        Партнер еще не указал способы получения комиссии
      </p>
    );
  }

  return (
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
  );
};
