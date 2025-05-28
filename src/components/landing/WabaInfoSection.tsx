
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Globe, Zap, Phone, CheckCircle, Users, TrendingUp } from 'lucide-react';

const WabaInfoSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-300/10 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-brand to-cyan-400 rounded-2xl mb-6 shadow-lg">
            <MessageSquare className="h-10 w-10 text-gray-900" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">
            Что такое WhatsApp Business API?
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            WhatsApp Business API (WABA) — это мощный инструмент для бизнеса, который позволяет компаниям 
            общаться с клиентами через WhatsApp в промышленных масштабах.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {[
            { icon: Globe, title: "2+ миллиардов пользователей", desc: "WhatsApp — самый популярный мессенджер в мире с огромной аудиторией", color: "from-blue-500 to-blue-600" },
            { icon: Zap, title: "Высокие конверсии", desc: "Open rate до 98% и высокий уровень доверия пользователей к платформе", color: "from-brand to-cyan-400" },
            { icon: Phone, title: "Удобство общения", desc: "Клиенты уже знают и используют WhatsApp — не нужно изучать новые приложения", color: "from-purple-500 to-purple-600" }
          ].map((stat, index) => (
            <Card key={index} className="relative group bg-white/5 backdrop-blur-sm border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/80 rounded-lg"></div>
              <CardHeader className="relative z-10 text-center pb-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-xl mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg lg:text-xl font-bold text-white mb-2">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 text-center">
                <p className="text-gray-300 leading-relaxed">{stat.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-700 shadow-2xl">
          <div className="text-center mb-10">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              WABA открывает возможности для:
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-brand to-cyan-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6">
              {[
                { icon: TrendingUp, title: "Массовых рассылок", desc: "уведомления, акции, новости" },
                { icon: Users, title: "Поддержки клиентов", desc: "быстрые ответы на вопросы" },
                { icon: MessageSquare, title: "Продаж", desc: "отправка каталогов и оформление заказов" }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-600 hover:border-brand/20 transition-all duration-300 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-brand/20 to-cyan-400/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-brand" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              {[
                { icon: Zap, title: "Автоматизации", desc: "чат-боты и авто-ответы" },
                { icon: Globe, title: "Интеграций", desc: "связь с CRM и другими системами" },
                { icon: CheckCircle, title: "Аналитики", desc: "детальная статистика сообщений" }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-600 hover:border-brand/20 transition-all duration-300 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-brand/20 to-cyan-400/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-brand" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WabaInfoSection;
