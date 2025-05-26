
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Partner } from '@/types';
import CertificateTemplate from './CertificateTemplate';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface CertificateGeneratorProps {
  partner: Partner;
}

const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({ partner }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const hiddenCertificateRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const downloadCertificate = async () => {
    if (!hiddenCertificateRef.current) return;

    try {
      toast({
        title: "Создание PDF...",
        description: "Пожалуйста, подождите, пока мы генерируем ваш сертификат.",
      });

      const canvas = await html2canvas(hiddenCertificateRef.current, {
        scale: 4,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      // A4 dimensions in mm (landscape)
      const imgWidth = 297;
      const imgHeight = 210;
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      // Calculate scaling to fit A4 while preserving aspect ratio
      const canvasRatio = canvas.width / canvas.height;
      const a4Ratio = imgWidth / imgHeight;
      
      let finalWidth = imgWidth;
      let finalHeight = imgHeight;
      
      if (canvasRatio > a4Ratio) {
        finalHeight = imgWidth / canvasRatio;
      } else {
        finalWidth = imgHeight * canvasRatio;
      }
      
      // Center the image on the page
      const xOffset = (imgWidth - finalWidth) / 2;
      const yOffset = (imgHeight - finalHeight) / 2;
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      pdf.addImage(imgData, 'JPEG', xOffset, yOffset, finalWidth, finalHeight);
      pdf.save(`S3-${partner.companyName || partner.company_name}-Сертификат.pdf`);

      toast({
        title: "Сертификат скачан",
        description: "Ваш сертификат успешно создан и скачан.",
      });
    } catch (error) {
      console.error("Ошибка создания PDF", error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать сертификат. Пожалуйста, попробуйте снова.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Адаптивное превью сертификата */}
      <div className="w-full max-w-none overflow-hidden border border-gray-200 shadow-lg rounded-lg bg-white">
        <div className="w-full aspect-[297/210] relative">
          <div 
            ref={certificateRef}
            className="absolute inset-0 w-full h-full scale-[0.3] sm:scale-[0.4] md:scale-[0.5] lg:scale-[0.6] xl:scale-[0.7] origin-top-left"
            style={{
              transformOrigin: 'top left',
            }}
          >
            <div className="w-[297mm] h-[210mm]">
              <CertificateTemplate partner={partner} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Скрытая версия для генерации PDF в полном размере */}
      <div className="fixed -top-[9999px] -left-[9999px] opacity-0 pointer-events-none">
        <div ref={hiddenCertificateRef} className="w-[297mm] h-[210mm]">
          <CertificateTemplate partner={partner} />
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button
          onClick={downloadCertificate}
          className="px-6 py-3 bg-gradient-to-r from-certificate-blue to-certificate-darkBlue hover:from-certificate-darkBlue hover:to-certificate-blue transition-all duration-300"
        >
          <Download className="h-4 w-4 mr-2" />
          Скачать сертификат
        </Button>
      </div>
    </div>
  );
};

export default CertificateGenerator;
