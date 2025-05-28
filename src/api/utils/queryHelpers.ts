
import { supabase } from "@/integrations/supabase/client";

interface RPCOptions {
  retries?: number;
  delay?: number;
}

export const safeRPC = async (functionName: string, params?: any, options?: RPCOptions) => {
  const maxRetries = options?.retries || 0;
  const delay = options?.delay || 1000;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Calling RPC function: ${functionName} (attempt ${attempt + 1})`, params);
      
      const { data, error } = await supabase.rpc(functionName, params);
      
      if (error) {
        console.error(`RPC Error in ${functionName}:`, error);
        if (attempt === maxRetries) {
          throw error;
        }
        // Wait before retrying
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }
      
      console.log(`RPC Success in ${functionName}:`, data);
      return { data, error: null };
    } catch (error) {
      console.error(`Exception in ${functionName} (attempt ${attempt + 1}):`, error);
      if (attempt === maxRetries) {
        return { data: null, error };
      }
      // Wait before retrying
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  return { data: null, error: new Error('Max retries exceeded') };
};
