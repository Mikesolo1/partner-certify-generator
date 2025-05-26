
import { supabase } from "@/integrations/supabase/client";
import { Notification } from "@/types";

export const createNotification = async (title: string, content: string, images: string[] = []): Promise<Notification> => {
  try {
    console.log("Creating notification using RPC:", { title, content, images });
    
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
    
    // If images are provided, update the notification with images
    if (images.length > 0) {
      const { data: updatedData, error: updateError } = await supabase
        .rpc('update_notification', {
          p_id: data.id,
          p_title: title,
          p_content: content,
          p_images: JSON.stringify(images)
        })
        .single();
      
      if (updateError) {
        console.error("Error updating notification with images:", updateError);
        throw updateError;
      }
      
      return {
        id: updatedData.id,
        title: updatedData.title,
        content: updatedData.content,
        images: typeof updatedData.images === 'string' ? JSON.parse(updatedData.images) : updatedData.images,
        created_at: updatedData.created_at,
        updated_at: updatedData.updated_at
      };
    }
    
    console.log("Notification created successfully:", data);

    const notification: Notification = {
      id: data.id,
      title: data.title,
      content: data.content,
      images: [],
      created_at: data.created_at
    };
    
    return notification;
  } catch (error) {
    console.error("Error in createNotification:", error);
    throw error;
  }
};

export const updateNotification = async (id: string, title: string, content: string, images: string[] = []): Promise<Notification> => {
  try {
    console.log("Updating notification:", { id, title, content, images });
    
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
    
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      images: typeof data.images === 'string' ? JSON.parse(data.images) : data.images,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  } catch (error) {
    console.error("Error in updateNotification:", error);
    throw error;
  }
};

export const deleteNotification = async (id: string): Promise<void> => {
  try {
    console.log("Deleting notification:", id);
    
    const { data, error } = await supabase
      .rpc('delete_notification', {
        p_id: id
      });
    
    if (error) {
      console.error("Error deleting notification:", error);
      throw error;
    }
    
    console.log("Notification deleted successfully");
  } catch (error) {
    console.error("Error in deleteNotification:", error);
    throw error;
  }
};

export const uploadNotificationImage = async (file: File): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('notification-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('notification-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
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
