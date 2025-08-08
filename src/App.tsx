import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FloatingNav } from "@/components/floating-nav";
import NotFound from "@/pages/not-found";
import HomeAutomotive from "@/pages/home-automotive";
import Gallery from "@/pages/gallery";
import ContactAutomotive from "@/pages/contact-automotive";
import { AutomotiveHeader } from "@/components/automotive-header";
import { Footer } from "@/components/footer";
import { AboutSection } from "@/components/about-section";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeAutomotive} />

      <Route path="/gallery" component={Gallery} />

      <Route path="/about" component={() => (
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <AutomotiveHeader />
          <div className="py-20">
            <AboutSection />
          </div>
          <Footer />
        </div>
      )} />
      <Route path="/contact" component={ContactAutomotive} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <FloatingNav />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
