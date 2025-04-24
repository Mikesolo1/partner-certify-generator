
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { usePartners } from '@/contexts/PartnersContext';
import { Navigate } from 'react-router-dom';
import ClientForm from '@/components/ClientForm';
import { ClientSearch } from '@/components/client/ClientSearch';
import { ClientsList } from '@/components/client/ClientsList';
import { useClientsList } from '@/hooks/useClientsList';

const ClientsPage = () => {
  const { currentPartner } = usePartners();
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { clients, loading, handleAddClient, handleUpdateClient, handleDeleteClient } = useClientsList();

  if (!currentPartner?.testPassed) {
    return <Navigate to="/dashboard/test" />;
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Мои клиенты</h1>
          <p className="text-gray-600">
            Управление клиентами и их платежами
          </p>
        </div>
        
        <Button 
          onClick={() => setIsAddClientDialogOpen(true)}
          className="bg-brand text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Добавить клиента
        </Button>
      </div>

      <ClientSearch 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-lg text-gray-500">Загрузка клиентов...</p>
        </div>
      ) : (
        <ClientsList
          clients={clients}
          searchTerm={searchTerm}
          onUpdate={handleUpdateClient}
          onDelete={handleDeleteClient}
          onAddClick={() => setIsAddClientDialogOpen(true)}
        />
      )}
      
      <Dialog open={isAddClientDialogOpen} onOpenChange={setIsAddClientDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить нового клиента</DialogTitle>
            <DialogDescription>
              Введите информацию о новом клиенте
            </DialogDescription>
          </DialogHeader>
          
          <ClientForm onSubmit={async (data) => {
            await handleAddClient(data);
            setIsAddClientDialogOpen(false);
          }} />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ClientsPage;
