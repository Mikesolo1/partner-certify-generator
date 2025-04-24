
import { supabase } from "@/integrations/supabase/client";
import { Partner } from "@/types";
import { checkPartnerExists } from "./auth";

export const createPartner = async (partner: Partner) => {
  try {
    console.log("Starting partner creation process:", partner.email);
    
    // Check if email exists first
    const exists = await checkPartnerExists(partner.email);
    
    if (exists) {
      console.warn("Partner creation failed: Email already exists:", partner.email);
      throw new Error("Партнер с таким email уже существует");
    }

    // Prepare partner data
    const partnerData = {
      company_name: partner.companyName,
      contact_person: partner.contactPerson,
      email: partner.email.trim().toLowerCase(),
      password: partner.password,
      partner_level: partner.partnerLevel || "Бронзовый",
      join_date: partner.joinDate || new Date().toISOString(),
      certificate_id: partner.certificateId || `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
      test_passed: partner.testPassed || false,
      role: partner.role || 'user',
      commission: partner.commission || 20
    };
    
    console.log("Attempting to insert new partner:", {
      ...partnerData,
      password: '[REDACTED]'
    });
    
    // Insert the new partner
    const { data, error } = await supabase
      .from("partners")
      .insert([partnerData])
      .select()
      .single();
    
    if (error) {
      console.error("Database error during partner creation:", error);
      if (error.code === '23505') { // Unique violation
        throw new Error("Партнер с такими данными уже существует");
      }
      throw new Error("Ошибка создания партнера: " + error.message);
    }
    
    if (!data) {
      console.error("No data returned after partner creation");
      throw new Error("Не удалось создать партнера - данные не получены");
    }
    
    console.log("Partner created successfully:", data.id);
    
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
      role: data.role,
      password: data.password
    };
  } catch (error) {
    console.error("Error in createPartner:", error);
    throw error;
  }
};
