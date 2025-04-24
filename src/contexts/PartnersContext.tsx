
import React, { createContext, useContext, useEffect } from 'react';
import { PartnersContextType } from './types/PartnersContextTypes';
import { testQuestions } from '@/data/testQuestions';
import { usePartnersData } from '@/hooks/usePartnersData';
import { usePartnerLevel } from '@/hooks/usePartnerLevel';
import { usePartnerAuth } from '@/hooks/usePartnerAuth';
import { useClientManagement } from '@/hooks/useClientManagement';
import * as api from '@/api/partnersApi';

const PartnersContext = createContext<PartnersContextType | undefined>(undefined);

export const usePartners = () => {
  const context = useContext(PartnersContext);
  if (!context) {
    throw new Error('usePartners must be used within a PartnersProvider');
  }
  return context;
};

export const PartnersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    partners,
    loading,
    error,
    fetchData,
    addPartner,
    updatePartner,
    getPartnerById
  } = usePartnersData();
  
  const { partnerLevel, setPartnerLevel, calculateLevel } = usePartnerLevel();
  const { currentPartner, setCurrentPartner, loginPartner, logoutPartner } = usePartnerAuth();
  const { addClient, removeClient, updateClient, addPayment } = useClientManagement();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const completeTest = async (partnerId: string) => {
    try {
      const updated = await api.completeTest(partnerId);
      if (currentPartner && currentPartner.id === partnerId) {
        setCurrentPartner({ ...currentPartner, testPassed: true });
      }
      return updated;
    } catch (error) {
      console.error('Error completing test:', error);
      throw error;
    }
  };

  const refreshPartnerLevel = async (partnerId: string) => {
    try {
      const clients = await api.fetchPartnerClients(partnerId);
      const clientsWithPayments = clients.filter(client => 
        client.payments && client.payments.some(payment => payment.status === "оплачено")
      ).length;
      
      const levelInfo = calculateLevel(clientsWithPayments);
      
      await api.updatePartner(partnerId, {
        partner_level: levelInfo.level,
        commission: levelInfo.commission
      });
      
      if (currentPartner && currentPartner.id === partnerId) {
        setCurrentPartner({
          ...currentPartner,
          partnerLevel: levelInfo.level,
          commission: levelInfo.commission
        });
      }
    } catch (error) {
      console.error('Error refreshing partner level:', error);
      throw error;
    }
  };

  const value = {
    partners,
    currentPartner,
    testQuestions,
    partnerLevel,
    addPartner,
    updatePartner,
    getPartnerById,
    loginPartner,
    logoutPartner,
    addClient,
    removeClient,
    updateClient,
    completeTest,
    addPayment,
    refreshPartnerLevel,
    loading,
    error
  };

  return <PartnersContext.Provider value={value}>{children}</PartnersContext.Provider>;
};
