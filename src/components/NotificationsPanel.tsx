
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Notification } from '@/types';
import { CalendarClock } from 'lucide-react';
import { safeRPC } from '@/api/utils/queryHelpers';

interface NotificationsPanelProps {
  className?: string;
}

const NotificationsPanel = ({ className }: NotificationsPanelProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await safeRPC('get_all_notifications');
        
        if (error) {
          throw error;
        }
        
        console.log('Fetched notifications:', data);
        
        // Преобразуем данные с учетом изображений
        const formattedNotifications = (data || []).map((item: any) => ({
          id: item.id,
          title: item.title,
          content: item.content,
          images: item.images ? (typeof item.images === 'string' ? JSON.parse(item.images) : item.images) : [],
          created_at: item.created_at,
          updated_at: item.updated_at
        }));
        
        setNotifications(formattedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить уведомления",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotifications();
    
    // Setup subscription to notifications table updates
    const channel = supabase
      .channel('notifications-channel')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'notifications' 
      }, (payload) => {
        console.log('New notification received:', payload);
        const newNotification = payload.new as any;
        
        const formattedNotification: Notification = {
          id: newNotification.id,
          title: newNotification.title,
          content: newNotification.content,
          images: newNotification.images ? (typeof newNotification.images === 'string' ? JSON.parse(newNotification.images) : newNotification.images) : [],
          created_at: newNotification.created_at,
          updated_at: newNotification.updated_at
        };
        
        setNotifications(prev => {
          const updatedList = [formattedNotification, ...prev];
          if (updatedList.length > 5) {
            return updatedList.slice(0, 5);
          }
          return updatedList;
        });
        
        toast({
          title: "Новое уведомление",
          description: newNotification.title,
        });
      })
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'notifications' 
      }, (payload) => {
        console.log('Notification updated:', payload);
        const updatedNotification = payload.new as any;
        
        const formattedNotification: Notification = {
          id: updatedNotification.id,
          title: updatedNotification.title,
          content: updatedNotification.content,
          images: updatedNotification.images ? (typeof updatedNotification.images === 'string' ? JSON.parse(updatedNotification.images) : updatedNotification.images) : [],
          created_at: updatedNotification.created_at,
          updated_at: updatedNotification.updated_at
        };
        
        setNotifications(prev => 
          prev.map(notification => 
            notification.id === formattedNotification.id ? formattedNotification : notification
          )
        );
      })
      .on('postgres_changes', { 
        event: 'DELETE', 
        schema: 'public', 
        table: 'notifications' 
      }, (payload) => {
        console.log('Notification deleted:', payload);
        const deletedId = payload.old.id;
        
        setNotifications(prev => 
          prev.filter(notification => notification.id !== deletedId)
        );
      })
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5" />
          Новости и уведомления
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">
            <p className="text-gray-500">Загрузка уведомлений...</p>
          </div>
        ) : notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="border-b pb-4 last:border-b-0">
                <h3 className="font-semibold text-lg">{notification.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {formatDate(notification.created_at!)}
                </p>
                <div 
                  className="text-gray-700 prose prose-sm max-w-none mb-3"
                  dangerouslySetInnerHTML={{ __html: notification.content }}
                />
                
                {notification.images && notification.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {notification.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Изображение ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md border"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center py-8">
            <p className="text-gray-500">Нет новых уведомлений</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationsPanel;
