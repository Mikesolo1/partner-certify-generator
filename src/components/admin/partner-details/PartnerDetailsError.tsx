
import { ErrorDisplay } from '@/components/admin/ErrorDisplay';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface PartnerDetailsErrorProps {
  error: string | null;
  partnerId: string;
  debugInfo: any;
  refreshing: boolean;
  onRefresh: () => void;
}

export const PartnerDetailsError = ({
  error,
  partnerId,
  debugInfo,
  refreshing,
  onRefresh
}: PartnerDetailsErrorProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* White header like in admin dashboard */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Ошибка загрузки данных партнера</h1>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-12">
        <ErrorDisplay 
          error={error || "Партнер не найден"} 
          partnerId={partnerId}
          debugInfo={debugInfo}
        />
        <div className="mt-6">
          <Button onClick={onRefresh} disabled={refreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Попробовать снова
          </Button>
        </div>
      </div>
    </div>
  );
};
