
import { Client } from '@/types';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

interface ClientDetailsSectionProps {
  client: Client;
}

export const ClientDetailsSection = ({ client }: ClientDetailsSectionProps) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'd MMMM yyyy', { locale: ru });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-500">Email:</span>
        <span className="font-medium">{client.email}</span>
      </div>
      
      <div className="flex justify-between">
        <span className="text-gray-500">Телефон:</span>
        <span className="font-medium">{client.phone || "—"}</span>
      </div>
      
      <div className="flex justify-between">
        <span className="text-gray-500">Дата регистрации:</span>
        <span className="font-medium">
          {formatDate(client.registrationDate || client.registration_date || '')}
        </span>
      </div>
    </div>
  );
};
