
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StudentBorrow from "./pages/StudentBorrow";
import StudentReturn from "./pages/StudentReturn";
import StudentHistory from "./pages/StudentHistory";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNotifications from "./pages/AdminNotifications";
import Store from "./pages/Store";
import UserLogin from "./pages/UserLogin";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/store" element={<Store />} />
            <Route path="/borrow" element={<StudentBorrow />} />
            <Route path="/return" element={<StudentReturn />} />
            <Route path="/history" element={<StudentHistory />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/notifications" element={<AdminNotifications />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
