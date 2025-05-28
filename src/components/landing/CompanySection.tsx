import React from 'react';
import { Building2, Award, TrendingUp, Star, CheckCircle, Rocket, Users, Shield } from 'lucide-react';

const CompanySection = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-brand/10 to-cyan-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-purple-200/10 to-brand/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-brand to-cyan-400 rounded-2xl mb-6 shadow-lg">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            О компании S3
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Мы — эксперты WhatsApp Business API с многолетним опытом работы с крупнейшими брендами России
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Achievements */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-gray-200/50 shadow-2xl relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-cyan-50/50 to-transparent rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Наши достижения</h3>
              </div>
              
              <div className="space-y-6">
                {[
                  { icon: Star, text: "Более 500 успешно запущенных WABA аккаунтов", color: "text-yellow-500" },
                  { icon: Rocket, text: "Работаем с компаниями от стартапов до Enterprise", color: "text-purple-500" },
                  { icon: CheckCircle, text: "99.9% uptime наших WABA решений", color: "text-green-500" },
                  { icon: Users, text: "Собственная техническая поддержка 24/7", color: "text-brand" }
                ].map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white/60 rounded-xl border border-gray-100 hover:border-brand/20 transition-all duration-300 group">
                    <div className="flex-shrink-0">
                      <achievement.icon className={`h-6 w-6 ${achievement.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                      {achievement.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Mission & Services */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-gray-200/50 shadow-2xl relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-transparent rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-brand to-cyan-400 rounded-xl flex items-center justify-center mr-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Наша миссия</h3>
              </div>
              
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                Делать бизнес-коммуникации через WhatsApp простыми, надежными и эффективными. 
                Мы помогаем компаниям налаживать прямой контакт с клиентами через самый популярный мессенджер в мире.
              </p>
              
              <h4 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CheckCircle className="h-6 w-6 text-brand mr-3" />
                Наши услуги
              </h4>
              
              <div className="space-y-4">
                {[
                  "Настройка и запуск WABA аккаунтов",
                  "Интеграция с CRM и внешними системами", 
                  "Разработка чат-ботов и автоматизации",
                  "Консультации по стратегии коммуникаций"
                ].map((service, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg border border-gray-100 hover:border-brand/20 transition-all duration-300 group">
                    <div className="w-2 h-2 bg-gradient-to-r from-brand to-cyan-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    <p className="text-gray-700 group-hover:text-gray-900 transition-colors">{service}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 lg:mt-20 bg-gradient-to-r from-brand/10 via-cyan-50 to-brand/5 rounded-3xl p-8 lg:p-12 border border-brand/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Запущенных WABA", icon: Rocket },
              { number: "99.9%", label: "Uptime", icon: Shield },
              { number: "24/7", label: "Поддержка", icon: Users },
              { number: "3+", label: "Года опыта", icon: Award }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-brand to-cyan-400 rounded-xl mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-brand mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
