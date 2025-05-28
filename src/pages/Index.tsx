
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Партнерская программа
              <span className="text-blue-600 block">WhatsApp Business API</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Присоединяйтесь к нашей партнерской программе и зарабатывайте до 50% с каждого клиента. 
              Предоставляем лучшие условия для работы с WhatsApp Business API.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link to="/register">
                  Стать партнером <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/login">
                  Войти в кабинет
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Commission Structure */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              💰 Новая система комиссий WABA
            </h2>
            <p className="text-xl text-gray-600">
              Приведите клиента с WhatsApp Business API и зарабатывайте долгосрочно
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600">1-й год</CardTitle>
                <CardDescription className="text-lg font-semibold">50% комиссия</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Максимальный доход в первый год сотрудничества</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-2xl text-green-600">2-й год</CardTitle>
                <CardDescription className="text-lg font-semibold">30% комиссия</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Стабильный доход во второй год</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-600">3+ год</CardTitle>
                <CardDescription className="text-lg font-semibold">10% комиссия</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Пассивный доход с третьего года</p>
              </CardContent>
            </Card>
          </div>

          {/* Income Example */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-center mb-6">💡 Пример дохода с одного клиента</h3>
            <div className="max-w-2xl mx-auto">
              <p className="text-center text-gray-700 mb-6">
                Если у клиента база 10 000 контактов, он платит около <strong>28 000 ₽ в месяц</strong>
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span>1-й год (50%):</span>
                  <span className="font-bold text-blue-600">168 000 ₽</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span>2-й год (30%):</span>
                  <span className="font-bold text-green-600">100 800 ₽</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span>3-й год (10%):</span>
                  <span className="font-bold text-purple-600">33 600 ₽</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-900 text-white rounded-lg">
                  <span className="text-lg">🟢 Итого за 3 года:</span>
                  <span className="font-bold text-xl">302 400 ₽</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why S3 Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              📦 Почему клиенты выбирают S3
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  Без комиссии за сообщения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Оплата только за количество уникальных контактов, с которыми была коммуникация за последние 30 дней. 
                  Никаких дополнительных комиссий за отправленные сообщения.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-blue-600" />
                  Минимум риска блокировок
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Мы оптимизируем шаблоны, следим за качеством рассылок и правильно ведём прогрев аккаунта. 
                  Это значительно снижает риски блокировок.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-purple-600" />
                  Полная поддержка аккаунтов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Можем закрыть любой вопрос с аккаунтом — в том числе быстро заменить или перезапустить 
                  WABA в случае блокировки.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Преимущества партнерства
            </h2>
            <p className="text-xl text-gray-600">
              Все инструменты для успешного развития бизнеса
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  Высокие комиссии
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  До 50% комиссии с каждого клиента в первый год. Долгосрочное партнерство с растущим доходом.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-blue-600" />
                  Реферальная программа
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Приглашайте новых партнеров и получайте дополнительный доход от их деятельности.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-purple-600" />
                  Профессиональная сертификация
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Получите официальный сертификат партнера после прохождения обучения и тестирования.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-green-600" />
                  Техническая поддержка
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Полная техническая поддержка клиентов и помощь в решении любых вопросов по интеграции.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  Удобный личный кабинет
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Отслеживайте клиентов, платежи и комиссии в удобном интерфейсе партнерского портала.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-purple-600" />
                  Маркетинговые материалы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Готовые презентации, кейсы и материалы для работы с клиентами и продвижения услуг.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы начать зарабатывать?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Присоединяйтесь к нашей партнерской программе уже сегодня и начните получать высокие комиссии
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/register">
              Стать партнером <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 S3 WhatsApp Business API. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
