
import React from 'react';
import { Partner } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface PartnersListProps {
  partners: Partner[];
  onUpdateRole: (partnerId: string, newRole: string) => void;
  onSelectPartner: (partnerId: string | null) => void;
  selectedPartnerId: string | null;
  getPartnerClients: (partnerId: string) => any[];
  getTotalEarnings: (partnerId: string) => number;
}

export const PartnersList: React.FC<PartnersListProps> = ({
  partners,
  onUpdateRole,
  onSelectPartner,
  selectedPartnerId,
  getPartnerClients,
  getTotalEarnings,
}) => {
  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'admin':
        return <Badge className="bg-purple-600">Администратор</Badge>;
      case 'partner':
        return <Badge className="bg-blue-600">Партнер</Badge>;
      default:
        return <Badge className="bg-gray-600">Пользователь</Badge>;
    }
  };

  const getTestStatusBadge = (passed: boolean) => {
    return passed 
      ? <Badge className="bg-green-600">Пройден</Badge>
      : <Badge className="bg-yellow-600">Не пройден</Badge>;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Компания</TableHead>
            <TableHead>Контакт</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Статус теста</TableHead>
            <TableHead>Роль</TableHead>
            <TableHead>Уровень</TableHead>
            <TableHead>Клиентов</TableHead>
            <TableHead>Заработано</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partners.length > 0 ? (
            partners.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.company_name}</TableCell>
                <TableCell>{p.contact_person}</TableCell>
                <TableCell>{p.email}</TableCell>
                <TableCell>{getTestStatusBadge(p.test_passed || false)}</TableCell>
                <TableCell>{getRoleBadge(p.role || 'user')}</TableCell>
                <TableCell>{p.partner_level}</TableCell>
                <TableCell>{p.id ? getPartnerClients(p.id).length : 0}</TableCell>
                <TableCell>{p.id ? getTotalEarnings(p.id).toLocaleString('ru-RU') : 0} ₽</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline">Сменить роль</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Изменить роль пользователя</AlertDialogTitle>
                          <AlertDialogDescription>
                            Выберите новую роль для пользователя {p.contact_person}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex flex-col gap-2 my-4">
                          <Button 
                            variant={p.role === 'admin' ? "default" : "outline"} 
                            onClick={() => onUpdateRole(p.id!, 'admin')}
                          >
                            Администратор
                          </Button>
                          <Button 
                            variant={p.role === 'partner' ? "default" : "outline"}
                            onClick={() => onUpdateRole(p.id!, 'partner')}
                          >
                            Партнер
                          </Button>
                          <Button 
                            variant={p.role === 'user' ? "default" : "outline"}
                            onClick={() => onUpdateRole(p.id!, 'user')}
                          >
                            Пользователь
                          </Button>
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onSelectPartner(p.id === selectedPartnerId ? null : p.id)}
                    >
                      {p.id === selectedPartnerId ? "Скрыть" : "Детали"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4">Нет данных</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
