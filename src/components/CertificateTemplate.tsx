
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
            width: 120,
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
    <div className="w-full h-full bg-white relative overflow-hidden" style={{ aspectRatio: '297/210' }}>
      {/* Основная рамка */}
      <div className="absolute inset-6 border-2 border-gray-300 rounded-lg"></div>
      
      {/* Декоративные элементы внутри рамки */}
      <div className="absolute top-12 right-12 w-32 h-32 bg-gradient-to-br from-brand/10 to-cyan-400/10 rounded-full"></div>
      <div className="absolute bottom-12 left-12 w-24 h-24 bg-gradient-to-br from-cyan-400/10 to-brand/10 rounded-full"></div>
      
      {/* Верхний градиентный блок */}
      <div className="absolute top-6 left-6 right-6 h-20 bg-gradient-to-r from-brand via-cyan-400 to-brand rounded-t-lg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10 rounded-t-lg"></div>
        
        {/* Логотип и заголовок */}
        <div className="flex items-center justify-between h-full px-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl font-black text-gray-900">S3</span>
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">S3 Partners</h1>
              <p className="text-sm text-cyan-100">Официальный партнерский сертификат</p>
            </div>
          </div>
          
          <div className="text-right text-white">
            <p className="text-sm opacity-90">Дата выдачи</p>
            <p className="text-lg font-semibold">
              {formatDate(partner.joinDate || partner.join_date || new Date().toISOString())}
            </p>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="absolute top-32 left-6 right-6 bottom-6 flex flex-col justify-between px-8 py-6">
        {/* Центральная секция */}
        <div className="text-center flex-1 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-wide">
              СЕРТИФИКАТ
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-brand to-cyan-400 mx-auto rounded-full"></div>
          </div>
          
          <p className="text-xl text-gray-600 mb-6 font-light">
            Настоящий документ подтверждает, что
          </p>
          
          <div className="bg-gradient-to-r from-gray-50 to-cyan-50 border-l-4 border-brand rounded-lg p-6 mb-6 shadow-sm max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {partner.companyName || partner.company_name}
            </h3>
            <p className="text-lg text-gray-600">
              является официальным партнером программы S3 Partners
            </p>
          </div>
          
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Компания имеет право на представление наших услуг и решений в области 
            автоматизации бизнес-процессов и цифровой трансформации
          </p>
        </div>

        {/* Нижняя секция с информацией */}
        <div className="grid grid-cols-3 gap-8 items-end mt-8">
          {/* Левая колонка - информация о партнере */}
          <div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">ID партнера</p>
              <p className="font-semibold text-gray-900 text-base">
                {partner.certificateId || partner.certificate_id}
              </p>
            </div>
          </div>

          {/* Центральная колонка - QR код */}
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <canvas 
                ref={qrCodeRef}
                className="border-2 border-gray-300 rounded-lg shadow-sm w-28 h-28"
              />
            </div>
            <p className="text-xs text-gray-500">Код верификации</p>
          </div>

          {/* Правая колонка - подпись CEO */}
          <div className="text-right">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="mb-4">
                <img 
                  src={signatureBase64}
                  alt="Подпись Андрея Недорезова" 
                  className="h-16 ml-auto object-contain"
                />
              </div>
              <div className="border-t border-gray-300 pt-3">
                <p className="font-semibold text-gray-900 text-base">Андрей Недорезов</p>
                <p className="text-sm text-gray-600">CEO S3 Partners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate;
