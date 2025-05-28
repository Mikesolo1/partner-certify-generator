
import { useState } from 'react';
import { Partner } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { safeRPC } from '@/api/utils/queryHelpers';

export const usePartnerRefresh = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const refreshPartnerData = async (partnerId: string): Promise<Partner | null> => {
    setRefreshing(true);
    try {
      const { data, error } = await safeRPC(
        'get_partner_by_id',
        { p_id: partnerId },
        { retries: 2, delay: 1000 }
      );

      if (error || !data || data.length === 0) {
        throw new Error('Не удалось получить обновленные данные партнера');
      }

      const partnerData = data[0];
      
      return {
        id: partnerData.id,
        companyName: partnerData.company_name,
        contactPerson: partnerData.contact_person,
        email: partnerData.email,
        joinDate: partnerData.join_date,
        certificateId: partnerData.certificate_id,
        testPassed: partnerData.test_passed,
        role: partnerData.role,
        phone: partnerData.phone || '',
        referrerId: partnerData.referrer_id,
        referralCode: partnerData.referral_code,
        referralAccessEnabled: partnerData.referral_access_enabled
      };
    } catch (error) {
      console.error('Error refreshing partner data:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить данные партнера",
        variant: "destructive",
      });
      return null;
    } finally {
      setRefreshing(false);
    }
  };

  return {
    refreshPartnerData,
    refreshing
  };
};
