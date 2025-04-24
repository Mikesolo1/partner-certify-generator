import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qphsqfdeyzezlbntgmwc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwaHNxZmRleXplemxibnRnbXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzOTIzMTUsImV4cCI6MjA2MDk2ODMxNX0.ArcKJiwTe9eUESwvIYg4cfnR935ZP5leE92H31hzds8';

// Create client with optimized settings for better performance
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

// Removed problematic helper functions that could cause recursion issues
// We'll use direct RPC calls instead which are more reliable
