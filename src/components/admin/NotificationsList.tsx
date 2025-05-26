
import React, { useState } from 'react';
import { Notification } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { updateNotification, deleteNotification } from '@/api/partnersApi';
import { NotificationEditor } from './NotificationEditor';
import { Edit, Trash2, Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface NotificationsListProps {
  notifications: Notification[];
  onUpdate: () => void;
}

export const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  onUpdate,
}) => {
  const [editingNotification, setEditingNotification] = useState<Notification | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleEdit = (notification: Notification) => {
    setEditingNotification(notification);
    setIsDialogOpen(true);
  };

  const handleUpdate = async (title: string, content: string, images: string[]) => {
    if (!editingNotification?.id) return;
    
    setIsUpdating(true);
    try {
      await updateNotification(editingNotification.id, title, content, images);
      toast({
        title: "Успешно",
        description: "Уведомление обновлено",
      });
      setEditingNotification(null);
      setIsDialogOpen(false);
      onUpdate();
    } catch (error) {
      console.error("Error updating notification:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить уведомление",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    try {
      await deleteNotification(id);
      toast({
        title: "Успешно",
        description: "Уведомление удалено",
      });
      onUpdate();
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить уведомление",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mt-6 mb-4">Опубликованные уведомления</h3>
      
      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Создано: {formatDate(note.created_at || '')}
                      </div>
                      {note.updated_at && note.updated_at !== note.created_at && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Изменено: {formatDate(note.updated_at)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(note)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Редактировать уведомление</DialogTitle>
                          <DialogDescription>
                            Внесите изменения в уведомление и нажмите "Сохранить"
                          </DialogDescription>
                        </DialogHeader>
                        {editingNotification && (
                          <NotificationEditor
                            initialTitle={editingNotification.title}
                            initialContent={editingNotification.content}
                            initialImages={editingNotification.images || []}
                            onSubmit={handleUpdate}
                            onCancel={() => {
                              setEditingNotification(null);
                              setIsDialogOpen(false);
                            }}
                            submitLabel="Сохранить изменения"
                            isSubmitting={isUpdating}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => note.id && handleDelete(note.id)}
                      disabled={isDeleting === note.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="whitespace-pre-line prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: note.content }}
                />
                
                {note.images && note.images.length > 0 && (
                  <div className="mt-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {note.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Изображение ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md border"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-md">
          <p className="text-gray-500">Нет опубликованных уведомлений</p>
        </div>
      )}
    </div>
  );
};
