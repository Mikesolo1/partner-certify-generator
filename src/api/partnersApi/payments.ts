
import { supabase, safeQuery, retryQuery } from "@/integrations/supabase/client";
import { Payment } from "@/types";

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
    
    // Используем retryQuery для более надежного выполнения запроса
    const { data, error } = await retryQuery(() => 
      supabase
        .rpc('add_payment_as_admin', {
          p_client_id: finalPayment.client_id,
          p_amount: finalPayment.amount,
          p_date: finalPayment.date || new Date().toISOString(),
          p_status: finalPayment.status,
          p_admin_id: supabase.auth.getUser().then(({ data }) => data.user?.id)
        })
    );
    
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
