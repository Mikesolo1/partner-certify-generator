
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { usePartners } from '@/contexts/PartnersContext';
import { safeRPC } from '@/api/utils/queryHelpers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingUp, Users, Calendar, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ClientCommissionData {
  client_id: string;
  client_name: string;
  client_email: string;
  registration_date: string;
  first_payment_date: string;
  total_payments: number;
  total_commission: number;
  paid_commission: number;
  pending_commission: number;
  payments: Array<{
    id: string;
    amount: number;
    date: string;
    status: string;
    commission_amount: number;
    commission_paid: boolean;
    partnership_year: number;
  }>;
}

const CommissionsReportPage = () => {
  const { currentPartner } = usePartners();
  const [clientsCommissions, setClientsCommissions] = useState<ClientCommissionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalStats, setTotalStats] = useState({
    totalClients: 0,
    totalCommission: 0,
    paidCommission: 0,
    pendingCommission: 0
  });

  const fetchCommissionsReport = async () => {
    if (!currentPartner?.id) return;
    
    try {
      setLoading(true);
      
      // Получаем клиентов партнера с их платежами
      const { data: clients, error: clientsError } = await safeRPC('get_partner_clients', {
        p_partner_id: currentPartner.id
      });
      
      if (clientsError) {
        console.error('Error fetching clients:', clientsError);
        return;
      }
      
      // Для каждого клиента получаем детальную информацию о платежах
      const clientsWithCommissions = await Promise.all(
        (clients || []).map(async (client: any) => {
          const { data: payments, error: paymentsError } = await safeRPC('get_client_payments_with_commission', {
            p_client_id: client.id
          });
          
          if (paymentsError) {
            console.error(`Error fetching payments for client ${client.id}:`, paymentsError);
            return null;
          }
          
          const paidPayments = payments?.filter(p => p.status === 'оплачено') || [];
          const totalCommission = paidPayments.reduce((sum, p) => sum + (p.commission_amount || 0), 0);
          const paidCommission = paidPayments.filter(p => p.commission_paid).reduce((sum, p) => sum + (p.commission_amount || 0), 0);
          const pendingCommission = totalCommission - paidCommission;
          
          return {
            client_id: client.id,
            client_name: client.name,
            client_email: client.email,
            registration_date: client.registration_date,
            first_payment_date: client.first_payment_date,
            total_payments: paidPayments.length,
            total_commission: totalCommission,
            paid_commission: paidCommission,
            pending_commission: pendingCommission,
            payments: payments || []
          };
        })
      );
      
      const validClients = clientsWithCommissions.filter(Boolean) as ClientCommissionData[];
      setClientsCommissions(validClients);
      
      // Рассчитываем общую статистику
      const stats = validClients.reduce((acc, client) => ({
        totalClients: acc.totalClients + 1,
        totalCommission: acc.totalCommission + client.total_commission,
        paidCommission: acc.paidCommission + client.paid_commission,
        pendingCommission: acc.pendingCommission + client.pending_commission
      }), { totalClients: 0, totalCommission: 0, paidCommission: 0, pendingCommission: 0 });
      
      setTotalStats(stats);
      
    } catch (error) {
      console.error('Error fetching commissions report:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommissionsReport();
  }, [currentPartner?.id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const getCommissionRate = (partnershipYear: number) => {
    switch (partnershipYear) {
      case 1: return '50%';
      case 2: return '30%';
      default: return '10%';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <RefreshCw className="h-8 w-8 animate-spin text-brand" />
          <p className="ml-2 text-gray-500">Загрузка отчета...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Отчет по комиссиям</h1>
            <p className="text-gray-600">Детальная статистика по всем клиентам и выплатам</p>
          </div>
          <Button onClick={fetchCommissionsReport} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Обновить
          </Button>
        </div>

        {/* Общая статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Всего клиентов</p>
                  <p className="text-2xl font-bold">{totalStats.totalClients}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Общая комиссия</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalStats.totalCommission)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Выплачено</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalStats.paidCommission)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">К выплате</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalStats.pendingCommission)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="clients" className="w-full">
          <TabsList>
            <TabsTrigger value="clients">По клиентам</TabsTrigger>
            <TabsTrigger value="payments">Все платежи</TabsTrigger>
          </TabsList>
          
          <TabsContent value="clients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Комиссии по клиентам</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Клиент</TableHead>
                      <TableHead>Дата регистрации</TableHead>
                      <TableHead>Первый платеж</TableHead>
                      <TableHead>Платежей</TableHead>
                      <TableHead>Общая комиссия</TableHead>
                      <TableHead>Выплачено</TableHead>
                      <TableHead>К выплате</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientsCommissions.map((client) => (
                      <TableRow key={client.client_id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{client.client_name}</p>
                            <p className="text-sm text-gray-500">{client.client_email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(client.registration_date)}</TableCell>
                        <TableCell>
                          {client.first_payment_date ? formatDate(client.first_payment_date) : '—'}
                        </TableCell>
                        <TableCell>{client.total_payments}</TableCell>
                        <TableCell>{formatCurrency(client.total_commission)}</TableCell>
                        <TableCell className="text-green-600">
                          {formatCurrency(client.paid_commission)}
                        </TableCell>
                        <TableCell className="text-orange-600">
                          {formatCurrency(client.pending_commission)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Все платежи с комиссиями</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Клиент</TableHead>
                      <TableHead>Дата платежа</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Год партнерства</TableHead>
                      <TableHead>Ставка</TableHead>
                      <TableHead>Комиссия</TableHead>
                      <TableHead>Статус выплаты</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientsCommissions.flatMap(client => 
                      client.payments
                        .filter(payment => payment.status === 'оплачено')
                        .map(payment => (
                          <TableRow key={payment.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{client.client_name}</p>
                                <p className="text-sm text-gray-500">{client.client_email}</p>
                              </div>
                            </TableCell>
                            <TableCell>{formatDate(payment.date)}</TableCell>
                            <TableCell>{formatCurrency(payment.amount)}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {payment.partnership_year || 1} год
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {getCommissionRate(payment.partnership_year || 1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium">
                              {formatCurrency(payment.commission_amount)}
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={payment.commission_paid ? "default" : "destructive"}
                              >
                                {payment.commission_paid ? "Выплачено" : "К выплате"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CommissionsReportPage;
