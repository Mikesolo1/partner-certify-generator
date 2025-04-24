
import { Partner, TestQuestion } from '@/types';
import { usePartnerLevel } from '@/hooks/usePartnerLevel';
import { useClientManagement } from '@/hooks/useClientManagement';

export interface PartnersContextType {
  partners: Partner[];
  currentPartner: Partner | null;
  testQuestions: TestQuestion[];
  partnerLevel: ReturnType<typeof usePartnerLevel>['partnerLevel'];
  addPartner: (partner: Partner) => Promise<Partner>;
  updatePartner: (id: string, updatedPartner: Partner) => Promise<Partner>;
  getPartnerById: (id: string) => Promise<Partner>;
  loginPartner: (email: string, password: string) => Promise<Partner | null>;
  logoutPartner: () => void;
  addClient: ReturnType<typeof useClientManagement>['addClient'];
  removeClient: ReturnType<typeof useClientManagement>['removeClient'];
  updateClient: ReturnType<typeof useClientManagement>['updateClient'];
  completeTest: (partnerId: string) => Promise<Partner>;
  addPayment: ReturnType<typeof useClientManagement>['addPayment'];
  refreshPartnerLevel: (partnerId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}
