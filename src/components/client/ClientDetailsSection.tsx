
import React from 'react';
import { Client } from '@/types';
import { Receipt } from 'lucide-react';

interface ClientDetailsSectionProps {
  client: Client;
}

export const ClientDetailsSection: React.FC<ClientDetailsSectionProps> = ({ client }) => {
  const totalPayments = client.payments?.length || 0;
  const totalAmount = client.payments?.reduce((sum, payment) => sum + Number(payment.amount), 0) || 0;

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        <div className="mb-2">Email: {client.email}</div>
        {client.phone && <div className="mb-2">Телефон: {client.phone}</div>}
        <div className="mb-2">Дата регистрации: {new Date(client.registrationDate || '').toLocaleDateString()}</div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Receipt className="h-4 w-4" />
          <div>
            <div>Всего платежей: {totalPayments}</div>
            <div>Общая сумма: {totalAmount.toLocaleString()} ₽</div>
          </div>
        </div>
      </div>
    </div>
  );
};
