import React, { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Partner, Client, Payment, TestQuestion, Notification } from '@/types';
import { PartnersTable } from './PartnersTable';
import { ClientsTable } from './ClientsTable';
import { PaymentsTable } from './PaymentsTable';
import { TestQuestionsTable } from './TestQuestionsTable';
import { NotificationForm } from './NotificationForm';
import { NotificationsList } from './NotificationsList';

interface AdminDashboardProps {
  partners: Partner[];
  setPartners: React.Dispatch<React.SetStateAction<Partner[]>>;
  clients: Client[];
  payments: Payment[];
  testQuestions: TestQuestion[];
  setTestQuestions: React.Dispatch<React.SetStateAction<TestQuestion[]>>;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
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
  const [activeTab, setActiveTab] = useState("partners");

  const handleCreateNotification = async (title: string, content: string, images: string[]) => {
    onRefresh();
  };

  const handleNotificationUpdate = () => {
    onRefresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-semibold">Панель администратора</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="partners">Партнеры</TabsTrigger>
          <TabsTrigger value="clients">Клиенты</TabsTrigger>
          <TabsTrigger value="payments">Платежи</TabsTrigger>
          <TabsTrigger value="test_questions">Тесты</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
        </TabsList>

        <TabsContent value="partners" className="space-y-6">
          <PartnersTable partners={partners} setPartners={setPartners} loading={loading} />
        </TabsContent>

        <TabsContent value="clients" className="space-y-6">
          <ClientsTable clients={clients} loading={loading} />
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <PaymentsTable payments={payments} loading={loading} />
        </TabsContent>

        <TabsContent value="test_questions" className="space-y-6">
          <TestQuestionsTable testQuestions={testQuestions} setTestQuestions={setTestQuestions} loading={loading} />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationForm onCreateNotification={handleCreateNotification} />
          <NotificationsList 
            notifications={notifications} 
            onUpdate={handleNotificationUpdate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
