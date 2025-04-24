
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
    'network error'
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

// Simple query helper that doesn't cause recursion issues
export async function simpleQuery(queryFn) {
  try {
    const result = await queryFn();
    
    if (result.error) {
      console.error("Supabase query error:", result.error);
      throw result.error;
    }
    
    return { data: result.data, error: null };
  } catch (error) {
    console.error("Supabase query error:", error);
    return { data: null, error };
  }
}
