
import React from 'react';
import ClientCountCard from './stats/ClientCountCard';
import CommissionCard from './stats/CommissionCard';
import CertificateStatusCard from './stats/CertificateStatusCard';

interface DashboardStatsProps {
  clientCount: number;
  totalCommission: number;
  testPassed?: boolean;
}

const DashboardStats = ({ clientCount, totalCommission, testPassed }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <ClientCountCard clientCount={clientCount} />
      <CommissionCard totalCommission={totalCommission} />
      <CertificateStatusCard testPassed={testPassed} />
    </div>
  );
};

export default DashboardStats;
