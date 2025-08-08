import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import fpLogoPath from "@assets/FP Logo_1753956319873.jpg";

export function HeroAutomotive() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8">
              <img
                src={fpLogoPath}
                alt="Fields Performance Logo"
                className="h-16 w-auto mb-6"
              />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Premium Performance Cars in{" "}
              <span className="text-red-500">Southampton</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-4 leading-relaxed">
              Run by enthusiasts, for enthusiasts
            </p>
            
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Specializing in BMW M, MINI JCW, Renault Sport, and Hyundai N performance cars, 
              plus carefully selected beginner-friendly vehicles. Every car is hand-picked 
              with a petrolhead's eye for quality and character.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white border-0"
              >
                <Link href="/about">Learn About Us</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-black"
              >
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500 mb-1">£3k-£30k</div>
                <div className="text-sm text-gray-400">Price Range</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500 mb-1">2024</div>
                <div className="text-sm text-gray-400">Est. Founded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500 mb-1">10+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="BMW M Performance Car"
              className="rounded-xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-red-600 text-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
                </svg>
                <div>
                  <div className="font-bold">Quality</div>
                  <div className="text-sm">Guaranteed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}