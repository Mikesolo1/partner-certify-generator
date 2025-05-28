
import React, { useState } from 'react';
import { Partner } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { safeRPC } from '@/api/utils/queryHelpers';

interface PartnerInfoProps {
  partner: Partner;
}

export const PartnerInfo: React.FC<PartnerInfoProps> = ({ partner }) => {
  const { toast } = useToast();
  const [referralAccess, setReferralAccess] = useState(
    partner.referralAccessEnabled || partner.referral_access_enabled || false
  );
  const [updating, setUpdating] = useState(false);

  const handleReferralAccessChange = async (enabled: boolean) => {
    if (!partner.id) return;
    
    setUpdating(true);
    try {
      const { error } = await safeRPC('update_partner_referral_access', {
        p_partner_id: partner.id,
        p_referral_access_enabled: enabled
      });
      
      if (error) {
        throw error;
      }
      
      setReferralAccess(enabled);
      toast({
        title: "Настройки обновлены",
        description: `Доступ к реферальной программе ${enabled ? 'включен' : 'отключен'}`,
      });
    } catch (error) {
      console.error('Error updating referral access:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить настройки доступа",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const getTestStatusBadge = (passed: boolean) => {
    return passed 
      ? { variant: "default" as const, className: "bg-green-600", children: "Пройден" }
      : { variant: "default" as const, className: "bg-yellow-600", children: "Не пройден" };
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { variant: "default" as const, className: "bg-red-600", children: "Администратор" },
      partner: { variant: "default" as const, className: "bg-blue-600", children: "Партнер" }
    };
    return roleConfig[role as keyof typeof roleConfig] || { variant: "default" as const, className: "bg-gray-600", children: role };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Информация о партнере</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Компания</p>
            <p className="font-medium">{partner.companyName || partner.company_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Контактное лицо</p>
            <p className="font-medium">{partner.contactPerson || partner.contact_person}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{partner.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Телефон</p>
            <p className="font-medium">{partner.phone || 'Не указан'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Уровень партнера</p>
            <p className="font-medium">{partner.partnerLevel || partner.partner_level}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Дата присоединения</p>
            <p className="font-medium">
              {new Date(partner.joinDate || partner.join_date || '').toLocaleDateString('ru-RU')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Статус теста</p>
            <Badge {...getTestStatusBadge(partner.testPassed || partner.test_passed || false)} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Роль</p>
            <Badge {...getRoleBadge(partner.role || 'partner')} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Комиссия</p>
            <p className="font-medium">{partner.commission || 0}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">ID сертификата</p>
            <p className="font-medium">{partner.certificateId || partner.certificate_id || 'Не выдан'}</p>
          </div>
        </div>

        {/* Управление доступом к реферальной программе */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="referral-access">Доступ к реферальной программе</Label>
              <p className="text-sm text-gray-600">
                Разрешить партнеру использовать реферальную программу
              </p>
            </div>
            <Switch
              id="referral-access"
              checked={referralAccess}
              onCheckedChange={handleReferralAccessChange}
              disabled={updating}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
