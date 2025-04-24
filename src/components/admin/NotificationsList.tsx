
import React from 'react';
import { Notification } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NotificationsListProps {
  notifications: Notification[];
}

export const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mt-6 mb-4">Опубликованные уведомления</h3>
      
      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <CardTitle className="text-lg">{note.title}</CardTitle>
                <p className="text-sm text-gray-500">
                  Опубликовано: {new Date(note.created_at || '').toLocaleString('ru-RU')}
                </p>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{note.content}</p>
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
