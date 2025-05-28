
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, TrendingUp, Clock } from 'lucide-react';

const FinalCTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-72 h-72 bg-brand/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Success badge */}
          <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-brand to-cyan-400 rounded-full text-xs md:text-sm font-bold text-gray-900 mb-6 md:mb-8 shadow-lg">
            <Star className="h-4 w-4 md:h-5 md:w-5 mr-2 fill-current" />
            500+ успешных партнеров зарабатывают с S3
          </div>
          
          {/* Main heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 md:mb-8 leading-tight">
            Начните зарабатывать
            <span className="block bg-gradient-to-r from-brand via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              с S3 уже сегодня
            </span>
          </h2>
          
          {/* Compelling subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 max-w-3xl mx-auto text-gray-300 leading-relaxed font-light">
            Присоединяйтесь к команде экспертов WhatsApp Business API и получайте до{' '}
            <span className="text-brand font-bold">168 000 ₽</span> с каждого клиента
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-12 md:mb-16">
            <Link to="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-gradient-to-r from-brand to-cyan-400 hover:from-cyan-400 hover:to-brand text-gray-900 hover:text-gray-900 text-base lg:text-xl font-bold px-8 lg:px-12 py-4 lg:py-6 shadow-2xl hover:shadow-brand/25 transform hover:scale-105 transition-all duration-300 group">
                Стать партнером S3
                <ArrowRight className="ml-3 h-5 w-5 lg:h-6 lg:w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full border-2 border-brand/60 text-brand hover:bg-brand hover:text-gray-900 hover:border-brand text-base lg:text-xl font-semibold px-8 lg:px-12 py-4 lg:py-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                Войти в кабинет
              </Button>
            </Link>
          </div>
          
          {/* Benefits grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-brand/30 transition-colors group">
              <div className="bg-gradient-to-br from-brand to-cyan-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-gray-900" />
              </div>
              <div className="text-xl lg:text-2xl font-bold text-white mb-3">Быстрый старт</div>
              <div className="text-sm md:text-base text-gray-400 leading-relaxed">
                Обучение и первые клиенты за 24 часа. Никаких сложных технических знаний не требуется
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-brand/30 transition-colors group">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-gray-900" />
              </div>
              <div className="text-xl lg:text-2xl font-bold text-white mb-3">Без рисков</div>
              <div className="text-sm md:text-base text-gray-400 leading-relaxed">
                0₽ стартовых вложений. Работайте с готовой клиентской базой и проверенным продуктом
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-brand/30 transition-colors group">
              <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-gray-900" />
              </div>
              <div className="text-xl lg:text-2xl font-bold text-white mb-3">Растущий доход</div>
              <div className="text-sm md:text-base text-gray-400 leading-relaxed">
                Долгосрочные комиссии с каждого клиента. Поддержка и развитие 24/7
              </div>
            </div>
          </div>
          
          {/* Trust elements */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-white/10">
            <p className="text-sm md:text-base text-gray-500 mb-4">
              Присоединяйтесь к успешным партнерам S3
            </p>
            <div className="flex justify-center items-center space-x-6 text-gray-600">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-brand">500+</div>
                <div className="text-xs md:text-sm">Партнеров</div>
              </div>
              <div className="w-px h-12 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-brand">2000+</div>
                <div className="text-xs md:text-sm">Клиентов</div>
              </div>
              <div className="w-px h-12 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-brand">24/7</div>
                <div className="text-xs md:text-sm">Поддержка</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
