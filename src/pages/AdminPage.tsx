
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { usePartners } from "@/contexts/PartnersContext";
import Header from "@/components/Header";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { useAdminData } from "@/hooks/useAdminData";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const AdminPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentPartner } = usePartners();
  const adminData = useAdminData();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!currentPartner || currentPartner.role !== 'admin') {
        toast({
          title: "Доступ запрещен",
          description: "У вас нет доступа к этой странице",
          variant: "destructive",
        });
        navigate('/dashboard');
        return;
      }
      
      // Загружаем данные только при первом монтировании
      adminData.fetchData();
    };
    
    checkAdminAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPartner, navigate, toast]); // Удаляем зависимость adminData, чтобы избежать бесконечного цикла

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await adminData.fetchData();
    setIsRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-brand-light">
      <Header />
      <div className="container mx-auto px-4 py-12">
        {adminData.fetchError && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Ошибка при загрузке данных</AlertTitle>
            <AlertDescription>
              {adminData.fetchError}
              <Button 
                variant="outline" 
                onClick={handleRefresh} 
                className="ml-4 mt-2"
                disabled={isRefreshing}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Обновить
              </Button>
            </AlertDescription>
          </Alert>
        )}
        <AdminDashboard
          partners={adminData.partners}
          setPartners={adminData.setPartners}
          clients={adminData.clients}
          payments={adminData.payments}
          testQuestions={adminData.testQuestions}
          setTestQuestions={adminData.setTestQuestions}
          notifications={adminData.notifications}
          setNotifications={adminData.setNotifications}
          loading={adminData.loading}
          onRefresh={handleRefresh}
        />
      </div>
    </div>
  );
};

export default AdminPage;
