
import { supabase } from "@/integrations/supabase/client";

// Функция для определения повторяемых ошибок
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

// Простой помощник запросов для более безопасного выполнения запросов
export async function simpleQuery(queryFn) {
  try {
    const result = await queryFn();
    
    if (result.error) {
      console.error("Supabase query error:", result.error);
      
      // Если это ошибка рекурсии, предложить использовать RPC функции
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

// Функция-помощник для безопасного вызова RPC с улучшенной обработкой ошибок
export async function safeRPC(functionName, params = {}, options = { retries: 1, delay: 1000 }) {
  let attempts = 0;
  const maxAttempts = options.retries + 1;
  
  while (attempts < maxAttempts) {
    attempts++;
    try {
      console.log(`Вызов RPC функции ${functionName} (попытка ${attempts}/${maxAttempts})`, params);
      const { data, error } = await supabase.rpc(functionName, params);
      
      if (error) {
        console.error(`Ошибка вызова RPC функции ${functionName}:`, error);
        
        // Проверяем, можно ли повторить запрос
        if (attempts < maxAttempts && isRetryableError(error)) {
          console.log(`Повторная попытка через ${options.delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, options.delay));
          continue;
        }
        
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error(`Исключение при вызове RPC функции ${functionName}:`, error);
      
      // Проверяем, можно ли повторить запрос
      if (attempts < maxAttempts && isRetryableError(error)) {
        console.log(`Повторная попытка через ${options.delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, options.delay));
        continue;
      }
      
      return { data: null, error };
    }
  }
  
  return { data: null, error: { message: `Все попытки вызова функции ${functionName} исчерпаны` } };
}
