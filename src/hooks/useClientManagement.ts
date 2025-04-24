
import { Client, Payment } from '@/types';
import * as api from '@/api/partnersApi';
import { useToast } from '@/hooks/use-toast';
import { usePartners } from '@/contexts/PartnersContext';

export const useClientManagement = () => {
  const { toast } = useToast();
  const { currentPartner } = usePartners();

  const addClient = async (client: Omit<Client, "id" | "registrationDate" | "payments">) => {
    try {
      if (!currentPartner?.id) {
        throw new Error("Не удалось определить текущего партнера");
      }
      
      const clientData = {
        ...client,
        partner_id: currentPartner.id
      };
      
      console.log("Sending client data to API:", clientData);
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
      // Добавляем комиссию в зависимости от уровня партнера
      const commission = currentPartner?.commission || 0;
      const commissionAmount = payment.amount * (commission / 100);
      
      const paymentData = {
        ...payment,
        client_id: clientId,
        commission_amount: commissionAmount
      };
      
      console.log("Adding payment with data:", paymentData);
      const newPayment = await api.createPayment(paymentData);
      
      toast({
        title: "Платеж добавлен",
        description: `Платеж на сумму ${payment.amount} успешно добавлен. Ваша комиссия: ${commissionAmount.toFixed(2)}.`,
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
