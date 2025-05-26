
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createNotification } from '@/api/partnersApi';
import { NotificationEditor } from './NotificationEditor';

interface NotificationFormProps {
  onCreateNotification: (title: string, content: string, images: string[]) => void;
}

export const NotificationForm: React.FC<NotificationFormProps> = ({
  onCreateNotification,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (title: string, content: string, images: string[]) => {
    setIsSubmitting(true);
    
    try {
      console.log("Submitting notification:", { title, content, images });
      const notification = await createNotification(title, content, images);
      
      onCreateNotification(title, content, images);
      toast({
        title: "Уведомление создано",
        description: "Новое уведомление успешно опубликовано.",
      });
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
    <NotificationEditor
      onSubmit={handleSubmit}
      submitLabel="Опубликовать уведомление"
      isSubmitting={isSubmitting}
    />
  );
};
