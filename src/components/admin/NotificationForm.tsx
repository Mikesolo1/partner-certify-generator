
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NotificationEditor } from './NotificationEditor';
import { Plus } from 'lucide-react';

interface NotificationFormProps {
  onCreateNotification: (title: string, content: string) => void;
}

export const NotificationForm: React.FC<NotificationFormProps> = ({
  onCreateNotification,
}) => {
  const [showEditor, setShowEditor] = useState(false);

  const handleSave = (notification: any) => {
    onCreateNotification(notification.title, notification.content);
    setShowEditor(false);
  };

  return (
    <div className="space-y-4">
      {!showEditor ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Создать новое уведомление
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setShowEditor(true)}>
              Создать уведомление
            </Button>
          </CardContent>
        </Card>
      ) : (
        <NotificationEditor
          onSave={handleSave}
          onCancel={() => setShowEditor(false)}
        />
      )}
    </div>
  );
};
