
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qphsqfdeyzezlbntgmwc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwaHNxZmRleXplemxibnRnbXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzOTIzMTUsImV4cCI6MjA2MDk2ODMxNX0.ArcKJiwTe9eUESwvIYg4cfnR935ZP5leE92H31hzds8';

// Create client with retry and timeout settings
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-application-name': 'partner-portal'
    }
  },
  realtime: {
    timeout: 60000 // Increase timeout to 60 seconds
  },
  db: {
    schema: 'public'
  }
});

// Helper function for query processing with error handling
export async function safeQuery(queryFn) {
  try {
    const result = await queryFn();
    
    // Check for errors in response
    if (result.error) {
      console.error("Supabase query error:", result.error);
      
      // Check for access and authorization errors
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
      
      // Don't retry if it's not a retryable error
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
        delay *= 2; // Exponential backoff
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
  
  // Check error code
  if (error.code && retryableCodes.includes(error.code)) {
    return true;
  }
  
  // Check error message
  if (error.message) {
    return retryableMessages.some(msg => 
      error.message.toLowerCase().includes(msg)
    );
  }
  
  return false;
}
