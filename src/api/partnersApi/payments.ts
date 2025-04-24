
import { supabase } from "@/integrations/supabase/client";
import { Payment } from "@/types";
import { safeRPC } from "@/api/utils/queryHelpers";

export const createPayment = async (payment: Omit<Payment, "id">) => {
  try {
    console.log("Creating payment:", payment);
    
    // Проверяем, что все необходимые поля присутствуют
    if (!payment.client_id || !payment.amount || !payment.status) {
      throw new Error("Missing required payment fields");
    }
    
    // Убеждаемся, что commission_amount задан
    const finalPayment = {
      ...payment,
      commission_amount: payment.commission_amount || 0
    };
    
    // Используем RPC вместо прямого доступа к таблице
    const { data, error } = await safeRPC('add_payment', {
      p_client_id: finalPayment.client_id,
      p_amount: finalPayment.amount,
      p_date: finalPayment.date || new Date().toISOString(),
      p_status: finalPayment.status,
      p_commission_amount: finalPayment.commission_amount
    });
    
    if (error) {
      console.error("Error creating payment:", error);
      throw error;
    }
    
    console.log("Payment created successfully:", data);
    
    return data;
  } catch (error) {
    console.error("Error in createPayment:", error);
    throw error;
  }
};

export const getClientPayments = async (clientId: string) => {
  try {
    const { data, error } = await safeRPC('get_client_payments', {
      p_client_id: clientId
    });
    
    if (error) {
      console.error("Error fetching client payments:", error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error("Error in getClientPayments:", error);
    return [];
  }
};

export const getPartnerPayments = async (partnerId: string) => {
  try {
    const { data, error } = await safeRPC('get_partner_payments', {
      p_partner_id: partnerId
    });
    
    if (error) {
      console.error("Error fetching partner payments:", error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error("Error in getPartnerPayments:", error);
    return [];
  }
};
