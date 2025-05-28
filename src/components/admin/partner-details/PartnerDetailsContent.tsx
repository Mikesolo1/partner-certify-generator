
import { Partner } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { ClientsList } from '@/components/admin/ClientsList';
import { PartnerHeader } from '@/components/admin/PartnerHeader';
import { PartnerInfo } from '@/components/admin/PartnerInfo';
import { PartnerPaymentDetails } from '@/components/admin/PartnerPaymentDetails';
import { PartnerCommissionDetails } from '@/components/admin/partner-details/PartnerCommissionDetails';
import { PartnerReferralsSection } from '@/components/admin/partner-details/PartnerReferralsSection';

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
  console.log("PartnerDetailsContent rendering with:", {
    partnerName: partner.companyName,
    clientCount: partnerClients.length,
    partnerId,
    hasReferralCode: !!partner.referralCode
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* White header like in admin dashboard */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <PartnerHeader partner={partner} />
            <Button onClick={onRefresh} disabled={refreshing} variant="outline">
              <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Обновить
            </Button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6">
          <PartnerInfo partner={partner} />
          <PartnerCommissionDetails partnerId={partnerId} />
          <PartnerPaymentDetails partnerId={partnerId} />
          
          {/* Добавляем секцию рефералов только для партнеров, прошедших тест */}
          {partner.testPassed && (
            <PartnerReferralsSection partnerId={partnerId} />
          )}
          
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
