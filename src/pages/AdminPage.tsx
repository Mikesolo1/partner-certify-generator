
import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { usePartners } from "@/contexts/PartnersContext";
import Header from "@/components/Header";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { useAdminData } from "@/hooks/useAdminData";

const AdminPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentPartner } = usePartners();
  const adminData = useAdminData();

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
      
      // Only fetch data once on initial mount
      adminData.fetchData();
    };
    
    checkAdminAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPartner, navigate, toast]); // Remove adminData dependency to prevent infinite loop

  return (
    <div className="min-h-screen bg-brand-light">
      <Header />
      <div className="container mx-auto px-4 py-12">
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
          onRefresh={adminData.fetchData}
        />
      </div>
    </div>
  );
};

export default AdminPage;
