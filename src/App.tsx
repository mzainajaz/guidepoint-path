import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/context";
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
import React from "react";

const queryClient = new QueryClient();

// All app routes defined once, rendered for both '' and '/fr' prefixes
const appRoutes = [
  { path: "/", element: <Index /> },
  { path: "/free-zones", element: <FreeZones /> },
  { path: "/free-zones/:slug", element: <FreeZoneDetail /> },
  { path: "/relocation", element: <RelocationHub /> },
  { path: "/mainland", element: <MainlandHub /> },
  { path: "/mainland/licensing", element: <MainlandLicensing /> },
  { path: "/mainland/office-ejari", element: <MainlandEjari /> },
  { path: "/mainland/compliance", element: <MainlandCompliance /> },
  { path: "/compare", element: <ComparisonsIndex /> },
  { path: "/compare/:slug", element: <ComparisonDetail /> },
  { path: "/activities", element: <ActivitiesIndex /> },
  { path: "/activities/:slug", element: <ActivityDetail /> },
  { path: "/taxes", element: <TaxComplianceHub /> },
  { path: "/taxes/:slug", element: <TaxGuideDetail /> },
  { path: "/relocation/:countryCode", element: <CountryRelocation /> },
  { path: "/tools", element: <ToolsHub /> },
  { path: "/tools/cost-estimator", element: <CostEstimator /> },
  { path: "/tools/zone-picker", element: <ZonePicker /> },
  { path: "/tools/vat-helper", element: <VatHelper /> },
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <Routes>
            {/* English routes */}
            {appRoutes.map((r) => (
              <Route key={r.path} path={r.path} element={r.element} />
            ))}
            {/* French routes with /fr prefix */}
            {appRoutes.map((r) => (
              <Route
                key={`fr-${r.path}`}
                path={`/fr${r.path === "/" ? "" : r.path}`}
                element={r.element}
              />
            ))}
            {/* French root */}
            <Route path="/fr" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
