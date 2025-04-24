
import React from 'react';
import { FileText } from 'lucide-react';
import BaseStatCard from './BaseStatCard';

interface CertificateStatusCardProps {
  testPassed?: boolean;
}

const CertificateStatusCard = ({ testPassed }: CertificateStatusCardProps) => {
  return (
    <BaseStatCard title="Статус сертификата" icon={FileText}>
      <div className="flex items-center gap-2">
        <p className="text-xl font-bold">
          {testPassed ? 'Доступен' : 'Требуется тест'}
        </p>
      </div>
    </BaseStatCard>
  );
};

export default CertificateStatusCard;
