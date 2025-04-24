
import React from 'react';
import DashboardStats from './DashboardStats';
import QuickActions from './QuickActions';

interface DashboardStatisticsProps {
  clientCount: number;
  totalCommission: number;
  testPassed?: boolean;
  latestPaymentDate?: string;
}

const DashboardStatistics = ({
  clientCount,
  totalCommission,
  testPassed,
  latestPaymentDate
}: DashboardStatisticsProps) => {
  return (
    <>
      <DashboardStats 
        clientCount={clientCount}
        totalCommission={totalCommission}
        testPassed={testPassed}
        latestPaymentDate={latestPaymentDate}
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
