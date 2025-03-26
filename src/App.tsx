
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./components/LanguageSwitcher";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Candidates from "./pages/Candidates";
import Voting from "./pages/Voting";
import Guidelines from "./pages/Guidelines";
import VoterInfo from "./pages/VoterInfo";
import Results from "./pages/Results";
import Complaints from "./pages/Complaints";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/voting" element={<Voting />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/voter-info" element={<VoterInfo />} />
            <Route path="/results" element={<Results />} />
            <Route path="/complaints" element={<Complaints />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
