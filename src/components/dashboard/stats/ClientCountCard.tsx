
import React from 'react';
import { Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import BaseStatCard from './BaseStatCard';

interface ClientCountCardProps {
  clientCount: number;
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

const ClientCountCard = ({ clientCount }: ClientCountCardProps) => {
  return (
    <BaseStatCard title="Клиентов" icon={Users}>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold">{clientCount}</p>
        {clientCount > 0 && getClientCountBadge(clientCount)}
      </div>
    </BaseStatCard>
  );
};

export default ClientCountCard;
