
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Partner } from '@/types/partner';
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
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 297; // A4 landscape width in mm
      const imgHeight = 210; // A4 landscape height in mm
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
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
      <div className="overflow-hidden shadow-lg rounded-lg border border-gray-200">
        <CertificateTemplate ref={certificateRef} partner={partner} />
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
