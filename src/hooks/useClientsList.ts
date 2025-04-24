
import { useState, useEffect } from 'react';
import { Client } from '@/types';
import { useToast } from '@/hooks/use-toast';
import * as api from '@/api/partnersApi';
import { usePartners } from '@/contexts/PartnersContext';

export const useClientsList = () => {
  const { currentPartner, addClient, updateClient, removeClient } = usePartners();
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
        
        // Fetch payments for each client
        const clientsWithPayments = await Promise.all(
          clientsData.map(async (client) => {
            try {
              const payments = await api.getClientPayments(client.id);
              return { ...client, payments };
            } catch (error) {
              console.error(`Error fetching payments for client ${client.id}:`, error);
              return { ...client, payments: [] };
            }
          })
        );
        
        setClients(clientsWithPayments);
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

  const handleAddClient = async (client: Omit<Client, "id" | "partner_id" | "registrationDate" | "payments">) => {
    try {
      console.log("Adding client:", client);
      const newClient = await addClient(client);
      console.log("New client added:", newClient);
      
      const clientToAdd = Array.isArray(newClient) ? newClient[0] : newClient;
      
      if (clientToAdd) {
        setClients(prev => [...prev, clientToAdd]);
        toast({
          title: 'Клиент добавлен',
          description: `Клиент ${client.name} успешно добавлен`
        });
        return clientToAdd;
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
      throw error;
    }
  };

  const handleUpdateClient = async (updatedClient: Client) => {
    try {
      // Fix here: Pass updatedClient.id as the first argument and updatedClient as the second argument
      await updateClient(updatedClient.id, updatedClient);
      
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
      throw error;
    }
  };

  const handleDeleteClient = async (clientId: string) => {
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
      throw error;
    }
  };

  return {
    clients,
    loading,
    handleAddClient,
    handleUpdateClient,
    handleDeleteClient
  };
};
