
import React from 'react';
import { Client } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ClientsTableProps {
  clients: Client[];
  loading: boolean;
}

export const ClientsTable: React.FC<ClientsTableProps> = ({
  clients,
  loading
}) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Клиенты</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Загрузка клиентов...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Клиенты ({clients.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left">Имя</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Телефон</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Дата регистрации</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="border border-gray-300 px-4 py-2">{client.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{client.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{client.phone || 'Не указан'}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {client.registrationDate ? new Date(client.registrationDate).toLocaleDateString('ru-RU') : 'Не указана'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
