
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

    const typedData = data as Record<string, any>;
    
    const notification: Notification = {
      id: typedData.id,
      title: typedData.title,
      content: typedData.content,
      images: typedData.images ? (typeof typedData.images === 'string' ? JSON.parse(typedData.images) : typedData.images) : [],
      created_at: typedData.created_at,
      updated_at: typedData.updated_at
    };
    
    return notification;
  } catch (error) {
    console.error("Error in createNotification:", error);
    throw error;
  }
};

export const updateNotification = async (id: string, title: string, content: string, images: string[] = []): Promise<Notification> => {
  try {
    console.log("Updating notification using RPC:", { id, title, content, images });
    
    const { data, error } = await supabase
      .rpc('update_notification', {
        p_id: id,
        p_title: title,
        p_content: content,
        p_images: JSON.stringify(images)
      })
      .single();
    
    if (error) {
      console.error("Error updating notification:", error);
      throw error;
    }
    
    console.log("Notification updated successfully:", data);

    const typedData = data as Record<string, any>;
    
    const notification: Notification = {
      id: typedData.id,
      title: typedData.title,
      content: typedData.content,
      images: typedData.images ? (typeof typedData.images === 'string' ? JSON.parse(typedData.images) : typedData.images) : [],
      created_at: typedData.created_at,
      updated_at: typedData.updated_at
    };
    
    return notification;
  } catch (error) {
    console.error("Error in updateNotification:", error);
    throw error;
  }
};

export const deleteNotification = async (id: string): Promise<boolean> => {
  try {
    console.log("Deleting notification using RPC:", { id });
    
    const { data, error } = await supabase
      .rpc('delete_notification', {
        p_id: id
      });
    
    if (error) {
      console.error("Error deleting notification:", error);
      throw error;
    }
    
    console.log("Notification deleted successfully:", data);
    return data;
  } catch (error) {
    console.error("Error in deleteNotification:", error);
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
