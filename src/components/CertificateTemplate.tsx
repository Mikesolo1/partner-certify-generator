
import React, { forwardRef } from 'react';
import { Partner } from '@/types/partner';
import { format } from 'date-fns';

interface CertificateTemplateProps {
  partner: Partner;
}

const CertificateTemplate = forwardRef<HTMLDivElement, CertificateTemplateProps>(
  ({ partner }, ref) => {
    const formatDate = (dateString: string) => {
      try {
        return format(new Date(dateString), 'MMMM dd, yyyy');
      } catch (e) {
        return dateString;
      }
    };

    const getBorderColor = () => {
      switch (partner.partnerLevel) {
        case 'Gold':
          return 'border-certificate-gold';
        case 'Silver':
          return 'border-gray-400';
        case 'Bronze':
          return 'border-amber-700';
        case 'Platinum':
          return 'border-certificate-blue';
        default:
          return 'border-certificate-blue';
      }
    };

    const getBadgeColor = () => {
      switch (partner.partnerLevel) {
        case 'Gold':
          return 'bg-gradient-to-r from-certificate-gold to-certificate-lightGold';
        case 'Silver':
          return 'bg-gradient-to-r from-gray-400 to-gray-300';
        case 'Bronze':
          return 'bg-gradient-to-r from-amber-700 to-amber-600';
        case 'Platinum':
          return 'bg-gradient-to-r from-certificate-darkBlue to-certificate-blue';
        default:
          return 'bg-gradient-to-r from-certificate-darkBlue to-certificate-blue';
      }
    };

    return (
      <div 
        ref={ref}
        className={`w-full max-w-3xl mx-auto bg-white border-8 ${getBorderColor()} rounded-lg shadow-xl p-8 relative`}
        style={{ aspectRatio: '1.414/1' }} // A4 aspect ratio
      >
        {/* Certificate Header */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-certificate-blue to-certificate-darkBlue rounded-t-lg" />
        
        {/* Certificate Content */}
        <div className="pt-32 pb-8 px-8 text-center">
          <div className={`inline-block px-6 py-2 rounded-full text-white font-semibold mb-6 ${getBadgeColor()}`}>
            {partner.partnerLevel} Partner
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Certificate of Partnership</h1>
          
          <p className="text-lg text-gray-600 mb-8">
            This certifies that
          </p>
          
          <h2 className="text-3xl font-bold text-certificate-blue mb-2">
            {partner.companyName}
          </h2>
          
          <p className="text-xl text-gray-700 mb-8">
            represented by <span className="font-semibold">{partner.contactPerson}</span>
          </p>
          
          <p className="text-lg text-gray-600 mb-12">
            is recognized as an official {partner.partnerLevel} Partner
            <br />
            since {formatDate(partner.joinDate)}
          </p>
          
          <div className="flex items-center justify-center mb-8">
            <div className="w-32 h-px bg-gray-300 mr-4"></div>
            <div className="w-20 h-20 bg-certificate-blue rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">SEAL</span>
            </div>
            <div className="w-32 h-px bg-gray-300 ml-4"></div>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>Certificate ID: {partner.certificateId}</p>
            <p>Issue Date: {format(new Date(), 'MMMM dd, yyyy')}</p>
          </div>
        </div>
      </div>
    );
  }
);

CertificateTemplate.displayName = 'CertificateTemplate';

export default CertificateTemplate;
