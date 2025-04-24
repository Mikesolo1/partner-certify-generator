
import React from 'react';
import { Calendar } from 'lucide-react';
import { format, addMonths } from 'date-fns';
import BaseStatCard from './BaseStatCard';
import { ru } from 'date-fns/locale';

interface NextPaymentCardProps {
  latestPaymentDate?: string;
}

const NextPaymentCard = ({ latestPaymentDate }: NextPaymentCardProps) => {
  const getNextPaymentDate = () => {
    if (!latestPaymentDate) {
      // If no payment yet, show next month's 1st
      const nextMonth = addMonths(new Date(), 1);
      return format(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1), 'd MMMM yyyy', { locale: ru });
    }
    
    // Always set next payment date to the 1st of the next month after the latest payment
    const paymentDate = new Date(latestPaymentDate);
    const nextMonth = addMonths(paymentDate, 1);
    return format(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1), 'd MMMM yyyy', { locale: ru });
  };

  return (
    <BaseStatCard title="Следующая выплата" icon={Calendar}>
      <div>
        <p className="text-2xl font-bold">{getNextPaymentDate()}</p>
        <p className="text-sm text-gray-500 mt-1">
          Выплаты производятся 1-го числа каждого месяца
        </p>
      </div>
    </BaseStatCard>
  );
};

export default NextPaymentCard;
