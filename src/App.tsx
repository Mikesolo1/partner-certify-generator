
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PartnersProvider } from "@/contexts/PartnersContext";
import Index from "./pages/Index";
import PartnersPage from "./pages/PartnersPage";
import AddPartnerPage from "./pages/AddPartnerPage";
import EditPartnerPage from "./pages/EditPartnerPage";
import CertificatePage from "./pages/CertificatePage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import PartnerTestPage from "./pages/PartnerTestPage";
import PartnerCertificatePage from "./pages/PartnerCertificatePage";
import ClientsPage from "./pages/ClientsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PartnersProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/add-partner" element={<AddPartnerPage />} />
            <Route path="/edit-partner/:id" element={<EditPartnerPage />} />
            <Route path="/certificate/:id" element={<CertificatePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/test" element={<PartnerTestPage />} />
            <Route path="/dashboard/certificate" element={<PartnerCertificatePage />} />
            <Route path="/dashboard/clients" element={<ClientsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PartnersProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
