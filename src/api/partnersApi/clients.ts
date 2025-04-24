
import { supabase } from "@/integrations/supabase/client";
import { Client } from "@/types";

export const fetchPartnerClients = async (partnerId: string) => {
  try {
    const { data, error } = await supabase.rpc("get_partner_clients", {
      p_partner_id: partnerId
    });
    
    if (error) {
      console.error("Error in fetchPartnerClients:", error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error("Error in fetchPartnerClients:", error);
    return [];
  }
};

export const createClient = async (client: Omit<Client, "id" | "registrationDate">) => {
  try {
    console.log("Creating client with data:", client);
    const { data, error } = await supabase.rpc("create_client", {
      p_partner_id: client.partner_id,
      p_name: client.name,
      p_email: client.email,
      p_phone: client.phone || null
    });
    
    if (error) {
      console.error("Error creating client:", error);
      throw error;
    }
    
    console.log("Client creation response:", data);
    return data;
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
};

export const updateClient = async (id: string, client: Partial<Client>) => {
  try {
    // Using update_client RPC function would be better than direct table access
    const { data, error } = await supabase
      .from("clients")
      .update(client)
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};

export const deleteClient = async (id: string) => {
  try {
    const { error } = await supabase.rpc("delete_client", {
      p_client_id: id
    });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};
