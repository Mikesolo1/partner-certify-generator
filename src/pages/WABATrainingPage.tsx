
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Zap, Shield, Users, CheckCircle, AlertCircle, DollarSign, Phone } from 'lucide-react';

const WABATrainingPage = () => {
  const advantages = [
    {
      icon: <MessageSquare className="h-6 w-6 text-brand" />,
      title: "Профессиональное общение",
      description: "Официальный канал для бизнеса с верифицированной галочкой"
    },
    {
      icon: <Zap className="h-6 w-6 text-brand" />,
      title: "Автоматизация",
      description: "Чат-боты, автоответчики, интеграция с CRM системами"
    },
    {
      icon: <Shield className="h-6 w-6 text-brand" />,
      title: "Безопасность",
      description: "Сквозное шифрование и защита данных клиентов"
    },
    {
      icon: <Users className="h-6 w-6 text-brand" />,
      title: "Массовые рассылки",
      description: "Возможность отправки сообщений большому количеству клиентов"
    }
  ];

  const features = [
    "Верифицированный бизнес-профиль с зеленой галочкой",
    "Отправка до 1000 бесплатных сообщений в месяц",
    "Шаблоны сообщений для рассылок",
    "Интеграция с CRM и другими системами",
    "Аналитика и отчеты о доставке сообщений",
    "Поддержка медиафайлов (изображения, документы, видео)",
    "Кнопки быстрых действий в сообщениях",
    "Каталог товаров в WhatsApp"
  ];

  const pricingTypes = [
    {
      tier: "Маркетинговые сообщения",
      description: "Промо-акции, новости, анонсы",
      price: "0.0802$",
      details: "За каждое сообщение свыше лимита 1000/месяц"
    },
    {
      tier: "Утилитарные сообщения",
      description: "Подтверждения заказов, уведомления о доставке",
      price: "0.0400$",
      details: "Статусы заказов, напоминания о встречах"
    },
    {
      tier: "Аутентификация",
      description: "Коды подтверждения, верификация",
      price: "0.0429$",
      details: "OTP коды, двухфакторная аутентификация"
    }
  ];

  const popularCountries = [
    { country: "Россия", marketing: "0.0802$", utility: "0.0400$", auth: "0.0429$" },
    { country: "Германия", marketing: "0.1365$", utility: "0.0550$", auth: "0.0768$" },
    { country: "Франция", marketing: "0.1432$", utility: "0.0300$", auth: "0.0691$" },
    { country: "Италия", marketing: "0.0691$", utility: "0.0300$", auth: "0.0378$" },
    { country: "Испания", marketing: "0.0615$", utility: "0.0200$", auth: "0.0342$" },
    { country: "Великобритания", marketing: "0.0529$", utility: "0.0220$", auth: "0.0358$" }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Обучение WhatsApp Business API</h1>
            <p className="text-gray-600 mt-2">Полное руководство по использованию WABA для вашего бизнеса</p>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <Phone className="h-4 w-4 mr-1" />
            WhatsApp Business
          </Badge>
        </div>

        {/* Что такое WABA */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-brand" />
              Что такое WhatsApp Business API?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              WhatsApp Business API (WABA) - это официальное решение от Meta для средних и крупных компаний, 
              которое позволяет интегрировать WhatsApp в бизнес-процессы. В отличие от обычного WhatsApp Business, 
              API предоставляет более мощные инструменты автоматизации, интеграции и масштабирования.
            </p>
          </CardContent>
        </Card>

        {/* Преимущества */}
        <Card>
          <CardHeader>
            <CardTitle>Ключевые преимущества WABA</CardTitle>
            <CardDescription>
              Почему стоит выбрать WhatsApp Business API для вашего бизнеса
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  {advantage.icon}
                  <div>
                    <h3 className="font-semibold text-gray-900">{advantage.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{advantage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Возможности */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Возможности платформы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Стоимость по типам сообщений */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-brand" />
              Тарификация WhatsApp Business API
            </CardTitle>
            <CardDescription>
              Стоимость для России. Первые 1000 сообщений в месяц - бесплатно
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {pricingTypes.map((type, index) => (
                <div key={index} className="border rounded-lg p-4 hover:border-brand transition-colors">
                  <h3 className="font-semibold text-lg mb-2">{type.tier}</h3>
                  <p className="text-2xl font-bold text-brand mb-2">{type.price}</p>
                  <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                  <p className="text-xs text-gray-500">{type.details}</p>
                </div>
              ))}
            </div>
            
            {/* Таблица по странам */}
            <div className="mt-6">
              <h4 className="font-semibold mb-4">Стоимость в популярных странах (USD)</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 p-3 text-left font-semibold">Страна</th>
                      <th className="border border-gray-200 p-3 text-center font-semibold">Маркетинговые</th>
                      <th className="border border-gray-200 p-3 text-center font-semibold">Утилитарные</th>
                      <th className="border border-gray-200 p-3 text-center font-semibold">Аутентификация</th>
                    </tr>
                  </thead>
                  <tbody>
                    {popularCountries.map((country, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-200 p-3 font-medium">{country.country}</td>
                        <td className="border border-gray-200 p-3 text-center">{country.marketing}</td>
                        <td className="border border-gray-200 p-3 text-center">{country.utility}</td>
                        <td className="border border-gray-200 p-3 text-center">{country.auth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                * Цены указаны в долларах США за одно сообщение. Актуальные тарифы для других стран уточняйте у менеджера.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Этапы подключения */}
        <Card>
          <CardHeader>
            <CardTitle>Этапы подключения WABA через S3 Partners</CardTitle>
            <CardDescription>
              Пошаговый процесс подключения WhatsApp Business API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-brand text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h3 className="font-semibold">Обращение к S3 Partners</h3>
                  <p className="text-gray-600 text-sm">Свяжитесь с нашим менеджером для начала процесса подключения</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-brand text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h3 className="font-semibold">Верификация бизнеса</h3>
                  <p className="text-gray-600 text-sm">Мы поможем подтвердить ваш бизнес в Meta Business Manager</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-brand text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h3 className="font-semibold">Создание WhatsApp Business аккаунта</h3>
                  <p className="text-gray-600 text-sm">Настроим профиль компании с вашим номером телефона</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-brand text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                <div>
                  <h3 className="font-semibold">Интеграция с системами</h3>
                  <p className="text-gray-600 text-sm">Подключим API к вашим CRM, чат-ботам или другим системам</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-brand text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">5</div>
                <div>
                  <h3 className="font-semibold">Тестирование и запуск</h3>
                  <p className="text-gray-600 text-sm">Протестируем функционал и запустим отправку сообщений</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Важные моменты */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-amber-500" />
              Важные моменты при работе с WABA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800">Лимиты сообщений</h4>
                <p className="text-amber-700 text-sm mt-1">
                  Новые аккаунты начинают с лимита 250 сообщений в день, который постепенно увеличивается до 100 000
                </p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800">24-часовое окно</h4>
                <p className="text-blue-700 text-sm mt-1">
                  Можете отвечать клиентам в течение 24 часов после их последнего сообщения бесплатно
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800">Шаблоны сообщений</h4>
                <p className="text-green-700 text-sm mt-1">
                  Для рассылок нужно использовать предварительно одобренные шаблоны Meta
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800">Бесплатные сообщения</h4>
                <p className="text-purple-700 text-sm mt-1">
                  Каждый месяц первые 1000 сообщений любого типа отправляются бесплатно
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default WABATrainingPage;
