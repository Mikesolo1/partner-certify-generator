
import React, { useState } from 'react';
import { Notification } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NotificationEditor } from './NotificationEditor';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface NotificationsListProps {
  notifications: Notification[];
  onNotificationUpdate: () => void;
}

export const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  onNotificationUpdate,
}) => {
  const { toast } = useToast();
  const [editingNotification, setEditingNotification] = useState<Notification | null>(null);
  const [expandedImages, setExpandedImages] = useState<{ [key: string]: boolean }>({});

  const handleEdit = (notification: Notification) => {
    setEditingNotification(notification);
  };

  const handleSave = (updatedNotification: Notification) => {
    setEditingNotification(null);
    onNotificationUpdate();
  };

  const handleDelete = async (notificationId: string) => {
    if (!confirm('Вы уверены, что хотите удалить это уведомление?')) {
      return;
    }

    try {
      const { data, error } = await supabase.rpc('delete_notification', {
        p_id: notificationId
      });

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Уведомление удалено",
      });
      
      onNotificationUpdate();
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить уведомление",
        variant: "destructive",
      });
    }
  };

  const toggleImageExpansion = (notificationId: string) => {
    setExpandedImages(prev => ({
      ...prev,
      [notificationId]: !prev[notificationId]
    }));
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

  if (editingNotification) {
    return (
      <NotificationEditor
        notification={editingNotification}
        onSave={handleSave}
        onCancel={() => setEditingNotification(null)}
        isEditing={true}
      />
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mt-6 mb-4">Опубликованные уведомления</h3>
      
      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => {
            const images = parseImages(notification.images);
            const isExpanded = expandedImages[notification.id || ''];
            
            return (
              <Card key={notification.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{notification.title}</CardTitle>
                      <div className="flex gap-4 text-sm text-gray-500 mt-1">
                        <p>Создано: {new Date(notification.created_at || '').toLocaleString('ru-RU')}</p>
                        {notification.updated_at && notification.updated_at !== notification.created_at && (
                          <p>Обновлено: {new Date(notification.updated_at).toLocaleString('ru-RU')}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(notification)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(notification.id!)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line mb-4">{notification.content}</p>
                  
                  {images.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          Изображения ({images.length})
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleImageExpansion(notification.id || '')}
                        >
                          {isExpanded ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      
                      {isExpanded && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Изображение ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => window.open(image, '_blank')}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-md">
          <p className="text-gray-500">Нет опубликованных уведомлений</p>
        </div>
      )}
    </div>
  );
};
