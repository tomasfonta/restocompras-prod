
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
                <BrowserRouter>
                  <Routes>
                  <Route path={`${BASE_URL}login`} element={<Login />} />
                    <Route path={`${BASE_URL}`} element={<Landing />} />
                    
                    <Route path={`${BASE_URL}dashboard`} element={<Index />} />
                    <Route path={`${BASE_URL}profile`} element={<ProfileSettings />} />
                    <Route path={`${BASE_URL}cost-analysis`} element={<CostAnalysis />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path={`${BASE_URL}*`} element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </ShoppingCartProvider>
            </DataProvider>
          </UserProvider>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
