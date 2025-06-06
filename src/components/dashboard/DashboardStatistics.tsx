
import React from 'react';
import DashboardStats from './DashboardStats';
import QuickActions from './QuickActions';

interface DashboardStatisticsProps {
  clientCount: number;
  totalCommission: number;
  paidCommission: number;
  pendingCommission: number;
  testPassed?: boolean;
  latestPaymentDate?: string;
  error?: boolean;
}

const DashboardStatistics = ({
  clientCount,
  totalCommission,
  paidCommission,
  pendingCommission,
  testPassed,
  latestPaymentDate,
  error = false
}: DashboardStatisticsProps) => {
  return (
    <>
      <DashboardStats 
        clientCount={clientCount}
        totalCommission={totalCommission}
        paidCommission={paidCommission}
        pendingCommission={pendingCommission}
        testPassed={testPassed}
        latestPaymentDate={latestPaymentDate}
        error={error}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <QuickActions 
          testPassed={testPassed || false}
          showLevelUpHint={false}
        />
      </div>
    </>
  );
};

export default DashboardStatistics;
