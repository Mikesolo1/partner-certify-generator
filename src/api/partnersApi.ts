import { supabase } from "@/integrations/supabase/client";
import { Partner, Client, Payment } from "@/types";

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
  
  // Маппинг полей из базы данных к формату, используемому в приложении
  const partner: Partner = {
    id: data.id,
    companyName: data.company_name,
    company_name: data.company_name,
    contactPerson: data.contact_person,
    contact_person: data.contact_person,
    email: data.email,
    partnerLevel: data.partner_level,
    partner_level: data.partner_level,
    joinDate: data.join_date,
    join_date: data.join_date,
    certificateId: data.certificate_id,
    certificate_id: data.certificate_id,
    testPassed: data.test_passed,
    test_passed: data.test_passed,
    commission: data.commission,
    role: data.role
  };
  
  return partner;
};

export const createPartner = async (partner: any) => {
  const { data, error } = await supabase
    .from("partners")
    .insert([partner])
    .select()
    .single();
  
  if (error) {
    console.error("Error creating partner:", error);
    throw error;
  }
  
  // Преобразуем ответ к формату, используемому в приложении
  const newPartner: Partner = {
    id: data.id,
    companyName: data.company_name,
    company_name: data.company_name,
    contactPerson: data.contact_person,
    contact_person: data.contact_person,
    email: data.email,
    partnerLevel: data.partner_level,
    partner_level: data.partner_level,
    joinDate: data.join_date,
    join_date: data.join_date,
    certificateId: data.certificate_id,
    certificate_id: data.certificate_id,
    testPassed: data.test_passed,
    test_passed: data.test_passed,
    commission: data.commission,
    role: data.role
  };
  
  return newPartner;
};

export const updatePartner = async (id: string, partner: any) => {
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
  
  // Преобразуем ответ к формату, используемому в приложении
  const updatedPartner: Partner = {
    id: data.id,
    companyName: data.company_name,
    company_name: data.company_name,
    contactPerson: data.contact_person,
    contact_person: data.contact_person,
    email: data.email,
    partnerLevel: data.partner_level,
    partner_level: data.partner_level,
    joinDate: data.join_date,
    join_date: data.join_date,
    certificateId: data.certificate_id,
    certificate_id: data.certificate_id,
    testPassed: data.test_passed,
    test_passed: data.test_passed,
    commission: data.commission,
    role: data.role
  };
  
  return updatedPartner;
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
    .update({ 
      test_passed: true,
      role: 'partner' // Повышаем роль с "user" до "partner" после прохождения теста
    })
    .eq("id", partnerId)
    .select()
    .single();
  
  if (error) {
    console.error("Error completing test:", error);
    throw error;
  }
  
  // Преобразуем ответ к формату, используемому в приложении
  const updatedPartner: Partner = {
    id: data.id,
    companyName: data.company_name,
    company_name: data.company_name,
    contactPerson: data.contact_person,
    contact_person: data.contact_person,
    email: data.email,
    partnerLevel: data.partner_level,
    partner_level: data.partner_level,
    joinDate: data.join_date,
    join_date: data.join_date,
    certificateId: data.certificate_id,
    certificate_id: data.certificate_id,
    testPassed: data.test_passed,
    test_passed: data.test_passed,
    commission: data.commission,
    role: data.role
  };
  
  return updatedPartner;
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
      partner_level: level,
      commission: commission
    });
    
    return { level, commission };
  } catch (error) {
    console.error("Error updating partner level:", error);
    throw error;
  }
};

export const createNotification = async (title: string, content: string) => {
  const { data, error } = await supabase
    .from("notifications")
    .insert([{ title, content }])
    .select()
    .single();
  
  if (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
  
  return data;
};

export const fetchNotifications = async (limit = 5) => {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
  
  return data || [];
};
