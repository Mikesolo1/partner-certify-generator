
import React from 'react';
import { Partner } from '@/types';

interface DashboardHeaderProps {
  contactPersonName: string;
  currentPartnerLevel: string;
}

const DashboardHeader = ({ contactPersonName, currentPartnerLevel }: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">
        Добро пожаловать, {contactPersonName}!
      </h1>
      <div className="flex items-center gap-2">
        <span className="text-gray-600">
          Ваш партнерский уровень: 
        </span>
        <span className="font-semibold">
          {currentPartnerLevel}
        </span>
      </div>
    </div>
  );
};

export default DashboardHeader;
