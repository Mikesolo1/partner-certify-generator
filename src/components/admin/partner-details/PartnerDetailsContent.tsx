
import React from 'react';
import { Partner } from '@/types';
import Header from '@/components/Header';
import { PartnerHeader } from '@/components/admin/PartnerHeader';
import { PartnerCommissionDetails } from './PartnerCommissionDetails';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface PartnerDetailsContentProps {
  partner: Partner;
  partnerClients: any[];
  partnerId: string;
  refreshing: boolean;
  onRefresh: () => void;
  getClientPayments: (clientId: string) => any[];
}

export const PartnerDetailsContent = ({
  partner,
  partnerClients,
  partnerId,
  refreshing,
  onRefresh,
  getClientPayments
}: PartnerDetailsContentProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="light" />
      
      <div className="container mx-auto px-4 py-6 pt-28">
        <div className="flex justify-between items-center mb-6">
          <PartnerHeader partner={partner} />
          <Button onClick={onRefresh} disabled={refreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Обновить
          </Button>
        </div>
        
        <PartnerCommissionDetails
          partner={partner}
          partnerClients={partnerClients}
          partnerId={partnerId}
          getClientPayments={getClientPayments}
        />
      </div>
    </div>
  );
};
