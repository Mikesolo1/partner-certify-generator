
import React from 'react';
import { Calendar } from 'lucide-react';
import { format, addMonths } from 'date-fns';
import BaseStatCard from './BaseStatCard';

interface NextPaymentCardProps {
  latestPaymentDate?: string;
}

const NextPaymentCard = ({ latestPaymentDate }: NextPaymentCardProps) => {
  const getNextPaymentDate = () => {
    if (!latestPaymentDate) return format(addMonths(new Date(), 1), 'dd.MM.yyyy');
    const paymentDate = new Date(latestPaymentDate);
    const nextMonth = addMonths(paymentDate, 1);
    return format(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1), 'dd.MM.yyyy');
  };

  return (
    <BaseStatCard title="Следующая выплата" icon={Calendar}>
      <p className="text-3xl font-bold">{getNextPaymentDate()}</p>
    </BaseStatCard>
  );
};

export default NextPaymentCard;
