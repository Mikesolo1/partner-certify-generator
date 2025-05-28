
import React, { ReactNode, useState } from 'react';
import { Navigate } from 'react-router-dom';
import DashboardNav from './DashboardNav';
import { usePartners } from '@/contexts/PartnersContext';
import DashboardHeader from '@/components/DashboardHeader';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { currentPartner, loading } = usePartners();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

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
      <DashboardHeader />
      
      <div className="flex flex-1 pt-16">
        {/* Mobile sidebar */}
        {isMobile && sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
            <div className="w-64 h-full bg-white" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 flex justify-end">
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <DashboardNav />
            </div>
          </div>
        )}
        
        {/* Desktop sidebar */}
        <div className="w-64 hidden md:block">
          <DashboardNav />
        </div>
        
        <main className="flex-1 p-4 md:p-6">
          {/* Mobile menu button */}
          <div className="md:hidden mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2"
            >
              <Menu className="h-5 w-5" />
              <span>Меню</span>
            </Button>
          </div>
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
