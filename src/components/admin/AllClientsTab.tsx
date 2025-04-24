
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Client, Payment } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AllClientsTabProps {
  clients: Client[];
  getClientPayments: (clientId: string) => Payment[];
}

export const AllClientsTab: React.FC<AllClientsTabProps> = ({
  clients,
  getClientPayments,
}) => {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isPaymentsDialogOpen, setIsPaymentsDialogOpen] = useState(false);
  const [sortField, setSortField] = useState<'name' | 'email' | 'date'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const sortedClients = [...clients].sort((a, b) => {
    if (sortField === 'date') {
      const dateA = new Date(a.registrationDate || a.registration_date || '').getTime();
      const dateB = new Date(b.registrationDate || b.registration_date || '').getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }
    const valueA = a[sortField].toLowerCase();
    const valueB = b[sortField].toLowerCase();
    return sortDirection === 'asc' 
      ? valueA.localeCompare(valueB) 
      : valueB.localeCompare(valueA);
  });

  const handleSort = (field: 'name' | 'email' | 'date') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Все клиенты в системе</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Имя клиента
                  <SortIcon field="name" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('email')}
              >
                <div className="flex items-center gap-1">
                  Email
                  <SortIcon field="email" />
                </div>
              </TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-1">
                  Дата регистрации
                  <SortIcon field="date" />
                </div>
              </TableHead>
              <TableHead>Партнер</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone || "—"}</TableCell>
                <TableCell>
                  {formatDate(client.registrationDate || client.registration_date || '')}
                </TableCell>
                <TableCell>
                  {/* We'll handle partner name display via parent component */}
                  {client.partner_id}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedClientId(client.id);
                      setIsPaymentsDialogOpen(true);
                    }}
                  >
                    Просмотр платежей
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isPaymentsDialogOpen} onOpenChange={setIsPaymentsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Платежи клиента: {selectedClientId && 
                clients.find(c => c.id === selectedClientId)?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Сумма</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Комиссия</TableHead>
                  <TableHead>Комиссия оплачена</TableHead>
                  <TableHead>Куда поступил</TableHead>
                  <TableHead>Начало тарифа</TableHead>
                  <TableHead>Конец тарифа</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedClientId && getClientPayments(selectedClientId).map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.amount.toLocaleString('ru-RU')} ₽</TableCell>
                    <TableCell>{formatDate(payment.date)}</TableCell>
                    <TableCell>{payment.status}</TableCell>
                    <TableCell>{payment.commission_amount.toLocaleString('ru-RU')} ₽</TableCell>
                    <TableCell>{payment.commission_paid ? "Да" : "Нет"}</TableCell>
                    <TableCell>{payment.payment_destination || "—"}</TableCell>
                    <TableCell>
                      {payment.tariff_start_date ? formatDate(payment.tariff_start_date) : "—"}
                    </TableCell>
                    <TableCell>
                      {payment.tariff_end_date ? formatDate(payment.tariff_end_date) : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
