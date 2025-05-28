
import React, { useEffect, useRef } from 'react';
import { Partner } from '@/types';
import QRCode from 'qrcode';

interface CertificateTemplateProps {
  partner: Partner;
}

const CertificateTemplate: React.FC<CertificateTemplateProps> = ({ partner }) => {
  const qrCodeRef = useRef<HTMLCanvasElement>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Base64 подпись Андрея Недорезова
  const signatureBase64 = "/lovable-uploads/be5f6681-c65b-4407-91af-731c3ea9a090.png";

  // Генерация QR кода для верификации сертификата
  useEffect(() => {
    const generateQRCode = async () => {
      if (qrCodeRef.current) {
        try {
          const verificationUrl = `${window.location.origin}/certificate/${partner.id}`;
          await QRCode.toCanvas(qrCodeRef.current, verificationUrl, {
            width: 96,
            margin: 1,
            color: {
              dark: '#1f2937',
              light: '#ffffff'
            }
          });
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      }
    };

    generateQRCode();
  }, [partner.id]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white flex flex-col relative overflow-hidden border border-gray-200 rounded-lg">
      {/* Рамка */}
      <div className="absolute inset-4 border border-gray-200 rounded-lg pointer-events-none z-10"></div>
      
      {/* Декоративные элементы - внутри рамки */}
      <div className="absolute top-8 right-8 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-brand/5 to-cyan-400/5 rounded-full z-0"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-cyan-400/5 to-brand/5 rounded-full z-0"></div>
      
      {/* Верхний градиентный блок */}
      <div className="h-24 md:h-32 bg-gradient-to-r from-brand via-cyan-400 to-brand relative z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10"></div>
        
        {/* Логотип и заголовок */}
        <div className="flex items-center justify-between h-full px-6 md:px-16">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="w-10 h-10 md:w-16 md:h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-lg md:text-2xl font-black text-gray-900">S3</span>
            </div>
            <div className="text-white">
              <h1 className="text-lg md:text-2xl font-bold">S3 Partners</h1>
              <p className="text-xs md:text-sm text-cyan-100">Официальный партнерский сертификат</p>
            </div>
          </div>
          
          <div className="text-right text-white">
            <p className="text-xs md:text-sm opacity-90">Дата выдачи</p>
            <p className="text-sm md:text-lg font-semibold">
              {formatDate(partner.joinDate || partner.join_date || new Date().toISOString())}
            </p>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex-1 px-6 md:px-16 py-6 md:py-12 flex flex-col justify-between relative z-20">
        {/* Центральная секция */}
        <div className="text-center mb-8 md:mb-12">
          <div className="mb-6 md:mb-8">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-4 tracking-wide">
              СЕРТИФИКАТ
            </h2>
            <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-brand to-cyan-400 mx-auto rounded-full"></div>
          </div>
          
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 font-light">
            Настоящий документ подтверждает, что
          </p>
          
          <div className="bg-gradient-to-r from-gray-50 to-cyan-50 border-l-4 border-brand rounded-lg p-4 md:p-8 mb-6 md:mb-8 shadow-sm">
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
              {partner.companyName || partner.company_name}
            </h3>
            <p className="text-sm md:text-lg text-gray-600">
              является официальным партнером программы S3 Partners
            </p>
          </div>
          
          <p className="text-sm md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
            Компания имеет право на представление наших услуг и решений в области 
            автоматизации бизнес-процессов и цифровой трансформации
          </p>
        </div>

        {/* Нижняя секция с информацией */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-end">
          {/* Левая колонка - информация о партнере */}
          <div className="order-2 md:order-1">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">ID партнера</p>
              <p className="font-semibold text-gray-900 text-sm md:text-base">
                {partner.certificateId || partner.certificate_id}
              </p>
            </div>
          </div>

          {/* Центральная колонка - QR код */}
          <div className="text-center order-1 md:order-2">
            <div className="flex justify-center mb-3">
              <canvas 
                ref={qrCodeRef}
                className="border-2 border-gray-300 rounded-lg shadow-sm w-20 h-20 md:w-24 md:h-24"
              />
            </div>
            <p className="text-xs text-gray-500">Код верификации</p>
          </div>

          {/* Правая колонка - подпись CEO */}
          <div className="text-right order-3 md:order-3">
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200 shadow-sm">
              <div className="mb-4">
                <img 
                  src={signatureBase64}
                  alt="Подпись Андрея Недорезова" 
                  className="h-12 md:h-16 ml-auto object-contain"
                />
              </div>
              <div className="border-t border-gray-300 pt-3">
                <p className="font-semibold text-gray-900 text-sm md:text-base">Андрей Недорезов</p>
                <p className="text-xs md:text-sm text-gray-600">CEO S3 Partners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate;
