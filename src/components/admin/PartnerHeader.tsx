
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Partner } from '@/types';
import { getRoleBadge } from '@/utils/roleUtils';

interface PartnerHeaderProps {
  partner: Partner;
}

export const PartnerHeader = ({ partner }: PartnerHeaderProps) => {
  const roleBadgeProps = getRoleBadge(partner.role || 'partner');

  return (
    <div className="mb-8">
      <Button variant="outline" asChild className="mb-4">
        <Link to="/admin">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Вернуться к списку
        </Link>
      </Button>
      
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-3xl font-bold">
          {partner.companyName}
        </h1>
        <Badge {...roleBadgeProps} />
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-gray-600">
        <p>{partner.contactPerson} • {partner.email}</p>
        {partner.phone && <p>Телефон: {partner.phone}</p>}
      </div>
    </div>
  );
};
