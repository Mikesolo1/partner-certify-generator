
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { usePartners } from '@/contexts/PartnersContext';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [partner, setPartner] = React.useState(null);
  const [contextError, setContextError] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  try {
    const partnersContext = usePartners();
    React.useEffect(() => {
      if (partnersContext) {
        setPartner(partnersContext.currentPartner);
        setContextError(false);
      }
    }, [partnersContext?.currentPartner]);
  } catch (error) {
    if (!contextError) {
      console.error("Error accessing partners context:", error);
      setContextError(true);
    }
  }

  if (contextError) {
    return (
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200/50 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 lg:h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-brand to-cyan-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-brand to-cyan-400 p-2 rounded-xl">
                  <span className="font-black text-xl text-white">S3</span>
                </div>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Tech
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button className="bg-gradient-to-r from-brand to-cyan-400 hover:from-cyan-400 hover:to-brand text-white font-semibold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300">
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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200/50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 lg:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand to-cyan-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-brand to-cyan-400 p-2 rounded-xl">
                <span className="font-black text-xl text-white">S3</span>
              </div>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Tech
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="relative text-gray-700 hover:text-brand font-medium transition-all duration-300 group">
              Главная
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/partners" className="relative text-gray-700 hover:text-brand font-medium transition-all duration-300 group">
              Партнеры
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {partner ? (
              <Link to="/dashboard" className="relative text-brand font-semibold hover:text-cyan-500 transition-all duration-300 group">
                Личный кабинет
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand to-cyan-400"></span>
              </Link>
            ) : (
              <Link to="/login" className="relative text-brand font-semibold hover:text-cyan-500 transition-all duration-300 group">
                Вход для партнеров
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {partner ? (
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-brand to-cyan-400 hover:from-cyan-400 hover:to-brand text-white font-semibold px-6 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Личный кабинет
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button className="bg-gradient-to-r from-brand to-cyan-400 hover:from-cyan-400 hover:to-brand text-white font-semibold px-6 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Стать партнером
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-xl">
            <nav className="py-4 space-y-2">
              <Link
                to="/"
                className="block px-4 py-3 text-gray-700 hover:text-brand hover:bg-gray-50 rounded-lg transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Главная
              </Link>
              <Link
                to="/partners"
                className="block px-4 py-3 text-gray-700 hover:text-brand hover:bg-gray-50 rounded-lg transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Партнеры
              </Link>
              {partner ? (
                <Link
                  to="/dashboard"
                  className="block px-4 py-3 text-brand font-semibold hover:bg-brand/5 rounded-lg transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Личный кабинет
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-3 text-brand font-semibold hover:bg-brand/5 rounded-lg transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Вход для партнеров
                </Link>
              )}
              <div className="px-4 pt-2">
                {partner ? (
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-brand to-cyan-400 hover:from-cyan-400 hover:to-brand text-white font-semibold py-3">
                      Личный кабинет
                    </Button>
                  </Link>
                ) : (
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-brand to-cyan-400 hover:from-cyan-400 hover:to-brand text-white font-semibold py-3">
                      Стать партнером
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
