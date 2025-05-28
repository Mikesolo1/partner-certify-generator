
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Users, TrendingUp, Shield, Target, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 text-gray-900 py-16 lg:py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-brand/5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Основное предложение */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-brand/10 border border-brand/20 rounded-full text-sm font-medium">
                <TrendingUp className="h-4 w-4 mr-2 text-brand" />
                Рынок WABA растет на 40% в год
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-gray-900">
                Зарабатывайте на<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-dark">
                  WhatsApp Business API
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                Получайте до <span className="font-bold text-brand">50% комиссии</span> с каждого клиента WABA. 
                Стабильный доход от <span className="font-bold text-gray-900">168 000 ₽</span> в год с одного клиента.
              </p>
            </div>

            {/* Преимущества */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                <CheckCircle className="h-5 w-5 text-brand flex-shrink-0" />
                <span className="text-sm lg:text-base text-gray-700">Без вложений и рисков</span>
              </div>
              <div className="flex items-center space-x-3 bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                <CheckCircle className="h-5 w-5 text-brand flex-shrink-0" />
                <span className="text-sm lg:text-base text-gray-700">Полное обучение</span>
              </div>
              <div className="flex items-center space-x-3 bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                <CheckCircle className="h-5 w-5 text-brand flex-shrink-0" />
                <span className="text-sm lg:text-base text-gray-700">Маркетинговые материалы</span>
              </div>
              <div className="flex items-center space-x-3 bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                <CheckCircle className="h-5 w-5 text-brand flex-shrink-0" />
                <span className="text-sm lg:text-base text-gray-700">Техподдержка 24/7</span>
              </div>
            </div>

            {/* CTA кнопки */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register" className="flex-1 sm:flex-none">
                <Button size="lg" className="w-full sm:w-auto bg-brand hover:bg-brand-dark text-white text-lg px-8 py-4 font-semibold shadow-xl">
                  Стать партнером бесплатно
                </Button>
              </Link>
              <Link to="/login" className="flex-1 sm:flex-none">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-brand text-brand hover:bg-brand/10 hover:border-brand-dark text-lg px-8 py-4">
                  Войти в кабинет
                </Button>
              </Link>
            </div>

            {/* Социальное доказательство */}
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-brand" />
                <span>Уже <span className="font-bold text-gray-900">500+ партнеров</span> зарабатывают с S3</span>
              </div>
            </div>

            {/* Рейтинг и отзывы */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-brand fill-current" />
                ))}
              </div>
              <span className="text-gray-600">4.9/5 на основе 247 отзывов</span>
            </div>
          </div>

          {/* Правая колонка - ключевые метрики */}
          <div className="lg:pl-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="text-center mb-8">
                <Target className="h-12 w-12 text-brand mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Почему выбирают S3</h3>
                <p className="text-gray-600">Лидер рынка WABA в России</p>
              </div>

              <div className="space-y-6">
                {/* Ключевые преимущества */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center space-x-3 mb-2">
                      <Shield className="h-6 w-6 text-brand" />
                      <span className="font-semibold text-gray-900">Максимальная надежность</span>
                    </div>
                    <p className="text-sm text-gray-600">99.9% uptime и защита от блокировок</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center space-x-3 mb-2">
                      <TrendingUp className="h-6 w-6 text-brand" />
                      <span className="font-semibold text-gray-900">Растущий доход</span>
                    </div>
                    <p className="text-sm text-gray-600">Стабильные выплаты каждый месяц</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center space-x-3 mb-2">
                      <Users className="h-6 w-6 text-brand" />
                      <span className="font-semibold text-gray-900">Полная поддержка</span>
                    </div>
                    <p className="text-sm text-gray-600">От обучения до сопровождения сделок</p>
                  </div>
                </div>

                {/* Статистика */}
                <div className="bg-gradient-to-r from-brand/10 to-brand-light rounded-xl p-6 border border-brand/20">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-brand">500+</div>
                      <div className="text-xs text-gray-600">WABA запущено</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-brand">99.9%</div>
                      <div className="text-xs text-gray-600">uptime</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-brand">24/7</div>
                      <div className="text-xs text-gray-600">поддержка</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
