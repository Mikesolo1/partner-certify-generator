
import React, { useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ReferralLink from '@/components/ReferralLink';
import ReferralsList from '@/components/ReferralsList';
import { usePartners } from '@/contexts/PartnersContext';
import { usePartnerRefresh } from '@/hooks/usePartnerRefresh';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ReferralsPage = () => {
  const { currentPartner, setCurrentPartner } = usePartners();
  const { refreshPartnerData, refreshing } = usePartnerRefresh();

  if (!currentPartner) {
    return <Navigate to="/login" />;
  }

  if (!currentPartner.testPassed) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Реферальная программа недоступна</h1>
          <p className="text-gray-600 mb-8">
            Для участия в реферальной программе необходимо пройти тест для партнеров.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const handleRefreshData = async () => {
    if (!currentPartner.id) return;
    
    const updatedPartner = await refreshPartnerData(currentPartner.id);
    if (updatedPartner) {
      setCurrentPartner(updatedPartner);
    }
  };

  // Проверяем доступ к реферальной программе - используем оба поля для совместимости
  const hasReferralAccess = currentPartner.referralAccessEnabled || currentPartner.referral_access_enabled;
  
  if (!hasReferralAccess) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Доступ к реферальной программе ограничен</h1>
          <p className="text-gray-600 mb-8">
            Доступ к реферальной программе управляется администратором. Обратитесь к администратору для получения доступа.
          </p>
          
          <Alert className="max-w-md mx-auto mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Если администратор уже предоставил вам доступ, попробуйте обновить данные.
            </AlertDescription>
          </Alert>
          
          <Button 
            onClick={handleRefreshData} 
            disabled={refreshing}
            variant="outline"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Обновление...' : 'Обновить данные'}
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Реферальная программа</h1>
            <p className="text-gray-600">
              Приглашайте новых партнеров и зарабатывайте на их успехе
            </p>
          </div>
          
          <Button 
            onClick={handleRefreshData} 
            disabled={refreshing}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Обновить
          </Button>
        </div>

        <ReferralLink />
        <ReferralsList />
      </div>
    </DashboardLayout>
  );
};

export default ReferralsPage;
