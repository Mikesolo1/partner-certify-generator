
import { supabase } from "@/integrations/supabase/client";

// Function to retry queries on temporary errors
export async function retryQuery(queryFn, maxRetries = 5, initialDelay = 500) {
  let lastError;
  let delay = initialDelay;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await queryFn();
      if (!result.error) {
        return result;
      }
      
      lastError = result.error;
      
      if (!isRetryableError(result.error)) {
        throw result.error;
      }
      
      console.log(`Retrying query attempt ${attempt + 1}/${maxRetries} after error:`, result.error);
      
      if (attempt < maxRetries) {
        await new Promise(r => setTimeout(r, delay));
        delay *= 2; // Exponential backoff
      }
    } catch (error) {
      lastError = error;
      
      if (!isRetryableError(error)) {
        throw error;
      }
      
      console.log(`Retrying query attempt ${attempt + 1}/${maxRetries} after exception:`, error);
      
      if (attempt < maxRetries) {
        await new Promise(r => setTimeout(r, delay));
        delay *= 2;
      }
    }
  }
  
  throw lastError;
}

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
    'infinite recursion'
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

// Helper function for query processing with error handling
export async function safeQuery(queryFn) {
  try {
    const result = await queryFn();
    
    if (result.error) {
      console.error("Supabase query error:", result.error);
      
      if (result.error.code === '42501' || result.error.code === '403') {
        console.warn("Access denied error. This might be related to RLS policies or permissions.");
      }
      
      throw result.error;
    }
    
    return { data: result.data, error: null };
  } catch (error) {
    console.error("Supabase query error:", error);
    return { data: null, error };
  }
}
