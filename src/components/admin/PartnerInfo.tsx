
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Partner } from '@/types';

interface PartnerInfoProps {
  partner: Partner;
}

export const PartnerInfo = ({ partner }: PartnerInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Информация о партнере</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Уровень партнера</p>
            <p className="font-medium">{partner.partnerLevel}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Процент комиссии</p>
            <p className="font-medium">{partner.commission}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Дата регистрации</p>
            <p className="font-medium">{new Date(partner.joinDate).toLocaleDateString('ru-RU')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">ID сертификата</p>
            <p className="font-medium">{partner.certificateId || 'Не выдан'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Статус теста</p>
            <Badge variant={partner.testPassed ? "default" : "secondary"}>
              {partner.testPassed ? "Тест пройден" : "Тест не пройден"}
            </Badge>
          </div>
          {partner.referralCode && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Реферальный код</p>
              <p className="font-medium font-mono">{partner.referralCode}</p>
            </div>
          )}
          {partner.referrerId && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Статус</p>
              <Badge variant="outline">Реферал</Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
