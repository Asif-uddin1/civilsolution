import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import ServiceDetail from "./pages/ServiceDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAccount from "./pages/AdminAccount";
import Careers from "./pages/Careers";
import AdminInquiries from "./pages/AdminInquiries";
import AdminBlog from "./pages/AdminBlog";
import CompletedProjects from "./pages/CompletedProjects";
import AdminApplications from "./pages/AdminApplications";

export default function App() {
  return (
    <BrowserRouter>
      <PageTransition />
      <Toaster position="top-right" closeButton richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/account" element={<AdminAccount />} />
        <Route path="/admin/inquiries" element={<AdminInquiries />} />
        <Route path="/admin/blog" element={<AdminBlog />} />
        <Route path="/admin/applications" element={<AdminApplications />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/completed-projects" element={<CompletedProjects />} />
        <Route path="/blog" element={<Navigate to="/completed-projects" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
