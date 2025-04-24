
import React, { useState } from 'react';
import { Client } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { ClientDetailsSection } from './client/ClientDetailsSection';
import { ClientEditDialog } from './client/ClientEditDialog';
import { ClientDeleteDialog } from './client/ClientDeleteDialog';

interface ClientCardProps {
  client: Client;
  onUpdate: (client: Client) => void;
  onDelete: (id: string) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, onUpdate, onDelete }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{client.name}</CardTitle>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => setIsEditDialogOpen(true)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <ClientDetailsSection client={client} />
      </CardContent>

      <ClientEditDialog
        client={client}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUpdate={onUpdate}
      />
      
      <ClientDeleteDialog
        clientName={client.name}
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={() => onDelete(client.id)}
      />
    </Card>
  );
};

export default ClientCard;
