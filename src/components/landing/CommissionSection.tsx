
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Calculator } from 'lucide-react';

const CommissionSection = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <DollarSign className="h-12 w-12 md:h-16 md:w-16 text-brand mx-auto mb-4 md:mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
            Зарабатывайте с каждого клиента S3
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto">
            Приведите клиента с аккаунтом WhatsApp Business API и получайте долгосрочный доход
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          <Card className="text-center border-brand/20 bg-gradient-to-b from-brand/5 to-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-3xl md:text-4xl text-brand font-bold">50%</CardTitle>
              <CardDescription className="text-base md:text-lg text-gray-700">от всех платежей клиента</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base text-gray-600 font-semibold">первый год</p>
            </CardContent>
          </Card>

          <Card className="text-center border-brand/20 bg-gradient-to-b from-brand/5 to-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-3xl md:text-4xl text-brand font-bold">30%</CardTitle>
              <CardDescription className="text-base md:text-lg text-gray-700">от всех платежей клиента</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base text-gray-600 font-semibold">второй год</p>
            </CardContent>
          </Card>

          <Card className="text-center border-brand/20 bg-gradient-to-b from-brand/5 to-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-3xl md:text-4xl text-brand font-bold">10%</CardTitle>
              <CardDescription className="text-base md:text-lg text-gray-700">от всех платежей клиента</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base text-gray-600 font-semibold">с третьего года</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <Calculator className="h-6 w-6 md:h-8 md:w-8 text-brand mr-3" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              Пример дохода с одного клиента
            </h3>
          </div>
          
          <div className="bg-gradient-to-r from-brand/10 to-blue-50 rounded-lg p-4 md:p-6 mb-4 md:mb-6 border border-brand/20">
            <p className="text-gray-700 text-base md:text-lg mb-4 text-center">
              <strong>Клиент с базой 10 000 контактов</strong> платит около <span className="text-2xl md:text-3xl font-bold text-brand">28 000 ₽</span> в месяц
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 text-center border border-gray-200 hover:border-brand/30 transition-colors">
              <p className="text-base md:text-lg font-semibold text-brand mb-2">1-й год</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">168 000 ₽</p>
              <p className="text-xs md:text-sm text-gray-600 mt-1">50% комиссия</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 text-center border border-gray-200 hover:border-brand/30 transition-colors">
              <p className="text-base md:text-lg font-semibold text-brand mb-2">2-й год</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">100 800 ₽</p>
              <p className="text-xs md:text-sm text-gray-600 mt-1">30% комиссия</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 text-center border border-gray-200 hover:border-brand/30 transition-colors">
              <p className="text-base md:text-lg font-semibold text-brand mb-2">3-й год</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">33 600 ₽</p>
              <p className="text-xs md:text-sm text-gray-600 mt-1">10% комиссия</p>
            </div>
          </div>
          
          <div className="text-center mt-6 md:mt-8 p-4 md:p-6 bg-gradient-to-r from-brand/10 to-blue-50 rounded-lg border border-brand/20">
            <p className="text-xl md:text-2xl font-bold text-gray-900">
              Итого: <span className="text-2xl md:text-3xl text-brand">302 400 ₽</span> с одного клиента за 3 года
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommissionSection;
