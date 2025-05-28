
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Shield, Users } from 'lucide-react';

const BenefitsSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Почему клиенты выбирают S3
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border-brand/20 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CheckCircle className="h-12 w-12 text-brand mb-4" />
              <CardTitle className="text-xl text-gray-900">Прозрачное ценообразование</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Никаких скрытых комиссий за сообщения. Оплата только за уникальные контакты, 
                с которыми была коммуникация за последние 30 дней.
              </p>
            </CardContent>
          </Card>

          <Card className="border-brand/20 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <Shield className="h-12 w-12 text-brand mb-4" />
              <CardTitle className="text-xl text-gray-900">Максимальная надежность</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Оптимизируем шаблоны, контролируем качество рассылок и правильно ведём 
                прогрев аккаунта для минимизации рисков блокировок.
              </p>
            </CardContent>
          </Card>

          <Card className="border-brand/20 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <Users className="h-12 w-12 text-brand mb-4" />
              <CardTitle className="text-xl text-gray-900">Экспертная поддержка</CardTitle>
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
    </div>
  );
};

export default BenefitsSection;
