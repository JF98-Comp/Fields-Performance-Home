import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ResourceCard } from "./resource-card";
import { SearchBar } from "./search-bar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Resource } from "@shared/schema";

export function FeaturedResources() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: searchQuery ? ["/api/resources/search", { q: searchQuery }] : ["/api/resources"],
    queryFn: async () => {
      const url = searchQuery 
        ? `/api/resources/search?q=${encodeURIComponent(searchQuery)}`
        : "/api/resources";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch resources");
      }
      return response.json();
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Educational Resources
          </h2>
          <p className="text-xl text-gray-600">
            Handpicked content from our extensive library
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-48 rounded-t-xl"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-8 w-16 bg-gray-300 rounded"></div>
                    <div className="h-10 w-24 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : resources && resources.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/resources">View All Resources</Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {searchQuery ? `No resources found for "${searchQuery}"` : "No resources available"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
