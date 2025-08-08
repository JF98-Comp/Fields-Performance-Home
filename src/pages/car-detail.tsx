import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { AutomotiveHeader } from "@/components/automotive-header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check, Calendar, Fuel, Gauge, Palette, Settings, Car as CarIcon } from "lucide-react";
import type { Car } from "@shared/schema";

export default function CarDetail() {
  const params = useParams();
  const carId = params.id;

  const { data: car, isLoading, error } = useQuery<Car>({
    queryKey: ["/api/cars", carId],
    queryFn: async () => {
      const response = await fetch(`/api/cars/${carId}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Car not found");
        }
        throw new Error("Failed to fetch car");
      }
      return response.json();
    },
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "performance":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      case "beginner":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const formatPrice = (price: number) => {
    return `£${(price / 100).toLocaleString()}`;
  };

  const formatMileage = (mileage: number) => {
    return `${mileage.toLocaleString()} miles`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <AutomotiveHeader />
        <main className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="mb-6">
                <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="h-80 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <AutomotiveHeader />
        <main className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Car Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The car you're looking for doesn't exist or has been sold.
            </p>
            <Button asChild>
              <Link href="/inventory">Back to Inventory</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AutomotiveHeader />
      
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
              <Link href="/previously-sold">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Previously Sold
              </Link>
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative">
                <img
                  src={car.images[0] || "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-80 lg:h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getCategoryColor(car.category)}>
                    {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {car.year} • {car.bodyType}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {car.make} {car.model}
                </h1>
                
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  {car.description}
                </p>

                {/* Key Specs */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Gauge className="h-5 w-5 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-500">Mileage</div>
                      <div className="font-medium">{formatMileage(car.mileage)}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Fuel className="h-5 w-5 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-500">Fuel Type</div>
                      <div className="font-medium">{car.fuelType}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Settings className="h-5 w-5 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-500">Transmission</div>
                      <div className="font-medium">{car.transmission}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Palette className="h-5 w-5 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-500">Color</div>
                      <div className="font-medium">{car.color}</div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {car.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                        <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price and CTA */}
                <div className="border-t dark:border-gray-700 pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-3xl font-bold text-primary">{formatPrice(car.price)}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Final asking price</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button asChild size="lg" className="w-full">
                      <Link href="/contact">Contact Us About This Car</Link>
                    </Button>
                    <Button variant="outline" size="lg" className="w-full">
                      <a href="tel:+447123456789">Call Us: 07123 456789</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">Quality Checked</div>
                <p className="text-gray-600 dark:text-gray-400">Every car is thoroughly inspected</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">Enthusiast Approved</div>
                <p className="text-gray-600 dark:text-gray-400">We only sell cars we'd own ourselves</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">Personal Service</div>
                <p className="text-gray-600 dark:text-gray-400">Direct contact with the owners</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}