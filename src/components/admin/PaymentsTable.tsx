
import React from 'react';
import { Payment } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PaymentsTableProps {
  payments: Payment[];
  loading: boolean;
}

export const PaymentsTable: React.FC<PaymentsTableProps> = ({
  payments,
  loading
}) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Платежи</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Загрузка платежей...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Платежи ({payments.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left">Сумма</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Комиссия</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Дата</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Статус</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="border border-gray-300 px-4 py-2">{payment.amount}</td>
                  <td className="border border-gray-300 px-4 py-2">{payment.commissionAmount}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {payment.date ? new Date(payment.date).toLocaleDateString('ru-RU') : 'Не указана'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
