import { useQuery } from "@tanstack/react-query";
import { CarCard } from "./car-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Car } from "@shared/schema";

export function FeaturedCars() {
  const { data: cars, isLoading } = useQuery<Car[]>({
    queryKey: ["/api/cars/featured"],
    queryFn: async () => {
      const response = await fetch("/api/cars/featured");
      if (!response.ok) {
        throw new Error("Failed to fetch featured cars");
      }
      return response.json();
    },
  });

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Vehicles
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Hand-picked performance machines and beginner-friendly options
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 dark:bg-gray-700 h-48 rounded-t-xl"></div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-b-xl">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : cars && cars.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/previously-sold">View Previously Sold</Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No featured cars available at the moment
            </p>
          </div>
        )}
      </div>
    </section>
  );
}