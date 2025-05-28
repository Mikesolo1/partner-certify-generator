
import React from 'react';
import { Building2, Award, TrendingUp, Star, CheckCircle } from 'lucide-react';

const CompanySection = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Building2 className="h-16 w-16 text-brand mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            О компании S3
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Мы — эксперты WhatsApp Business API с многолетним опытом работы с крупнейшими брендами России
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-xl p-8 border border-brand/20 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Award className="h-8 w-8 text-brand mr-3" />
              Наши достижения
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Star className="h-6 w-6 text-brand mt-1 flex-shrink-0" />
                <p className="text-gray-700">Более 500 успешно запущенных WABA аккаунтов</p>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="h-6 w-6 text-brand mt-1 flex-shrink-0" />
                <p className="text-gray-700">Работаем с компаниями от стартапов до Enterprise</p>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="h-6 w-6 text-brand mt-1 flex-shrink-0" />
                <p className="text-gray-700">99.9% uptime наших WABA решений</p>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="h-6 w-6 text-brand mt-1 flex-shrink-0" />
                <p className="text-gray-700">Собственная техническая поддержка 24/7</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-8 border border-brand/20 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="h-8 w-8 text-brand mr-3" />
              Наша миссия
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Делать бизнес-коммуникации через WhatsApp простыми, надежными и эффективными. 
              Мы помогаем компаниям налаживать прямой контакт с клиентами через самый популярный мессенджер в мире.
            </p>
            <h4 className="text-xl font-bold text-gray-900 mb-4">💼 Наши услуги</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-brand mt-1 flex-shrink-0" />
                <p className="text-gray-700">Настройка и запуск WABA аккаунтов</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-brand mt-1 flex-shrink-0" />
                <p className="text-gray-700">Интеграция с CRM и внешними системами</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-brand mt-1 flex-shrink-0" />
                <p className="text-gray-700">Разработка чат-ботов и автоматизации</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-brand mt-1 flex-shrink-0" />
                <p className="text-gray-700">Консультации по стратегии коммуникаций</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySection;
