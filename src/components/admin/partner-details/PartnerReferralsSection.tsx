
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, DollarSign, UserPlus, RefreshCw } from 'lucide-react';
import { Partner } from '@/types';
import { ReferralCommission } from '@/types/ReferralCommission';
import { getPartnerReferrals, getPartnerReferralCommissions } from '@/api/partnersApi/referrals';
import { useToast } from '@/hooks/use-toast';
import { safeRPC } from '@/api/utils/queryHelpers';

interface PartnerReferralsSectionProps {
  partnerId: string;
}

export const PartnerReferralsSection = ({ partnerId }: PartnerReferralsSectionProps) => {
  const [referrals, setReferrals] = useState<Partner[]>([]);
  const [commissions, setCommissions] = useState<ReferralCommission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payingCommissions, setPayingCommissions] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchReferralsData();
  }, [partnerId]);

  const fetchReferralsData = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching referrals data for partner:", partnerId);
      
      const [referralsData, commissionsData] = await Promise.all([
        getPartnerReferrals(partnerId),
        getPartnerReferralCommissions(partnerId)
      ]);
      
      console.log("Referrals data:", referralsData);
      console.log("Commissions data:", commissionsData);
      
      setReferrals(referralsData);
      setCommissions(commissionsData);
    } catch (error) {
      console.error("Error fetching referrals data:", error);
      setError("Не удалось загрузить данные рефералов");
    } finally {
      setLoading(false);
    }
  };

  const handlePayReferralCommissions = async () => {
    try {
      setPayingCommissions(true);
      
      const { data, error } = await safeRPC('mark_referral_commissions_paid', {
        p_referrer_id: partnerId
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data && data.length > 0) {
        const result = data[0];
        
        if (result.updated_count > 0) {
          toast({
            title: "Реферальные комиссии выплачены",
            description: `Выплачено ${result.total_amount.toLocaleString('ru-RU')} ₽ за ${result.updated_count} комиссий`,
          });
          
          // Обновляем данные после выплаты
          await fetchReferralsData();
        } else {
          toast({
            title: "Нет комиссий для выплаты",
            description: "Все реферальные комиссии уже выплачены",
            variant: "default",
          });
        }
      }
    } catch (error: any) {
      console.error("Error paying referral commissions:", error);
      toast({
        title: "Ошибка выплаты",
        description: error.message || "Не удалось выплатить комиссии",
        variant: "destructive",
      });
    } finally {
      setPayingCommissions(false);
    }
  };

  const totalCommissions = commissions.reduce((sum, comm) => sum + comm.commission_amount, 0);
  const paidCommissions = commissions
    .filter(comm => comm.paid_at)
    .reduce((sum, comm) => sum + comm.commission_amount, 0);
  const unpaidCommissions = commissions
    .filter(comm => !comm.paid_at)
    .reduce((sum, comm) => sum + comm.commission_amount, 0);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Рефералы партнера
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-500">Загрузка...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Рефералы партнера
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Статистика рефералов */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Реферальная статистика
          </CardTitle>
          {unpaidCommissions > 0 && (
            <Button 
              onClick={handlePayReferralCommissions}
              disabled={payingCommissions}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              {payingCommissions ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Выплачиваем...
                </>
              ) : (
                <>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Выплатить комиссии ({unpaidCommissions.toLocaleString('ru-RU')} ₽)
                </>
              )}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Всего рефералов</p>
                <p className="text-2xl font-bold text-blue-700">{referrals.length}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Общая комиссия</p>
                <p className="text-2xl font-bold text-green-700">{totalCommissions.toLocaleString('ru-RU')} ₽</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Выплачено</p>
                <p className="text-2xl font-bold text-purple-700">{paidCommissions.toLocaleString('ru-RU')} ₽</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
              <DollarSign className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">К выплате</p>
                <p className="text-2xl font-bold text-orange-700">{unpaidCommissions.toLocaleString('ru-RU')} ₽</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Список рефералов */}
      {referrals.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Список рефералов ({referrals.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {referrals.map((referral) => {
                const referralCommissions = commissions.filter(
                  comm => comm.referee_company === referral.companyName
                );
                const referralTotal = referralCommissions.reduce(
                  (sum, comm) => sum + comm.commission_amount, 0
                );

                return (
                  <div key={referral.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{referral.companyName}</h3>
                        <p className="text-gray-600">{referral.contactPerson}</p>
                        <p className="text-gray-500 text-sm">{referral.email}</p>
                        {referral.phone && (
                          <p className="text-gray-500 text-sm">{referral.phone}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge variant={referral.testPassed ? "default" : "secondary"} className="mb-2">
                          {referral.testPassed ? "Тест пройден" : "Тест не пройден"}
                        </Badge>
                        <p className="text-sm text-gray-500">
                          Уровень: {referral.partnerLevel}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t">
                      <div className="text-sm text-gray-600">
                        Дата регистрации: {new Date(referral.joinDate).toLocaleDateString('ru-RU')}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Комиссия с рефералов</p>
                        <p className="font-semibold text-green-600 text-lg">
                          {referralTotal.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Список рефералов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">У этого партнера пока нет рефералов</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* История реферальных комиссий */}
      {commissions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>История реферальных комиссий ({commissions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {commissions.map((commission) => (
                <div key={commission.id} className="border rounded-lg p-3 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{commission.referee_company}</p>
                      <p className="text-sm text-gray-600">
                        Клиент: {commission.client_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(commission.payment_date).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        +{commission.commission_amount.toLocaleString('ru-RU')} ₽
                      </p>
                      <Badge variant={commission.paid_at ? "default" : "secondary"}>
                        {commission.paid_at ? "Выплачено" : "К выплате"}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {commission.commission_rate}% комиссия
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
