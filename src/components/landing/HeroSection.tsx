
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Users, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-brand to-brand-dark text-white py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка - основное предложение */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium">
                <TrendingUp className="h-4 w-4 mr-2" />
                Рынок WABA растет на 40% в год
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Зарабатывайте на<br />
                <span className="text-yellow-300">WhatsApp Business API</span>
              </h1>
              
              <p className="text-xl lg:text-2xl opacity-90 leading-relaxed">
                Получайте до <span className="font-bold text-yellow-300">50% комиссии</span> с каждого клиента WABA. 
                Стабильный доход от <span className="font-bold">168 000 ₽</span> в год с одного клиента.
              </p>
            </div>

            {/* Преимущества */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                <span className="text-sm lg:text-base">Без вложений и рисков</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                <span className="text-sm lg:text-base">Полное обучение</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                <span className="text-sm lg:text-base">Маркетинговые материалы</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                <span className="text-sm lg:text-base">Техподдержка 24/7</span>
              </div>
            </div>

            {/* CTA кнопки */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register" className="flex-1 sm:flex-none">
                <Button size="lg" className="w-full sm:w-auto bg-yellow-400 text-gray-900 hover:bg-yellow-300 text-lg px-8 py-4 font-bold shadow-xl">
                  Стать партнером бесплатно
                </Button>
              </Link>
              <Link to="/login" className="flex-1 sm:flex-none">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-brand text-lg px-8 py-4">
                  Войти в кабинет
                </Button>
              </Link>
            </div>

            {/* Социальное доказательство */}
            <div className="text-sm opacity-75">
              Уже <span className="font-bold text-yellow-300">500+ партнеров</span> зарабатывают с S3
            </div>
          </div>

          {/* Правая колонка - карточка с цифрами */}
          <div className="lg:pl-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <Users className="h-12 w-12 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Калькулятор дохода</h3>
                <p className="text-white/80">Пример с клиентом на 10 000 контактов</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300 mb-1">28 000 ₽</div>
                    <div className="text-sm text-white/80">ежемесячный платеж клиента</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-lg font-bold text-yellow-300">50%</div>
                    <div className="text-xs text-white/70">1-й год</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-lg font-bold text-yellow-300">30%</div>
                    <div className="text-xs text-white/70">2-й год</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-lg font-bold text-yellow-300">10%</div>
                    <div className="text-xs text-white/70">3+ лет</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-300/20 rounded-xl p-4 border border-yellow-400/30">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-300 mb-1">302 400 ₽</div>
                    <div className="text-sm text-white/90">ваш доход за 3 года</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Дополнительное социальное доказательство */}
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-yellow-300">500+</div>
                <div className="text-xs text-white/70">WABA запущено</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-300">99.9%</div>
                <div className="text-xs text-white/70">uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-300">24/7</div>
                <div className="text-xs text-white/70">поддержка</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
