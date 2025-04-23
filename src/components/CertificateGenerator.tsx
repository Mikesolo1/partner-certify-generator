
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Partner } from '@/types/partner';
import CertificateTemplate from './CertificateTemplate';
import { Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
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
        title: "Generating PDF...",
        description: "Please wait while we generate your certificate.",
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
      pdf.save(`${partner.companyName}-${partner.partnerLevel}-Certificate.pdf`);

      toast({
        title: "Certificate Downloaded",
        description: "Your certificate has been generated and downloaded successfully.",
      });
    } catch (error) {
      console.error("Error generating PDF", error);
      toast({
        title: "Error",
        description: "Failed to generate certificate. Please try again.",
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
          Download Certificate
        </Button>
      </div>
    </div>
  );
};

export default CertificateGenerator;
