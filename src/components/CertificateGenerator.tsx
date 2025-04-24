
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
  const { toast } = useToast();

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      toast({
        title: "Создание PDF...",
        description: "Пожалуйста, подождите, пока мы генерируем ваш сертификат.",
      });

      const canvas = await html2canvas(certificateRef.current, {
        scale: 4, // Higher scale for better quality
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
      pdf.save(`S3-${partner.companyName}-Сертификат.pdf`);

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
      <div className="overflow-hidden border border-gray-200 shadow-lg rounded-lg">
        <div className="bg-white p-4">
          {/* Wrap certificate in a container with scaling */}
          <div style={{ transform: 'scale(0.5)', transformOrigin: 'top center' }} className="flex justify-center">
            <CertificateTemplate ref={certificateRef} partner={partner} />
          </div>
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
