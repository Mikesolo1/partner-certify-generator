
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface CommissionsPanelProps {
  loading: boolean;
  onPayCommission: () => Promise<void>;
}

export const CommissionsPanel: React.FC<CommissionsPanelProps> = ({
  loading,
  onPayCommission,
}) => {
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-md">
        <h3 className="font-medium text-lg mb-2">Выплаты комиссий</h3>
        <p className="text-sm text-gray-600 mb-4">
          Здесь вы можете отметить комиссии как выплаченные партнеру. 
          Для детальной информации о комиссиях перейдите в раздел клиентов партнера.
        </p>
        <Button 
          onClick={onPayCommission}
          disabled={loading}
        >
          {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
          Отметить комиссии как выплаченные
        </Button>
      </div>
      
      <div className="p-4 bg-green-50 border border-green-100 rounded-md">
        <h3 className="font-medium text-green-700 mb-1">Совет</h3>
        <p className="text-sm text-green-600">
          Чтобы отметить конкретную комиссию как выплаченную, перейдите 
          в список клиентов партнера и отметьте соответствующие платежи.
        </p>
      </div>
    </div>
  );
};
