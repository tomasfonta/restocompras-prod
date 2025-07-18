import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { DataProvider } from "./contexts/DataContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Index from "./pages/Index";
import ProfileSettings from "./pages/ProfileSettings";
import CostAnalysis from "./pages/CostAnalysis";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const { BASE_URL } = import.meta.env;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <UserProvider>
            <DataProvider>
              <ShoppingCartProvider>
                <HashRouter>
                  <Routes>
                    <Route path={`/`} element={<Landing />} />
                    <Route path={`/login`} element={<Login />} />
                    <Route path={`/dashboard`} element={<Index />} />
                    <Route path={`/profile`} element={<ProfileSettings />} />
                    <Route path={`/cost-analysis`} element={<CostAnalysis />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path={`*`} element={<NotFound />} />
                  </Routes>
                </HashRouter>
              </ShoppingCartProvider>
            </DataProvider>
          </UserProvider>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
