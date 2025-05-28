
import React from 'react';
import { Partner } from '@/types';
import Header from '@/components/Header';
import { PartnerHeader } from '@/components/admin/PartnerHeader';
import { PartnerCommissionDetails } from './PartnerCommissionDetails';
import { PartnerInfo } from '@/components/admin/PartnerInfo';
import { PartnerPaymentDetails } from '@/components/admin/PartnerPaymentDetails';
import { ClientsList } from '@/components/admin/ClientsList';
import { PartnerReferralsSection } from './PartnerReferralsSection';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="clients">Клиенты</TabsTrigger>
            <TabsTrigger value="payments">Выплаты</TabsTrigger>
            <TabsTrigger value="referrals">Рефералы</TabsTrigger>
            <TabsTrigger value="info">Информация</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <PartnerCommissionDetails
              partner={partner}
              partnerClients={partnerClients}
              partnerId={partnerId}
              getClientPayments={getClientPayments}
            />
          </TabsContent>
          
          <TabsContent value="clients" className="mt-6">
            <ClientsList
              clients={partnerClients}
              getClientPayments={getClientPayments}
            />
          </TabsContent>
          
          <TabsContent value="payments" className="mt-6">
            <PartnerPaymentDetails partnerId={partnerId} />
          </TabsContent>
          
          <TabsContent value="referrals" className="mt-6">
            <PartnerReferralsSection partnerId={partnerId} />
          </TabsContent>
          
          <TabsContent value="info" className="mt-6">
            <PartnerInfo partner={partner} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
