
import { supabase } from "@/integrations/supabase/client";

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
