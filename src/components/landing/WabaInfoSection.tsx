
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Globe, Zap, Phone, CheckCircle } from 'lucide-react';

const WabaInfoSection = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <MessageSquare className="h-16 w-16 text-brand mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Что такое WhatsApp Business API?
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            WhatsApp Business API (WABA) — это мощный инструмент для бизнеса, который позволяет компаниям 
            общаться с клиентами через WhatsApp в промышленных масштабах.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-brand/20 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <Globe className="h-12 w-12 text-brand mx-auto mb-4" />
              <CardTitle className="text-xl text-gray-900">2+ миллиардов пользователей</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                WhatsApp — самый популярный мессенджер в мире с огромной аудиторией
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-brand/20 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <Zap className="h-12 w-12 text-brand mx-auto mb-4" />
              <CardTitle className="text-xl text-gray-900">Высокие конверсии</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Open rate до 98% и высокий уровень доверия пользователей к платформе
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-brand/20 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <Phone className="h-12 w-12 text-brand mx-auto mb-4" />
              <CardTitle className="text-xl text-gray-900">Удобство общения</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Клиенты уже знают и используют WhatsApp — не нужно изучать новые приложения
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-xl p-8 border border-brand/20 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🚀 WABA открывает возможности для:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-brand mt-1 flex-shrink-0" />
                <p className="text-gray-700"><strong>Массовых рассылок</strong> — уведомления, акции, новости</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-brand mt-1 flex-shrink-0" />
                <p className="text-gray-700"><strong>Поддержки клиентов</strong> — быстрые ответы на вопросы</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-brand mt-1 flex-shrink-0" />
                <p className="text-gray-700"><strong>Продаж</strong> — отправка каталогов и оформление заказов</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-brand mt-1 flex-shrink-0" />
                <p className="text-gray-700"><strong>Автоматизации</strong> — чат-боты и авто-ответы</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-brand mt-1 flex-shrink-0" />
                <p className="text-gray-700"><strong>Интеграций</strong> — связь с CRM и другими системами</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-brand mt-1 flex-shrink-0" />
                <p className="text-gray-700"><strong>Аналитики</strong> — детальная статистика сообщений</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WabaInfoSection;
