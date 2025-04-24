
import { Client, Payment } from '@/types';
import * as api from '@/api/partnersApi';
import { useToast } from '@/hooks/use-toast';

export const useClientManagement = () => {
  const { toast } = useToast();

  const addClient = async (partnerId: string, client: Omit<Client, "id" | "partner_id" | "registrationDate" | "payments">) => {
    try {
      const clientData = {
        ...client,
        partner_id: partnerId,
      };
      
      const newClient = await api.createClient(clientData);
      
      toast({
        title: "Клиент добавлен",
        description: `Клиент ${client.name} успешно добавлен в вашу базу.`,
      });
      
      return newClient;
    } catch (error) {
      console.error('Error adding client:', error);
      
      toast({
        title: "Ошибка",
        description: "Не удалось добавить клиента. Попробуйте еще раз.",
        variant: "destructive",
      });
      
      throw error;
    }
  };

  const removeClient = async (clientId: string) => {
    try {
      const result = await api.deleteClient(clientId);
      
      if (result) {
        toast({
          title: "Клиент удален",
          description: "Клиент успешно удален из вашей базы.",
        });
      }
      
      return result;
    } catch (error) {
      console.error('Error removing client:', error);
      
      toast({
        title: "Ошибка",
        description: "Не удалось удалить клиента. Попробуйте еще раз.",
        variant: "destructive",
      });
      
      throw error;
    }
  };

  const updateClient = async (client: Client) => {
    try {
      const updatedClient = await api.updateClient(client.id, client);
      
      toast({
        title: "Клиент обновлен",
        description: `Информация о клиенте ${client.name} успешно обновлена.`,
      });
      
      return updatedClient;
    } catch (error) {
      console.error('Error updating client:', error);
      
      toast({
        title: "Ошибка",
        description: "Не удалось обновить информацию о клиенте. Попробуйте еще раз.",
        variant: "destructive",
      });
      
      throw error;
    }
  };

  const addPayment = async (clientId: string, payment: Omit<Payment, 'id' | 'client_id'>) => {
    try {
      const paymentData = {
        ...payment,
        client_id: clientId
      };
      
      const newPayment = await api.createPayment(paymentData);
      
      toast({
        title: "Платеж добавлен",
        description: `Платеж на сумму ${payment.amount} успешно добавлен.`,
      });
      
      return newPayment;
    } catch (error) {
      console.error('Error adding payment:', error);
      
      toast({
        title: "Ошибка",
        description: "Не удалось добавить платеж. Попробуйте еще раз.",
        variant: "destructive",
      });
      
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
