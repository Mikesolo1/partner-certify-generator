
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
    <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-8 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-24 translate-y-24"></div>
      <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-yellow-400/10 rounded-full"></div>
      <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-white/5 rounded-full"></div>
      
      {/* Основной контент сертификата */}
      <div className="w-full max-w-4xl text-center relative z-10 text-white">
        {/* Логотип S3 */}
        <div className="mb-8">
          <div className="inline-block bg-white/10 rounded-full px-8 py-4 mb-6">
            <span className="text-4xl font-bold text-white">S3</span>
          </div>
        </div>
        
        {/* Заголовок */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-wider">
            СЕРТИФИКАТ
          </h1>
          <p className="text-xl text-white/90 font-light">
            официального партнера программы
          </p>
        </div>
        
        {/* Основной текст */}
        <div className="mb-16">
          <p className="text-lg text-white/80 mb-8 font-light">
            Настоящий сертификат подтверждает, что
          </p>
          <h2 className="text-4xl font-bold text-white mb-8 bg-white/10 py-4 px-8 rounded-lg inline-block">
            {partner.companyName || partner.company_name}
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            является официальным партнером программы <strong>S3 Business Solutions</strong> и имеет право на представление наших услуг и решений
          </p>
        </div>
        
        {/* Нижняя секция с информацией */}
        <div className="flex justify-between items-end">
          {/* Левая сторона - QR код и информация */}
          <div className="text-left">
            {/* QR код плейсхолдер */}
            <div className="w-24 h-24 bg-white/20 border-2 border-white/40 mb-4 flex items-center justify-center">
              <span className="text-xs text-white/70">QR</span>
            </div>
            <div className="text-sm text-white/70">
              <p className="mb-1">Дата выдачи:</p>
              <p className="text-white font-semibold mb-3">
                {formatDate(partner.joinDate || partner.join_date || new Date().toISOString())}
              </p>
              <p className="mb-1">ID партнера:</p>
              <p className="text-white font-semibold">
                {partner.certificateId || partner.certificate_id}
              </p>
            </div>
          </div>
          
          {/* Правая сторона - подпись и печать */}
          <div className="text-right flex flex-col items-end">
            {/* Подпись CEO */}
            <div className="mb-4">
              <div className="w-48 h-16 bg-white/10 rounded border-2 border-dashed border-white/30 flex items-center justify-center mb-2">
                <img 
                  src="/placeholder.svg" 
                  alt="Подпись Андрея Недорезова" 
                  className="max-w-full max-h-full object-contain filter invert"
                />
              </div>
              <div className="text-sm">
                <p className="text-white font-semibold">Андрей Недорезов</p>
                <p className="text-white/70">CEO S3</p>
              </div>
            </div>
            
            {/* Печать компании */}
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full border-2 border-white/30 flex items-center justify-center mb-2">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S3</span>
                </div>
              </div>
              <p className="text-xs text-white/60">Печать компании</p>
            </div>
          </div>
        </div>
        
        {/* Декоративная рамка */}
        <div className="absolute inset-8 border border-white/20 rounded-lg pointer-events-none"></div>
        <div className="absolute inset-12 border border-white/10 rounded pointer-events-none"></div>
      </div>
    </div>
  );
};

export default CertificateTemplate;
