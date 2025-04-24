import { supabase, safeQuery } from "@/integrations/supabase/client";
import { Partner, Client, Payment } from "@/types";

// Максимальное количество попыток запроса
const MAX_RETRIES = 3;
// Время ожидания между попытками (в миллисекундах)
const RETRY_DELAY = 1000;

// Функция для выполнения запроса с повторными попытками
async function queryWithRetry(queryFn, retries = MAX_RETRIES) {
  try {
    const result = await queryFn();
    if (result.error) {
      if (retries > 0 && (result.error.code === '42P17' || result.error.code === 'PGRST116')) {
        console.log(`Retrying query, ${retries} attempts left...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return queryWithRetry(queryFn, retries - 1);
      }
      throw result.error;
    }
    return result.data;
  } catch (error) {
    if (retries > 0 && (error.code === '42P17' || error.code === 'PGRST116')) {
      console.log(`Retrying query after error, ${retries} attempts left...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return queryWithRetry(queryFn, retries - 1);
    }
    throw error;
  }
}

export const fetchPartners = async () => {
  try {
    const { data, error } = await supabase
      .from("partners")
      .select("id, company_name, contact_person, email, partner_level, join_date, certificate_id, test_passed, commission, role");
    
    if (error) {
      console.error("Error fetching partners:", error);
      return []; 
    }
    
    return data || [];
  } catch (error) {
    console.error("Error in fetchPartners:", error);
    return []; 
  }
};

export const fetchPartnerById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("partners")
      .select("id, company_name, contact_person, email, partner_level, join_date, certificate_id, test_passed, commission, role")
      .eq("id", id)
      .single();
    
    if (error) {
      console.error("Error fetching partner:", error);
      throw error;
    }
    
    // Transform to application format
    const partner: Partner = {
      id: data.id,
      companyName: data.company_name,
      contactPerson: data.contact_person,
      email: data.email,
      partnerLevel: data.partner_level,
      joinDate: data.join_date,
      certificateId: data.certificate_id,
      testPassed: data.test_passed,
      commission: data.commission,
      role: data.role
    };
    
    return partner;
  } catch (error) {
    console.error("Error in fetchPartnerById:", error);
    throw error;
  }
};

export const createPartner = async (partner: Partner) => {
  try {
    // Transform data to Supabase format
    const partnerData = {
      company_name: partner.companyName,
      contact_person: partner.contactPerson,
      email: partner.email,
      partner_level: partner.partnerLevel || "Бронзовый",
      join_date: partner.joinDate || new Date().toISOString(),
      certificate_id: partner.certificateId || `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
      password: partner.password,
      test_passed: partner.testPassed || false,
      role: partner.role || 'user',
      commission: partner.commission || 20
    };
    
    console.log("Creating new partner with data:", partnerData);
    
    const { data, error } = await supabase
      .from("partners")
      .insert([partnerData])
      .select()
      .single();
    
    if (error) {
      console.error("Error creating partner:", error);
      throw error;
    }
    
    console.log("Partner created successfully:", data);
    
    // Transform response to application format
    const newPartner: Partner = {
      id: data.id,
      companyName: data.company_name,
      contactPerson: data.contact_person,
      email: data.email,
      partnerLevel: data.partner_level,
      joinDate: data.join_date,
      certificateId: data.certificate_id,
      testPassed: data.test_passed,
      commission: data.commission,
      role: data.role,
      password: data.password
    };
    
    return newPartner;
  } catch (error) {
    console.error("Error in createPartner:", error);
    throw error;
  }
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
  
  // Transform response to application format
  const updatedPartner: Partner = {
    id: data.id,
    companyName: data.company_name,
    contactPerson: data.contact_person,
    email: data.email,
    partnerLevel: data.partner_level,
    joinDate: data.join_date,
    certificateId: data.certificate_id,
    testPassed: data.test_passed,
    commission: data.commission,
    role: data.role
  };
  
  return updatedPartner;
};

export const fetchPartnerClients = async (partnerId: string) => {
  try {
    const { data, error } = await supabase
      .from("clients")
      .select(`
        id, name, email, phone, registration_date,
        payments(*)
      `)
      .eq("partner_id", partnerId);
    
    if (error) {
      console.error("Error fetching clients:", error);
      return [];
    }
    
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
    contactPerson: data.contact_person,
    email: data.email,
    partnerLevel: data.partner_level,
    joinDate: data.join_date,
    certificateId: data.certificate_id,
    testPassed: data.test_passed,
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
