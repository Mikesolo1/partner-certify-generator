
import { supabase } from "@/integrations/supabase/client";
import { Payment } from "@/types";
import { safeRPC } from "@/api/utils/queryHelpers";

export const createPayment = async (payment: Omit<Payment, "id">) => {
  try {
    console.log("Creating payment:", payment);
    
    if (!payment.client_id || !payment.amount || !payment.status) {
      const missingFields = [
        !payment.client_id && 'client_id',
        !payment.amount && 'amount',
        !payment.status && 'status'
      ].filter(Boolean);
      
      throw new Error(`Missing required payment fields: ${missingFields.join(', ')}`);
    }
    
    const finalPayment = {
      ...payment,
      commission_amount: payment.commission_amount || 0
    };
    
    console.log("Sending payment to RPC with data:", finalPayment);
    
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
      console.error("RPC Error in createPayment:", error);
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
    console.log("Fetching payments for client:", clientId);
    
    if (!clientId) {
      console.error("getClientPayments called without clientId");
      return [];
    }

    const { data, error } = await safeRPC('get_client_payments_with_commission', {
      p_client_id: clientId
    });
    
    if (error) {
      console.error("Error fetching client payments:", error);
      return [];
    }
    
    console.log(`Retrieved ${data?.length || 0} payments for client ${clientId}`);
    return data || [];
  } catch (error) {
    console.error("Exception in getClientPayments:", error);
    return [];
  }
};

export const getPartnerPayments = async (partnerId: string) => {
  try {
    console.log("Fetching payments for partner:", partnerId);
    
    if (!partnerId) {
      console.error("getPartnerPayments called without partnerId");
      return [];
    }

    const { data, error } = await safeRPC('get_partner_payments_with_commission', {
      p_partner_id: partnerId
    });
    
    if (error) {
      console.error("Error fetching partner payments:", error);
      return [];
    }
    
    console.log(`Retrieved ${data?.length || 0} payments for partner ${partnerId}`);
    return data || [];
  } catch (error) {
    console.error("Exception in getPartnerPayments:", error);
    return [];
  }
};

export const markPartnerCommissionsPaid = async (partnerId: string, adminId: string) => {
  try {
    console.log("Marking commissions as paid for partner:", partnerId);
    
    if (!partnerId || !adminId) {
      console.error("Missing required parameters:", { partnerId, adminId });
      throw new Error("Partner ID and Admin ID are required");
    }

    const { data, error } = await safeRPC('mark_partner_commissions_paid', {
      p_partner_id: partnerId,
      p_admin_id: adminId
    });
    
    if (error) {
      console.error("Error marking commissions as paid:", error);
      throw error;
    }
    
    console.log("Successfully marked commissions as paid:", data);
    return data;
  } catch (error) {
    console.error("Exception in markPartnerCommissionsPaid:", error);
    throw error;
  }
};
