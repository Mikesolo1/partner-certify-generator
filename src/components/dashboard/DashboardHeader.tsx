
import React from 'react';

interface DashboardHeaderProps {
  contactPersonName: string;
  currentPartnerLevel?: string; // Делаем опциональным, так как больше не используем уровни
}

const DashboardHeader = ({ contactPersonName }: DashboardHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Добро пожаловать, {contactPersonName}!
      </h1>
      <p className="text-gray-600">
        Управляйте своими клиентами и отслеживайте комиссионные выплаты
      </p>
    </div>
  );
};

export default DashboardHeader;
