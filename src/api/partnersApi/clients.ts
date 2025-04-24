
import { supabase } from "@/integrations/supabase/client";
import { Client } from "@/types";
import { safeRPC } from "@/api/utils/queryHelpers";

export const fetchPartnerClients = async (partnerId: string) => {
  try {
    const { data, error } = await safeRPC("get_partner_clients", {
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
    const { data, error } = await safeRPC("create_client", {
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
    // Используем RPC функцию для обновления клиента
    const { data, error } = await safeRPC("update_client", {
      p_client_id: id,
      p_name: client.name,
      p_email: client.email,
      p_phone: client.phone
    });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};

export const deleteClient = async (id: string) => {
  try {
    const { error } = await safeRPC("delete_client", {
      p_client_id: id
    });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};
