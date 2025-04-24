
import React from 'react';
import { Award } from 'lucide-react';
import BaseStatCard from './BaseStatCard';
import { Separator } from '@/components/ui/separator';

interface CommissionCardProps {
  totalCommission: number;
  paidCommission: number;
  pendingCommission: number;
}

const CommissionCard = ({ totalCommission, paidCommission, pendingCommission }: CommissionCardProps) => {
  return (
    <BaseStatCard title="Комиссия" icon={Award}>
      <div className="space-y-2">
        <p className="text-3xl font-bold">{totalCommission.toLocaleString('ru-RU')} ₽</p>
        <Separator />
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Выплачено:</p>
            <p className="font-medium">{paidCommission.toLocaleString('ru-RU')} ₽</p>
          </div>
          <div>
            <p className="text-gray-500">К выплате:</p>
            <p className="font-medium text-green-600">{pendingCommission.toLocaleString('ru-RU')} ₽</p>
          </div>
        </div>
      </div>
    </BaseStatCard>
  );
};

export default CommissionCard;
