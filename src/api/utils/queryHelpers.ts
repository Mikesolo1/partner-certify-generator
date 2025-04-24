
import { supabase } from "@/integrations/supabase/client";

interface SafeRPCOptions {
  retries?: number;
  delay?: number; // Delay in ms between retries
}

// Helper function to delay execution
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Safely execute RPC functions with optional retry mechanism
 */
export const safeRPC = async (
  functionName: string,
  params: Record<string, any> = {},
  options: SafeRPCOptions = { retries: 1, delay: 0 }
) => {
  let lastError;
  const { retries = 1, delay = 0 } = options;

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) {
      console.log(`RPC retry ${attempt}/${retries} for ${functionName} after ${delay}ms`);
      if (delay > 0) {
        await sleep(delay);
      }
    }
    
    try {
      const { data, error } = await supabase.rpc(functionName, params);

      if (error) {
        console.error(`RPC error on attempt ${attempt}/${retries}:`, error);
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

// Helper for safe SELECT queries with retries
export const safeSelect = async (
  table: string,
  options: any = {},
  retryOptions: SafeRPCOptions = { retries: 1, delay: 0 }
) => {
  let lastError;
  const { retries = 1, delay = 0 } = retryOptions;

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) {
      console.log(`SELECT retry ${attempt}/${retries} for ${table} after ${delay}ms`);
      if (delay > 0) {
        await sleep(delay);
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
