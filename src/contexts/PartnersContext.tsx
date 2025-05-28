
import React, { createContext, useContext, useEffect, useState } from 'react';
import { PartnersContextType } from './types/PartnersContextTypes';
import { testQuestions } from '@/data/testQuestions';
import { usePartnersData } from '@/hooks/usePartnersData';
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
  const [initialized, setInitialized] = useState(false);
  
  const { 
    partners,
    loading,
    error,
    fetchData,
    addPartner,
    updatePartner,
    getPartnerById
  } = usePartnersData();
  
  const { currentPartner, setCurrentPartner, loginPartner, logoutPartner } = usePartnerAuth();
  
  // Pass currentPartner directly to useClientManagement
  const { addClient, removeClient, updateClient, addPayment } = useClientManagement(currentPartner);

  useEffect(() => {
    const initializeData = async () => {
      try {
        await fetchData();
        setInitialized(true);
      } catch (err) {
        console.error("Error initializing partners data:", err);
        setInitialized(true); // Still mark as initialized to prevent infinite loading
      }
    };
    
    if (!initialized) {
      initializeData();
    }
  }, [fetchData, initialized]);

  const completeTest = async (partnerId: string) => {
    try {
      console.log("Completing test for partner:", partnerId);
      const updated = await api.completeTest(partnerId);
      
      // Update current partner if it matches the one being modified
      if (currentPartner && currentPartner.id === partnerId) {
        console.log("Updating currentPartner with new test status:", updated);
        setCurrentPartner({ 
          ...currentPartner, 
          testPassed: true,
          role: updated.role,
          phone: updated.phone || currentPartner.phone || ''
        });
      }
      
      console.log("Test completed successfully for partner:", partnerId);
      return updated;
    } catch (error) {
      console.error('Error completing test:', error);
      throw error;
    }
  };

  const value = {
    partners,
    currentPartner,
    setCurrentPartner,
    testQuestions,
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
    loading,
    error
  };

  return <PartnersContext.Provider value={value}>{children}</PartnersContext.Provider>;
};
