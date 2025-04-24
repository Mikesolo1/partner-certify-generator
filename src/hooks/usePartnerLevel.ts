
import { useState } from 'react';
import { calculatePartnerLevel } from '@/api/partnersApi';
import type { PartnerLevel } from '@/types';

export const usePartnerLevel = () => {
  const [partnerLevel, setPartnerLevel] = useState<PartnerLevel | null>(null);

  const calculateLevel = (clientsWithPayments: number) => {
    const levelInfo = calculatePartnerLevel(clientsWithPayments);
    setPartnerLevel(levelInfo);
    return levelInfo;
  };

  return {
    partnerLevel,
    setPartnerLevel,
    calculateLevel
  };
};
