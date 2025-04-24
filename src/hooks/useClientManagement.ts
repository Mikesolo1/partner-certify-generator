
import { Client, Payment } from '@/types';
import * as api from '@/api/partnersApi';
import { useToast } from '@/hooks/use-toast';

export const useClientManagement = () => {
  const { toast } = useToast();

  const addClient = async (partnerId: string, client: Client) => {
    try {
      const newClient = await api.createClient(client);
      return newClient;
    } catch (error) {
      console.error('Error adding client:', error);
      throw error;
    }
  };

  const removeClient = async (partnerId: string, clientId: string) => {
    try {
      return await api.deleteClient(clientId);
    } catch (error) {
      console.error('Error removing client:', error);
      throw error;
    }
  };

  const updateClient = async (partnerId: string, client: Client) => {
    try {
      return await api.updateClient(client.id, client);
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  };

  const addPayment = async (clientId: string, payment: Omit<Payment, 'id' | 'client_id'>) => {
    try {
      return await api.createPayment({
        ...payment,
        client_id: clientId
      });
    } catch (error) {
      console.error('Error adding payment:', error);
      throw error;
    }
  };

  return {
    addClient,
    removeClient,
    updateClient,
    addPayment
  };
};
