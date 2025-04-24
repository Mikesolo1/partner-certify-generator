
import { supabase } from "@/integrations/supabase/client";

export const createNotification = async (title: string, content: string) => {
  const { data, error } = await supabase
    .from("notifications")
    .insert([{ title, content }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const fetchNotifications = async (limit = 5) => {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
};
