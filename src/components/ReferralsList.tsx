
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getPartnerReferrals, getPartnerReferralCommissions } from '@/api/partnersApi/referrals';
import { usePartners } from '@/contexts/PartnersContext';
import { Partner } from '@/types';
import { ReferralCommission } from '@/types/ReferralCommission';

const ReferralsList = () => {
  const { currentPartner } = usePartners();
  const { toast } = useToast();
  const [referrals, setReferrals] = useState<Partner[]>([]);
  const [commissions, setCommissions] = useState<ReferralCommission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentPartner?.id && currentPartner?.testPassed && (currentPartner?.referralAccessEnabled || currentPartner?.referral_access_enabled)) {
      fetchReferralsData();
    }
  }, [currentPartner]);

  const fetchReferralsData = async () => {
    if (!currentPartner?.id) return;
    
    setLoading(true);
    try {
      const [referralsData, commissionsData] = await Promise.all([
        getPartnerReferrals(currentPartner.id),
        getPartnerReferralCommissions(currentPartner.id)
      ]);
      
      setReferrals(referralsData);
      setCommissions(commissionsData);
    } catch (error) {
      console.error("Error fetching referrals data:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить данные рефералов",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalCommissions = commissions.reduce((sum, comm) => sum + comm.commission_amount, 0);
  const paidCommissions = commissions
    .filter(comm => comm.paid_at)
    .reduce((sum, comm) => sum + comm.commission_amount, 0);

  // Проверяем доступ к реферальной программе
  if (!currentPartner?.testPassed || (!currentPartner?.referralAccessEnabled && !currentPartner?.referral_access_enabled)) {
    return null;
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Мои рефералы</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Загрузка...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Всего рефералов</p>
                <p className="text-2xl font-bold">{referrals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Общая комиссия</p>
                <p className="text-2xl font-bold">{totalCommissions.toLocaleString('ru-RU')} ₽</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Выплачено</p>
                <p className="text-2xl font-bold">{paidCommissions.toLocaleString('ru-RU')} ₽</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Список рефералов */}
      <Card>
        <CardHeader>
          <CardTitle>Мои рефералы</CardTitle>
          <CardDescription>
            Партнеры, зарегистрировавшиеся по вашей реферальной ссылке
          </CardDescription>
        </CardHeader>
        <CardContent>
          {referrals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>У вас пока нет рефералов</p>
              <p className="text-sm">Поделитесь реферальной ссылкой, чтобы привлечь новых партнеров</p>
            </div>
          ) : (
            <div className="space-y-4">
              {referrals.map((referral) => {
                const referralCommissions = commissions.filter(
                  comm => comm.referee_company === referral.companyName
                );
                const referralTotal = referralCommissions.reduce(
                  (sum, comm) => sum + comm.commission_amount, 0
                );

                return (
                  <div key={referral.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{referral.companyName}</h3>
                        <p className="text-sm text-gray-600">{referral.contactPerson}</p>
                        <p className="text-sm text-gray-500">{referral.email}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={referral.testPassed ? "default" : "secondary"}>
                          {referral.testPassed ? "Тест пройден" : "Тест не пройден"}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">
                          Уровень: {referral.partnerLevel}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t">
                      <div className="text-sm text-gray-600">
                        Дата регистрации: {new Date(referral.joinDate).toLocaleDateString('ru-RU')}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Ваша комиссия</p>
                        <p className="font-semibold text-green-600">
                          {referralTotal.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* История комиссий */}
      {commissions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>История реферальных комиссий</CardTitle>
            <CardDescription>
              Детальная информация о заработанных комиссиях
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {commissions.map((commission) => (
                <div key={commission.id} className="border rounded-lg p-3">
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

export default ReferralsList;
