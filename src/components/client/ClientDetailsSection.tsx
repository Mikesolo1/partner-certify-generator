
import React from 'react';
import { Client } from '@/types';
import { Receipt } from 'lucide-react';

interface ClientDetailsSectionProps {
  client: Client;
}

export const ClientDetailsSection: React.FC<ClientDetailsSectionProps> = ({ client }) => {
  const totalPayments = client.payments?.length || 0;
  const totalAmount = client.payments?.reduce((sum, payment) => sum + Number(payment.amount), 0) || 0;
  
  // Improved date formatting to handle any date format
  const getFormattedDate = () => {
    const dateStr = client.registrationDate || client.registration_date || client.date;
    if (!dateStr) return "Нет данных";
    
    try {
      // Handle common date formats
      const date = new Date(dateStr);
      
      // Check if date is valid before formatting
      if (isNaN(date.getTime())) {
        return "Нет данных";
      }
      
      // Format the date in Russian locale
      return date.toLocaleDateString('ru-RU');
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Нет данных";
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        <div className="mb-2">Email: {client.email}</div>
        {client.phone && <div className="mb-2">Телефон: {client.phone}</div>}
        <div className="mb-2">Дата регистрации: {getFormattedDate()}</div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Receipt className="h-4 w-4" />
          <div>
            <div>Всего платежей: {totalPayments}</div>
            <div>Общая сумма: {totalAmount.toLocaleString('ru-RU')} ₽</div>
          </div>
        </div>
      </div>
    </div>
  );
};
