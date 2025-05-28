import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Users, TrendingUp, Shield, Target, Star, ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-brand/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-blue-300/20 to-brand/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-brand/10 to-cyan-200/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-brand/20 to-cyan-400/20 border border-brand/30 rounded-full text-sm font-semibold text-brand backdrop-blur-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Рынок WABA растет на 40% в год
            </div>
            
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
                <span className="text-white">Зарабатывайте на</span>
                <br />
                <span className="bg-gradient-to-r from-brand via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  WhatsApp Business API
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light">
                Получайте до <span className="font-bold text-brand">50% комиссии</span> с каждого клиента.
                <br className="hidden sm:block" />
                Стабильный доход от <span className="font-bold text-white">168 000 ₽</span> в год.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: CheckCircle, text: "Без вложений и рисков" },
                { icon: Shield, text: "Полное обучение" },
                { icon: Target, text: "Маркетинговые материалы" },
                { icon: Users, text: "Техподдержка 24/7" }
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-700 shadow-sm hover:shadow-md hover:border-brand/30 transition-all duration-300">
                  <benefit.icon className="h-5 w-5 text-brand flex-shrink-0" />
                  <span className="text-gray-300 font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register" className="flex-1 sm:flex-none">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-brand to-cyan-400 hover:from-cyan-500 hover:to-brand text-gray-900 text-lg font-bold px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
                  Стать партнером бесплатно
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login" className="flex-1 sm:flex-none">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-brand text-brand hover:bg-brand/10 hover:border-cyan-400 text-lg font-semibold px-8 py-4 backdrop-blur-sm transition-all duration-300">
                  Войти в кабинет
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-brand" />
                <span className="text-gray-400">Уже <span className="font-bold text-white">500+ партнеров</span> зарабатывают с S3</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-brand fill-current" />
                  ))}
                </div>
                <span className="text-gray-400">4.9/5 • 247 отзывов</span>
              </div>
            </div>
          </div>

          {/* Right Column - Stats Card */}
          <div className="lg:pl-8">
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-gray-700 shadow-2xl">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-cyan-300/5 rounded-3xl"></div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-brand to-cyan-400 rounded-2xl mb-4">
                    <Target className="h-8 w-8 text-gray-900" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-2 text-white">Почему выбирают S3</h3>
                  <p className="text-gray-400">Лидер рынка WABA в России</p>
                </div>

                {/* Key Features */}
                <div className="space-y-6 mb-8">
                  {[
                    { icon: Shield, title: "Максимальная надежность", desc: "99.9% uptime и защита от блокировок" },
                    { icon: TrendingUp, title: "Растущий доход", desc: "Стабильные выплаты каждый месяц" },
                    { icon: Users, title: "Полная поддержка", desc: "От обучения до сопровождения сделок" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-600">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-brand/20 to-cyan-400/20 rounded-xl flex items-center justify-center">
                        <feature.icon className="h-6 w-6 text-brand" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-400">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="bg-gradient-to-r from-brand/10 via-cyan-400/10 to-brand/5 rounded-2xl p-6 border border-brand/20">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xl lg:text-2xl font-bold text-brand">500+</div>
                      <div className="text-xs text-gray-400">WABA запущено</div>
                    </div>
                    <div>
                      <div className="text-xl lg:text-2xl font-bold text-brand">99.9%</div>
                      <div className="text-xs text-gray-400">uptime</div>
                    </div>
                    <div>
                      <div className="text-xl lg:text-2xl font-bold text-brand">24/7</div>
                      <div className="text-xs text-gray-400">поддержка</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
