
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { X, Upload, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface NotificationEditorProps {
  notification?: {
    id?: string;
    title: string;
    content: string;
    images?: string[];
  };
  onSave: (notification: any) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export const NotificationEditor: React.FC<NotificationEditorProps> = ({
  notification,
  onSave,
  onCancel,
  isEditing = false
}) => {
  const { toast } = useToast();
  const [title, setTitle] = useState(notification?.title || '');
  const [content, setContent] = useState(notification?.content || '');
  const [images, setImages] = useState<string[]>(notification?.images || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите изображение",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from('notification-images')
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from('notification-images')
        .getPublicUrl(filePath);

      setImages([...images, publicUrlData.publicUrl]);
      
      toast({
        title: "Успешно",
        description: "Изображение загружено",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить изображение",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const notificationData = {
        title: title.trim(),
        content: content.trim(),
        images: JSON.stringify(images)
      };

      if (isEditing && notification?.id) {
        const { data, error } = await supabase.rpc('update_notification', {
          p_id: notification.id,
          p_title: notificationData.title,
          p_content: notificationData.content,
          p_images: notificationData.images
        });

        if (error) throw error;
        
        onSave(data[0]);
        toast({
          title: "Успешно",
          description: "Уведомление обновлено",
        });
      } else {
        const { data, error } = await supabase.rpc('create_notification', {
          p_title: notificationData.title,
          p_content: notificationData.content
        });

        if (error) throw error;

        // Update with images if any
        if (images.length > 0) {
          const { data: updatedData, error: updateError } = await supabase.rpc('update_notification', {
            p_id: data.id,
            p_title: notificationData.title,
            p_content: notificationData.content,
            p_images: notificationData.images
          });

          if (updateError) throw updateError;
          onSave(updatedData[0]);
        } else {
          onSave(data);
        }

        toast({
          title: "Успешно",
          description: "Уведомление создано",
        });
      }

      // Reset form if creating new notification
      if (!isEditing) {
        setTitle('');
        setContent('');
        setImages([]);
      }
    } catch (error) {
      console.error('Error saving notification:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить уведомление",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? 'Редактировать уведомление' : 'Создать новое уведомление'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Заголовок уведомления *
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите заголовок..."
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Содержание уведомления *
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Введите текст уведомления..."
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Изображения</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('image-upload')?.click()}
                disabled={isUploading}
              >
                {isUploading ? (
                  'Загрузка...'
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Добавить изображение
                  </>
                )}
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Изображение ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting 
                ? (isEditing ? 'Сохранение...' : 'Публикация...') 
                : (isEditing ? 'Сохранить изменения' : 'Опубликовать уведомление')
              }
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Отмена
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
