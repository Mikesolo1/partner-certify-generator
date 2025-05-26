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
  const { retries = 2, delay = 1000, timeoutMs = 15000 } = options;
  
  // Create a timeout promise
  const timeoutPromise = timeoutMs 
    ? new Promise((_, reject) => setTimeout(() => reject(new Error('RPC timeout exceeded')), timeoutMs))
    : null;

  console.log(`Calling RPC function ${functionName} with params:`, params);
  console.log(`Retry settings: retries=${retries}, delay=${delay}ms, timeout=${timeoutMs}ms`);

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) {
      console.log(`RPC retry ${attempt}/${retries} for ${functionName} after ${delay * attempt}ms`);
      if (delay > 0) {
        await sleep(delay * attempt); // Exponential backoff
      }
    }
    
    try {
      console.log(`Attempt ${attempt + 1}/${retries + 1} for ${functionName}`);
      
      // If timeout is set, race between the RPC call and the timeout
      const rpcPromise = supabase.rpc(functionName, params);
      const result = timeoutPromise 
        ? await Promise.race([rpcPromise, timeoutPromise]) as any
        : await rpcPromise;
        
      const { data, error } = result;
      
      console.log(`RPC ${functionName} result:`, { 
        data: data ? `${Array.isArray(data) ? data.length : 1} records` : 'null', 
        error: error ? error.message : 'none',
        attempt: attempt + 1
      });

      if (error) {
        console.error(`RPC error on attempt ${attempt + 1}/${retries + 1}:`, {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        lastError = error;
        
        // Don't retry for certain types of errors
        if (error.message?.includes('function') && error.message?.includes('not found')) {
          console.error('Function not found error, no retrying:', error);
          return { data: null, error };
        }
        
        if (error.code === 'PGRST116' || error.message?.includes('JWT')) {
          console.error('Authentication error, no retrying:', error);
          return { data: null, error };
        }
        
        if (error.code === '42883') {
          console.error('Function does not exist, no retrying:', error);
          return { data: null, error };
        }
      } else {
        // Success
        console.log(`RPC ${functionName} succeeded on attempt ${attempt + 1}`);
        return { data, error: null };
      }
    } catch (err: any) {
      console.error(`Exception on attempt ${attempt + 1}/${retries + 1}:`, {
        message: err.message,
        name: err.name,
        stack: err.stack
      });
      lastError = err;
      
      // Don't retry on timeout
      if (err.message === 'RPC timeout exceeded') {
        console.error('Timeout error, no more retries');
        break;
      }
    }
  }

  console.error(`All attempts failed for ${functionName}:`, lastError);
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
