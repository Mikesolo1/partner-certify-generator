
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PartnersProvider } from "@/contexts/PartnersContext";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import PartnersPage from "./pages/PartnersPage";
import CertificatePage from "./pages/CertificatePage";
import PartnerCertificatePage from "./pages/PartnerCertificatePage";
import PartnerTestPage from "./pages/PartnerTestPage";
import ClientsPage from "./pages/ClientsPage";
import CommissionsReportPage from "./pages/CommissionsReportPage";
import ReferralsPage from "./pages/ReferralsPage";
import WABATrainingPage from "./pages/WABATrainingPage";
import AddPartnerPage from "./pages/AddPartnerPage";
import EditPartnerPage from "./pages/EditPartnerPage";
import AdminPartnerDetailsPage from "./pages/AdminPartnerDetailsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PartnersProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/clients" element={<ClientsPage />} />
              <Route path="/dashboard/commissions" element={<CommissionsReportPage />} />
              <Route path="/dashboard/certificate" element={<PartnerCertificatePage />} />
              <Route path="/dashboard/test" element={<PartnerTestPage />} />
              <Route path="/dashboard/referrals" element={<ReferralsPage />} />
              <Route path="/dashboard/waba-training" element={<WABATrainingPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/add-partner" element={<AddPartnerPage />} />
              <Route path="/admin/edit-partner/:id" element={<EditPartnerPage />} />
              <Route path="/admin/partners/:id" element={<AdminPartnerDetailsPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/certificate/:id" element={<CertificatePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PartnersProvider>
    </QueryClientProvider>
  );
}

export default App;
