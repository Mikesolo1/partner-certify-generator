
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Users, TrendingUp, Shield, Target, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-32 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Основное предложение */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-sm font-medium backdrop-blur-sm">
                <TrendingUp className="h-4 w-4 mr-2 text-blue-400" />
                Рынок WABA растет на 40% в год
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Зарабатывайте на<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  WhatsApp Business API
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                Получайте до <span className="font-bold text-blue-400">50% комиссии</span> с каждого клиента WABA. 
                Стабильный доход от <span className="font-bold text-white">168 000 ₽</span> в год с одного клиента.
              </p>
            </div>

            {/* Преимущества */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm lg:text-base">Без вложений и рисков</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm lg:text-base">Полное обучение</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm lg:text-base">Маркетинговые материалы</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm lg:text-base">Техподдержка 24/7</span>
              </div>
            </div>

            {/* CTA кнопки */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register" className="flex-1 sm:flex-none">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 font-semibold shadow-xl border-0">
                  Стать партнером бесплатно
                </Button>
              </Link>
              <Link to="/login" className="flex-1 sm:flex-none">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-lg px-8 py-4 backdrop-blur-sm">
                  Войти в кабинет
                </Button>
              </Link>
            </div>

            {/* Социальное доказательство */}
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-400" />
                <span>Уже <span className="font-bold text-white">500+ партнеров</span> зарабатывают с S3</span>
              </div>
            </div>

            {/* Рейтинг и отзывы */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-blue-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-300">4.9/5 на основе 247 отзывов</span>
            </div>
          </div>

          {/* Правая колонка - ключевые метрики */}
          <div className="lg:pl-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center mb-8">
                <Target className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Почему выбирают S3</h3>
                <p className="text-gray-300">Лидер рынка WABA в России</p>
              </div>

              <div className="space-y-6">
                {/* Ключевые преимущества */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center space-x-3 mb-2">
                      <Shield className="h-6 w-6 text-blue-400" />
                      <span className="font-semibold">Максимальная надежность</span>
                    </div>
                    <p className="text-sm text-gray-300">99.9% uptime и защита от блокировок</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center space-x-3 mb-2">
                      <TrendingUp className="h-6 w-6 text-blue-400" />
                      <span className="font-semibold">Растущий доход</span>
                    </div>
                    <p className="text-sm text-gray-300">Стабильные выплаты каждый месяц</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center space-x-3 mb-2">
                      <Users className="h-6 w-6 text-blue-400" />
                      <span className="font-semibold">Полная поддержка</span>
                    </div>
                    <p className="text-sm text-gray-300">От обучения до сопровождения сделок</p>
                  </div>
                </div>

                {/* Статистика */}
                <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 rounded-xl p-6 border border-blue-500/30">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-400">500+</div>
                      <div className="text-xs text-gray-300">WABA запущено</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">99.9%</div>
                      <div className="text-xs text-gray-300">uptime</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">24/7</div>
                      <div className="text-xs text-gray-300">поддержка</div>
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
