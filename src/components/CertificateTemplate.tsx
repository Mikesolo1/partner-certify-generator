
import React, { forwardRef } from 'react';
import { Partner } from '@/types';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface CertificateTemplateProps {
  partner: Partner;
}

const partnerLevelMap: Record<string, string> = {
  'Gold': 'Золотой',
  'Silver': 'Серебряный',
  'Bronze': 'Бронзовый',
  'Platinum': 'Платиновый',
  'Золотой': 'Золотой',
  'Серебряный': 'Серебряный', 
  'Бронзовый': 'Бронзовый',
  'Платиновый': 'Платиновый'
};

const CertificateTemplate = forwardRef<HTMLDivElement, CertificateTemplateProps>(
  ({ partner }, ref) => {
    const formatDate = (dateString: string) => {
      try {
        return format(new Date(dateString), 'd MMMM yyyy', { locale: ru });
      } catch (e) {
        return dateString;
      }
    };

    const getBorderColor = () => {
      switch (partner.partnerLevel) {
        case 'Золотой':
        case 'Gold':
          return 'border-certificate-gold';
        case 'Серебряный':
        case 'Silver':
          return 'border-gray-400';
        case 'Бронзовый':
        case 'Bronze':
          return 'border-amber-700';
        case 'Платиновый':
        case 'Platinum':
          return 'border-certificate-blue';
        default:
          return 'border-certificate-blue';
      }
    };

    const getBadgeColor = () => {
      switch (partner.partnerLevel) {
        case 'Золотой':
        case 'Gold':
          return 'bg-gradient-to-r from-certificate-gold to-certificate-lightGold';
        case 'Серебряный':
        case 'Silver':
          return 'bg-gradient-to-r from-gray-400 to-gray-300';
        case 'Бронзовый':
        case 'Bronze':
          return 'bg-gradient-to-r from-amber-700 to-amber-600';
        case 'Платиновый':
        case 'Platinum':
          return 'bg-gradient-to-r from-certificate-darkBlue to-certificate-blue';
        default:
          return 'bg-gradient-to-r from-certificate-darkBlue to-certificate-blue';
      }
    };

    const displayLevel = partnerLevelMap[partner.partnerLevel] || partner.partnerLevel;

    return (
      <div 
        ref={ref}
        className={`w-full max-w-3xl mx-auto bg-white border-8 ${getBorderColor()} rounded-lg shadow-xl p-8 relative`}
        style={{ aspectRatio: '1.414/1' }} // A4 aspect ratio
      >
        {/* Логотип компании */}
        <div className="absolute top-6 left-8 flex items-center">
          <div className="text-3xl font-bold text-certificate-blue">S3</div>
          <div className="ml-2 text-xl font-medium text-gray-600">Tech</div>
        </div>
        
        {/* Certificate Header */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-certificate-blue to-certificate-darkBlue rounded-t-lg" />
        
        {/* Certificate Content */}
        <div className="pt-32 pb-8 px-8 text-center">
          <div className={`inline-block px-6 py-2 rounded-full text-white font-semibold mb-6 ${getBadgeColor()}`}>
            {displayLevel} Партнер
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Сертификат Партнера</h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Настоящим удостоверяется, что
          </p>
          
          <h2 className="text-3xl font-bold text-certificate-blue mb-2">
            {partner.companyName}
          </h2>
          
          <p className="text-xl text-gray-700 mb-8">
            в лице <span className="font-semibold">{partner.contactPerson}</span>
          </p>
          
          <p className="text-lg text-gray-600 mb-12">
            является официальным {displayLevel.toLowerCase()} партнером S3 Tech
            <br />
            с {formatDate(partner.joinDate)}
          </p>
          
          <div className="flex items-center justify-center mb-8">
            <div className="w-32 h-px bg-gray-300 mr-4"></div>
            <div className="w-20 h-20 bg-certificate-blue rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">ПЕЧАТЬ</span>
            </div>
            <div className="w-32 h-px bg-gray-300 ml-4"></div>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>Номер сертификата: {partner.certificateId}</p>
            <p>Дата выдачи: {format(new Date(), 'd MMMM yyyy', { locale: ru })}</p>
            <p>S3 Tech - официальный интегратор WhatsApp Business API</p>
          </div>
        </div>
      </div>
    );
  }
);

CertificateTemplate.displayName = 'CertificateTemplate';

export default CertificateTemplate;
