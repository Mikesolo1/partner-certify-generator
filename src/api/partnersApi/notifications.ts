
import { supabase } from "@/integrations/supabase/client";
import { Notification } from "@/types";

export const createNotification = async (title: string, content: string): Promise<Notification> => {
  try {
    console.log("Creating notification:", { title, content });
    
    const { data, error } = await supabase
      .from("notifications")
      .insert([{ title, content }])
      .select()
      .single();
    
    if (error) {
      console.error("Error creating notification:", error);
      throw error;
    }
    
    console.log("Notification created:", data);
    return data;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};

export const fetchNotifications = async (limit = 5) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};
