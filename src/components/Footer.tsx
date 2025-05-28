
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-brand/5 to-cyan-300/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-purple-500/5 to-brand/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-brand to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-gray-900 font-black text-lg">S3</span>
              </div>
              <span className="text-xl font-bold text-white">S3 Partners</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Эксперты WhatsApp Business API с многолетним опытом. Мы помогаем партнерам 
              зарабатывать на растущем рынке WABA решений.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-5 w-5 text-brand" />
                <span>+7 (969) 777-62-52</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-5 w-5 text-brand" />
                <span>sales1@s-3.tech</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-5 w-5 text-brand" />
                <span>Москва, Россия</span>
              </div>
            </div>
            
            {/* Юридическая информация */}
            <div className="mt-6 pt-4 border-t border-gray-700">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Юридическая информация</h4>
              <div className="text-xs text-gray-400 space-y-1">
                <p>ИНН: 580903594790</p>
                <p>ОГРНИП: 324580000058570</p>
                <p>ИП Киреев Никита Андреевич</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Партнерам</h3>
            <div className="space-y-3">
              <Link to="/register" className="block text-gray-300 hover:text-brand transition-colors">
                Стать партнером
              </Link>
              <Link to="/login" className="block text-gray-300 hover:text-brand transition-colors">
                Войти в кабинет
              </Link>
              <Link to="/partners" className="block text-gray-300 hover:text-brand transition-colors">
                Наши партнеры
              </Link>
              <a href="#benefits" className="block text-gray-300 hover:text-brand transition-colors">
                Преимущества
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Поддержка</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Clock className="h-5 w-5 text-brand" />
                <span>24/7 поддержка</span>
              </div>
              <a href="mailto:sales1@s-3.tech" className="block text-gray-300 hover:text-brand transition-colors">
                Техподдержка
              </a>
              <a href="#faq" className="block text-gray-300 hover:text-brand transition-colors">
                FAQ
              </a>
              <a href="#docs" className="block text-gray-300 hover:text-brand transition-colors">
                Документация
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 S3 Partners. Все права защищены.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-brand transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#terms" className="text-gray-400 hover:text-brand transition-colors">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
