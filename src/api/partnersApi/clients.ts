
import { supabase } from "@/integrations/supabase/client";
import { Client } from "@/types";

export const fetchPartnerClients = async (partnerId: string) => {
  try {
    const { data, error } = await supabase
      .from("clients")
      .select(`
        id, name, email, phone, registration_date,
        payments(*)
      `)
      .eq("partner_id", partnerId);
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error in fetchPartnerClients:", error);
    return [];
  }
};

export const createClient = async (client: Omit<Client, "id">) => {
  const { data, error } = await supabase
    .from("clients")
    .insert([client])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateClient = async (id: string, client: Partial<Client>) => {
  const { data, error } = await supabase
    .from("clients")
    .update(client)
    .eq("id", id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteClient = async (id: string) => {
  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", id);
  
  if (error) throw error;
  return true;
};
