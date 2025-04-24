
import React, { useEffect, useState } from 'react';
import { Client, Payment } from '@/types';
import { Receipt, DollarSign, Check } from 'lucide-react';
import * as api from '@/api/partnersApi';

interface ClientDetailsSectionProps {
  client: Client;
}

export const ClientDetailsSection: React.FC<ClientDetailsSectionProps> = ({ client }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchClientPayments = async () => {
      if (!client.id) return;
      
      setIsLoading(true);
      try {
        const clientPayments = await api.getClientPayments(client.id);
        setPayments(clientPayments || []);
      } catch (error) {
        console.error("Error fetching client payments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchClientPayments();
  }, [client.id]);
  
  // Calculate payment statistics
  const totalPayments = payments.length;
  const totalAmount = payments.reduce((sum, payment) => sum + Number(payment.amount), 0);
  const totalCommission = payments.reduce((sum, payment) => sum + Number(payment.commission_amount || 0), 0);
  const paidCommission = payments.reduce((sum, payment) => 
    (payment.commission_paid ? sum + Number(payment.commission_amount || 0) : sum), 0);
  
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
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div>Загрузка платежей...</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Receipt className="h-4 w-4" />
              <div>
                <div>Всего платежей: {totalPayments}</div>
                <div>Общая сумма: {totalAmount.toLocaleString('ru-RU')} ₽</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="h-4 w-4" />
              <div>
                <div>Моя комиссия: {totalCommission.toLocaleString('ru-RU')} ₽</div>
                <div>Выплачено: {paidCommission.toLocaleString('ru-RU')} ₽</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
