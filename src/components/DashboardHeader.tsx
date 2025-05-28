
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, LogOut } from 'lucide-react';
import { usePartners } from '@/contexts/PartnersContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const DashboardHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentPartner, logoutPartner } = usePartners();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logoutPartner();
    toast({
      title: "Выход выполнен",
      description: "Вы вышли из личного кабинета",
    });
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-black text-lg">S3</span>
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">S3 Partners</span>
          </Link>

          {/* Desktop User Info and Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{currentPartner?.companyName}</span>
            </div>
            <a href="tel:+79991234567" className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
              <Phone className="h-4 w-4" />
              <span>+7 (999) 123-45-67</span>
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Выйти
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="space-y-4">
              <div className="px-2 text-sm">
                <p className="font-medium text-gray-900">{currentPartner?.companyName}</p>
              </div>
              <a href="tel:+79991234567" className="flex items-center space-x-2 text-sm text-gray-500 px-2 hover:text-blue-600 transition-colors">
                <Phone className="h-4 w-4" />
                <span>+7 (999) 123-45-67</span>
              </a>
              <div className="pt-4 border-t border-gray-200">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Выйти
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
