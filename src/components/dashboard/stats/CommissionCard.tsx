
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';

interface CommissionCardProps {
  totalCommission: number;
}

const CommissionCard = ({ totalCommission }: CommissionCardProps) => {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2">
        <Award className="h-8 w-8 text-brand opacity-15" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Комиссия</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{totalCommission.toLocaleString('ru-RU')} ₽</p>
      </CardContent>
    </Card>
  );
};

export default CommissionCard;
