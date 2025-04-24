
import { supabase } from "@/integrations/supabase/client";

interface SafeRPCOptions {
  retries?: number;
  delay?: number; // Delay in ms between retries
  timeoutMs?: number; // Overall timeout in milliseconds
}

// Helper function to delay execution
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Safely execute RPC functions with optional retry mechanism
 */
export const safeRPC = async (
  functionName: string,
  params: Record<string, any> = {},
  options: SafeRPCOptions = { retries: 2, delay: 1000 }
) => {
  let lastError;
  const { retries = 2, delay = 1000, timeoutMs = 10000 } = options;
  
  // Create a timeout promise
  const timeoutPromise = timeoutMs 
    ? new Promise((_, reject) => setTimeout(() => reject(new Error('RPC timeout exceeded')), timeoutMs))
    : null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) {
      console.log(`RPC retry ${attempt}/${retries} for ${functionName} after ${delay}ms`);
      if (delay > 0) {
        await sleep(delay * attempt); // Exponential backoff
      }
    }
    
    try {
      // If timeout is set, race between the RPC call and the timeout
      const rpcPromise = supabase.rpc(functionName, params);
      const { data, error } = timeoutPromise 
        ? await Promise.race([rpcPromise, timeoutPromise]) as any
        : await rpcPromise;

      if (error) {
        console.error(`RPC error on attempt ${attempt + 1}/${retries + 1}:`, error);
        lastError = error;
        
        // Don't retry if it's a function not found error
        if (error.message?.includes('function') && error.message?.includes('not found')) {
          console.error('Function not found error, no retrying:', error);
          return { data: null, error };
        }
      } else {
        // Success
        return { data, error: null };
      }
    } catch (err: any) {
      console.error(`Exception on attempt ${attempt + 1}/${retries + 1}:`, err);
      lastError = err;
    }
  }

  return { data: null, error: lastError };
};

// Helper for safe SELECT queries with retries
export const safeSelect = async (
  table: string,
  options: any = {},
  retryOptions: SafeRPCOptions = { retries: 2, delay: 1000 }
) => {
  let lastError;
  const { retries = 2, delay = 1000 } = retryOptions;

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) {
      console.log(`SELECT retry ${attempt}/${retries} for ${table} after ${delay}ms`);
      if (delay > 0) {
        await sleep(delay * attempt); // Exponential backoff
      }
    }
    
    try {
      const query = supabase.from(table).select(options.select || '*');

      // Apply filters if provided
      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query.eq(key, value);
          }
        });
      }
      
      if (options.order) {
        query.order(options.order.column, { ascending: options.order.ascending });
      }
      
      if (options.limit) {
        query.limit(options.limit);
      }
      
      const { data, error } = await query;

      if (error) {
        console.error(`SELECT error on attempt ${attempt}/${retries}:`, error);
        lastError = error;
      } else {
        // Success
        return { data, error: null };
      }
    } catch (err) {
      console.error(`Exception on attempt ${attempt}/${retries}:`, err);
      lastError = err;
    }
  }

  return { data: null, error: lastError };
};
