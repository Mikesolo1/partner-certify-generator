
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePartners } from '@/contexts/PartnersContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Award, FileText, Users } from 'lucide-react';

const DashboardPage = () => {
  const { currentPartner } = usePartners();
  
  const totalCommission = currentPartner?.clients?.reduce((total, client) => {
    const clientTotal = client.payments.reduce((sum, payment) => {
      return sum + (payment.status === 'оплачено' ? payment.commissionAmount : 0);
    }, 0);
    return total + clientTotal;
  }, 0) || 0;
  
  const clientCount = currentPartner?.clients?.length || 0;
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Добро пожаловать, {currentPartner?.contactPerson}!
        </h1>
        <p className="text-gray-600">
          Ваш партнерский уровень: <span className="font-semibold">{currentPartner?.partnerLevel}</span>
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Клиентов</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{clientCount}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Комиссия</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalCommission.toLocaleString('ru-RU')} ₽</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Статус сертификата</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">
              {currentPartner?.testPassed ? 'Доступен' : 'Требуется тест'}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Быстрые действия</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentPartner?.testPassed ? (
            <>
              <Button
                as={Link}
                to="/dashboard/certificate"
                variant="outline"
                className="h-auto py-4 px-6 flex flex-col items-center justify-center text-left border-2 border-dashed border-gray-300"
              >
                <FileText className="h-8 w-8 mb-2 text-certificate-blue" />
                <div>
                  <p className="font-medium">Сертификат</p>
                  <p className="text-xs text-gray-500">Просмотр и скачивание</p>
                </div>
              </Button>
              
              <Button
                as={Link}
                to="/dashboard/clients"
                variant="outline"
                className="h-auto py-4 px-6 flex flex-col items-center justify-center text-left border-2 border-dashed border-gray-300"
              >
                <Users className="h-8 w-8 mb-2 text-certificate-blue" />
                <div>
                  <p className="font-medium">Мои клиенты</p>
                  <p className="text-xs text-gray-500">Управление клиентами</p>
                </div>
              </Button>
            </>
          ) : (
            <Button
              as={Link}
              to="/dashboard/test"
              variant="outline"
              className="h-auto py-4 px-6 flex flex-col items-center justify-center text-left border-2 border-dashed border-gray-300"
            >
              <Award className="h-8 w-8 mb-2 text-certificate-blue" />
              <div>
                <p className="font-medium">Пройти тест</p>
                <p className="text-xs text-gray-500">Получить доступ к сертификату</p>
              </div>
            </Button>
          )}
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>О партнерской программе S3</CardTitle>
          <CardDescription>
            S3 - официальный интегратор WhatsApp Business API (WABA)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Компания S3 Tech предлагает комплексные решения для бизнеса на базе WhatsApp Business API.
            Наша партнерская программа позволяет зарабатывать на привлечении клиентов к нашим сервисам.
          </p>
          <p>
            Как партнер, вы получаете процент от платежей привлеченных вами клиентов. Чем выше ваш
            партнерский уровень, тем больше ваш процент комиссии.
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DashboardPage;
