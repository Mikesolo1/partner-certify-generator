
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';

interface HeaderProps {
  variant?: 'dark' | 'light';
}

const Header = ({ variant = 'dark' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isDark = variant === 'dark';
  const bgClass = isDark ? 'bg-gray-900/95 backdrop-blur-lg border-gray-800' : 'bg-white border-gray-200';
  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const linkTextClass = isDark ? 'text-gray-300 hover:text-brand' : 'text-gray-600 hover:text-brand';
  const buttonHoverClass = isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100';
  const menuBorderClass = isDark ? 'border-gray-800' : 'border-gray-200';
  const phoneTextClass = isDark ? 'text-gray-400' : 'text-gray-500';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${bgClass} border-b shadow-xl`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-brand to-cyan-400 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-gray-900 font-black text-lg">S3</span>
            </div>
            <span className={`text-xl font-bold ${textClass} group-hover:text-brand transition-colors`}>S3 Partners</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button onClick={() => scrollToSection('about')} className={`${linkTextClass} transition-colors font-medium`}>О компании</button>
            <button onClick={() => scrollToSection('services')} className={`${linkTextClass} transition-colors font-medium`}>Услуги</button>
            <button onClick={() => scrollToSection('benefits')} className={`${linkTextClass} transition-colors font-medium`}>Преимущества</button>
            <a href="tel:+79991234567" className={`flex items-center space-x-2 text-sm ${phoneTextClass} hover:text-brand transition-colors`}>
              <Phone className="h-4 w-4" />
              <span>+7 (999) 123-45-67</span>
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className={`${linkTextClass} ${buttonHoverClass}`}>
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
            className={`lg:hidden p-2 ${linkTextClass} transition-colors`}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`lg:hidden py-4 border-t ${menuBorderClass}`}>
            <nav className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('about')} className={`${linkTextClass} transition-colors font-medium px-2 text-left`}>О компании</button>
              <button onClick={() => scrollToSection('services')} className={`${linkTextClass} transition-colors font-medium px-2 text-left`}>Услуги</button>
              <button onClick={() => scrollToSection('benefits')} className={`${linkTextClass} transition-colors font-medium px-2 text-left`}>Преимущества</button>
              <a href="tel:+79991234567" className={`flex items-center space-x-2 text-sm ${phoneTextClass} px-2 hover:text-brand transition-colors`}>
                <Phone className="h-4 w-4" />
                <span>+7 (999) 123-45-67</span>
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Link to="/login">
                  <Button variant="ghost" className={`w-full ${linkTextClass} ${buttonHoverClass}`}>
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
