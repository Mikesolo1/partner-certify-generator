
import { supabase } from "@/integrations/supabase/client";
import { Partner } from "@/types";
import { safeRPC } from "@/api/utils/queryHelpers";

export const fetchPartners = async () => {
  try {
    const { data, error } = await safeRPC('get_all_partners');
    
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
    const { data, error } = await safeRPC('get_partner_by_id', { p_id: id });
    
    if (error) {
      console.error("Error fetching partner:", error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      throw new Error("Partner not found");
    }
    
    const partnerData = data[0];
    
    const partner: Partner = {
      id: partnerData.id,
      companyName: partnerData.company_name,
      contactPerson: partnerData.contact_person,
      email: partnerData.email,
      joinDate: partnerData.join_date,
      certificateId: partnerData.certificate_id,
      testPassed: partnerData.test_passed,
      role: partnerData.role,
      phone: partnerData.phone || '',
      referrerId: partnerData.referrer_id,
      referralCode: partnerData.referral_code,
      referralAccessEnabled: partnerData.referral_access_enabled
    };
    
    return partner;
  } catch (error) {
    console.error("Error in fetchPartnerById:", error);
    throw error;
  }
};
