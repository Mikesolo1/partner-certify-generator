
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Award, TrendingUp, Shield, CheckCircle, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-accent">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Партнерская программа <span className="text-brand-light">S3</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Станьте частью нашей команды и зарабатывайте до 50% с каждого клиента WABA
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-brand-primary hover:bg-gray-100">
                Стать партнером
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-primary">
                Войти в кабинет
              </Button>
            </Link>
          </div>
        </div>

        {/* Новая секция с комиссией WABA */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-16">
          <div className="text-center mb-8">
            <DollarSign className="h-16 w-16 text-brand-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              💰 50% с каждого клиента по WABA — вместе с S3
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Приведите клиента с аккаунтом WhatsApp Business API (WABA) и зарабатывайте:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center border-2 border-green-200">
              <CardHeader>
                <CardTitle className="text-2xl text-green-600">🔹 50%</CardTitle>
                <CardDescription>от всех платежей клиента</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">в первый год</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600">🔹 30%</CardTitle>
                <CardDescription>от всех платежей клиента</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">во второй год</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-600">🔹 10%</CardTitle>
                <CardDescription>от всех платежей клиента</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">с третьего года</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Пример дохода с одного клиента:</h3>
            <p className="text-gray-700 mb-4">
              Если у клиента база 10 000 контактов, он платит около 28 000 ₽ в месяц.
            </p>
            <div className="space-y-2">
              <p className="text-gray-700">📊 Ваш доход:</p>
              <p className="text-gray-700">— <strong>168 000 ₽</strong> в 1-й год</p>
              <p className="text-gray-700">— <strong>100 800 ₽</strong> во 2-й год</p>
              <p className="text-gray-700">— <strong>33 600 ₽</strong> в 3-й год</p>
              <p className="text-xl font-bold text-green-600 mt-4">🟢 Итого: 302 400 ₽ с одного клиента за 3 года</p>
            </div>
          </div>
        </div>

        {/* Почему выбирают S3 */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            📦 Почему клиенты выбирают S3:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle className="text-lg">Нет комиссии за сообщения</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Мы не берём деньги за каждое отправленное сообщение. 
                  Оплата только за количество уникальных контактов, с которыми была коммуникация за последние 30 дней.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Минимум риска блокировок</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Мы оптимизируем шаблоны, следим за качеством рассылок и правильно ведём прогрев аккаунта.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">Полная поддержка</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Можем закрыть любой вопрос с аккаунтом — в том числе быстро заменить или перезапустить WABA в случае блокировки.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Остальные преимущества */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/90 backdrop-blur">
            <CardHeader>
              <Users className="h-8 w-8 text-brand-primary mb-2" />
              <CardTitle>Многоуровневая система</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Развивайтесь от Бронзового до Платинового уровня партнера с увеличением комиссий
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur">
            <CardHeader>
              <Award className="h-8 w-8 text-brand-primary mb-2" />
              <CardTitle>Сертификация</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Получите официальный сертификат партнера после прохождения обучения
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur">
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-brand-primary mb-2" />
              <CardTitle>Стабильный доход</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Получайте долгосрочный пассивный доход от приведенных клиентов
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Готовы начать зарабатывать?</h2>
          <p className="text-lg mb-8">Присоединяйтесь к нашей партнерской программе уже сегодня</p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-brand-primary hover:bg-gray-100">
              Зарегистрироваться как партнер
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
