
import React from 'react';
import { Client } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ClientsListProps {
  clients: Client[];
  getClientPayments: (clientId: string) => any[];
}

export const ClientsList: React.FC<ClientsListProps> = ({
  clients,
  getClientPayments,
}) => {
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length > 0 ? (
              clients.map(client => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone || "—"}</TableCell>
                  <TableCell>
                    {new Date(client.registration_date || '').toLocaleDateString('ru-RU')}
                  </TableCell>
                  <TableCell>
                    {getClientPayments(client.id).length} платежей на сумму{" "}
                    {getClientPayments(client.id)
                      .reduce((sum, payment) => sum + payment.amount, 0)
                      .toLocaleString('ru-RU')} ₽
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">У партнера нет клиентов</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
