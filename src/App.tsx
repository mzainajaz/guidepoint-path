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
import ComparisonsIndex from "./pages/ComparisonsIndex";
import ComparisonDetail from "./pages/ComparisonDetail";
import CountryRelocation from "./pages/CountryRelocation";
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
          <Route path="/compare" element={<ComparisonsIndex />} />
          <Route path="/compare/:slug" element={<ComparisonDetail />} />
          <Route path="/relocation/:countryCode" element={<CountryRelocation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
