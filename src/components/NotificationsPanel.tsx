
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
        
        // Используем RPC функцию вместо прямого запроса
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
        
        // Add new notification to the beginning of the list
        setNotifications(prev => {
          // Remove the last notification if we already have 5
          const updatedList = [newNotification, ...prev];
          if (updatedList.length > 5) {
            return updatedList.slice(0, 5);
          }
          return updatedList;
        });
        
        // Show toast when new notification arrives
        toast({
          title: "Новое уведомление",
          description: newNotification.title,
        });
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
                <p className="text-gray-700 whitespace-pre-line">{notification.content}</p>
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
