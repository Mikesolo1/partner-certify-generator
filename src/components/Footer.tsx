
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Компания */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand">S3 WABA</h3>
            <p className="text-gray-300 text-sm mb-4">
              Партнерская программа по продвижению WhatsApp Business API решений
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                sales1@s-3.tech
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +7 (969) 777-62-52
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Москва, Россия
              </div>
            </div>
          </div>

          {/* Партнерам */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Партнерам</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/register" className="hover:text-brand transition-colors">Стать партнером</a></li>
              <li><a href="/login" className="hover:text-brand transition-colors">Войти в кабинет</a></li>
              <li><a href="/partners" className="hover:text-brand transition-colors">Список партнеров</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Обучающие материалы</a></li>
            </ul>
          </div>

          {/* Юридическая информация */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Правовая информация</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand transition-colors">Пользовательское соглашение</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Политика конфиденциальности</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Договор партнерства</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Оферта</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <div className="mb-4 md:mb-0">
              © 2024 S3 WABA. Все права защищены.
            </div>
            <div className="text-center md:text-right">
              <p className="mb-1">ИП Киреев Никита Андреевич</p>
              <p>ИНН: 580903594790 • ОГРНИП: 324580000058570</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
