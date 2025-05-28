
import { useState, useCallback } from 'react';
import { Partner } from '@/types';
import * as api from '@/api/partnersApi';
import { useToast } from '@/hooks/use-toast';

export const usePartnersData = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataInitialized, setDataInitialized] = useState(false);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    if (dataInitialized) return;
    
    setLoading(true);
    try {
      const partnersData = await api.fetchPartners();
      // Convert from snake_case to camelCase for our application
      const formattedPartners: Partner[] = partnersData.map(p => ({
        id: p.id,
        companyName: p.company_name,
        contactPerson: p.contact_person,
        email: p.email,
        partnerLevel: p.partner_level,
        joinDate: p.join_date,
        certificateId: p.certificate_id,
        testPassed: p.test_passed,
        commission: p.commission,
        role: p.role,
        phone: p.phone || '',
        referralAccessEnabled: p.referral_access_enabled || false,
        referrerId: p.referrer_id,
        referralCode: p.referral_code
      }));
      
      setPartners(formattedPartners);
      setDataInitialized(true);
      setError(null);
    } catch (error) {
      console.error('Error fetching initial data', error);
      setError("Ошибка загрузки данных. Пожалуйста, проверьте подключение и перезагрузите страницу.");
      
      toast({
        title: "Ошибка загрузки данных",
        description: "Не удалось загрузить данные с сервера. Проверьте подключение.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast, dataInitialized]);

  const addPartner = async (partner: Partner) => {
    try {
      const newPartner = await api.createPartner(partner);
      // The API response may not include referralAccessEnabled, so we provide a fallback
      const completePartner: Partner = {
        id: newPartner.id,
        companyName: newPartner.companyName,
        contactPerson: newPartner.contactPerson,
        email: newPartner.email,
        partnerLevel: newPartner.partnerLevel,
        joinDate: newPartner.joinDate,
        certificateId: newPartner.certificateId,
        testPassed: newPartner.testPassed,
        commission: newPartner.commission,
        role: newPartner.role,
        phone: newPartner.phone || '',
        referralAccessEnabled: (newPartner as any).referralAccessEnabled || false,
        referrerId: newPartner.referrerId,
        referralCode: newPartner.referralCode
      };
      setPartners((prev) => [...prev, completePartner]);
      return completePartner;
    } catch (error) {
      console.error('Error adding partner:', error);
      throw error;
    }
  };

  const updatePartner = async (id: string, updatedPartner: Partner) => {
    try {
      const updated = await api.updatePartner(id, updatedPartner);
      // The API response may not include referralAccessEnabled, so we provide a fallback
      const completePartner: Partner = {
        id: updated.id,
        companyName: updated.companyName,
        contactPerson: updated.contactPerson,
        email: updated.email,
        partnerLevel: updated.partnerLevel,
        joinDate: updated.joinDate,
        certificateId: updated.certificateId,
        testPassed: updated.testPassed,
        commission: updated.commission,
        role: updated.role,
        phone: updated.phone || '',
        referralAccessEnabled: (updated as any).referralAccessEnabled || false,
        referrerId: updated.referrerId,
        referralCode: updated.referralCode
      };
      setPartners(prev => prev.map(partner => partner.id === id ? completePartner : partner));
      return completePartner;
    } catch (error) {
      console.error('Error updating partner:', error);
      throw error;
    }
  };

  const getPartnerById = async (id: string) => {
    try {
      return await api.fetchPartnerById(id);
    } catch (error) {
      console.error('Error getting partner by ID:', error);
      throw error;
    }
  };

  return {
    partners,
    loading,
    error,
    fetchData,
    addPartner,
    updatePartner,
    getPartnerById,
    dataInitialized
  };
};
