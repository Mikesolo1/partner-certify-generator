
import React from 'react';
import ClientCountCard from './stats/ClientCountCard';
import CommissionCard from './stats/CommissionCard';
import CertificateStatusCard from './stats/CertificateStatusCard';
import NextPaymentCard from './stats/NextPaymentCard';

interface DashboardStatsProps {
  clientCount: number;
  totalCommission: number;
  testPassed?: boolean;
  latestPaymentDate?: string;
}

const DashboardStats = ({ 
  clientCount, 
  totalCommission, 
  testPassed,
  latestPaymentDate 
}: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <ClientCountCard clientCount={clientCount} />
      <CommissionCard totalCommission={totalCommission} />
      <CertificateStatusCard testPassed={testPassed} />
      <NextPaymentCard latestPaymentDate={latestPaymentDate} />
    </div>
  );
};

export default DashboardStats;
