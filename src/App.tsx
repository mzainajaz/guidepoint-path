import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/i18n/context";
import { AuthProvider } from "@/hooks/useAuth";
import { useAnalyticsTracker } from "@/hooks/useAnalyticsTracker";
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
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import GuidesIndex from "./pages/GuidesIndex";
import GuideDetail from "./pages/GuideDetail";
import HowToIndex from "./pages/HowToIndex";
import HowToArticle from "./pages/HowToArticle";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import ResetPassword from "./pages/ResetPassword";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminContent from "./pages/admin/AdminContent";
import AdminSEO from "./pages/admin/AdminSEO";
import AdminHowToImport from "./pages/admin/AdminHowToImport";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import React from "react";

const queryClient = new QueryClient();

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
  { path: "/blog", element: <BlogIndex /> },
  { path: "/blog/:slug", element: <BlogPost /> },
  { path: "/guides", element: <GuidesIndex /> },
  { path: "/guides/:slug", element: <GuideDetail /> },
  { path: "/how-to/uae-business-setup", element: <HowToIndex /> },
  { path: "/how-to/uae-business-setup/:slug", element: <HowToArticle /> },
  { path: "/contact", element: <Contact /> },
];

const AnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
  useAnalyticsTracker();
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <ScrollToTop />
            <AnalyticsWrapper>
              <Routes>
                {/* Admin routes — must come before locale patterns */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="leads" element={<AdminLeads />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="blog" element={<AdminBlog />} />
                  <Route path="content" element={<AdminContent />} />
                  <Route path="seo" element={<AdminSEO />} />
                  <Route path="howto-import" element={<AdminHowToImport />} />
                </Route>
                {appRoutes.map((r) => (
                  <Route key={r.path} path={r.path} element={r.element} />
                ))}
                {["fr", "de", "es", "ar", "it", "ru", "uk", "zh", "pt"].map((loc) =>
                  appRoutes.map((r) => (
                    <Route key={`${loc}-${r.path}`} path={`/${loc}${r.path === "/" ? "" : r.path}`} element={r.element} />
                  ))
                )}
                {["fr", "de", "es", "ar", "it", "ru", "uk", "zh", "pt"].map((loc) => (
                  <Route key={`${loc}-root`} path={`/${loc}`} element={<Index />} />
                ))}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnalyticsWrapper>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
