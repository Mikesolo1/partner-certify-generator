
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ClientSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const ClientSearch: React.FC<ClientSearchProps> = ({
  searchTerm,
  onSearchChange
}) => {
  return (
    <div className="relative mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        className="pl-10"
        placeholder="Поиск клиентов по имени, email или телефону..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};
