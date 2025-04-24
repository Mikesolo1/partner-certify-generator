
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Award, Badge, Medal, Diamond, Star } from 'lucide-react';
import { usePartners } from '@/contexts/PartnersContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PARTNER_LEVELS } from '@/types';
import { cn } from '@/lib/utils';

interface PartnerLevelProgressProps {
  showDetails?: boolean;
  className?: string;
}

const PartnerLevelProgress: React.FC<PartnerLevelProgressProps> = ({ 
  showDetails = true,
  className
}) => {
  const { currentPartner, partnerLevel } = usePartners();
  
  if (!currentPartner || !partnerLevel) return null;
  
  const getLevelIcon = (level: string) => {
    switch(level) {
      case "Бронзовый": return <Award className="h-6 w-6 text-[#CD7F32]" />;
      case "Серебряный": return <Badge className="h-6 w-6 text-[#C0C0C0]" />;
      case "Золотой": return <Medal className="h-6 w-6 text-[#FFD700]" />;
      case "Платиновый": return <Diamond className="h-6 w-6 text-[#9B87F5]" />;
      case "Божественный": return <Star className="h-6 w-6 text-[#E5DEFF] fill-[#8B5CF6]" />;
      default: return <Award className="h-6 w-6" />;
    }
  };
  
  const getLevelColor = (level: string) => {
    const levelInfo = PARTNER_LEVELS.find(l => l.level === level);
    return levelInfo?.color || "#62CFD6";
  };
  
  const getNextLevel = () => {
    const currentIndex = PARTNER_LEVELS.findIndex(l => l.level === currentPartner.partnerLevel);
    if (currentIndex < PARTNER_LEVELS.length - 1) {
      return PARTNER_LEVELS[currentIndex + 1];
    }
    return null;
  };
  
  const nextLevel = getNextLevel();
  
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getLevelIcon(currentPartner.partnerLevel)}
            <CardTitle>{currentPartner.partnerLevel} партнер</CardTitle>
          </div>
          <div className="text-2xl font-bold">{currentPartner.commission}%</div>
        </div>
        <CardDescription>
          Комиссия с платежей клиентов
        </CardDescription>
      </CardHeader>
      <CardContent>
        {partnerLevel.nextLevelAt !== null ? (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Прогресс</span>
              <span>{partnerLevel.progress}%</span>
            </div>
            <Progress 
              value={partnerLevel.progress} 
              className="h-3"
              indicatorClassName={`bg-[${getLevelColor(currentPartner.partnerLevel)}]`}
            />
            {showDetails && (
              <p className="text-sm text-gray-500 mt-1">
                До уровня "{nextLevel?.level}": {partnerLevel.nextLevelAt - (nextLevel?.minClients || 0)} клиентов с оплатой
              </p>
            )}
          </div>
        ) : (
          <div className="py-2">
            <p className="text-sm font-medium">Поздравляем! Вы достигли максимального уровня партнёрства.</p>
          </div>
        )}
      </CardContent>
      {showDetails && (
        <CardFooter className="pt-2 border-t">
          <p className="text-sm text-gray-600">
            Ваша текущая комиссия: <span className="font-medium">{currentPartner.commission}%</span> от платежей клиентов
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default PartnerLevelProgress;
