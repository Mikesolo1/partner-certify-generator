
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Plus, Search } from 'lucide-react';
import { usePartners } from '@/contexts/PartnersContext';
import { Client, Payment } from '@/types/partner';
import ClientCard from '@/components/ClientCard';
import ClientForm from '@/components/ClientForm';
import { Navigate } from 'react-router-dom';

const ClientsPage = () => {
  const { currentPartner, updateClient, addClient, removeClient } = usePartners();
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!currentPartner?.testPassed) {
    return <Navigate to="/dashboard/test" />;
  }
  
  const clients = currentPartner?.clients || [];
  
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddClient = (client: Client) => {
    if (currentPartner?.id) {
      addClient(currentPartner.id, client);
      setIsAddClientDialogOpen(false);
    }
  };
  
  const handleUpdateClient = (updatedClient: Client) => {
    if (currentPartner?.id) {
      updateClient(currentPartner.id, updatedClient);
    }
  };
  
  const handleDeleteClient = (clientId: string) => {
    if (currentPartner?.id) {
      removeClient(currentPartner.id, clientId);
    }
  };
  
  const handleAddPayment = (clientId: string, amount: number) => {
    if (!currentPartner?.id) return;
    
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    // Создание нового платежа
    const newPayment: Payment = {
      id: `p-${Date.now()}`,
      amount,
      date: new Date().toISOString().split('T')[0],
      status: 'оплачено',
      commissionAmount: Math.round(amount * ((currentPartner?.commission || 10) / 100))
    };
    
    // Добавление платежа к клиенту
    const updatedClient = {
      ...client,
      payments: [...client.payments, newPayment]
    };
    
    updateClient(currentPartner.id, updatedClient);
  };
  
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
          className="bg-gradient-to-r from-certificate-blue to-certificate-darkBlue text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Добавить клиента
        </Button>
      </div>
      
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Поиск клиентов по имени, email или телефону..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredClients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <ClientCard 
              key={client.id} 
              client={client}
              onUpdate={handleUpdateClient}
              onDelete={handleDeleteClient}
              onAddPayment={handleAddPayment}
            />
          ))}
        </div>
      ) : (
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
                  onClick={() => setIsAddClientDialogOpen(true)}
                  className="bg-certificate-blue text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить клиента
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Диалог добавления клиента */}
      <Dialog open={isAddClientDialogOpen} onOpenChange={setIsAddClientDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить нового клиента</DialogTitle>
            <DialogDescription>
              Введите информацию о новом клиенте
            </DialogDescription>
          </DialogHeader>
          
          <ClientForm onSubmit={handleAddClient} />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ClientsPage;
