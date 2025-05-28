
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';

const FinalCTASection = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"3\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-sm font-medium backdrop-blur-sm mb-6">
            <Users className="h-4 w-4 mr-2 text-blue-400" />
            500+ партнеров уже зарабатывают с нами
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Готовы зарабатывать с 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"> S3</span>?
          </h2>
          
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300 leading-relaxed">
            Станьте частью команды экспертов WABA и начните получать стабильный доход уже сегодня
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 shadow-lg group">
                Присоединиться к программе
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-lg px-8 py-4 backdrop-blur-sm">
                Уже партнер? Войти
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">Быстрый старт</div>
              <div className="text-sm text-gray-400">Обучение за 1 день</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">Без рисков</div>
              <div className="text-sm text-gray-400">0₽ стартовых вложений</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">Поддержка 24/7</div>
              <div className="text-sm text-gray-400">Помощь на каждом этапе</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalCTASection;
