
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
import CertificatePage from "./pages/CertificatePage";
import PartnerCertificatePage from "./pages/PartnerCertificatePage";
import PartnerTestPage from "./pages/PartnerTestPage";
import PartnersPage from "./pages/PartnersPage";
import ClientsPage from "./pages/ClientsPage";
import ReferralsPage from "./pages/ReferralsPage";
import AddPartnerPage from "./pages/AddPartnerPage";
import EditPartnerPage from "./pages/EditPartnerPage";
import AdminPage from "./pages/AdminPage";
import AdminPartnerDetailsPage from "./pages/AdminPartnerDetailsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
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
            <Route path="/dashboard/certificate" element={<PartnerCertificatePage />} />
            <Route path="/dashboard/test" element={<PartnerTestPage />} />
            <Route path="/dashboard/clients" element={<ClientsPage />} />
            <Route path="/dashboard/referrals" element={<ReferralsPage />} />
            <Route path="/certificate/:id" element={<CertificatePage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/partners/add" element={<AddPartnerPage />} />
            <Route path="/admin/partners/:id/edit" element={<EditPartnerPage />} />
            <Route path="/admin/partners/:id" element={<AdminPartnerDetailsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PartnersProvider>
  </QueryClientProvider>
);

export default App;
