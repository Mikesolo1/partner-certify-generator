
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
      // Convert the API response from snake_case to camelCase
      const completePartner: Partner = {
        id: newPartner.id,
        companyName: newPartner.company_name || newPartner.companyName,
        contactPerson: newPartner.contact_person || newPartner.contactPerson,
        email: newPartner.email,
        partnerLevel: newPartner.partner_level || newPartner.partnerLevel,
        joinDate: newPartner.join_date || newPartner.joinDate,
        certificateId: newPartner.certificate_id || newPartner.certificateId,
        testPassed: newPartner.test_passed || newPartner.testPassed,
        commission: newPartner.commission,
        role: newPartner.role,
        phone: newPartner.phone || '',
        referralAccessEnabled: newPartner.referral_access_enabled || newPartner.referralAccessEnabled || false,
        referrerId: newPartner.referrer_id || newPartner.referrerId,
        referralCode: newPartner.referral_code || newPartner.referralCode
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
      // Convert the API response from snake_case to camelCase
      const completePartner: Partner = {
        id: updated.id,
        companyName: updated.company_name || updated.companyName,
        contactPerson: updated.contact_person || updated.contactPerson,
        email: updated.email,
        partnerLevel: updated.partner_level || updated.partnerLevel,
        joinDate: updated.join_date || updated.joinDate,
        certificateId: updated.certificate_id || updated.certificateId,
        testPassed: updated.test_passed || updated.testPassed,
        commission: updated.commission,
        role: updated.role,
        phone: updated.phone || '',
        referralAccessEnabled: updated.referral_access_enabled || updated.referralAccessEnabled || false,
        referrerId: updated.referrer_id || updated.referrerId,
        referralCode: updated.referral_code || updated.referralCode
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
