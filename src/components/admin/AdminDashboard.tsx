
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
import { RefreshCw } from 'lucide-react';
import { AllClientsTab } from "./AllClientsTab";

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

  console.log("Selected partner ID:", selectedPartnerId);
  console.log("Total clients:", clients.length);
  
  const partnerClients = selectedPartnerId 
    ? clients.filter(client => client.partner_id === selectedPartnerId)
    : [];
    
  console.log("Filtered clients for partner:", partnerClients.length);

  const getClientPayments = (clientId: string) => {
    return payments.filter(payment => payment.client_id === clientId);
  };

  const handleNotificationUpdate = () => {
    onRefresh(); // This will reload all data including notifications
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-brand">Админка: управление пользователями и данными</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <RefreshCw className="h-10 w-10 animate-spin text-brand mb-2" />
            <p className="text-brand ml-2">Загрузка данных...</p>
          </div>
        ) : (
          <Tabs defaultValue="partners">
            <TabsList className="mb-6">
              <TabsTrigger value="partners">Партнёры</TabsTrigger>
              <TabsTrigger value="clients">Все клиенты</TabsTrigger>
              <TabsTrigger value="notifications">Уведомления</TabsTrigger>
              <TabsTrigger value="test">Вопросы теста</TabsTrigger>
            </TabsList>
            
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
                <ClientsList
                  clients={partnerClients}
                  getClientPayments={getClientPayments}
                />
              )}
            </TabsContent>

            <TabsContent value="clients">
              <AllClientsTab
                clients={clients}
                getClientPayments={getClientPayments}
                partners={partners}
              />
            </TabsContent>

            <TabsContent value="notifications">
              <div className="space-y-6">
                <NotificationForm onCreateNotification={() => handleNotificationUpdate()} />
                <NotificationsList 
                  notifications={notifications} 
                  onNotificationUpdate={handleNotificationUpdate}
                />
              </div>
            </TabsContent>

            <TabsContent value="test">
              <TestQuestionsManager 
                questions={testQuestions}
                onUpdateQuestion={(question) => {
                  setTestQuestions(testQuestions.map(q => 
                    q.id === question.id ? question : q
                  ))
                }}
                onCreateQuestion={(newQuestionData) => {
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
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Обновить данные
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
