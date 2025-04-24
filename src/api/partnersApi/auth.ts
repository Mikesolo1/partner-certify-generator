
import { supabase } from "@/integrations/supabase/client";

export const checkPartnerExists = async (email: string) => {
  try {
    console.log("Checking if partner exists with email:", email);
    
    // Use a direct function call to the database instead of a query
    const { data, error } = await supabase.rpc('check_partner_exists', {
      p_email: email.trim().toLowerCase()
    });
    
    if (error) {
      console.error("Error checking if partner exists:", error);
      throw new Error("Ошибка проверки существующего пользователя");
    }
    
    return data;
  } catch (error) {
    console.error("Exception checking partner exists:", error);
    throw error;
  }
};

export const loginPartnerWithCredentials = async (email: string, password: string) => {
  try {
    console.log("Logging in partner with email:", email);
    
    // Use a secure database function to get partner by credentials
    const { data, error } = await supabase.rpc('get_partner_by_credentials', {
      p_email: email.trim().toLowerCase(),
      p_password: password
    });
    
    if (error) {
      console.error("Error logging in partner:", error);
      return null;
    }
    
    if (!data || !data[0]) {
      console.log("No partner found with these credentials");
      return null;
    }
    
    const partnerData = data[0];
    console.log("Login successful, partner data found");
    
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
      role: partnerData.role
    };
  } catch (error) {
    console.error("Exception during login:", error);
    return null;
  }
};
