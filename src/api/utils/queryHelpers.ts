
import { supabase } from "@/integrations/supabase/client";

export const safeRPC = async (functionName: string, params?: any) => {
  try {
    console.log(`Calling RPC function: ${functionName}`, params);
    
    const { data, error } = await supabase.rpc(functionName, params);
    
    if (error) {
      console.error(`RPC Error in ${functionName}:`, error);
      throw error;
    }
    
    console.log(`RPC Success in ${functionName}:`, data);
    return { data, error: null };
  } catch (error) {
    console.error(`Exception in ${functionName}:`, error);
    return { data: null, error };
  }
};
