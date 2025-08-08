import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { AutomotiveHeader } from "@/components/automotive-header";
import { Footer } from "@/components/footer";
import { CarCard } from "@/components/car-card";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Car } from "@shared/schema";

export default function Inventory() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFromUrl = urlParams.get('category');
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [location]);

  const { data: cars, isLoading } = useQuery<Car[]>({
    queryKey: searchQuery 
      ? ["/api/cars/search", { q: searchQuery }]
      : selectedCategory 
        ? ["/api/cars/category", selectedCategory]
        : ["/api/cars"],
    queryFn: async () => {
      let url = "/api/cars";
      if (searchQuery) {
        url = `/api/cars/search?q=${encodeURIComponent(searchQuery)}`;
      } else if (selectedCategory) {
        url = `/api/cars/category/${selectedCategory}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }
      return response.json();
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(null);
  };

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    setSearchQuery("");
    
    // Update URL without page reload
    const params = new URLSearchParams();
    if (category) {
      params.set('category', category);
    }
    const newUrl = `/inventory${params.toString() ? '?' + params.toString() : ''}`;
    window.history.pushState({}, '', newUrl);
  };

  const categories = ["performance", "beginner"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AutomotiveHeader />
      
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Previously Sold Vehicles
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Showcase of quality cars we've successfully sold to satisfied customers
            </p>
          </div>

          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search by make, model, color, or features..." 
          />

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => handleCategoryFilter(null)}
            >
              All Cars
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryFilter(category)}
              >
                {category === "performance" ? "Performance Cars" : "Beginner Friendly"}
              </Button>
            ))}
          </div>

          {/* Active Filters */}
          {(selectedCategory || searchQuery) && (
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedCategory && (
                <Badge variant="secondary" className="px-3 py-1">
                  Category: {selectedCategory === "performance" ? "Performance Cars" : "Beginner Friendly"}
                  <button
                    onClick={() => handleCategoryFilter(null)}
                    className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="px-3 py-1">
                  Search: "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}

          {/* Cars Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 dark:bg-gray-700 h-48 rounded-t-xl"></div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-b-xl">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No cars found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchQuery 
                  ? `No cars match your search for "${searchQuery}"`
                  : selectedCategory
                    ? `No cars found in the ${selectedCategory} category`
                    : "No cars are currently available"
                }
              </p>
              {(searchQuery || selectedCategory) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                    window.history.pushState({}, '', '/inventory');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}