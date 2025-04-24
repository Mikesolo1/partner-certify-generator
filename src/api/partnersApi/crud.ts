
import { supabase } from "@/integrations/supabase/client";
import { Partner } from "@/types";

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
