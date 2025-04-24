import React, { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { usePartners } from "@/contexts/PartnersContext";
import { Partner, Client, Payment, TestQuestion } from '@/types';
import { PartnersList } from "@/components/admin/PartnersList";
import { ClientsList } from "@/components/admin/ClientsList";
import { NotificationForm } from "@/components/admin/NotificationForm";
import { NotificationsList } from "@/components/admin/NotificationsList";
import { TestQuestionsManager } from "@/components/admin/TestQuestionsManager";
import { fetchPartners } from "@/api/partnersApi";

const AdminPage = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
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
      
      const partnerData = await fetchPartners();
      if (partnerData) {
        const formattedPartners = partnerData.map(p => ({
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
          phone: p.phone || ''
        }));
        setPartners(formattedPartners);
      }
      
      const { data: clientData, error: clientError } = await supabase.rpc("get_all_clients");
      
      if (clientError) {
        console.error("Error fetching clients:", clientError);
        toast({
          title: "Ошибка загрузки",
          description: "Не удалось загрузить список клиентов",
          variant: "destructive",
        });
      } else {
        setClients(clientData || []);
      }
      
      const { data: paymentData, error: paymentError } = await supabase.rpc("get_all_payments");
        
      if (paymentError) {
        console.error("Error fetching payments:", paymentError);
      } else {
        setPayments(paymentData || []);
      }
      
      const { data: questionsData, error: questionsError } = await supabase.from("test_questions").select("*");
        
      if (questionsError) {
        console.error("Error fetching test questions:", questionsError);
      } else {
        const formattedQuestions = questionsData.map(q => ({
          id: q.id,
          question: q.question,
          options: q.options,
          correctAnswer: q.correct_answer
        }));
        setTestQuestions(formattedQuestions);
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

  const updateTestQuestion = async (question: TestQuestion) => {
    try {
      const { error } = await supabase
        .from('test_questions')
        .update({
          question: question.question,
          options: question.options,
          correct_answer: question.correctAnswer
        })
        .eq('id', question.id);
        
      if (error) throw error;
      
      setTestQuestions(testQuestions.map(q => 
        q.id === question.id ? question : q
      ));
      
      toast({
        title: "Вопрос обновлен",
        description: "Вопрос теста успешно обновлен",
      });
    } catch (error) {
      console.error("Error updating test question:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить вопрос теста",
        variant: "destructive",
      });
    }
  };

  const createTestQuestion = async (question: Omit<TestQuestion, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('test_questions')
        .insert([{
          question: question.question,
          options: question.options,
          correct_answer: question.correctAnswer
        }])
        .select();
        
      if (error) throw error;
      
      if (data) {
        const newQuestion: TestQuestion = {
          id: data[0].id,
          question: data[0].question,
          options: data[0].options,
          correctAnswer: data[0].correct_answer
        };
        setTestQuestions([...testQuestions, newQuestion]);
        
        toast({
          title: "Вопрос создан",
          description: "Новый вопрос теста успешно добавлен",
        });
      }
    } catch (error) {
      console.error("Error creating test question:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать вопрос теста",
        variant: "destructive",
      });
    }
  };

  const deleteTestQuestion = async (id: string) => {
    try {
      const { error } = await supabase
        .from('test_questions')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setTestQuestions(testQuestions.filter(q => q.id !== id));
      
      toast({
        title: "Вопрос удален",
        description: "Вопрос теста успешно удален",
      });
    } catch (error) {
      console.error("Error deleting test question:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить вопрос теста",
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
                  <TabsTrigger value="test">Вопросы теста</TabsTrigger>
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

                <TabsContent value="test">
                  <TestQuestionsManager 
                    questions={testQuestions}
                    onUpdateQuestion={updateTestQuestion}
                    onCreateQuestion={createTestQuestion}
                    onDeleteQuestion={deleteTestQuestion}
                  />
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
