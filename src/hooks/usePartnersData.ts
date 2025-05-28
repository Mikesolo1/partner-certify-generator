
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
        phone: p.phone || '', // Include phone with fallback
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
      // Ensure newPartner has all required fields including phone
      const completePartner: Partner = {
        ...newPartner,
        phone: newPartner.phone || '',
        referralAccessEnabled: newPartner.referral_access_enabled || false,
        referrerId: newPartner.referrer_id,
        referralCode: newPartner.referral_code
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
      // Ensure updated partner has all required fields including phone
      const completePartner: Partner = {
        ...updated,
        phone: updated.phone || '',
        referralAccessEnabled: updated.referral_access_enabled || false,
        referrerId: updated.referrer_id,
        referralCode: updated.referral_code
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
