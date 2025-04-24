
import { supabase } from "@/integrations/supabase/client";
import { Payment } from "@/types";

export const createPayment = async (payment: Omit<Payment, "id">) => {
  const { data, error } = await supabase
    .from("payments")
    .insert([payment])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
