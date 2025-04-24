
import React from 'react';
import { Bug } from 'lucide-react';

interface DebugInfoProps {
  debugInfo: any;
  partnerId: string;
}

export const DebugInfo: React.FC<DebugInfoProps> = ({ debugInfo, partnerId }) => {
  if (!debugInfo) return null;

  return (
    <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
      <div className="flex items-center gap-2 mb-2">
        <Bug className="h-4 w-4 text-orange-500" />
        <h4 className="text-sm font-medium">Отладочная информация:</h4>
      </div>
      <div className="text-xs font-mono bg-black/5 p-2 rounded">
        <p>ID партнера: {partnerId}</p>
        <p>Код ошибки: {debugInfo.code}</p>
        <p>Сообщение: {debugInfo.message}</p>
        {debugInfo.details && <p>Детали: {debugInfo.details}</p>}
        {debugInfo.hint && <p>Подсказка: {debugInfo.hint}</p>}
      </div>
    </div>
  );
};
