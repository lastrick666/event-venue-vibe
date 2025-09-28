import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventDetail from "./pages/EventDetail";
import Profile from "./pages/Profile";
import HostDashboard from "./pages/HostDashboard";
import CreateEvent from "./pages/CreateEvent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/host/dashboard" element={<HostDashboard />} />
          <Route path="/host/create-event" element={<CreateEvent />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
