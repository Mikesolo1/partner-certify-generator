
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
  const { toast } = useToast();

  const handleAddPayment = async () => {
    if (!selectedClientId || paymentAmount <= 0) return;

    try {
      await createPayment({
        client_id: selectedClientId,
        amount: paymentAmount,
        status: "оплачено",
        date: new Date().toISOString(),
        commission_amount: 0 // Будет рассчитано на бэкенде
      });

      toast({
        title: "Платеж добавлен",
        description: `Платеж на сумму ${paymentAmount} ₽ успешно добавлен`
      });

      setIsAddPaymentDialogOpen(false);
      setPaymentAmount(0);
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
              <TableHead>Платежи</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length > 0 ? (
              clients.map(client => {
                const clientPayments = getClientPayments(client.id);
                const totalAmount = clientPayments.reduce((sum, payment) => sum + payment.amount, 0);
                
                return (
                  <TableRow key={client.id}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone || "—"}</TableCell>
                    <TableCell>
                      {new Date(client.registrationDate || client.registration_date || '').toLocaleDateString('ru-RU')}
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
                <TableCell colSpan={6} className="text-center py-4">У партнера нет клиентов</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isAddPaymentDialogOpen} onOpenChange={setIsAddPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить платеж</DialogTitle>
            <DialogDescription>
              Укажите сумму платежа для клиента
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
