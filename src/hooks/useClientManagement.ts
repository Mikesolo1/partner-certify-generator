import { Client, Payment } from '@/types';
import * as api from '@/api/partnersApi';
import { useToast } from '@/hooks/use-toast';
import { safeRPC } from '@/api/utils/queryHelpers';

export const useClientManagement = (currentPartner: any = null) => {
  const { toast } = useToast();

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
      const { data, error } = await safeRPC("create_client", {
        p_partner_id: currentPartner.id,
        p_name: client.name,
        p_email: client.email,
        p_phone: client.phone || null
      });
      
      if (error) throw error;
      
      toast({
        title: "Клиент добавлен",
        description: `Клиент ${client.name} успешно добавлен в вашу базу.`,
      });
      
      return data;
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

  const addPayment = async (clientId: string, payment: Omit<Payment, 'id' | 'client_id'> | number) => {
    try {
      // Handle case where payment might be just a number (amount)
      const paymentData = typeof payment === 'number' 
        ? { 
            amount: payment, 
            date: new Date().toISOString(), 
            status: "оплачено" as const
          }
        : payment;
      
      // Добавляем комиссию в зависимости от уровня партнера
      const commission = currentPartner?.commission || 0;
      const commissionAmount = paymentData.amount * (commission / 100);
      
      const fullPaymentData = {
        ...paymentData,
        client_id: clientId,
        commission_amount: commissionAmount,
        status: paymentData.status || "оплачено"
      };
      
      console.log("Adding payment with data:", fullPaymentData);
      
      // Ensure we're using the right method with proper error handling
      const newPayment = await api.createPayment(fullPaymentData);
      
      if (!newPayment) {
        throw new Error("Payment creation failed - no data returned");
      }
      
      toast({
        title: "Платеж добавлен",
        description: `Платеж на сумму ${paymentData.amount} успешно добавлен. Ваша комиссия: ${commissionAmount.toFixed(2)}.`,
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
    removeClient: api.deleteClient,
    updateClient: api.updateClient,
    addPayment: api.createPayment
  };
};
