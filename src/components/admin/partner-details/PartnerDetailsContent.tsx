
import { Partner } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { ClientsList } from '@/components/admin/ClientsList';
import { PartnerHeader } from '@/components/admin/PartnerHeader';
import { PartnerInfo } from '@/components/admin/PartnerInfo';
import { PartnerPaymentDetails } from '@/components/admin/PartnerPaymentDetails';
import { PartnerCommissionDetails } from '@/components/admin/partner-details/PartnerCommissionDetails';
import Header from '@/components/Header';

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
    <div className="min-h-screen bg-brand-light">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <PartnerHeader partner={partner} />
          <Button onClick={onRefresh} disabled={refreshing} variant="outline">
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Обновить
          </Button>
        </div>
        <div className="grid gap-6">
          <PartnerInfo partner={partner} />
          <PartnerCommissionDetails partnerId={partnerId} />
          <PartnerPaymentDetails partnerId={partnerId} />
          <Card>
            <CardHeader>
              <CardTitle>Клиенты партнера</CardTitle>
            </CardHeader>
            <CardContent>
              <ClientsList
                clients={partnerClients}
                getClientPayments={getClientPayments}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
