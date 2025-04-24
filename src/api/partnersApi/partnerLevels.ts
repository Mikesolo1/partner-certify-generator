
import { supabase } from "@/integrations/supabase/client";

// Calculate partner level based on number of clients with payments
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

export const updatePartnerLevel = async (partnerId: string) => {
  try {
    // Fixed the query to safely count clients with payments
    const { data: clients, error } = await supabase
      .from("clients")
      .select(`
        id,
        payments(status)
      `)
      .eq("partner_id", partnerId);
    
    if (error) {
      console.error("Error fetching clients for partner level update:", error);
      throw error;
    }
    
    // Safely count clients with payments
    const clientsWithPayments = Array.isArray(clients) ? 
      clients.filter(client => 
        client.payments && 
        Array.isArray(client.payments) && 
        client.payments.some(payment => payment.status === "оплачено")
      ).length : 0;
    
    const { level, commission } = calculatePartnerLevel(clientsWithPayments);
    
    const { data, error: updateError } = await supabase
      .from("partners")
      .update({
        partner_level: level,
        commission: commission
      })
      .eq("id", partnerId)
      .select();
    
    if (updateError) {
      console.error("Error updating partner level:", updateError);
      throw updateError;
    }
    
    return { level, commission };
  } catch (error) {
    console.error("Error updating partner level:", error);
    throw error;
  }
};
