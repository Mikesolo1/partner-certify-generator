
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
        .from("payments")
        .insert([finalPayment])
        .select()
        .single()
    );
    
    if (error) {
      console.error("Error creating payment:", error);
      throw error;
    }
    
    console.log("Payment created successfully:", data);
    
    // После успешного добавления платежа обновляем партнерский уровень
    if (payment.client_id) {
      try {
        // Получаем partner_id для клиента
        const { data: clientData, error: clientError } = await retryQuery(() => 
          supabase
            .from("clients")
            .select("partner_id")
            .eq("id", payment.client_id)
            .single()
        );
          
        if (clientError) throw clientError;
        
        if (clientData?.partner_id) {
          console.log("Updating partner level for partner:", clientData.partner_id);
          // Вызываем функцию обновления партнерского уровня
          await updatePartnerLevel(clientData.partner_id);
        }
      } catch (e) {
        console.error("Error updating partner level after payment:", e);
        // Продолжаем выполнение, не прерываем из-за ошибки обновления уровня
      }
    }
    
    return data;
  } catch (error) {
    console.error("Error in createPayment:", error);
    throw error;
  }
};

// Функция для обновления уровня партнера
const updatePartnerLevel = async (partnerId: string) => {
  try {
    // Получаем всех клиентов партнера с их платежами
    const { data: clients, error } = await retryQuery(() => 
      supabase
        .from("clients")
        .select(`
          id,
          payments(status)
        `)
        .eq("partner_id", partnerId)
    );
    
    if (error) {
      console.error("Error fetching clients for partner level update:", error);
      throw error;
    }
    
    // Считаем клиентов с платежами
    const clientsWithPayments = Array.isArray(clients) ? 
      clients.filter(client => 
        client.payments && 
        Array.isArray(client.payments) && 
        client.payments.some(payment => payment.status === "оплачено")
      ).length : 0;
    
    console.log(`Partner ${partnerId} has ${clientsWithPayments} clients with payments`);
    
    // Определяем новый уровень и комиссию
    const { level, commission } = calculatePartnerLevel(clientsWithPayments);
    
    console.log(`New level for partner ${partnerId}: ${level}, commission: ${commission}%`);
    
    // Обновляем партнера
    const { error: updateError } = await retryQuery(() => 
      supabase
        .from("partners")
        .update({
          partner_level: level,
          commission: commission
        })
        .eq("id", partnerId)
    );
    
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

// Функция расчета партнерского уровня на основе количества клиентов с платежами
const calculatePartnerLevel = (clientsWithPayments: number) => {
  if (clientsWithPayments >= 51) {
    return { 
      level: "Божественный", 
      commission: 50
    };
  } else if (clientsWithPayments >= 21) {
    return { 
      level: "Платиновый", 
      commission: 35
    };
  } else if (clientsWithPayments >= 11) {
    return { 
      level: "Золотой", 
      commission: 27
    };
  } else if (clientsWithPayments >= 6) {
    return { 
      level: "Серебряный", 
      commission: 25
    };
  } else {
    return { 
      level: "Бронзовый", 
      commission: 20
    };
  }
};
