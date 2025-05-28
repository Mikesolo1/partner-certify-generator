
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { safeRPC } from '@/api/utils/queryHelpers';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Partner } from '@/types';

interface PartnerCommissionDetailsProps {
  partner: Partner;
  partnerClients: any[];
  partnerId: string;
  getClientPayments: (clientId: string) => any[];
}

export const PartnerCommissionDetails = ({ 
  partner, 
  partnerClients, 
  partnerId, 
  getClientPayments 
}: PartnerCommissionDetailsProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commissionData, setCommissionData] = useState<any>(null);

  useEffect(() => {
    const fetchCommissionData = async () => {
      try {
        setLoading(true);
        const { data, error } = await safeRPC(
          'get_partner_commission_totals',
          { p_partner_id: partnerId }
        );

        if (error) {
          console.error('Error fetching commission data:', error);
          setError('Не удалось загрузить данные о комиссиях');
          return;
        }

        setCommissionData(data[0]);
      } catch (err) {
        console.error('Error:', err);
        setError('Произошла ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    fetchCommissionData();
  }, [partnerId]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Комиссии партнера</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Комиссии партнера</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Комиссии партнера</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Всего комиссий:</p>
            <p className="text-2xl font-bold">{commissionData.total_commission.toLocaleString('ru-RU')} ₽</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Выплачено комиссий:</p>
            <p className="text-2xl font-bold">{commissionData.paid_commission.toLocaleString('ru-RU')} ₽</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Ожидает выплаты:</p>
            <p className="text-2xl font-bold text-green-600">
              {commissionData.pending_commission.toLocaleString('ru-RU')} ₽
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Количество клиентов:</p>
            <p className="text-2xl font-bold">{commissionData.client_count}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
