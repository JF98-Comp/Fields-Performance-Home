import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { SkillLevelsSection } from "@/components/skill-levels-section";
import { FeaturedResources } from "@/components/featured-resources";
import { LearningProcess } from "@/components/learning-process";
import { SuccessStories } from "@/components/success-stories";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <HeroSection />
        
        {/* Stats Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-gray-600">Courses Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-600">Expert Instructors</div>
              </div>
            </div>
          </div>
        </section>

        <SkillLevelsSection />
        <FeaturedResources />
        <LearningProcess />
        <SuccessStories />
      </main>
      
      <Footer />
    </div>
  );
}
