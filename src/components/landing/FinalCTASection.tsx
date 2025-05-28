
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FinalCTASection = () => {
  return (
    <div className="py-20 bg-gradient-to-r from-brand to-brand-dark text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Готовы зарабатывать с S3?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Станьте частью команды экспертов WABA и начните получать стабильный доход уже сегодня
        </p>
        <Link to="/register">
          <Button size="lg" className="bg-white text-brand hover:bg-gray-100 text-lg px-8 py-4 shadow-lg">
            Присоединиться к программе
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FinalCTASection;
