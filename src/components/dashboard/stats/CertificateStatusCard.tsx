
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface CertificateStatusCardProps {
  testPassed?: boolean;
}

const CertificateStatusCard = ({ testPassed }: CertificateStatusCardProps) => {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2">
        <FileText className="h-8 w-8 text-brand opacity-15" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Статус сертификата</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold">
            {testPassed ? 'Доступен' : 'Требуется тест'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificateStatusCard;
