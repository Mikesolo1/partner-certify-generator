
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, TrendingUp } from 'lucide-react';

const PartnerBenefitsSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-300/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-white mb-12 lg:mb-16">
          Преимущества партнерства с S3
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-gray-700 bg-white/5 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg lg:text-xl text-white">Обучение и сертификация</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Получите все необходимые знания о WABA и сертификат партнера. 
                Мы предоставляем полные материалы для работы с клиентами.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-white/5 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-brand to-cyan-400 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg lg:text-xl text-white">Растущий рынок</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                WABA — быстро развивающийся сегмент. Каждый день все больше компаний 
                понимают ценность прямых коммуникаций с клиентами через WhatsApp.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PartnerBenefitsSection;
