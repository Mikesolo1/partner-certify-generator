
import React from 'react';
import { Award } from 'lucide-react';
import BaseStatCard from './BaseStatCard';

interface CommissionCardProps {
  totalCommission: number;
}

const CommissionCard = ({ totalCommission }: CommissionCardProps) => {
  return (
    <BaseStatCard title="Комиссия" icon={Award}>
      <p className="text-3xl font-bold">{totalCommission.toLocaleString('ru-RU')} ₽</p>
    </BaseStatCard>
  );
};

export default CommissionCard;
