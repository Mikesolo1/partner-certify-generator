
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
      setPartners(partnersData);
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
      setPartners((prev) => [...prev, newPartner]);
      return newPartner;
    } catch (error) {
      console.error('Error adding partner:', error);
      throw error;
    }
  };

  const updatePartner = async (id: string, updatedPartner: Partner) => {
    try {
      const updated = await api.updatePartner(id, updatedPartner);
      setPartners(prev => prev.map(partner => partner.id === id ? updated : partner));
      return updated;
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
