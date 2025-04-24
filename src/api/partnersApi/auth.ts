
import { supabase } from "@/integrations/supabase/client";

export const checkPartnerExists = async (email: string) => {
  try {
    console.log("Checking if partner exists with email:", email);
    
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
