
import { supabase } from "@/integrations/supabase/client";
import { Partner } from "@/types";
import { safeQuery } from "@/integrations/supabase/client";

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
      .maybeSingle();
    
    if (error) {
      console.error("Error fetching partner:", error);
      throw error;
    }
    
    if (!data) {
      throw new Error("Partner not found");
    }
    
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

export const checkPartnerExists = async (email: string) => {
  try {
    console.log("Checking if partner exists with email:", email);
    
    // Use direct query method for stability
    const { data, error } = await supabase
      .from("partners")
      .select("id")
      .eq("email", email.trim().toLowerCase())
      .maybeSingle();
    
    if (error) {
      console.error("Error checking if partner exists:", error);
      throw new Error("Ошибка проверки существующего пользователя");
    }
    
    return !!data;
  } catch (error) {
    console.error("Exception checking partner exists:", error);
    throw error;
  }
};

export const createPartner = async (partner: Partner) => {
  try {
    // Check if partner exists using the improved method
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

export const updatePartner = async (id: string, partner: any) => {
  try {
    const { data, error } = await supabase
      .from("partners")
      .update(partner)
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    
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
    console.error("Error updating partner:", error);
    throw error;
  }
};

export const completeTest = async (partnerId: string) => {
  try {
    const { data, error } = await supabase
      .from("partners")
      .update({ 
        test_passed: true,
        role: 'partner'
      })
      .eq("id", partnerId)
      .select()
      .single();
    
    if (error) throw error;
    
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
    console.error("Error completing test:", error);
    throw error;
  }
};
