import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function HeroSection() {
  return (
    <section className="hero-gradient text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Unlock Your Potential with{" "}
              <span className="text-yellow-300">Personalized Learning</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Access premium educational resources organized by skill level. From beginner to advanced,
              we help you learn at your own pace with expert-curated content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
              >
                <Link href="/resources">Browse Resources</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-primary"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Students collaborating"
              className="rounded-xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-gray-900 p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h2v4h12v-4h2v4c0 1.11-.89 2-2 2H6c-1.11 0-2-.89-2-2zM18 8h-2V6c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H6c-1.11 0-2 .89-2 2v4c0 1.11.89 2 2 2h2v-6h8v6h2c1.11 0 2-.89 2-2v-4c0-1.11-.89-2-2-2z"/>
                </svg>
                <div>
                  <div className="font-bold">10,000+</div>
                  <div className="text-sm">Active Learners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
