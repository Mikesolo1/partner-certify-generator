import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Plus, Search } from 'lucide-react';
import { usePartners } from '@/contexts/PartnersContext';
import { Client, Payment } from '@/types';
import ClientCard from '@/components/ClientCard';
import ClientForm from '@/components/ClientForm';
import { Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import * as api from '@/api/partnersApi';

const ClientsPage = () => {
  const { currentPartner, addClient, updateClient, removeClient, addPayment } = usePartners();
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchClients = async () => {
      if (!currentPartner?.id) return;
      
      setLoading(true);
      try {
        const clientsData = await api.fetchPartnerClients(currentPartner.id);
        console.log("Fetched clients:", clientsData);
        setClients(clientsData);
      } catch (error) {
        console.error('Error fetching clients:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить клиентов',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchClients();
  }, [currentPartner?.id, toast]);
  
  if (!currentPartner?.testPassed) {
    return <Navigate to="/dashboard/test" />;
  }
  
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.phone && client.phone.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleAddClient = async (client: Omit<Client, "id" | "partner_id" | "registrationDate" | "payments">) => {
    if (!currentPartner?.id) return;
    
    try {
      console.log("Adding client:", client);
      const newClient = await addClient(client);
      console.log("New client added:", newClient);
      
      // Если newClient это массив, берем первый элемент
      const clientToAdd = Array.isArray(newClient) ? newClient[0] : newClient;
      
      if (clientToAdd) {
        setClients(prev => [...prev, clientToAdd]);
        setIsAddClientDialogOpen(false);
        toast({
          title: 'Клиент добавлен',
          description: `Клиент ${client.name} успешно добавлен`
        });
      } else {
        throw new Error("Не удалось получить данные нового клиента");
      }
    } catch (error) {
      console.error('Error adding client:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось добавить клиента',
        variant: 'destructive'
      });
    }
  };
  
  const handleUpdateClient = async (updatedClient: Client) => {
    if (!currentPartner?.id) return;
    
    try {
      await updateClient(updatedClient);
      setClients(prev => 
        prev.map(client => client.id === updatedClient.id ? updatedClient : client)
      );
      toast({
        title: 'Клиент обновлен',
        description: `Клиент ${updatedClient.name} успешно обновлен`
      });
    } catch (error) {
      console.error('Error updating client:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить клиента',
        variant: 'destructive'
      });
    }
  };
  
  const handleDeleteClient = async (clientId: string) => {
    if (!currentPartner?.id) return;
    
    try {
      await removeClient(clientId);
      setClients(prev => prev.filter(client => client.id !== clientId));
      toast({
        title: 'Клиент удален',
        description: 'Клиент успешно удален'
      });
    } catch (error) {
      console.error('Error deleting client:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить клиента',
        variant: 'destructive'
      });
    }
  };
  
  const handleAddPayment = async (clientId: string, amount: number) => {
    try {
      const payment: Omit<Payment, "id" | "client_id"> = {
        amount,
        date: new Date().toISOString(),
        status: 'оплачено'
      };
      
      console.log("Adding payment:", payment, "for client:", clientId);
      await addPayment(clientId, payment);
      
      // Получаем обновленный список клиентов после добавления платежа
      if (currentPartner?.id) {
        const updatedClients = await api.fetchPartnerClients(currentPartner.id);
        setClients(updatedClients);
      }
      
      toast({
        title: 'Платеж добавлен',
        description: `Платеж на сумму ${amount} ₽ успешно добавлен`
      });
    } catch (error) {
      console.error('Error adding payment:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось добавить платеж',
        variant: 'destructive'
      });
    }
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
          className="bg-brand text-white"
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
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-lg text-gray-500">Загрузка клиентов...</p>
        </div>
      ) : filteredClients.length > 0 ? (
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
                  className="bg-brand text-white"
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
