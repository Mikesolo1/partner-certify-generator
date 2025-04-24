
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

    // Prepare partner data with explicit field mapping
    const partnerData = {
      company_name: partner.companyName,
      contact_person: partner.contactPerson,
      email: partner.email.trim().toLowerCase(),
      password: partner.password,
      partner_level: 'Бронзовый',
      join_date: new Date().toISOString(),
      certificate_id: `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
      test_passed: false,
      role: 'user',
      commission: 20
    };
    
    console.log("Attempting to insert new partner:", {
      ...partnerData,
      password: '[REDACTED]'
    });
    
    // Use a direct insert with maybeSingle to avoid potential RLS issues
    const { data, error } = await supabase
      .from("partners")
      .insert([partnerData])
      .select()
      .maybeSingle();
    
    if (error) {
      console.error("Database error during partner creation:", error);
      throw new Error("Ошибка создания партнера: " + error.message);
    }
    
    if (!data) {
      console.error("No data returned after partner creation");
      throw new Error("Не удалось создать партнера - данные не получены");
    }
    
    console.log("Partner created successfully:", data.id);
    
    // Map response data back to Partner type
    return {
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
  } catch (error) {
    console.error("Error in createPartner:", error);
    throw error;
  }
};
