
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qphsqfdeyzezlbntgmwc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwaHNxZmRleXplemxibnRnbXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzOTIzMTUsImV4cCI6MjA2MDk2ODMxNX0.ArcKJiwTe9eUESwvIYg4cfnR935ZP5leE92H31hzds8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
