
import { supabase } from "@/integrations/supabase/client";
import { Partner } from "@/types";
import { checkPartnerExists } from "./auth";

export const createPartner = async (partner: Partner) => {
  try {
    console.log("Checking if email already exists:", partner.email);
    const exists = await checkPartnerExists(partner.email);

    if (exists) {
      console.warn("Partner with this email already exists:", partner.email);
      throw new Error("Партнер с таким email уже существует");
    }

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
    
    console.log("Creating new partner with data:", {
      ...partnerData,
      password: '[REDACTED]'
    });
    
    const { data, error } = await supabase
      .from("partners")
      .insert([partnerData])
      .select()
      .single();
    
    if (error) {
      console.error("Error inserting partner:", error);
      throw error;
    }
    
    if (!data) {
      throw new Error("Failed to create partner - no data returned");
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
