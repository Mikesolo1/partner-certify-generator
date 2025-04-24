
import { supabase } from "@/integrations/supabase/client";
import { Payment } from "@/types";
import { safeRPC } from "@/api/utils/queryHelpers";

export const createPayment = async (payment: Omit<Payment, "id">) => {
  try {
    console.log("Creating payment:", payment);
    
    if (!payment.client_id || !payment.amount || !payment.status) {
      throw new Error("Missing required payment fields");
    }
    
    const finalPayment = {
      ...payment,
      commission_amount: payment.commission_amount || 0
    };
    
    const { data, error } = await safeRPC('add_payment_with_details', {
      p_client_id: finalPayment.client_id,
      p_amount: finalPayment.amount,
      p_date: finalPayment.date || new Date().toISOString(),
      p_status: finalPayment.status,
      p_payment_destination: finalPayment.payment_destination,
      p_tariff_start_date: finalPayment.tariff_start_date,
      p_tariff_end_date: finalPayment.tariff_end_date,
      p_admin_id: finalPayment.created_by
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
