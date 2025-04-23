
import React from 'react';
import { Partner } from '@/types/partner';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Edit, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface PartnerCardProps {
  partner: Partner;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  const navigate = useNavigate();

  const getBadgeColor = () => {
    switch (partner.partnerLevel) {
      case 'Gold':
        return 'bg-certificate-gold text-black';
      case 'Silver':
        return 'bg-gray-400 text-white';
      case 'Bronze':
        return 'bg-amber-700 text-white';
      case 'Platinum':
        return 'bg-certificate-blue text-white';
      default:
        return 'bg-certificate-blue text-white';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-grow">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold">{partner.companyName}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor()}`}>
            {partner.partnerLevel}
          </span>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <p><span className="font-medium">Contact:</span> {partner.contactPerson}</p>
          <p><span className="font-medium">Email:</span> {partner.email}</p>
          <p><span className="font-medium">Joined:</span> {formatDate(partner.joinDate)}</p>
          <p><span className="font-medium">Certificate ID:</span> {partner.certificateId}</p>
        </div>
      </CardContent>
      
      <CardFooter className="border-t bg-gray-50 rounded-b-lg flex justify-between pt-4">
        <Button variant="outline" size="sm" onClick={() => navigate(`/edit-partner/${partner.id}`)}>
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button 
          size="sm" 
          className="bg-certificate-blue hover:bg-certificate-darkBlue text-white"
          onClick={() => navigate(`/certificate/${partner.id}`)}
        >
          <Award className="h-4 w-4 mr-1" />
          Certificate
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PartnerCard;
