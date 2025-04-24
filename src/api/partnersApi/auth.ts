
import { supabase } from "@/integrations/supabase/client";
import { safeRPC } from "@/api/utils/queryHelpers";

export const checkPartnerExists = async (email: string) => {
  try {
    console.log("Checking if partner exists with email:", email);
    
    // Normalize email before checking
    const normalizedEmail = email.trim().toLowerCase();
    
    // Call the RPC function for checking partner existence
    const { data, error } = await safeRPC('check_partner_exists', {
      p_email: normalizedEmail
    });
    
    if (error) {
      console.error("Error checking if partner exists:", error);
      throw new Error("Ошибка проверки существующего пользователя");
    }
    
    console.log("Result of checking if partner exists:", data);
    return data;
  } catch (error) {
    console.error("Exception checking partner exists:", error);
    throw error;
  }
};

export const loginPartnerWithCredentials = async (email: string, password: string) => {
  try {
    console.log("Logging in partner with email:", email);
    
    // Normalize email before login
    const normalizedEmail = email.trim().toLowerCase();
    
    // Call the RPC function to get partner by credentials
    const { data, error } = await safeRPC('get_partner_by_credentials', {
      p_email: normalizedEmail,
      p_password: password
    });
    
    if (error) {
      console.error("Error logging in partner:", error);
      return null;
    }
    
    if (!data || data.length === 0) {
      console.log("No partner found with these credentials");
      return null;
    }
    
    const partnerData = data[0];
    console.log("Login successful, partner data found:", partnerData.id);
    
    // После успешного входа устанавливаем JWT сессию
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: password
    });
    
    if (authError) {
      console.warn("Warning: Could not establish auth session:", authError);
      // Продолжаем даже если сессия не установлена, это нормально для текущей архитектуры
    }
    
    return {
      id: partnerData.id,
      companyName: partnerData.company_name,
      contactPerson: partnerData.contact_person,
      email: partnerData.email,
      partnerLevel: partnerData.partner_level,
      joinDate: partnerData.join_date,
      certificateId: partnerData.certificate_id,
      password: partnerData.password,
      testPassed: partnerData.test_passed,
      commission: partnerData.commission,
      role: partnerData.role,
      phone: partnerData.phone || '' // Ensure phone field is always included with fallback
    };
  } catch (error) {
    console.error("Exception during login:", error);
    return null;
  }
};
