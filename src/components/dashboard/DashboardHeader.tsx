
import React from 'react';

interface DashboardHeaderProps {
  contactPersonName: string;
}

const DashboardHeader = ({ contactPersonName }: DashboardHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Добро пожаловать, {contactPersonName}!
      </h1>
      <p className="text-gray-600">
        Управляйте своими клиентами и отслеживайте комиссионные выплаты. 
        Комиссия рассчитывается индивидуально для каждого клиента по годам сотрудничества.
      </p>
    </div>
  );
};

export default DashboardHeader;
