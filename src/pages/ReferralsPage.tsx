
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ReferralLink from '@/components/ReferralLink';
import ReferralsList from '@/components/ReferralsList';
import { usePartners } from '@/contexts/PartnersContext';
import { Navigate } from 'react-router-dom';

const ReferralsPage = () => {
  const { currentPartner } = usePartners();

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

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Реферальная программа</h1>
          <p className="text-gray-600">
            Приглашайте новых партнеров и зарабатывайте на их успехе
          </p>
        </div>

        <ReferralLink />
        <ReferralsList />
      </div>
    </DashboardLayout>
  );
};

export default ReferralsPage;
