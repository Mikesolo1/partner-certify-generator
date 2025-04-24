
import { supabase } from "@/integrations/supabase/client";
import { Partner, Client, Payment } from "@/types/partner";

export const fetchPartners = async () => {
  const { data, error } = await supabase
    .from("partners")
    .select("*");
  
  if (error) {
    console.error("Error fetching partners:", error);
    throw error;
  }
  
  return data || [];
};

export const fetchPartnerById = async (id: string) => {
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .eq("id", id)
    .single();
  
  if (error) {
    console.error("Error fetching partner:", error);
    throw error;
  }
  
  return data;
};

export const createPartner = async (partner: Omit<Partner, "id">) => {
  const { data, error } = await supabase
    .from("partners")
    .insert([partner])
    .select()
    .single();
  
  if (error) {
    console.error("Error creating partner:", error);
    throw error;
  }
  
  return data;
};

export const updatePartner = async (id: string, partner: Partial<Partner>) => {
  const { data, error } = await supabase
    .from("partners")
    .update(partner)
    .eq("id", id)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating partner:", error);
    throw error;
  }
  
  return data;
};

export const fetchPartnerClients = async (partnerId: string) => {
  const { data, error } = await supabase
    .from("clients")
    .select(`
      *,
      payments(*)
    `)
    .eq("partner_id", partnerId);
  
  if (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
  
  return data || [];
};

export const createClient = async (client: Omit<Client, "id">) => {
  const { data, error } = await supabase
    .from("clients")
    .insert([client])
    .select()
    .single();
  
  if (error) {
    console.error("Error creating client:", error);
    throw error;
  }
  
  return data;
};

export const updateClient = async (id: string, client: Partial<Client>) => {
  const { data, error } = await supabase
    .from("clients")
    .update(client)
    .eq("id", id)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating client:", error);
    throw error;
  }
  
  return data;
};

export const deleteClient = async (id: string) => {
  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", id);
  
  if (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
  
  return true;
};

export const createPayment = async (payment: Omit<Payment, "id">) => {
  const { data, error } = await supabase
    .from("payments")
    .insert([payment])
    .select()
    .single();
  
  if (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
  
  return data;
};

export const completeTest = async (partnerId: string) => {
  const { data, error } = await supabase
    .from("partners")
    .update({ test_passed: true })
    .eq("id", partnerId)
    .select()
    .single();
  
  if (error) {
    console.error("Error completing test:", error);
    throw error;
  }
  
  return data;
};

// Рассчитать уровень партнера на основе количества клиентов с оплатой
export const calculatePartnerLevel = (clientsWithPayments: number): { 
  level: string; 
  commission: number;
  nextLevelAt: number | null;
  progress: number;
} => {
  if (clientsWithPayments >= 51) {
    return { 
      level: "Божественный", 
      commission: 50,
      nextLevelAt: null,
      progress: 100
    };
  } else if (clientsWithPayments >= 21) {
    const nextLevel = 51;
    const currentProgress = clientsWithPayments - 21;
    const totalNeeded = nextLevel - 21;
    return { 
      level: "Платиновый", 
      commission: 35,
      nextLevelAt: nextLevel,
      progress: Math.round((currentProgress / totalNeeded) * 100)
    };
  } else if (clientsWithPayments >= 11) {
    const nextLevel = 21;
    const currentProgress = clientsWithPayments - 11;
    const totalNeeded = nextLevel - 11;
    return { 
      level: "Золотой", 
      commission: 27,
      nextLevelAt: nextLevel,
      progress: Math.round((currentProgress / totalNeeded) * 100)
    };
  } else if (clientsWithPayments >= 6) {
    const nextLevel = 11;
    const currentProgress = clientsWithPayments - 6;
    const totalNeeded = nextLevel - 6;
    return { 
      level: "Серебряный", 
      commission: 25,
      nextLevelAt: nextLevel,
      progress: Math.round((currentProgress / totalNeeded) * 100)
    };
  } else {
    const nextLevel = 6;
    const currentProgress = clientsWithPayments;
    const totalNeeded = nextLevel;
    return { 
      level: "Бронзовый", 
      commission: 20,
      nextLevelAt: nextLevel,
      progress: Math.round((currentProgress / totalNeeded) * 100)
    };
  }
};

// Обновить уровень партнера на основе количества клиентов с платежами
export const updatePartnerLevel = async (partnerId: string) => {
  try {
    // Получаем клиентов с платежами
    const clients = await fetchPartnerClients(partnerId);
    
    // Считаем только клиентов с оплаченными платежами
    const clientsWithPayments = clients.filter(client => 
      client.payments && client.payments.some(payment => payment.status === "оплачено")
    ).length;
    
    const { level, commission } = calculatePartnerLevel(clientsWithPayments);
    
    // Обновляем уровень и комиссию партнера
    await updatePartner(partnerId, {
      partnerLevel: level,
      commission: commission
    });
    
    return { level, commission };
  } catch (error) {
    console.error("Error updating partner level:", error);
    throw error;
  }
};
