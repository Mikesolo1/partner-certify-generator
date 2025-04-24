
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Award, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Client } from '@/types';

interface DashboardStatsProps {
  clientCount: number;
  totalCommission: number;
  testPassed?: boolean;
}

const getClientCountBadge = (count: number) => {
  if (count >= 51) {
    return <Badge className="bg-[#E5DEFF] text-[#8B5CF6]">Божественный</Badge>;
  } else if (count >= 21) {
    return <Badge className="bg-[#9B87F5] text-white">Платиновый</Badge>;
  } else if (count >= 11) {
    return <Badge className="bg-[#FFD700] text-black">Золотой</Badge>;
  } else if (count >= 6) {
    return <Badge className="bg-[#C0C0C0] text-black">Серебряный</Badge>;
  } else {
    return <Badge className="bg-[#CD7F32] text-white">Бронзовый</Badge>;
  }
};

const DashboardStats = ({ clientCount, totalCommission, testPassed }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2">
          <Users className="h-8 w-8 text-brand opacity-15" />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Клиентов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold">{clientCount}</p>
            {clientCount > 0 && getClientCountBadge(clientCount)}
          </div>
        </CardContent>
      </Card>
      
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
      
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2">
          <FileText className="h-8 w-8 text-brand opacity-15" />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Статус сертификата</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold">
              {testPassed ? 'Доступен' : 'Требуется тест'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
