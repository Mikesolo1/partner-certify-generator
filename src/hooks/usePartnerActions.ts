
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Partner } from '@/types';

export const usePartnerActions = (partners: Partner[], setPartners: (partners: Partner[]) => void) => {
  const { toast } = useToast();

  const updatePartnerRole = async (partnerId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('partners')
        .update({ role: newRole })
        .eq('id', partnerId);
        
      if (error) {
        throw error;
      }
      
      setPartners(partners.map(partner => 
        partner.id === partnerId ? { ...partner, role: newRole } : partner
      ));
      
      toast({
        title: "Роль обновлена",
        description: "Роль партнера успешно изменена",
      });
    } catch (error) {
      console.error("Error updating partner role:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить роль партнера",
        variant: "destructive",
      });
    }
  };

  const getPartnerClients = (partnerId: string, clients: any[]) => {
    return clients.filter(client => client.partner_id === partnerId);
  };

  const getTotalEarnings = (partnerId: string, clients: any[], payments: any[]) => {
    const partnerClients = getPartnerClients(partnerId, clients);
    let total = 0;
    
    partnerClients.forEach(client => {
      const clientPayments = payments.filter(payment => payment.client_id === client.id);
      clientPayments.forEach(payment => {
        if (payment.status === 'оплачено') {
          total += payment.commission_amount || 0;
        }
      });
    });
    
    return total;
  };

  return {
    updatePartnerRole,
    getPartnerClients,
    getTotalEarnings,
  };
};
