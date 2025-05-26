
import React from 'react';
import { Partner } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PartnersTableProps {
  partners: Partner[];
  setPartners: React.Dispatch<React.SetStateAction<Partner[]>>;
  loading: boolean;
}

export const PartnersTable: React.FC<PartnersTableProps> = ({
  partners,
  setPartners,
  loading
}) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Партнеры</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Загрузка партнеров...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Партнеры ({partners.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left">Компания</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Контактное лицо</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Уровень</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Тест пройден</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr key={partner.id}>
                  <td className="border border-gray-300 px-4 py-2">{partner.companyName}</td>
                  <td className="border border-gray-300 px-4 py-2">{partner.contactPerson}</td>
                  <td className="border border-gray-300 px-4 py-2">{partner.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{partner.partnerLevel}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {partner.testPassed ? 'Да' : 'Нет'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
