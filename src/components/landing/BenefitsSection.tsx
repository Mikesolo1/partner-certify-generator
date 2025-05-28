
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Shield, Users, Star, Zap } from 'lucide-react';

const BenefitsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-brand/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-cyan-300/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-brand to-cyan-400 rounded-2xl mb-6 shadow-lg">
            <Star className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            Почему клиенты выбирают S3
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Мы создали идеальные условия для успешного бизнеса в сфере WhatsApp Business API
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {[
            {
              icon: CheckCircle,
              title: "Прозрачное ценообразование",
              desc: "Никаких скрытых комиссий за сообщения. Оплата только за уникальные контакты, с которыми была коммуникация за последние 30 дней.",
              gradient: "from-green-500 to-emerald-600",
              bgGradient: "from-green-50 to-emerald-50"
            },
            {
              icon: Shield,
              title: "Максимальная надежность",
              desc: "Оптимизируем шаблоны, контролируем качество рассылок и правильно ведём прогрев аккаунта для минимизации рисков блокировок.",
              gradient: "from-brand to-cyan-400",
              bgGradient: "from-brand/5 to-cyan-50"
            },
            {
              icon: Users,
              title: "Экспертная поддержка",
              desc: "Полное сопровождение проектов: от настройки до оптимизации. Быстро заменяем или перезапускаем WABA в случае необходимости.",
              gradient: "from-purple-500 to-pink-500",
              bgGradient: "from-purple-50 to-pink-50"
            }
          ].map((benefit, index) => (
            <Card key={index} className="group relative bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden">
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <CardHeader className="relative z-10 text-center pb-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 text-center">
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {benefit.desc}
                </p>
              </CardContent>

              {/* Hover border effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-brand group-hover:to-cyan-400 rounded-lg transition-all duration-300"></div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 lg:mt-20">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-brand/10 to-cyan-100/50 rounded-full text-brand font-semibold">
            <Zap className="h-5 w-5" />
            <span>Присоединяйтесь к успешным партнерам S3</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
