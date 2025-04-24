
import { supabase } from "@/integrations/supabase/client";
import { Partner } from "@/types";
import { safeQuery } from "../utils/queryHelpers";

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
    const { data: exists, error: checkError } = await supabase.rpc('check_partner_exists', {
      p_email: partner.email
    });

    if (checkError) {
      console.error("Error checking partner existence:", checkError);
      throw new Error("Ошибка при проверке существующего партнера");
    }

    if (exists) {
      throw new Error("Партнер с таким email уже существует");
    }

    const partnerData = {
      company_name: partner.companyName,
      contact_person: partner.contactPerson,
      email: partner.email,
      password: partner.password,
      partner_level: partner.partnerLevel || "Бронзовый",
      join_date: partner.joinDate || new Date().toISOString(),
      certificate_id: partner.certificateId || `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
      test_passed: partner.testPassed || false,
      role: partner.role || 'user',
      commission: partner.commission || 20
    };
    
    const { data, error } = await supabase
      .from("partners")
      .insert([partnerData])
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
      role: data.role,
      password: data.password
    };
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
};

export const completeTest = async (partnerId: string) => {
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
};
