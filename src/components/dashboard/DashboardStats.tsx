
import React from 'react';
import ClientCountCard from './stats/ClientCountCard';
import CommissionCard from './stats/CommissionCard';
import CertificateStatusCard from './stats/CertificateStatusCard';
import NextPaymentCard from './stats/NextPaymentCard';
import { AlertTriangle } from 'lucide-react';

interface DashboardStatsProps {
  clientCount: number;
  totalCommission: number;
  paidCommission: number;
  pendingCommission: number;
  testPassed?: boolean;
  latestPaymentDate?: string;
  error?: boolean;
}

const DashboardStats = ({ 
  clientCount, 
  totalCommission, 
  paidCommission,
  pendingCommission,
  testPassed,
  latestPaymentDate,
  error = false
}: DashboardStatsProps) => {
  if (error) {
    return (
      <div className="mb-6 p-4 border border-yellow-200 bg-yellow-50 rounded-md flex items-center gap-3">
        <AlertTriangle className="text-yellow-500" />
        <p className="text-yellow-700">
          Возникла ошибка при загрузке статистики. Пожалуйста, обновите страницу или свяжитесь с поддержкой.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <ClientCountCard clientCount={clientCount} />
      <CommissionCard 
        totalCommission={totalCommission} 
        paidCommission={paidCommission} 
        pendingCommission={pendingCommission} 
      />
      <CertificateStatusCard testPassed={testPassed} />
      <NextPaymentCard latestPaymentDate={latestPaymentDate} />
    </div>
  );
};

export default DashboardStats;
