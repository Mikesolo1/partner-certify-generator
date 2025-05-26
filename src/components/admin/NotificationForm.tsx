
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { createNotification } from '@/api/partnersApi';

interface NotificationFormProps {
  onCreateNotification: (title: string, content: string) => void;
}

export const NotificationForm: React.FC<NotificationFormProps> = ({
  onCreateNotification,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const content = (form.elements.namedItem('content') as HTMLTextAreaElement).value;
    
    if (!title || !content) {
      setIsSubmitting(false);
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Submitting notification:", { title, content });
      const notification = await createNotification(title, content);
      
      onCreateNotification(title, content);
      toast({
        title: "Уведомление создано",
        description: "Новое уведомление успешно опубликовано.",
      });
      form.reset();
    } catch (error) {
      console.error("Error creating notification:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать уведомление",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Создать новое уведомление</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Заголовок уведомления
            </label>
            <input
              id="title"
              name="title"
              className="w-full p-2 border rounded-md"
              placeholder="Введите заголовок..."
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Содержание уведомления
            </label>
            <textarea
              id="content"
              name="content"
              className="w-full p-2 border rounded-md min-h-[100px]"
              placeholder="Введите текст уведомления..."
              required
            />
          </div>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Публикация..." : "Опубликовать уведомление"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
