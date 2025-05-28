
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Award, TrendingUp, Shield, CheckCircle, DollarSign, MessageSquare, Globe, Phone, Zap, Building2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-accent">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center text-white mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Партнерская программа <span className="text-brand-light">S3</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Зарабатывайте до <span className="font-bold text-yellow-300">50%</span> с каждого клиента WhatsApp Business API
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-brand-primary hover:bg-gray-100 text-lg px-8 py-4">
                Стать партнером
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-primary text-lg px-8 py-4">
                Войти в кабинет
              </Button>
            </Link>
          </div>
        </div>

        {/* What is WABA Section */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <MessageSquare className="h-16 w-16 text-brand-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Что такое WhatsApp Business API?
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              WhatsApp Business API (WABA) — это мощный инструмент для бизнеса, который позволяет компаниям 
              общаться с клиентами через WhatsApp в промышленных масштабах.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center border-2 border-blue-100 hover:border-blue-300 transition-colors">
              <CardHeader>
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl">2+ миллиардов пользователей</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  WhatsApp — самый популярный мессенджер в мире с огромной аудиторией
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-green-100 hover:border-green-300 transition-colors">
              <CardHeader>
                <Zap className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Высокие конверсии</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Open rate до 98% и высокий уровень доверия пользователей к платформе
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-purple-100 hover:border-purple-300 transition-colors">
              <CardHeader>
                <Phone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Удобство общения</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Клиенты уже знают и используют WhatsApp — не нужно изучать новые приложения
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              🚀 WABA открывает возможности для:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-gray-700">✅ <strong>Массовых рассылок</strong> — уведомления, акции, новости</p>
                <p className="text-gray-700">✅ <strong>Поддержки клиентов</strong> — быстрые ответы на вопросы</p>
                <p className="text-gray-700">✅ <strong>Продаж</strong> — отправка каталогов и оформление заказов</p>
              </div>
              <div className="space-y-3">
                <p className="text-gray-700">✅ <strong>Автоматизации</strong> — чат-боты и авто-ответы</p>
                <p className="text-gray-700">✅ <strong>Интеграций</strong> — связь с CRM и другими системами</p>
                <p className="text-gray-700">✅ <strong>Аналитики</strong> — детальная статистика сообщений</p>
              </div>
            </div>
          </div>
        </div>

        {/* Commission Section */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <DollarSign className="h-16 w-16 text-brand-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              💰 Зарабатывайте с каждого клиента WABA
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Приведите клиента с аккаунтом WhatsApp Business API и получайте долгосрочный доход
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center border-2 border-green-200 bg-gradient-to-b from-green-50 to-white">
              <CardHeader>
                <CardTitle className="text-3xl text-green-600 font-bold">50%</CardTitle>
                <CardDescription className="text-lg">от всех платежей клиента</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 font-semibold">первый год</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-blue-200 bg-gradient-to-b from-blue-50 to-white">
              <CardHeader>
                <CardTitle className="text-3xl text-blue-600 font-bold">30%</CardTitle>
                <CardDescription className="text-lg">от всех платежей клиента</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 font-semibold">второй год</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-purple-200 bg-gradient-to-b from-purple-50 to-white">
              <CardHeader>
                <CardTitle className="text-3xl text-purple-600 font-bold">10%</CardTitle>
                <CardDescription className="text-lg">от всех платежей клиента</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 font-semibold">с третьего года</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              💡 Пример дохода с одного клиента
            </h3>
            <div className="bg-white rounded-lg p-6 mb-6">
              <p className="text-gray-700 text-lg mb-4">
                <strong>Клиент с базой 10 000 контактов</strong> платит около <span className="text-2xl font-bold text-brand-primary">28 000 ₽</span> в месяц
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-lg font-semibold text-green-600">1-й год</p>
                <p className="text-2xl font-bold text-gray-800">168 000 ₽</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-lg font-semibold text-blue-600">2-й год</p>
                <p className="text-2xl font-bold text-gray-800">100 800 ₽</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-lg font-semibold text-purple-600">3-й год</p>
                <p className="text-2xl font-bold text-gray-800">33 600 ₽</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-2xl font-bold text-green-600">
                🎯 Итого: <span className="text-3xl">302 400 ₽</span> с одного клиента за 3 года
              </p>
            </div>
          </div>
        </div>

        {/* About S3 Company */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <Building2 className="h-16 w-16 text-brand-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              О компании S3
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Мы — эксперты WhatsApp Business API с многолетним опытом работы с крупнейшими брендами России
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">🏆 Наши достижения</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Star className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Более 500 успешно запущенных WABA аккаунтов</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Работаем с компаниями от стартапов до Enterprise</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">99.9% uptime наших WABA решений</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Собственная техническая поддержка 24/7</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">🎯 Наша миссия</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Делать бизнес-коммуникации через WhatsApp простыми, надежными и эффективными. 
                Мы помогаем компаниям налаживать прямой контакт с клиентами через самый популярный мессенджер в мире.
              </p>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">💼 Наши услуги</h3>
              <div className="space-y-2">
                <p className="text-gray-700">• Настройка и запуск WABA аккаунтов</p>
                <p className="text-gray-700">• Интеграция с CRM и внешними системами</p>
                <p className="text-gray-700">• Разработка чат-ботов и автоматизации</p>
                <p className="text-gray-700">• Консультации по стратегии коммуникаций</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose S3 */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            🔥 Почему клиенты выбирают S3
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-xl">Прозрачное ценообразование</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Никаких скрытых комиссий за сообщения. Оплата только за уникальные контакты, 
                  с которыми была коммуникация за последние 30 дней.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl">Максимальная надежность</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Оптимизируем шаблоны, контролируем качество рассылок и правильно ведём 
                  прогрев аккаунта для минимизации рисков блокировок.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-xl">Экспертная поддержка</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Полное сопровождение проектов: от настройки до оптимизации. 
                  Быстро заменяем или перезапускаем WABA в случае необходимости.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Partner Benefits */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            🚀 Преимущества партнерства с S3
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2 border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 to-white">
              <CardHeader>
                <Award className="h-12 w-12 text-brand-primary mb-4" />
                <CardTitle className="text-xl">Обучение и сертификация</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Получите все необходимые знания о WABA и сертификат партнера. 
                  Мы предоставляем полные материалы для работы с клиентами.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-xl">Растущий рынок</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  WABA — быстро развивающийся сегмент. Каждый день все больше компаний 
                  понимают ценность прямых коммуникаций с клиентами через WhatsApp.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Готовы зарабатывать с S3?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Станьте частью команды экспертов WABA и начните получать стабильный доход уже сегодня
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-brand-primary hover:bg-gray-100 text-lg px-8 py-4">
              Присоединиться к программе
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
