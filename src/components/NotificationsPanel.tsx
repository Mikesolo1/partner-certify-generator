
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Notification } from '@/types';
import { CalendarClock } from 'lucide-react';

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
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (error) {
          throw error;
        }
        
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
      .channel('public:notifications')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'notifications' 
      }, (payload) => {
        // Add new notification to the beginning of the list
        setNotifications(prev => [payload.new as Notification, ...prev]);
        
        // Show toast when new notification arrives
        toast({
          title: "Новое уведомление",
          description: (payload.new as Notification).title,
        });
      })
      .subscribe();
      
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
