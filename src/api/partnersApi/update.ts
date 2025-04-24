
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
    // Используем security definer функцию для обхода RLS политик
    const { data, error } = await supabase.rpc("complete_partner_test", {
      p_partner_id: partnerId
    });
    
    if (error) throw error;
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error("No data returned from complete_partner_test function");
    }
    
    const updatedPartner = data[0];
    
    return {
      id: updatedPartner.id,
      companyName: updatedPartner.company_name,
      contactPerson: updatedPartner.contact_person,
      email: updatedPartner.email,
      partnerLevel: updatedPartner.partner_level,
      joinDate: updatedPartner.join_date,
      certificateId: updatedPartner.certificate_id,
      testPassed: updatedPartner.test_passed,
      commission: updatedPartner.commission,
      role: updatedPartner.role
    };
  } catch (error) {
    console.error("Error completing test:", error);
    throw error;
  }
};
