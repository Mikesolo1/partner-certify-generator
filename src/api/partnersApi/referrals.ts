
import { supabase } from "@/integrations/supabase/client";
import { Partner } from "@/types";
import { ReferralCommission } from "@/types/ReferralCommission";

export const generateReferralCode = async (partnerId: string): Promise<string> => {
  try {
    const { data, error } = await supabase.rpc('update_partner_referral_code', {
      p_partner_id: partnerId
    });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error("Error generating referral code:", error);
    throw error;
  }
};

export const getPartnerReferrals = async (partnerId: string): Promise<Partner[]> => {
  try {
    const { data, error } = await supabase.rpc('get_partner_referrals', {
      p_partner_id: partnerId
    });
    
    if (error) throw error;
    
    // Convert from snake_case to camelCase
    return data.map((partner: any) => ({
      id: partner.id,
      companyName: partner.company_name,
      contactPerson: partner.contact_person,
      email: partner.email,
      joinDate: partner.join_date,
      certificateId: partner.certificate_id,
      testPassed: partner.test_passed,
      role: partner.role,
      phone: partner.phone || '',
      referrerId: partner.referrer_id,
      referralCode: partner.referral_code
    }));
  } catch (error) {
    console.error("Error fetching partner referrals:", error);
    throw error;
  }
};

export const getPartnerReferralCommissions = async (partnerId: string): Promise<ReferralCommission[]> => {
  try {
    const { data, error } = await supabase.rpc('get_partner_referral_commissions', {
      p_partner_id: partnerId
    });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error("Error fetching referral commissions:", error);
    throw error;
  }
};

export const markReferralCommissionsPaid = async (partnerId: string): Promise<void> => {
  try {
    const { error } = await supabase.rpc('mark_referral_commissions_paid', {
      p_partner_id: partnerId
    });
    
    if (error) throw error;
  } catch (error) {
    console.error("Error marking referral commissions as paid:", error);
    throw error;
  }
};

export const updatePartnerReferralAccess = async (partnerId: string, enabled: boolean): Promise<Partner> => {
  try {
    console.log("Calling update_partner_referral_access RPC with:", { partnerId, enabled });
    
    // Используем обновленную RPC функцию, которая возвращает данные партнера
    const { data, error } = await supabase.rpc('update_partner_referral_access', {
      p_partner_id: partnerId,
      p_referral_access_enabled: enabled
    });
    
    if (error) {
      console.error("RPC Error:", error);
      throw error;
    }
    
    console.log("RPC Response:", data);
    
    if (!data || data.length === 0) {
      throw new Error("Partner not found after update");
    }
    
    const updatedPartner = data[0];
    console.log("Updated partner data:", updatedPartner);
    
    // Преобразуем данные в нужный формат
    return {
      id: updatedPartner.id,
      companyName: updatedPartner.company_name,
      contactPerson: updatedPartner.contact_person,
      email: updatedPartner.email,
      joinDate: updatedPartner.join_date,
      certificateId: updatedPartner.certificate_id,
      testPassed: updatedPartner.test_passed,
      role: updatedPartner.role,
      phone: updatedPartner.phone || '',
      referrerId: updatedPartner.referrer_id,
      referralCode: updatedPartner.referral_code,
      referralAccessEnabled: updatedPartner.referral_access_enabled
    };
  } catch (error) {
    console.error("Error updating partner referral access:", error);
    throw error;
  }
};
