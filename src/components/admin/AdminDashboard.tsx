
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Partner, Client, Payment, TestQuestion } from '@/types';
import { PartnersList } from "@/components/admin/PartnersList";
import { ClientsList } from "@/components/admin/ClientsList";
import { NotificationForm } from "@/components/admin/NotificationForm";
import { NotificationsList } from "@/components/admin/NotificationsList";
import { TestQuestionsManager } from "@/components/admin/TestQuestionsManager";
import { usePartnerActions } from "@/hooks/usePartnerActions";

interface AdminDashboardProps {
  partners: Partner[];
  setPartners: (partners: Partner[]) => void;
  clients: Client[];
  payments: Payment[];
  testQuestions: TestQuestion[];
  setTestQuestions: (questions: TestQuestion[]) => void;
  notifications: any[];
  setNotifications: (notifications: any[]) => void;
  loading: boolean;
  onRefresh: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  partners,
  setPartners,
  clients,
  payments,
  testQuestions,
  setTestQuestions,
  notifications,
  setNotifications,
  loading,
  onRefresh
}) => {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const { updatePartnerRole, getPartnerClients, getTotalEarnings } = usePartnerActions(partners, setPartners);

  return (
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
            
            {/* Partners Tab Content */}
            <TabsContent value="partners">
              <PartnersList
                partners={partners}
                onUpdateRole={updatePartnerRole}
                onSelectPartner={setSelectedPartnerId}
                selectedPartnerId={selectedPartnerId}
                getPartnerClients={(partnerId) => getPartnerClients(partnerId, clients)}
                getTotalEarnings={(partnerId) => getTotalEarnings(partnerId, clients, payments)}
              />
              
              {selectedPartnerId && (
                <div className="mt-6">
                  <ClientsList
                    clients={clients.filter(client => client.partner_id === selectedPartnerId)}
                    getClientPayments={(clientId) => 
                      payments.filter(payment => payment.client_id === clientId)
                    }
                  />
                </div>
              )}
            </TabsContent>
            
            {/* Notifications Tab Content */}
            <TabsContent value="notifications">
              <div className="mb-6 space-y-4">
                <NotificationForm onCreateNotification={(title, content) => {
                  setNotifications([{ title, content, created_at: new Date().toISOString() }, ...notifications])
                }} />
                <NotificationsList notifications={notifications} />
              </div>
            </TabsContent>

            {/* Test Questions Tab Content */}
            <TabsContent value="test">
              <TestQuestionsManager 
                questions={testQuestions}
                onUpdateQuestion={(question) => {
                  setTestQuestions(testQuestions.map(q => 
                    q.id === question.id ? question : q
                  ))
                }}
                onCreateQuestion={(newQuestionData) => {
                  // Generate a temporary ID for the new question
                  const newQuestion: TestQuestion = {
                    ...newQuestionData,
                    id: crypto.randomUUID()
                  };
                  setTestQuestions([...testQuestions, newQuestion]);
                }}
                onDeleteQuestion={(id) => {
                  setTestQuestions(testQuestions.filter(q => q.id !== id))
                }}
              />
            </TabsContent>
          </Tabs>
        )}
        <div className="mt-4">
          <Button 
            onClick={onRefresh} 
            className="bg-brand text-white"
          >
            Обновить данные
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
