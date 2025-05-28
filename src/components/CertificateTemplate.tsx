
import React from 'react';
import { Partner } from '@/types';

interface CertificateTemplateProps {
  partner: Partner;
}

const CertificateTemplate: React.FC<CertificateTemplateProps> = ({ partner }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-certificate-blue via-certificate-lightBlue to-certificate-darkBlue flex items-center justify-center p-8 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-24 translate-y-24"></div>
      <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-certificate-gold/20 rounded-full"></div>
      <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-white/15 rounded-full"></div>
      
      {/* Основной контент сертификата */}
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-4xl w-full text-center relative z-10">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-certificate-darkBlue mb-2">
            СЕРТИФИКАТ ПАРТНЕРА
          </h1>
          <div className="w-32 h-1 bg-certificate-gold mx-auto rounded-full"></div>
        </div>
        
        {/* Основной текст */}
        <div className="mb-8">
          <p className="text-lg text-gray-600 mb-6">
            Настоящим подтверждается, что
          </p>
          <h2 className="text-3xl font-bold text-certificate-darkBlue mb-2">
            {partner.companyName || partner.company_name}
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            в лице {partner.contactPerson || partner.contact_person}
          </p>
          <p className="text-lg text-gray-600 mb-4">
            является официальным партнером компании
          </p>
          <h3 className="text-2xl font-bold text-certificate-blue mb-6">
            S3 Business Solutions
          </h3>
          <p className="text-lg text-gray-600">
            и имеет право на представление наших услуг и решений
          </p>
        </div>
        
        {/* Информация о сертификате */}
        <div className="grid grid-cols-2 gap-8 mb-8 text-left">
          <div>
            <p className="text-sm text-gray-500 mb-1">Дата выдачи:</p>
            <p className="font-semibold text-certificate-darkBlue">
              {formatDate(partner.joinDate || partner.join_date || new Date().toISOString())}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Номер сертификата:</p>
            <p className="font-semibold text-certificate-darkBlue">
              {partner.certificateId || partner.certificate_id}
            </p>
          </div>
        </div>
        
        {/* Подпись */}
        <div className="flex justify-between items-end">
          <div className="text-left">
            <div className="w-40 h-px bg-gray-400 mb-2"></div>
            <p className="text-sm text-gray-600">Директор S3</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 bg-certificate-blue/10 rounded-full flex items-center justify-center mb-4">
              <div className="w-20 h-20 bg-certificate-blue rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">S3</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">Печать компании</p>
          </div>
        </div>
        
        {/* Декоративная рамка */}
        <div className="absolute inset-4 border-2 border-certificate-gold/30 rounded-xl pointer-events-none"></div>
        <div className="absolute inset-6 border border-certificate-blue/20 rounded-lg pointer-events-none"></div>
      </div>
    </div>
  );
};

export default CertificateTemplate;
