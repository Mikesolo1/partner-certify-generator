
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, TrendingUp } from 'lucide-react';

const PartnerBenefitsSection = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          🚀 Преимущества партнерства с S3
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-brand/20 bg-white shadow-lg">
            <CardHeader>
              <Award className="h-12 w-12 text-brand mb-4" />
              <CardTitle className="text-xl text-gray-900">Обучение и сертификация</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Получите все необходимые знания о WABA и сертификат партнера. 
                Мы предоставляем полные материалы для работы с клиентами.
              </p>
            </CardContent>
          </Card>

          <Card className="border-brand/20 bg-white shadow-lg">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-brand mb-4" />
              <CardTitle className="text-xl text-gray-900">Растущий рынок</CardTitle>
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
    </div>
  );
};

export default PartnerBenefitsSection;
