
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qphsqfdeyzezlbntgmwc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwaHNxZmRleXplemxibnRnbXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzOTIzMTUsImV4cCI6MjA2MDk2ODMxNX0.ArcKJiwTe9eUESwvIYg4cfnR935ZP5leE92H31hzds8';

// Создаем клиент с настройками повторных попыток и таймаутов
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
    timeout: 30000
  },
  db: {
    schema: 'public'
  }
});

// Вспомогательная функция для обработки запросов с обработкой ошибок
export async function safeQuery(queryFn) {
  try {
    const result = await queryFn();
    
    // Проверяем наличие ошибок в ответе
    if (result.error) {
      console.error("Supabase query error:", result.error);
      
      // Проверка на ошибки доступа и авторизации
      if (result.error.code === '42501' || result.error.code === '403') {
        console.warn("Access denied error. This might be related to RLS policies.");
      }
      
      // Проверка на ошибки с политиками RLS
      if (result.error.code === '42P17') {
        console.warn("Infinite recursion detected in policy. This is a problem with Supabase RLS configuration.");
      }
      
      throw result.error;
    }
    
    return { data: result.data, error: null };
  } catch (error) {
    console.error("Supabase query error:", error);
    return { data: null, error };
  }
}

// Функция для повторения запросов при временных ошибках
export async function retryQuery(queryFn, maxRetries = 3, delay = 300) {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await queryFn();
      if (!result.error) {
        return result;
      }
      
      lastError = result.error;
      
      // Если это не временная ошибка, не пытаемся снова
      if (!isRetryableError(result.error)) {
        throw result.error;
      }
      
      console.log(`Retrying query attempt ${attempt + 1}/${maxRetries} after error:`, result.error);
      
      if (attempt < maxRetries) {
        await new Promise(r => setTimeout(r, delay * Math.pow(2, attempt)));
      }
    } catch (error) {
      lastError = error;
      
      if (!isRetryableError(error)) {
        throw error;
      }
      
      console.log(`Retrying query attempt ${attempt + 1}/${maxRetries} after exception:`, error);
      
      if (attempt < maxRetries) {
        await new Promise(r => setTimeout(r, delay * Math.pow(2, attempt)));
      }
    }
  }
  
  throw lastError;
}

// Функция для определения ошибок, которые можно повторить
function isRetryableError(error) {
  if (!error) return false;
  
  const retryableCodes = ['42P17', 'PGRST116', '503', '429', 'timeout'];
  const retryableMessages = ['connection refused', 'timeout', 'temporarily unavailable'];
  
  // Проверка кода ошибки
  if (error.code && retryableCodes.includes(error.code)) {
    return true;
  }
  
  // Проверка сообщения об ошибке
  if (error.message) {
    return retryableMessages.some(msg => error.message.toLowerCase().includes(msg));
  }
  
  return false;
}
