import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Stocks from "./pages/Stocks";
import Markets from "./pages/Markets";
import Currencies from "./pages/Currencies";
import Global from "./pages/Global";
import Portfolio from "./pages/Portfolio";
import Performance from "./pages/Performance";
import Analysis from "./pages/Analysis";
import Settings from "./pages/Settings";
import TradingDashboard from "./pages/TradingDashboard";
import TradingHistory from "./pages/TradingHistory";
import PerformanceDashboard from "./pages/PerformanceDashboard";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/auth/ProtectedRoute"; // Import the guard

const queryClient = new QueryClient();

/**
 * The root component of the entire React application.
 *
 * This component wraps the application with all necessary global providers
 * and sets up the client-side routing using `react-router-dom`.
 *
 * Providers:
 * - `QueryClientProvider`: Enables TanStack Query for data fetching and caching.
 * - `TooltipProvider`: Enables tooltips throughout the application.
 * - `Toaster` & `Sonner`: Provide contexts for displaying toast notifications.
 * - `BrowserRouter`: Enables client-side routing.
 *
 * Routing:
 * - Defines all public routes (e.g., '/', '/auth').
 * - Uses the `ProtectedRoute` component to guard all routes that require
 *   user authentication (e.g., '/trading', '/dashboard').
 * - Includes a "catch-all" route that renders the `NotFound` page for any
 *   unmatched URL.
 *
 * @returns {JSX.Element} The fully configured application with routes.
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/currencies" element={<Currencies />} />
          <Route path="/global" element={<Global />} />
          <Route path="/auth" element={<Auth />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/trading" element={<TradingDashboard />} />
            <Route path="/history" element={<TradingHistory />} />
            <Route path="/dashboard" element={<PerformanceDashboard />} />
          </Route>

          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
