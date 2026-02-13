import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Services from "@/pages/services";
import ServiceDetail from "@/pages/service-detail";
import Projects from "@/pages/projects";
import ProjectDetail from "@/pages/project-detail";
import Blog from "@/pages/blog";
import BlogDetail from "@/pages/blog-detail";
import Contact from "@/pages/contact";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminSliders from "@/pages/admin/sliders";
import AdminServices from "@/pages/admin/services-admin";
import AdminProjects from "@/pages/admin/projects-admin";
import AdminBlog from "@/pages/admin/blog-admin";
import FloatingCTA from "@/components/floating-cta";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/hizmetler" component={Services} />
      <Route path="/hizmetler/:slug" component={ServiceDetail} />
      <Route path="/projeler" component={Projects} />
      <Route path="/projeler/:slug" component={ProjectDetail} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogDetail} />
      <Route path="/iletisim" component={Contact} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/sliders" component={AdminSliders} />
      <Route path="/admin/hizmetler" component={AdminServices} />
      <Route path="/admin/projeler" component={AdminProjects} />
      <Route path="/admin/blog" component={AdminBlog} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <FloatingCTA />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
