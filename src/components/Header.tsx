
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { usePartners } from '@/contexts/PartnersContext';

const Header = () => {
  const { currentPartner } = usePartners();

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="font-bold text-2xl text-certificate-blue">S3</div>
            <div className="text-xl font-medium text-gray-600">Tech</div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Главная
            </Link>
            <Link to="/partners" className="text-gray-600 hover:text-gray-900">
              Партнеры
            </Link>
            {currentPartner ? (
              <Link to="/dashboard" className="text-certificate-blue hover:text-certificate-darkBlue font-medium">
                Личный кабинет
              </Link>
            ) : (
              <Link to="/login" className="text-certificate-blue hover:text-certificate-darkBlue font-medium">
                Вход для партнеров
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {currentPartner ? (
              <Link to="/dashboard">
                <Button
                  className="bg-gradient-to-r from-certificate-blue to-certificate-darkBlue hover:from-certificate-darkBlue hover:to-certificate-blue text-white"
                >
                  Личный кабинет
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button
                  className="bg-gradient-to-r from-certificate-blue to-certificate-darkBlue hover:from-certificate-darkBlue hover:to-certificate-blue text-white"
                >
                  Стать партнером
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
