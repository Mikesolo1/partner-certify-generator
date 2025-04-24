import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePartners } from '@/contexts/PartnersContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Award, FileText, Users, Star, Trophy, CircleCheck } from 'lucide-react';
import PartnerLevelProgress from '@/components/PartnerLevelProgress';
import { PARTNER_LEVELS, Client } from '@/types/partner';
import { Badge } from '@/components/ui/badge';
import NotificationsPanel from '@/components/NotificationsPanel';
import { supabase } from '@/integrations/supabase/client';

const DashboardPage = () => {
  const { currentPartner, refreshPartnerLevel, partnerLevel } = usePartners();
  const [clients, setClients] = useState<Client[]>([]);
  
  useEffect(() => {
    // Обновляем уровень партнера при загрузке страницы
    if (currentPartner?.id) {
      refreshPartnerLevel(currentPartner.id);
      // Загружаем клиентов партнера
      fetchPartnerClients(currentPartner.id);
    }
  }, [currentPartner?.id, refreshPartnerLevel]);
  
  const fetchPartnerClients = async (partnerId: string) => {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select(`
          *,
          payments(*)
        `)
        .eq("partner_id", partnerId);
      
      if (error) {
        console.error("Error fetching clients:", error);
      } else {
        setClients(data || []);
      }
    } catch (error) {
      console.error("Error fetching partner clients:", error);
    }
  };
  
  if (!currentPartner) {
    return <div>Загрузка...</div>;
  }
  
  // Calculate total commission from clients
  const totalCommission = clients.reduce((total, client) => {
    const clientTotal = client.payments?.reduce((sum, payment) => {
      return sum + (payment.status === 'оплачено' ? (payment.commissionAmount || payment.commission_amount || 0) : 0);
    }, 0) || 0;
    return total + clientTotal;
  }, 0);
  
  const clientCount = clients.length || 0;
  
  const getCurrentLevelInfo = () => {
    return PARTNER_LEVELS.find(level => level.level === currentPartner.partnerLevel || currentPartner.partner_level);
  };
  
  const currentLevelInfo = getCurrentLevelInfo();
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Добро пожаловать, {currentPartner?.contactPerson || currentPartner?.contact_person}!
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">
            Ваш партнерский уровень: 
          </span>
          <span className="font-semibold flex items-center gap-1">
            {currentLevelInfo && getCurrentLevelIcon(currentPartner.partnerLevel || currentPartner.partner_level)}
            {currentPartner?.partnerLevel || currentPartner?.partner_level}
          </span>
        </div>
      </div>
      
      {/* Прогресс уровня */}
      <PartnerLevelProgress className="mb-8" />
      
      {/* Поздравление при достижении нового уровня */}
      {partnerLevel && partnerLevel.progress === 0 && partnerLevel.level !== "Бронзовый" && (
        <Alert className="mb-8 border-green-500 bg-green-50">
          <Trophy className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-700">Поздравляем!</AlertTitle>
          <AlertDescription className="text-green-600">
            Вы достигли нового уровня: <strong>{partnerLevel.level}</strong>! 
            Ваша комиссия с платежей увеличена до <strong>{partnerLevel.commission}%</strong>.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2">
                <Users className="h-8 w-8 text-brand opacity-15" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Клиентов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold">{clientCount}</p>
                  {clientCount > 0 && getClientCountBadge(clientCount)}
                </div>
              </CardContent>
            </Card>
            
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2">
                <Award className="h-8 w-8 text-brand opacity-15" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Комиссия</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{totalCommission.toLocaleString('ru-RU')} ₽</p>
              </CardContent>
            </Card>
            
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2">
                <FileText className="h-8 w-8 text-brand opacity-15" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Статус сертификата</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold">
                    {currentPartner?.testPassed || currentPartner?.test_passed ? 'Доступен' : 'Требуется тест'}
                  </p>
                  {(currentPartner?.testPassed || currentPartner?.test_passed) && (
                    <CircleCheck className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Быстрые действия</h2>
              {(currentPartner?.testPassed || currentPartner?.test_passed) && partnerLevel && partnerLevel.progress >= 50 && partnerLevel.nextLevelAt && (
                <div className="bg-brand/10 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <CircleCheck className="h-4 w-4 text-brand" />
                  <span>Близко к следующему уровню!</span>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(currentPartner?.testPassed || currentPartner?.test_passed) ? (
                <>
                  <Link to="/dashboard/certificate">
                    <Button
                      variant="outline"
                      className="h-auto w-full py-4 px-6 flex flex-col items-center justify-center text-left border-2 border-dashed border-gray-300 hover:border-brand hover:bg-brand/5"
                    >
                      <FileText className="h-8 w-8 mb-2 text-brand" />
                      <div>
                        <p className="font-medium">Сертификат</p>
                        <p className="text-xs text-gray-500">Просмотр и скачивание</p>
                      </div>
                    </Button>
                  </Link>
                  
                  <Link to="/dashboard/clients">
                    <Button
                      variant="outline"
                      className="h-auto w-full py-4 px-6 flex flex-col items-center justify-center text-left border-2 border-dashed border-gray-300 hover:border-brand hover:bg-brand/5"
                    >
                      <Users className="h-8 w-8 mb-2 text-brand" />
                      <div>
                        <p className="font-medium">Мои клиенты</p>
                        <p className="text-xs text-gray-500">Управление клиентами</p>
                      </div>
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/dashboard/test">
                  <Button
                    variant="outline"
                    className="h-auto w-full py-4 px-6 flex flex-col items-center justify-center text-left border-2 border-dashed border-gray-300 hover:border-brand hover:bg-brand/5"
                  >
                    <Award className="h-8 w-8 mb-2 text-brand" />
                    <div>
                      <p className="font-medium">Пройти тест</p>
                      <p className="text-xs text-gray-500">Получить доступ к сертификату</p>
                    </div>
                  </Button>
                </Link>
              )}
              
              <Link to="/partners">
                <Button
                  variant="outline"
                  className="h-auto w-full py-4 px-6 flex flex-col items-center justify-center text-left border-2 border-dashed border-gray-300 hover:border-brand hover:bg-brand/5"
                >
                  <Star className="h-8 w-8 mb-2 text-brand" />
                  <div>
                    <p className="font-medium">Лучшие партнеры</p>
                    <p className="text-xs text-gray-500">Мотивационный рейтинг</p>
                  </div>
                </Button>
              </Link>
            </div>
          </div>

          {/* Уровни партнерства */}
          <Card>
            <CardHeader>
              <CardTitle>Уровни партнерства S3</CardTitle>
              <CardDescription>
                Растите вместе с нами и увеличивайте свою прибыль
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PARTNER_LEVELS.map((level, index) => (
                  <div 
                    key={level.level}
                    className={`p-4 rounded-lg border ${(currentPartner.partnerLevel === level.level || currentPartner.partner_level === level.level)
                      ? 'border-brand bg-brand/5' 
                      : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {getLevelIconByType(level.icon)}
                      <h3 className="font-bold">{level.level}</h3>
                      {(currentPartner.partnerLevel === level.level || currentPartner.partner_level === level.level) && (
                        <Badge className="bg-brand text-white ml-auto">Текущий</Badge>
                      )}
                    </div>
                    <div className="mb-2 text-sm text-gray-700">
                      {level.description}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Комиссия:</span>
                      <span className="font-bold">{level.commission}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Клиентов с оплатой:</span>
                      <span className="font-medium">
                        {level.minClients}{level.maxClients ? `-${level.maxClients}` : "+"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Блок с уведомлениями */}
        <div>
          <NotificationsPanel />
        </div>
      </div>
    </DashboardLayout>
  );
};

const getCurrentLevelIcon = (level: string) => {
  switch(level) {
    case "Бронзовый": return <Award className="h-4 w-4 text-[#CD7F32]" />;
    case "Серебряный": return <Award className="h-4 w-4 text-[#C0C0C0]" />;
    case "Золотой": return <Award className="h-4 w-4 text-[#FFD700]" />;
    case "Платиновый": return <Award className="h-4 w-4 text-[#9B87F5]" />;
    case "Божественный": return <Award className="h-4 w-4 text-[#E5DEFF]" />;
    default: return <Award className="h-4 w-4" />;
  }
};

const getLevelIconByType = (iconName: string) => {
  switch(iconName) {
    case "award": return <Award className="h-5 w-5 text-[#CD7F32]" />;
    case "badge": return <Award className="h-5 w-5 text-[#C0C0C0]" />;
    case "medal": return <Award className="h-5 w-5 text-[#FFD700]" />;
    case "diamond": return <Award className="h-5 w-5 text-[#9B87F5]" />;
    case "star": return <Star className="h-5 w-5 text-[#8B5CF6] fill-[#E5DEFF]" />;
    default: return <Award className="h-5 w-5" />;
  }
};

const getClientCountBadge = (count: number) => {
  if (count >= 51) {
    return <Badge className="bg-[#E5DEFF] text-[#8B5CF6]">Божественный</Badge>;
  } else if (count >= 21) {
    return <Badge className="bg-[#9B87F5] text-white">Платиновый</Badge>;
  } else if (count >= 11) {
    return <Badge className="bg-[#FFD700] text-black">Золотой</Badge>;
  } else if (count >= 6) {
    return <Badge className="bg-[#C0C0C0] text-black">Серебряный</Badge>;
  } else {
    return <Badge className="bg-[#CD7F32] text-white">Бронзовый</Badge>;
  }
};

export default DashboardPage;
