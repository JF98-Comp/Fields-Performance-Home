import { AutomotiveHeader } from "@/components/automotive-header";
import { Footer } from "@/components/footer";
import { HeroAutomotive } from "@/components/hero-automotive";

import { AboutSection } from "@/components/about-section";

export default function HomeAutomotive() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <AutomotiveHeader />
      
      <main>
        <HeroAutomotive />
        
        <AboutSection />
      </main>
      
      <Footer />
    </div>
  );
}