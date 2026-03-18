import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/i18n/context";
import { AuthProvider } from "@/hooks/useAuth";
import { useAnalyticsTracker } from "@/hooks/useAnalyticsTracker";
import ScrollToTop from "./components/ScrollToTop";
import React, { Suspense, lazy } from "react";

// Lazy-loaded route components for code splitting
const Index = lazy(() => import("./pages/Index"));
const StartHere = lazy(() => import("./pages/StartHere"));
const FreeZones = lazy(() => import("./pages/FreeZones"));
const FreeZoneDetail = lazy(() => import("./pages/FreeZoneDetail"));
const RelocationHub = lazy(() => import("./pages/RelocationHub"));
const MainlandHub = lazy(() => import("./pages/MainlandHub"));
const MainlandLicensing = lazy(() => import("./pages/MainlandLicensing"));
const MainlandEjari = lazy(() => import("./pages/MainlandEjari"));
const MainlandCompliance = lazy(() => import("./pages/MainlandCompliance"));
const ComparisonsIndex = lazy(() => import("./pages/ComparisonsIndex"));
const ComparisonDetail = lazy(() => import("./pages/ComparisonDetail"));
const CountryRelocation = lazy(() => import("./pages/CountryRelocation"));
const ActivitiesIndex = lazy(() => import("./pages/ActivitiesIndex"));
const ActivityDetail = lazy(() => import("./pages/ActivityDetail"));
const TaxComplianceHub = lazy(() => import("./pages/TaxComplianceHub"));
const TaxGuideDetail = lazy(() => import("./pages/TaxGuideDetail"));
const ToolsHub = lazy(() => import("./pages/ToolsHub"));
const CostEstimator = lazy(() => import("./pages/CostEstimator"));
const ZonePicker = lazy(() => import("./pages/ZonePicker"));
const VatHelper = lazy(() => import("./pages/VatHelper"));
const RelocationCalculator = lazy(() => import("./pages/RelocationCalculator"));
const FounderReadiness = lazy(() => import("./pages/FounderReadiness"));
const BankReadiness = lazy(() => import("./pages/BankReadiness"));
const VisaHub = lazy(() => import("./pages/VisaHub"));
const VisaDetail = lazy(() => import("./pages/VisaDetail"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const GuidesIndex = lazy(() => import("./pages/GuidesIndex"));
const GuideDetail = lazy(() => import("./pages/GuideDetail"));
const HowToIndex = lazy(() => import("./pages/HowToIndex"));
const HowToArticle = lazy(() => import("./pages/HowToArticle"));
const Contact = lazy(() => import("./pages/Contact"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));
const AdminContent = lazy(() => import("./pages/admin/AdminContent"));
const AdminSEO = lazy(() => import("./pages/admin/AdminSEO"));
const AdminHowToImport = lazy(() => import("./pages/admin/AdminHowToImport"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const appRoutes = [
  { path: "/", element: <Index /> },
  { path: "/start-here", element: <StartHere /> },
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

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

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
              <Suspense fallback={<PageLoader />}>
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
                  {/* Redirects for legacy/crawled URLs */}
                  <Route path="/pricing" element={<Navigate to="/tools/cost-estimator" replace />} />
                  <Route path="/about" element={<Navigate to="/contact" replace />} />
                  <Route path="/questions" element={<Navigate to="/contact" replace />} />
                  {appRoutes.map((r) => (
                    <Route key={r.path} path={r.path} element={r.element} />
                  ))}
                  {["fr", "de", "es", "ar", "it", "ru", "uk"].map((loc) =>
                    appRoutes.map((r) => (
                      <Route key={`${loc}-${r.path}`} path={`/${loc}${r.path === "/" ? "" : r.path}`} element={r.element} />
                    ))
                  )}
                  {["fr", "de", "es", "ar", "it", "ru", "uk"].map((loc) => (
                    <Route key={`${loc}-root`} path={`/${loc}`} element={<Index />} />
                  ))}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </AnalyticsWrapper>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
