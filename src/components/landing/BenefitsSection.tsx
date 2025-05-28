
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Shield, Users, Star, Zap } from 'lucide-react';

const BenefitsSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-brand/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-cyan-300/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-brand to-cyan-400 rounded-2xl mb-6 shadow-lg">
            <Star className="h-10 w-10 text-gray-900" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">
            Почему клиенты выбирают S3
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
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
              bgGradient: "from-green-500/10 to-emerald-500/10"
            },
            {
              icon: Shield,
              title: "Максимальная надежность",
              desc: "Оптимизируем шаблоны, контролируем качество рассылок и правильно ведём прогрев аккаунта для минимизации рисков блокировок.",
              gradient: "from-brand to-cyan-400",
              bgGradient: "from-brand/10 to-cyan-400/10"
            },
            {
              icon: Users,
              title: "Экспертная поддержка",
              desc: "Полное сопровождение проектов: от настройки до оптимизации. Быстро заменяем или перезапускаем WABA в случае необходимости.",
              gradient: "from-purple-500 to-pink-500",
              bgGradient: "from-purple-500/10 to-pink-500/10"
            }
          ].map((benefit, index) => (
            <Card key={index} className="group relative bg-white/5 backdrop-blur-xl border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden">
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}></div>
              
              <CardHeader className="relative z-10 text-center pb-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg lg:text-xl font-bold text-white mb-4 group-hover:text-gray-100 transition-colors">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 text-center">
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                  {benefit.desc}
                </p>
              </CardContent>

              {/* Hover border effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand rounded-lg transition-all duration-300"></div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-brand/20 to-cyan-400/20 rounded-full text-brand font-semibold border border-brand/30">
            <Zap className="h-5 w-5" />
            <span>Присоединяйтесь к успешным партнерам S3</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
