
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { usePartners } from '@/contexts/PartnersContext';

const Header = () => {
  const [partner, setPartner] = React.useState(null);
  const [contextError, setContextError] = React.useState(false);
  
  React.useEffect(() => {
    try {
      const partnersContext = usePartners();
      setPartner(partnersContext.currentPartner);
      setContextError(false);
    } catch (error) {
      console.error("Error accessing partners context:", error);
      setContextError(true);
    }
  }, []);

  // If we had an error accessing the context, render a simpler header
  if (contextError) {
    return (
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="font-bold text-2xl text-brand">S3</div>
              <div className="text-xl font-medium text-brand-dark">Tech</div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button
                  className="bg-brand text-white hover:bg-brand-dark transition"
                >
                  Вход для партнеров
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="font-bold text-2xl text-brand">S3</div>
            <div className="text-xl font-medium text-brand-dark">Tech</div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-brand-dark hover:text-brand font-medium transition">
              Главная
            </Link>
            <Link to="/partners" className="text-brand-dark hover:text-brand font-medium transition">
              Партнеры
            </Link>
            {partner ? (
              <Link to="/dashboard" className="text-brand font-bold hover:text-brand-dark transition">
                Личный кабинет
              </Link>
            ) : (
              <Link to="/login" className="text-brand font-bold hover:text-brand-dark transition">
                Вход для партнеров
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {partner ? (
              <Link to="/dashboard">
                <Button
                  className="bg-brand text-white hover:bg-brand-dark transition"
                >
                  Личный кабинет
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button
                  className="bg-brand text-white hover:bg-brand-dark transition"
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
