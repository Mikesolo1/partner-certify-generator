
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FileText, 
  Award, 
  HelpCircle, 
  UserPlus,
  BarChart3,
  ChevronRight
} from 'lucide-react';
import { usePartners } from '@/contexts/PartnersContext';

const DashboardNav = () => {
  const location = useLocation();
  const { currentPartner } = usePartners();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Главная' },
    { path: '/dashboard/clients', icon: Users, label: 'Клиенты' },
    { path: '/dashboard/commissions', icon: BarChart3, label: 'Отчет комиссий' },
    { path: '/dashboard/certificate', icon: Award, label: 'Сертификат' },
    { path: '/dashboard/test', icon: HelpCircle, label: 'Тест' },
    { path: '/dashboard/referrals', icon: UserPlus, label: 'Рефералы' },
  ];

  return (
    <nav className="bg-white border-r border-gray-200 w-64 min-h-screen p-6">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-brand to-cyan-400 rounded-xl flex items-center justify-center">
            <span className="text-gray-900 font-black text-lg">S3</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">S3 Partners</h2>
            <p className="text-sm text-gray-600">Партнерский портал</p>
          </div>
        </div>
        
        {currentPartner && (
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-900">{currentPartner.companyName}</p>
            <p className="text-xs text-gray-600">{currentPartner.contactPerson}</p>
          </div>
        )}
      </div>

      <ul className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-brand text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {isActive(item.path) && <ChevronRight className="h-4 w-4" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DashboardNav;
