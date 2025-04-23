
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Users, Award, FileText, Download, LogOut } from 'lucide-react';
import { usePartners } from '@/contexts/PartnersContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

const NavItem = ({ href, icon: Icon, label, isActive }: NavItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-x-2 py-2 px-4 rounded-md transition-colors",
      isActive
        ? "bg-certificate-blue text-white"
        : "text-gray-600 hover:bg-gray-100"
    )}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </Link>
);

const DashboardNav = () => {
  const location = useLocation();
  const { logoutPartner, currentPartner } = usePartners();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logoutPartner();
    toast({
      title: "Выход выполнен",
      description: "Вы вышли из личного кабинета",
    });
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-white border-r h-full p-6">
      <div className="mb-8">
        <h2 className="font-bold text-lg mb-1">
          {currentPartner?.companyName || 'Личный кабинет'}
        </h2>
        <p className="text-sm text-gray-500">
          Уровень: {currentPartner?.partnerLevel || '-'}
        </p>
      </div>

      <nav className="space-y-2">
        <NavItem href="/dashboard" icon={Award} label="Главная" isActive={isActive('/dashboard')} />
        {currentPartner?.testPassed ? (
          <>
            <NavItem
              href="/dashboard/certificate"
              icon={FileText}
              label="Сертификат"
              isActive={isActive('/dashboard/certificate')}
            />
            <NavItem
              href="/dashboard/clients"
              icon={Users}
              label="Мои клиенты"
              isActive={isActive('/dashboard/clients')}
            />
          </>
        ) : (
          <NavItem
            href="/dashboard/test"
            icon={FileText}
            label="Пройти тест"
            isActive={isActive('/dashboard/test')}
          />
        )}
      </nav>

      <div className="mt-auto pt-12">
        <Button
          variant="ghost"
          className="flex w-full items-center gap-x-2 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span>Выйти</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardNav;
