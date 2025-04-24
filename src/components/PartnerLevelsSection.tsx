
import React from 'react';
import { PARTNER_LEVELS } from '@/types/partner';
import { Award, Badge, Medal, Diamond, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PartnerLevelsSection = () => {
  const navigate = useNavigate();

  const getLevelIcon = (level: string) => {
    switch(level) {
      case "Бронзовый": return <Award className="h-12 w-12 text-[#CD7F32]" />;
      case "Серебряный": return <Badge className="h-12 w-12 text-[#C0C0C0]" />;
      case "Золотой": return <Medal className="h-12 w-12 text-[#FFD700]" />;
      case "Платиновый": return <Diamond className="h-12 w-12 text-[#9B87F5]" />;
      case "Божественный": return <Star className="h-12 w-12 text-[#E5DEFF] fill-[#8B5CF6]" />;
      default: return <Award className="h-12 w-12" />;
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-black">Уровни партнерства S3</h2>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto">
            Повышайте свой уровень партнерства, привлекая больше клиентов, и зарабатывайте больше комиссионных
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {PARTNER_LEVELS.map((level, index) => (
            <div 
              key={level.level} 
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col text-center border-t-4"
              style={{ borderColor: level.color }}
            >
              <div className="mb-4 flex justify-center">
                {getLevelIcon(level.level)}
              </div>
              
              <h3 className="text-xl font-bold mb-2">{level.level}</h3>
              
              <div className="mb-4">
                <span className="text-2xl font-bold text-brand-dark">{level.commission}%</span>
                <p className="text-sm text-gray-600">комиссия</p>
              </div>
              
              <p className="text-sm mb-4 flex-grow">
                {level.description}
              </p>
              
              <div className="text-sm font-medium">
                {level.minClients}{level.maxClients ? `-${level.maxClients}` : "+"} клиентов
              </div>
              
              {index < PARTNER_LEVELS.length - 1 && (
                <div className="mt-2">
                  <Progress value={100} className="h-1" indicatorClassName={`bg-[${level.color}]`} />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            onClick={() => navigate('/register')}
            className="bg-brand text-white px-8 py-6 text-lg font-medium hover:bg-brand-dark"
          >
            Стать партнером S3
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnerLevelsSection;
