
import { supabase } from "@/integrations/supabase/client";
import { Notification } from "@/types";

export const createNotification = async (title: string, content: string): Promise<Notification> => {
  try {
    console.log("Creating notification using RPC:", { title, content });
    
    const { data, error } = await supabase
      .rpc('create_notification', {
        p_title: title,
        p_content: content
      })
      .single();
    
    if (error) {
      console.error("Error creating notification:", error);
      throw error;
    }
    
    console.log("Notification created successfully:", data);

    // Ensure the returned data matches the Notification type
    const notification: Notification = {
      id: data.id,
      title: data.title,
      content: data.content,
      created_at: data.created_at
    };
    
    return notification;
  } catch (error) {
    console.error("Error in createNotification:", error);
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
