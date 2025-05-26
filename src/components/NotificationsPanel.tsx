
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Notification } from '@/types';
import { CalendarClock, ChevronDown, ChevronUp } from 'lucide-react';
import { safeRPC } from '@/api/utils/queryHelpers';
import { Button } from '@/components/ui/button';

interface NotificationsPanelProps {
  className?: string;
}

const NotificationsPanel = ({ className }: NotificationsPanelProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedNotifications, setExpandedNotifications] = useState<{ [key: string]: boolean }>({});
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
        setNotifications(data || []);
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
        const newNotification = payload.new as Notification;
        
        setNotifications(prev => {
          const updatedList = [newNotification, ...prev];
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
        const updatedNotification = payload.new as Notification;
        
        setNotifications(prev => 
          prev.map(notification => 
            notification.id === updatedNotification.id ? updatedNotification : notification
          )
        );
      })
      .on('postgres_changes', { 
        event: 'DELETE', 
        schema: 'public', 
        table: 'notifications' 
      }, (payload) => {
        console.log('Notification deleted:', payload);
        const deletedNotification = payload.old as Notification;
        
        setNotifications(prev => 
          prev.filter(notification => notification.id !== deletedNotification.id)
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

  const parseImages = (images: any): string[] => {
    if (!images) return [];
    if (typeof images === 'string') {
      try {
        return JSON.parse(images);
      } catch {
        return [];
      }
    }
    if (Array.isArray(images)) return images;
    return [];
  };

  const toggleExpanded = (notificationId: string) => {
    setExpandedNotifications(prev => ({
      ...prev,
      [notificationId]: !prev[notificationId]
    }));
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
            {notifications.map((notification) => {
              const images = parseImages(notification.images);
              const isExpanded = expandedNotifications[notification.id || ''];
              
              return (
                <div key={notification.id} className="border-b pb-4 last:border-b-0">
                  <h3 className="font-semibold text-lg">{notification.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {formatDate(notification.created_at!)}
                    {notification.updated_at && notification.updated_at !== notification.created_at && (
                      <span className="ml-2">(обновлено: {formatDate(notification.updated_at)})</span>
                    )}
                  </p>
                  <div 
                    className="prose prose-sm max-w-none text-gray-700 mb-3 [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-800"
                    dangerouslySetInnerHTML={{ __html: notification.content }}
                  />
                  
                  {images.length > 0 && (
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(notification.id || '')}
                        className="p-1 h-auto text-sm"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-1" />
                            Скрыть изображения ({images.length})
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-1" />
                            Показать изображения ({images.length})
                          </>
                        )}
                      </Button>
                      
                      {isExpanded && (
                        <div className="grid grid-cols-2 gap-2">
                          {images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Изображение ${index + 1}`}
                              className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => window.open(image, '_blank')}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
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
