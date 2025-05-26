
import React from 'react';
import { Partner } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getRoleBadge } from '@/utils/roleUtils';

interface PartnersListProps {
  partners: Partner[];
  onSelectPartner: (partnerId: string | null) => void;
  selectedPartnerId: string | null;
  getPartnerClients: (partnerId: string) => any[];
  getTotalEarnings: (partnerId: string) => number;
  onUpdateRole?: (partnerId: string, newRole: string) => void;
}

export const PartnersList: React.FC<PartnersListProps> = ({
  partners,
  onSelectPartner,
  selectedPartnerId,
  getPartnerClients,
  getTotalEarnings,
}) => {
  const getTestStatusBadge = (passed: boolean) => {
    return passed 
      ? { variant: "default" as const, className: "bg-green-600", children: "Пройден" }
      : { variant: "default" as const, className: "bg-yellow-600", children: "Не пройден" };
  };

  console.log("PartnersList rendering with partners:", partners.map(p => ({ id: p.id, name: p.companyName || p.company_name })));

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
            partners.map((p) => {
              console.log("Rendering partner row:", { id: p.id, companyName: p.companyName || p.company_name });
              
              // Убеждаемся, что у партнера есть валидный ID
              if (!p.id) {
                console.error("Partner missing ID:", p);
                return null;
              }

              return (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.companyName || p.company_name}</TableCell>
                  <TableCell>{p.contactPerson || p.contact_person}</TableCell>
                  <TableCell>{p.email}</TableCell>
                  <TableCell>
                    <Badge {...getTestStatusBadge(p.testPassed || p.test_passed || false)} />
                  </TableCell>
                  <TableCell>
                    <Badge {...getRoleBadge(p.role || 'user')} />
                  </TableCell>
                  <TableCell>{p.partnerLevel || p.partner_level}</TableCell>
                  <TableCell>{getPartnerClients(p.id).length}</TableCell>
                  <TableCell>{getTotalEarnings(p.id).toLocaleString('ru-RU')} ₽</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onSelectPartner(p.id === selectedPartnerId ? null : p.id)}
                      >
                        {p.id === selectedPartnerId ? "Скрыть" : "Детали"}
                      </Button>

                      <Button 
                        size="sm" 
                        variant="outline"
                        asChild
                        onClick={() => console.log("Navigating to partner details:", p.id)}
                      >
                        <Link 
                          to={`/admin/partners/${p.id}`} 
                          data-testid={`view-partner-${p.id}`}
                        >
                          Подробнее
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
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
