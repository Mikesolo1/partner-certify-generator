
import { AlertCircle, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ErrorDisplayProps {
  error: string;
  partnerId?: string;
  debugInfo?: any;
}

export const ErrorDisplay = ({ error, partnerId, debugInfo }: ErrorDisplayProps) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-red-200">
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <h1 className="text-2xl font-bold text-red-600">Ошибка</h1>
      </div>
      <p className="text-lg mb-2">{error}</p>
      <p className="text-gray-500">Проверьте ID партнера или повторите попытку позже</p>
      <p className="text-gray-500 text-sm mt-4">ID: {partnerId}</p>
      
      {debugInfo && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <div className="flex items-center gap-2 mb-3">
            <Bug className="h-5 w-5 text-orange-500" />
            <h3 className="font-medium">Отладочная информация:</h3>
          </div>
          
          <div className="text-xs font-mono bg-black/5 p-3 rounded overflow-x-auto">
            <p className="mb-2">Метод: {debugInfo.method}</p>
            {debugInfo.error && typeof debugInfo.error === 'object' ? (
              <>
                <p>Код ошибки: {debugInfo.error.code}</p>
                <p>Сообщение: {debugInfo.error.message}</p>
                {debugInfo.error.details && <p>Детали: {debugInfo.error.details}</p>}
                {debugInfo.error.hint && <p>Подсказка: {debugInfo.error.hint}</p>}
              </>
            ) : (
              <p>Ошибка: {String(debugInfo.error)}</p>
            )}
            
            {debugInfo.previousError && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="font-semibold">Предыдущая ошибка:</p>
                <p>Код: {debugInfo.previousError.code}</p>
                <p>Сообщение: {debugInfo.previousError.message}</p>
              </div>
            )}
          </div>
          
          <p className="mt-4 text-sm text-gray-500">
            Эта информация может помочь разработчикам выявить причину ошибки.
          </p>
        </div>
      )}
      
      <div className="mt-6 flex gap-4">
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
        >
          Обновить страницу
        </Button>
        
        <Button asChild>
          <Link to="/admin">
            Вернуться к списку партнеров
          </Link>
        </Button>
      </div>
    </div>
  );
};
