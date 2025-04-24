import React, { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { usePartners } from "@/contexts/PartnersContext";
import { Partner, Client, Payment } from '@/types';
import { PartnersList } from "@/components/admin/PartnersList";
import { ClientsList } from "@/components/admin/ClientsList";
import { NotificationForm } from "@/components/admin/NotificationForm";
import { NotificationsList } from "@/components/admin/NotificationsList";

const AdminPage = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [testQuestions, setTestQuestions] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentPartner } = usePartners();

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!currentPartner || currentPartner.role !== 'admin') {
        toast({
          title: "Доступ запрещен",
          description: "У вас нет доступа к этой странице",
          variant: "destructive",
        });
        navigate('/dashboard');
      } else {
        fetchData();
      }
    };
    
    checkAdminAccess();
  }, [currentPartner, navigate, toast]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: partnerData, error: partnerError } = await supabase
        .from("partners")
        .select("*");
      
      if (partnerError) {
        console.error("Error fetching partners:", partnerError);
        toast({
          title: "Ошибка загрузки",
          description: "Не удалось загрузить список партнеров",
          variant: "destructive",
        });
      } else {
        setPartners(partnerData || []);
      }
      
      const { data: clientData, error: clientError } = await supabase
        .from("clients")
        .select("*");
      
      if (clientError) {
        console.error("Error fetching clients:", clientError);
      } else {
        setClients(clientData || []);
      }
      
      const { data: paymentData, error: paymentError } = await supabase
        .from("payments")
        .select("*");
        
      if (paymentError) {
        console.error("Error fetching payments:", paymentError);
      } else {
        setPayments(paymentData || []);
      }
      
      const { data: questionsData, error: questionsError } = await supabase
        .from("test_questions")
        .select("*");
        
      if (questionsError) {
        console.error("Error fetching test questions:", questionsError);
      } else {
        setTestQuestions(questionsData || []);
      }
      
      const { data: notificationsData, error: notificationsError } = await supabase
        .from("notifications")
        .select("*")
        .order('created_at', { ascending: false });
        
      if (notificationsError) {
        console.error("Error fetching notifications:", notificationsError);
      } else {
        setNotifications(notificationsData || []);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Ошибка",
        description: "Произошла непредвиденная ошибка при загрузке данных",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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

  const createNewNotification = async (title: string, content: string) => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert([{ title, content }])
        .select();
        
      if (error) {
        throw error;
      }
      
      if (data) {
        setNotifications([...data, ...notifications]);
        toast({
          title: "Уведомление создано",
          description: "Новое уведомление успешно добавлено",
        });
      }
    } catch (error) {
      console.error("Error creating notification:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать уведомление",
        variant: "destructive",
      });
    }
  };

  const getPartnerClients = (partnerId: string) => {
    return clients.filter(client => client.partner_id === partnerId);
  };

  const getClientPayments = (clientId: string) => {
    return payments.filter(payment => payment.client_id === clientId);
  };

  const getTotalEarnings = (partnerId: string) => {
    const partnerClients = getPartnerClients(partnerId);
    let total = 0;
    
    partnerClients.forEach(client => {
      const clientPayments = getClientPayments(client.id);
      clientPayments.forEach(payment => {
        if (payment.status === 'оплачено') {
          total += payment.commission_amount || 0;
        }
      });
    });
    
    return total;
  };

  return (
    <div className="min-h-screen bg-brand-light">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-brand">Админка: управление пользователями и данными</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <p className="text-brand">Загрузка данных...</p>
              </div>
            ) : (
              <Tabs defaultValue="partners">
                <TabsList className="mb-6">
                  <TabsTrigger value="partners">Партнёры</TabsTrigger>
                  <TabsTrigger value="notifications">Уведомления</TabsTrigger>
                </TabsList>
                
                <TabsContent value="partners">
                  <PartnersList
                    partners={partners}
                    onUpdateRole={updatePartnerRole}
                    onSelectPartner={setSelectedPartnerId}
                    selectedPartnerId={selectedPartnerId}
                    getPartnerClients={getPartnerClients}
                    getTotalEarnings={getTotalEarnings}
                  />
                  
                  {selectedPartnerId && (
                    <ClientsList
                      clients={getPartnerClients(selectedPartnerId)}
                      getClientPayments={getClientPayments}
                    />
                  )}
                </TabsContent>
                
                <TabsContent value="notifications">
                  <div className="mb-6 space-y-4">
                    <NotificationForm onCreateNotification={createNewNotification} />
                    <NotificationsList notifications={notifications} />
                  </div>
                </TabsContent>
              </Tabs>
            )}
            <div className="mt-4">
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-brand text-white"
              >
                Обновить данные
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
