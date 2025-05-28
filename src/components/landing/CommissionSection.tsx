
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Calculator } from 'lucide-react';

const CommissionSection = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <DollarSign className="h-16 w-16 text-brand mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Зарабатывайте с каждого клиента WABA
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Приведите клиента с аккаунтом WhatsApp Business API и получайте долгосрочный доход
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-brand/20 bg-gradient-to-b from-brand/5 to-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-4xl text-brand font-bold">50%</CardTitle>
              <CardDescription className="text-lg text-gray-700">от всех платежей клиента</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 font-semibold">первый год</p>
            </CardContent>
          </Card>

          <Card className="text-center border-brand/20 bg-gradient-to-b from-brand/5 to-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-4xl text-brand font-bold">30%</CardTitle>
              <CardDescription className="text-lg text-gray-700">от всех платежей клиента</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 font-semibold">второй год</p>
            </CardContent>
          </Card>

          <Card className="text-center border-brand/20 bg-gradient-to-b from-brand/5 to-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-4xl text-brand font-bold">10%</CardTitle>
              <CardDescription className="text-lg text-gray-700">от всех платежей клиента</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 font-semibold">с третьего года</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-center mb-6">
            <Calculator className="h-8 w-8 text-brand mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">
              Пример дохода с одного клиента
            </h3>
          </div>
          
          <div className="bg-gradient-to-r from-brand/10 to-blue-50 rounded-lg p-6 mb-6 border border-brand/20">
            <p className="text-gray-700 text-lg mb-4 text-center">
              <strong>Клиент с базой 10 000 контактов</strong> платит около <span className="text-3xl font-bold text-brand">28 000 ₽</span> в месяц
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200 hover:border-brand/30 transition-colors">
              <p className="text-lg font-semibold text-brand mb-2">1-й год</p>
              <p className="text-2xl font-bold text-gray-900">168 000 ₽</p>
              <p className="text-sm text-gray-600 mt-1">50% комиссия</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200 hover:border-brand/30 transition-colors">
              <p className="text-lg font-semibold text-brand mb-2">2-й год</p>
              <p className="text-2xl font-bold text-gray-900">100 800 ₽</p>
              <p className="text-sm text-gray-600 mt-1">30% комиссия</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200 hover:border-brand/30 transition-colors">
              <p className="text-lg font-semibold text-brand mb-2">3-й год</p>
              <p className="text-2xl font-bold text-gray-900">33 600 ₽</p>
              <p className="text-sm text-gray-600 mt-1">10% комиссия</p>
            </div>
          </div>
          
          <div className="text-center mt-8 p-6 bg-gradient-to-r from-brand/10 to-blue-50 rounded-lg border border-brand/20">
            <p className="text-2xl font-bold text-gray-900">
              Итого: <span className="text-3xl text-brand">302 400 ₽</span> с одного клиента за 3 года
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionSection;
