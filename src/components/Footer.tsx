
import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-brand/10 to-cyan-300/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-purple-500/5 to-brand/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand to-cyan-400 rounded-xl blur opacity-50"></div>
                  <div className="relative bg-gradient-to-r from-brand to-cyan-400 p-3 rounded-xl">
                    <span className="font-black text-2xl text-white">S3</span>
                  </div>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Tech
                </div>
              </div>
              
              <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-2xl">
                Партнерская программа по продвижению WhatsApp Business API решений. 
                Зарабатывайте с лидером рынка WABA в России.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: Mail, text: "sales1@s-3.tech", href: "mailto:sales1@s-3.tech" },
                  { icon: Phone, text: "+7 (969) 777-62-52", href: "tel:+79697776252" },
                  { icon: MapPin, text: "Москва, Россия", href: null }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center group">
                    <div className="w-10 h-10 bg-gradient-to-r from-brand/20 to-cyan-400/20 rounded-lg flex items-center justify-center mr-4 group-hover:from-brand/30 group-hover:to-cyan-400/30 transition-all duration-300">
                      <contact.icon className="h-5 w-5 text-brand" />
                    </div>
                    {contact.href ? (
                      <a 
                        href={contact.href} 
                        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                      >
                        {contact.text}
                        <ExternalLink className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </a>
                    ) : (
                      <span className="text-gray-300">{contact.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Partners Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Партнерам</h3>
              <ul className="space-y-4">
                {[
                  { text: "Стать партнером", href: "/register" },
                  { text: "Войти в кабинет", href: "/login" },
                  { text: "Список партнеров", href: "/partners" },
                  { text: "Обучающие материалы", href: "#" }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href} 
                      className="text-gray-400 hover:text-brand transition-colors duration-300 flex items-center group"
                    >
                      <span className="relative">
                        {link.text}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Правовая информация</h3>
              <ul className="space-y-4">
                {[
                  "Пользовательское соглашение",
                  "Политика конфиденциальности", 
                  "Договор партнерства",
                  "Оферта"
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-brand transition-colors duration-300 flex items-center group"
                    >
                      <span className="relative">
                        {link}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              <div className="text-center lg:text-left">
                <div className="text-gray-400 mb-2">
                  © 2024 S3. Все права защищены.
                </div>
                <div className="text-sm text-gray-500">
                  <p className="mb-1">ИП Киреев Никита Андреевич</p>
                  <p>ИНН: 580903594790 • ОГРНИП: 324580000058570</p>
                </div>
              </div>
              
              {/* Scroll to top button */}
              <Button
                onClick={scrollToTop}
                variant="outline"
                size="icon"
                className="border-brand/30 text-brand hover:bg-brand/10 hover:border-brand transition-all duration-300 group"
              >
                <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
