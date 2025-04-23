
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Partner } from '@/types/partner';

interface PartnersContextType {
  partners: Partner[];
  addPartner: (partner: Partner) => void;
  updatePartner: (id: string, updatedPartner: Partner) => void;
  getPartnerById: (id: string) => Partner | undefined;
  loading: boolean;
}

const PartnersContext = createContext<PartnersContextType | undefined>(undefined);

export const usePartners = (): PartnersContextType => {
  const context = useContext(PartnersContext);
  if (!context) {
    throw new Error('usePartners must be used within a PartnersProvider');
  }
  return context;
};

export const PartnersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  // Load partners from localStorage on initial render
  useEffect(() => {
    const storedPartners = localStorage.getItem('partners');
    if (storedPartners) {
      try {
        setPartners(JSON.parse(storedPartners));
      } catch (error) {
        console.error('Error parsing stored partners', error);
        setPartners([]);
      }
    } else {
      // Add sample data for demonstration
      const samplePartners = [
        {
          id: '1',
          companyName: 'Tech Solutions Inc',
          contactPerson: 'Alex Johnson',
          email: 'alex@techsolutions.com',
          partnerLevel: 'Gold',
          joinDate: '2023-01-15',
          certificateId: 'CERT-123456',
        },
        {
          id: '2',
          companyName: 'Global Systems Ltd',
          contactPerson: 'Maria Garcia',
          email: 'maria@globalsys.com',
          partnerLevel: 'Silver',
          joinDate: '2023-03-22',
          certificateId: 'CERT-789012',
        },
        {
          id: '3',
          companyName: 'DataFlow Analytics',
          contactPerson: 'Wei Zhang',
          email: 'wei@dataflow.io',
          partnerLevel: 'Platinum',
          joinDate: '2022-11-05',
          certificateId: 'CERT-345678',
        },
      ];
      setPartners(samplePartners);
      localStorage.setItem('partners', JSON.stringify(samplePartners));
    }
    setLoading(false);
  }, []);

  // Save partners to localStorage whenever they change
  useEffect(() => {
    if (partners.length > 0) {
      localStorage.setItem('partners', JSON.stringify(partners));
    }
  }, [partners]);

  const addPartner = (partner: Partner) => {
    const newPartner = {
      ...partner,
      id: `${Date.now()}`, // Simple ID generation
    };
    setPartners((prevPartners) => [...prevPartners, newPartner]);
  };

  const updatePartner = (id: string, updatedPartner: Partner) => {
    setPartners((prevPartners) =>
      prevPartners.map((partner) =>
        partner.id === id ? { ...updatedPartner, id } : partner
      )
    );
  };

  const getPartnerById = (id: string) => {
    return partners.find((partner) => partner.id === id);
  };

  const value = {
    partners,
    addPartner,
    updatePartner,
    getPartnerById,
    loading,
  };

  return <PartnersContext.Provider value={value}>{children}</PartnersContext.Provider>;
};
