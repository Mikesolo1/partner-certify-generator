
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, DollarSign } from 'lucide-react';
import { Partner } from '@/types';
import { ReferralCommission } from '@/types/ReferralCommission';
import { getPartnerReferrals, getPartnerReferralCommissions } from '@/api/partnersApi/referrals';

interface PartnerReferralsSectionProps {
  partnerId: string;
}

export const PartnerReferralsSection = ({ partnerId }: PartnerReferralsSectionProps) => {
  const [referrals, setReferrals] = useState<Partner[]>([]);
  const [commissions, setCommissions] = useState<ReferralCommission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReferralsData();
  }, [partnerId]);

  const fetchReferralsData = async () => {
    setLoading(true);
    try {
      const [referralsData, commissionsData] = await Promise.all([
        getPartnerReferrals(partnerId),
        getPartnerReferralCommissions(partnerId)
      ]);
      
      setReferrals(referralsData);
      setCommissions(commissionsData);
    } catch (error) {
      console.error("Error fetching referrals data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalCommissions = commissions.reduce((sum, comm) => sum + comm.commission_amount, 0);
  const paidCommissions = commissions
    .filter(comm => comm.paid_at)
    .reduce((sum, comm) => sum + comm.commission_amount, 0);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Рефералы партнера</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Загрузка...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Статистика рефералов */}
      <Card>
        <CardHeader>
          <CardTitle>Реферальная статистика</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Всего рефералов</p>
                <p className="text-2xl font-bold">{referrals.length}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Общая комиссия</p>
                <p className="text-2xl font-bold">{totalCommissions.toLocaleString('ru-RU')} ₽</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Выплачено</p>
                <p className="text-2xl font-bold">{paidCommissions.toLocaleString('ru-RU')} ₽</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Список рефералов */}
      {referrals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Список рефералов</CardTitle>
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
                  <div key={referral.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{referral.companyName}</h3>
                        <p className="text-sm text-gray-600">{referral.contactPerson}</p>
                        <p className="text-sm text-gray-500">{referral.email}</p>
                        {referral.phone && (
                          <p className="text-sm text-gray-500">{referral.phone}</p>
                        )}
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
                        <p className="text-sm text-gray-600">Комиссия с рефералов</p>
                        <p className="font-semibold text-green-600">
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
      )}

      {/* История реферальных комиссий */}
      {commissions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>История реферальных комиссий</CardTitle>
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
