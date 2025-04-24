
import React from 'react';
import { Client } from '@/types';
import ClientCard from '@/components/ClientCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ClientsListProps {
  clients: Client[];
  searchTerm: string;
  onUpdate: (client: Client) => void;
  onDelete: (id: string) => void;
  onAddClick: () => void;
}

export const ClientsList: React.FC<ClientsListProps> = ({
  clients,
  searchTerm,
  onUpdate,
  onDelete,
  onAddClick
}) => {
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.phone && client.phone.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (filteredClients.length === 0) {
    return (
      <Card className="text-center py-16">
        <CardHeader>
          <CardTitle>Нет клиентов</CardTitle>
        </CardHeader>
        <CardContent>
          {searchTerm ? (
            <p className="text-gray-500">По вашему запросу ничего не найдено.</p>
          ) : (
            <>
              <p className="text-gray-500 mb-4">Добавьте своего первого клиента, чтобы начать отслеживать платежи и комиссии.</p>
              <Button 
                onClick={onAddClick}
                className="bg-brand text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Добавить клиента
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredClients.map((client) => (
        <ClientCard 
          key={client.id} 
          client={client}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
