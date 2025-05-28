
import React, { useState } from 'react';
import { Client, Payment } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { createPayment } from '@/api/partnersApi';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePartners } from '@/contexts/PartnersContext';

interface ClientsListProps {
  clients: Client[];
  getClientPayments: (clientId: string) => Payment[];
}

export const ClientsList: React.FC<ClientsListProps> = ({
  clients,
  getClientPayments,
}) => {
  const [isAddPaymentDialogOpen, setIsAddPaymentDialogOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentDate, setPaymentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [paymentDestination, setPaymentDestination] = useState<string>('card');
  const [tariffStartDate, setTariffStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [tariffEndDate, setTariffEndDate] = useState<string>('');
  const { toast } = useToast();
  const { currentPartner } = usePartners();

  const handleAddPayment = async () => {
    if (!selectedClientId || paymentAmount <= 0 || !currentPartner?.id) return;

    try {
      await createPayment({
        client_id: selectedClientId,
        amount: paymentAmount,
        status: "оплачено",
        date: new Date(paymentDate).toISOString(),
        commission_amount: 0, // Будет рассчитано на бэкенде
        payment_destination: paymentDestination,
        tariff_start_date: tariffStartDate,
        tariff_end_date: tariffEndDate || undefined,
        created_by: currentPartner.id
      });

      toast({
        title: "Платеж добавлен",
        description: `Платеж на сумму ${paymentAmount} ₽ успешно добавлен`
      });

      setIsAddPaymentDialogOpen(false);
      setPaymentAmount(0);
      setPaymentDate(new Date().toISOString().split('T')[0]);
      setPaymentDestination('card');
      setTariffStartDate(new Date().toISOString().split('T')[0]);
      setTariffEndDate('');
      setSelectedClientId(null);
    } catch (error) {
      console.error("Error adding payment:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось добавить платеж",
        variant: "destructive"
      });
    }
  };

  const getClientYears = (client: Client) => {
    if (!client.first_payment_date) return null;
    const firstPaymentDate = new Date(client.first_payment_date);
    const now = new Date();
    const yearsDiff = now.getFullYear() - firstPaymentDate.getFullYear();
    return yearsDiff + 1;
  };

  const getCommissionRate = (clientYears: number | null) => {
    if (!clientYears) return "50%";
    if (clientYears === 1) return "50%";
    if (clientYears === 2) return "30%";
    return "10%";
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Клиенты партнера</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Имя</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead>Дата регистрации</TableHead>
              <TableHead>Год клиента</TableHead>
              <TableHead>Комиссия</TableHead>
              <TableHead>Платежи</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length > 0 ? (
              clients.map(client => {
                const clientPayments = getClientPayments(client.id);
                const totalAmount = clientPayments.reduce((sum, payment) => sum + payment.amount, 0);
                const clientYears = getClientYears(client);
                const commissionRate = getCommissionRate(clientYears);
                
                return (
                  <TableRow key={client.id}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone || "—"}</TableCell>
                    <TableCell>
                      {new Date(client.registrationDate || client.registration_date || '').toLocaleDateString('ru-RU')}
                    </TableCell>
                    <TableCell>
                      {clientYears ? `${clientYears}-й год` : 'Без платежей'}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">{commissionRate}</span>
                    </TableCell>
                    <TableCell>
                      {clientPayments.length} платежей на сумму{" "}
                      {totalAmount.toLocaleString('ru-RU')} ₽
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedClientId(client.id);
                          setIsAddPaymentDialogOpen(true);
                        }}
                      >
                        Добавить платеж
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">У партнера нет клиентов</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isAddPaymentDialogOpen} onOpenChange={setIsAddPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Добавить платеж</DialogTitle>
            <DialogDescription>
              Укажите детали платежа для клиента. Комиссия будет рассчитана автоматически на основе года клиента.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Сумма платежа (₽)
              </label>
              <Input
                type="number"
                min="1"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                placeholder="10000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Дата платежа
              </label>
              <Input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Куда поступил платеж
              </label>
              <Select value={paymentDestination} onValueChange={setPaymentDestination}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип платежа" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Карта</SelectItem>
                  <SelectItem value="ru_ip">Счет ИП РФ</SelectItem>
                  <SelectItem value="kz_ip">Счет ИП Казахстан</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Дата начала тарифа
              </label>
              <Input
                type="date"
                value={tariffStartDate}
                onChange={(e) => setTariffStartDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Дата окончания тарифа
              </label>
              <Input
                type="date"
                value={tariffEndDate}
                onChange={(e) => setTariffEndDate(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPaymentDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleAddPayment}>
              Добавить платеж
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
