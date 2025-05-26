
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { X, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
  
  // Properly handle images initialization to ensure it's always an array
  const [images, setImages] = useState<string[]>(() => {
    if (!notification?.images) return [];
    if (Array.isArray(notification.images)) return notification.images;
    if (typeof notification.images === 'string') {
      try {
        const parsed = JSON.parse(notification.images);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  }), []);

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'color', 'background', 'align', 'link'
  ];

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

      setImages(prevImages => [...prevImages, publicUrlData.publicUrl]);
      
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
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
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
      if (isEditing && notification?.id) {
        const { data, error } = await supabase.rpc('update_notification', {
          p_id: notification.id,
          p_title: title.trim(),
          p_content: content.trim(),
          p_images: JSON.stringify(images)
        });

        if (error) throw error;
        
        onSave(data);
        toast({
          title: "Успешно",
          description: "Уведомление обновлено",
        });
      } else {
        const { data, error } = await supabase.rpc('create_notification', {
          p_title: title.trim(),
          p_content: content.trim()
        });

        if (error) throw error;

        let finalData = data;

        // Update with images if any
        if (images.length > 0) {
          const { data: updatedData, error: updateError } = await supabase.rpc('update_notification', {
            p_id: data.id,
            p_title: title.trim(),
            p_content: content.trim(),
            p_images: JSON.stringify(images)
          });

          if (updateError) throw updateError;
          finalData = updatedData;
        }

        onSave(finalData);
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
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="Введите текст уведомления..."
              style={{ minHeight: '200px' }}
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
