
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Users, Award, Star, UserPlus } from 'lucide-react';

interface QuickActionsProps {
  testPassed: boolean;
  showLevelUpHint: boolean;
}

const QuickActions = ({ testPassed, showLevelUpHint }: QuickActionsProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Быстрые действия</h2>
        {testPassed && showLevelUpHint && (
          <div className="bg-brand/10 text-sm px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="h-4 w-4 text-brand" />
            <span>Близко к следующему уровню!</span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {testPassed ? (
          <>
            <Link to="/dashboard/certificate">
              <Button
                variant="outline"
                className="h-auto w-full py-4 px-6 flex flex-col items-center justify-center text-left border-2 border-dashed border-gray-300 hover:border-brand hover:bg-brand/5"
              >
                <FileText className="h-8 w-8 mb-2 text-brand" />
                <div>
                  <p className="font-medium">Сертификат</p>
                  <p className="text-xs text-gray-500">Просмотр и скачивание</p>
                </div>
              </Button>
            </Link>
            
            <Link to="/dashboard/clients">
              <Button
                variant="outline"
                className="h-auto w-full py-4 px-6 flex flex-col items-center justify-center text-left border-2 border-dashed border-gray-300 hover:border-brand hover:bg-brand/5"
              >
                <Users className="h-8 w-8 mb-2 text-brand" />
                <div>
                  <p className="font-medium">Мои клиенты</p>
                  <p className="text-xs text-gray-500">Управление клиентами</p>
                </div>
              </Button>
            </Link>

            <Link to="/dashboard/referrals">
              <Button
                variant="outline"
                className="h-auto w-full py-4 px-6 flex flex-col items-center justify-center text-left border-2 border-dashed border-gray-300 hover:border-brand hover:bg-brand/5"
              >
                <UserPlus className="h-8 w-8 mb-2 text-brand" />
                <div>
                  <p className="font-medium">Рефералы</p>
                  <p className="text-xs text-gray-500">Реферальная программа</p>
                </div>
              </Button>
            </Link>
          </>
        ) : (
          <Link to="/dashboard/test">
            <Button
              variant="outline"
              className="h-auto w-full py-4 px-6 flex flex-col items-center justify-center text-left border-2 border-dashed border-gray-300 hover:border-brand hover:bg-brand/5"
            >
              <Award className="h-8 w-8 mb-2 text-brand" />
              <div>
                <p className="font-medium">Пройти тест</p>
                <p className="text-xs text-gray-500">Получить доступ к сертификату</p>
              </div>
            </Button>
          </Link>
        )}
        
        <Link to="/partners">
          <Button
            variant="outline"
            className="h-auto w-full py-4 px-6 flex flex-col items-center justify-center text-left border-2 border-dashed border-gray-300 hover:border-brand hover:bg-brand/5"
          >
            <Star className="h-8 w-8 mb-2 text-brand" />
            <div>
              <p className="font-medium">Лучшие партнеры</p>
              <p className="text-xs text-gray-500">Мотивационный рейтинг</p>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
