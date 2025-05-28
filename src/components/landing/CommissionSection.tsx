
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Calculator } from 'lucide-react';

const CommissionSection = () => {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-brand/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-cyan-300/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mb-4 lg:mb-6 shadow-lg">
            <DollarSign className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 lg:mb-4">
            Зарабатывайте с каждого клиента S3
          </h2>
          <p className="text-base lg:text-lg text-gray-300 mb-4 lg:mb-6 max-w-2xl mx-auto leading-relaxed">
            Приведите клиента с аккаунтом WhatsApp Business API и получайте долгосрочный доход
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10 lg:mb-12">
          <Card className="text-center border-gray-700 bg-white/5 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl lg:text-3xl text-brand font-bold">50%</CardTitle>
              <CardDescription className="text-sm lg:text-base text-gray-300">от всех платежей клиента</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs lg:text-sm text-gray-400 font-semibold">первый год</p>
            </CardContent>
          </Card>

          <Card className="text-center border-gray-700 bg-white/5 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl lg:text-3xl text-brand font-bold">30%</CardTitle>
              <CardDescription className="text-sm lg:text-base text-gray-300">от всех платежей клиента</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs lg:text-sm text-gray-400 font-semibold">второй год</p>
            </CardContent>
          </Card>

          <Card className="text-center border-gray-700 bg-white/5 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl lg:text-3xl text-brand font-bold">10%</CardTitle>
              <CardDescription className="text-sm lg:text-base text-gray-300">от всех платежей клиента</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs lg:text-sm text-gray-400 font-semibold">с третьего года</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-center mb-4 lg:mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-brand to-cyan-400 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-white">
              Пример дохода с одного клиента
            </h3>
          </div>
          
          <div className="bg-gradient-to-r from-brand/20 to-cyan-400/20 rounded-lg p-4 lg:p-6 mb-4 lg:mb-6 border border-brand/30">
            <p className="text-gray-300 text-sm lg:text-base mb-4 text-center">
              <strong className="text-white">Клиент с базой 10 000 контактов</strong> платит около <span className="text-xl lg:text-2xl font-bold text-brand">28 000 ₽</span> в месяц
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 lg:p-6 text-center border border-gray-600 hover:border-brand/50 transition-colors">
              <p className="text-sm lg:text-base font-semibold text-brand mb-2">1-й год</p>
              <p className="text-lg lg:text-xl font-bold text-white">168 000 ₽</p>
              <p className="text-xs text-gray-400 mt-1">50% комиссия</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 lg:p-6 text-center border border-gray-600 hover:border-brand/50 transition-colors">
              <p className="text-sm lg:text-base font-semibold text-brand mb-2">2-й год</p>
              <p className="text-lg lg:text-xl font-bold text-white">100 800 ₽</p>
              <p className="text-xs text-gray-400 mt-1">30% комиссия</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 lg:p-6 text-center border border-gray-600 hover:border-brand/50 transition-colors">
              <p className="text-sm lg:text-base font-semibold text-brand mb-2">3-й год</p>
              <p className="text-lg lg:text-xl font-bold text-white">33 600 ₽</p>
              <p className="text-xs text-gray-400 mt-1">10% комиссия</p>
            </div>
          </div>
          
          <div className="text-center mt-6 lg:mt-8 p-4 lg:p-6 bg-gradient-to-r from-brand/20 to-cyan-400/20 rounded-lg border border-brand/30">
            <p className="text-lg lg:text-xl font-bold text-white">
              Итого: <span className="text-xl lg:text-2xl text-brand">302 400 ₽</span> с одного клиента за 3 года
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommissionSection;
