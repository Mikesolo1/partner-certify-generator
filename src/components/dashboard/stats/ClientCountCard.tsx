
import React from 'react';
import { Users } from 'lucide-react';
import BaseStatCard from './BaseStatCard';

interface ClientCountCardProps {
  clientCount: number;
}

const ClientCountCard = ({ clientCount }: ClientCountCardProps) => {
  return (
    <BaseStatCard title="Клиентов" icon={Users}>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold">{clientCount}</p>
      </div>
    </BaseStatCard>
  );
};

export default ClientCountCard;
