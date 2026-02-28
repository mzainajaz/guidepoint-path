import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FreeZones from "./pages/FreeZones";
import FreeZoneDetail from "./pages/FreeZoneDetail";
import RelocationHub from "./pages/RelocationHub";
import MainlandHub from "./pages/MainlandHub";
import MainlandLicensing from "./pages/MainlandLicensing";
import MainlandEjari from "./pages/MainlandEjari";
import MainlandCompliance from "./pages/MainlandCompliance";
import ComparisonsIndex from "./pages/ComparisonsIndex";
import ComparisonDetail from "./pages/ComparisonDetail";
import CountryRelocation from "./pages/CountryRelocation";
import ActivitiesIndex from "./pages/ActivitiesIndex";
import ActivityDetail from "./pages/ActivityDetail";
import TaxComplianceHub from "./pages/TaxComplianceHub";
import TaxGuideDetail from "./pages/TaxGuideDetail";
import ToolsHub from "./pages/ToolsHub";
import CostEstimator from "./pages/CostEstimator";
import ZonePicker from "./pages/ZonePicker";
import VatHelper from "./pages/VatHelper";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/free-zones" element={<FreeZones />} />
          <Route path="/free-zones/:slug" element={<FreeZoneDetail />} />
          <Route path="/relocation" element={<RelocationHub />} />
          <Route path="/mainland" element={<MainlandHub />} />
          <Route path="/mainland/licensing" element={<MainlandLicensing />} />
          <Route path="/mainland/office-ejari" element={<MainlandEjari />} />
          <Route path="/mainland/compliance" element={<MainlandCompliance />} />
          <Route path="/compare" element={<ComparisonsIndex />} />
          <Route path="/compare/:slug" element={<ComparisonDetail />} />
          <Route path="/activities" element={<ActivitiesIndex />} />
          <Route path="/activities/:slug" element={<ActivityDetail />} />
          <Route path="/taxes" element={<TaxComplianceHub />} />
          <Route path="/taxes/:slug" element={<TaxGuideDetail />} />
          <Route path="/relocation/:countryCode" element={<CountryRelocation />} />
          <Route path="/tools" element={<ToolsHub />} />
          <Route path="/tools/cost-estimator" element={<CostEstimator />} />
          <Route path="/tools/zone-picker" element={<ZonePicker />} />
          <Route path="/tools/vat-helper" element={<VatHelper />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
