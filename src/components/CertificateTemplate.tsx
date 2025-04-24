
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

    const getBgGradient = () => {
      switch (partner.partnerLevel) {
        case 'Золотой':
        case 'Gold':
          return 'from-certificate-gold/10 to-certificate-lightGold/5';
        case 'Серебряный':
        case 'Silver':
          return 'from-gray-200/20 to-gray-100/10';
        case 'Бронзовый':
        case 'Bronze':
          return 'from-amber-700/10 to-amber-600/5';
        case 'Платиновый':
        case 'Platinum':
          return 'from-certificate-darkBlue/10 to-certificate-blue/5';
        default:
          return 'from-certificate-darkBlue/10 to-certificate-blue/5';
      }
    };

    const displayLevel = partnerLevelMap[partner.partnerLevel] || partner.partnerLevel;

    return (
      <div 
        ref={ref}
        className={`w-full bg-white border-8 ${getBorderColor()} relative p-8 rounded-lg`}
        style={{ 
          width: '297mm',  // A4 width in landscape
          height: '210mm',  // A4 height in landscape
          margin: '0 auto'
        }}
      >
        {/* Background Pattern */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getBgGradient()} z-0`} />
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full translate-x-20 translate-y-20" />
        
        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-6">
              <div className="text-4xl font-bold text-certificate-blue">S3</div>
              <div className="ml-2 text-2xl font-medium text-gray-600">Tech</div>
            </div>
            
            <div className={`inline-block px-6 py-2 rounded-full text-white text-lg font-semibold mb-4 
              bg-gradient-to-r from-certificate-blue to-certificate-darkBlue`}
            >
              {displayLevel} Партнер
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-3">Сертификат Партнера</h1>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow text-center space-y-6">
            <p className="text-xl text-gray-600">
              Настоящим удостоверяется, что
            </p>
            
            <h2 className="text-3xl font-bold text-certificate-blue my-4">
              {partner.companyName}
            </h2>
            
            <p className="text-xl text-gray-700">
              в лице <span className="font-semibold">{partner.contactPerson}</span>
            </p>
            
            <p className="text-xl text-gray-600 mt-6">
              является официальным {displayLevel.toLowerCase()} партнером S3 Tech
              <br />с {formatDate(partner.joinDate)}
            </p>
          </div>
          
          {/* Footer */}
          <div className="mt-auto pt-8">
            <div className="flex justify-between items-end px-12">
              {/* Signature Section */}
              <div className="text-left">
                <div className="mb-2">
                  <img 
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAABACAYAAABMbHjfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzEzLTIyOjAxOjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDItMjFUMTQ6NDg6NDYtMDU6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDItMjFUMTQ6NDg6NDYtMDU6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI0LTAyLTIxVDE0OjQ4OjQ2LTA1OjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjExMzBjYmQwLTk3ZjItNDU4Yi1hNTBhLTU2YjM1ZDQ4Y2ZkYyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjg3ZTAxZWQ0LTY0OWYtYzU0YS1h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"
                    alt="CEO Signature"
                    className="w-40 mb-1"
                  />
                  <div className="w-40 border-t border-gray-300" />
                </div>
                <p className="text-sm text-gray-600">Андрей Недорезов</p>
                <p className="text-sm text-gray-500">CEO, S3 Tech</p>
              </div>
              
              {/* Certificate Details */}
              <div className="text-right text-sm text-gray-500">
                <p>Номер сертификата: {partner.certificateId}</p>
                <p>Дата выдачи: {format(new Date(), 'd MMMM yyyy', { locale: ru })}</p>
                <p>S3 Tech - официальный интегратор WhatsApp Business API</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CertificateTemplate.displayName = 'CertificateTemplate';

export default CertificateTemplate;
