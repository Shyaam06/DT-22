
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from 'react';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FitnessPlan from "./pages/FitnessPlan";
import Workouts from "./pages/Workouts";
import Diet from "./pages/Diet";
import Exercises from "./pages/Exercises";
import About from "./pages/About";
import Subscription from "./pages/Subscription";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import FitnessAiChat from "./components/FitnessAiChat";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);
  
  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-fitDark">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-fitOrange/30 border-t-fitOrange animate-spin"></div>
          </div>
          <p className="mt-4 text-white font-bold text-xl">FitFusion</p>
          <p className="text-gray-400 text-sm mt-2">Loading your fitness journey...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/fitness-plan" element={<FitnessPlan />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/diet" element={<Diet />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/about" element={<About />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FitnessAiChat />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
