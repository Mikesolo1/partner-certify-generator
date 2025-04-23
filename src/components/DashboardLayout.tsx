
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import DashboardNav from './DashboardNav';
import { usePartners } from '@/contexts/PartnersContext';
import Header from '@/components/Header';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { currentPartner, loading } = usePartners();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Загрузка...</p>
      </div>
    );
  }

  if (!currentPartner) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex flex-1">
        <div className="w-64 hidden md:block">
          <DashboardNav />
        </div>
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
