
import { Partner, TestQuestion } from '@/types';
import { useClientManagement } from '@/hooks/useClientManagement';

export interface PartnersContextType {
  partners: Partner[];
  currentPartner: Partner | null;
  setCurrentPartner: (partner: Partner | null) => void;
  testQuestions: TestQuestion[];
  addPartner: (partner: Partner) => Promise<Partner>;
  updatePartner: (id: string, updatedPartner: Partial<Partner>) => Promise<Partner>;
  getPartnerById: (id: string) => Promise<Partner>;
  loginPartner: (email: string, password: string) => Promise<Partner | null>;
  logoutPartner: () => void;
  addClient: ReturnType<typeof useClientManagement>['addClient'];
  removeClient: ReturnType<typeof useClientManagement>['removeClient'];
  updateClient: ReturnType<typeof useClientManagement>['updateClient'];
  completeTest: (partnerId: string) => Promise<Partner>;
  addPayment: ReturnType<typeof useClientManagement>['addPayment'];
  loading: boolean;
  error: string | null;
}
