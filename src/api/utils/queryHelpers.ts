
import { supabase } from "@/integrations/supabase/client";

// Function to determine retryable errors
function isRetryableError(error) {
  if (!error) return false;
  
  const retryableCodes = ['42P17', 'PGRST116', '503', '429', '502', 'timeout', 'CONNECTION_ERROR'];
  const retryableMessages = [
    'connection refused', 
    'timeout', 
    'temporarily unavailable',
    'too many connections',
    'rate limit',
    'network error',
    'infinite recursion detected in policy'
  ];
  
  if (error.code && retryableCodes.includes(error.code)) {
    return true;
  }
  
  if (error.message) {
    return retryableMessages.some(msg => 
      error.message.toLowerCase().includes(msg)
    );
  }
  
  return false;
}

// Simple query helper for safer query execution
export async function simpleQuery(queryFn) {
  try {
    const result = await queryFn();
    
    if (result.error) {
      console.error("Supabase query error:", result.error);
      
      // If this is a recursion error, suggest using RPC functions
      if (result.error.message && 
          result.error.message.toLowerCase().includes('infinite recursion')) {
        console.warn("Recursion error detected. Consider using RPC functions with SECURITY DEFINER instead of direct table access");
      }
      
      return { data: null, error: result.error };
    }
    
    return { data: result.data, error: null };
  } catch (error) {
    console.error("Supabase query error:", error);
    return { data: null, error };
  }
}

// Helper function to safely call RPC with better error handling
export async function safeRPC(functionName, params = {}) {
  try {
    const { data, error } = await supabase.rpc(functionName, params);
    
    if (error) {
      console.error(`Error calling RPC function ${functionName}:`, error);
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error) {
    console.error(`Exception calling RPC function ${functionName}:`, error);
    return { data: null, error };
  }
}
