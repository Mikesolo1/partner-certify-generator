
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 shadow-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-brand to-cyan-400 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-gray-900 font-black text-lg">S3</span>
            </div>
            <span className="text-xl font-bold text-white group-hover:text-brand transition-colors">S3 Partners</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#about" className="text-gray-300 hover:text-brand transition-colors font-medium">О компании</a>
            <a href="#services" className="text-gray-300 hover:text-brand transition-colors font-medium">Услуги</a>
            <a href="#benefits" className="text-gray-300 hover:text-brand transition-colors font-medium">Преимущества</a>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Phone className="h-4 w-4" />
              <span>+7 (999) 123-45-67</span>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                Войти
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-brand to-cyan-400 hover:from-cyan-400 hover:to-brand text-gray-900 font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                Стать партнером
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              <a href="#about" className="text-gray-300 hover:text-brand transition-colors font-medium px-2">О компании</a>
              <a href="#services" className="text-gray-300 hover:text-brand transition-colors font-medium px-2">Услуги</a>
              <a href="#benefits" className="text-gray-300 hover:text-brand transition-colors font-medium px-2">Преимущества</a>
              <div className="flex items-center space-x-2 text-sm text-gray-400 px-2">
                <Phone className="h-4 w-4" />
                <span>+7 (999) 123-45-67</span>
              </div>
              <div className="flex flex-col space-y-2 pt-4">
                <Link to="/login">
                  <Button variant="ghost" className="w-full text-gray-300 hover:text-white hover:bg-gray-800">
                    Войти
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full bg-gradient-to-r from-brand to-cyan-400 hover:from-cyan-400 hover:to-brand text-gray-900 font-bold">
                    Стать партнером
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
