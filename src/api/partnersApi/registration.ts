
import { supabase } from "@/integrations/supabase/client";
import { Partner } from "@/types";

// Direct function to check if email exists without using RLS policies
const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    
    // Use RPC to avoid RLS policy issues
    const { data, error } = await supabase.rpc('check_partner_exists', {
      p_email: normalizedEmail
    });
    
    if (error) {
      console.error("Error checking email existence:", error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Exception in checkEmailExists:", error);
    throw error;
  }
};

export const createPartner = async (partner: Partner) => {
  try {
    console.log("Starting partner creation process:", partner.email);
    
    // Check if email exists first
    const exists = await checkEmailExists(partner.email);
    
    if (exists) {
      console.warn("Partner creation failed: Email already exists:", partner.email);
      throw new Error("Партнер с таким email уже существует");
    }

    console.log("Attempting to create new partner:", {
      ...partner,
      password: '[REDACTED]'
    });
    
    // Use the updated RPC function with correct parameters
    const { data, error } = await supabase.rpc('insert_partner_direct', {
      p_company_name: partner.companyName,
      p_contact_person: partner.contactPerson,
      p_email: partner.email.trim().toLowerCase(),
      p_password: partner.password,
      p_phone: partner.phone || '',
      p_referral_code: partner.referralCode || null
    });
    
    if (error) {
      console.error("Database error during partner creation:", error);
      throw new Error("Ошибка создания партнера: " + error.message);
    }
    
    if (!data || !data[0]) {
      console.error("No data returned after partner creation");
      throw new Error("Не удалось создать партнера - данные не получены");
    }
    
    const createdPartner = data[0];
    console.log("Partner created successfully:", createdPartner.id);
    
    // Map response data back to Partner type
    return {
      id: createdPartner.id,
      companyName: createdPartner.company_name,
      contactPerson: createdPartner.contact_person,
      email: createdPartner.email,
      joinDate: createdPartner.join_date,
      certificateId: createdPartner.certificate_id,
      testPassed: createdPartner.test_passed,
      role: createdPartner.role,
      phone: createdPartner.phone || '',
      referrerId: createdPartner.referrer_id,
      referralCode: createdPartner.referral_code,
      referralAccessEnabled: createdPartner.referral_access_enabled
    };
  } catch (error) {
    console.error("Error in createPartner:", error);
    throw error;
  }
};
