import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ResourceCard } from "@/components/resource-card";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Resource } from "@shared/schema";

export default function Resources() {
  const params = useParams();
  const skillLevel = params.skillLevel;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string | null>(skillLevel || null);

  useEffect(() => {
    if (skillLevel) {
      setSelectedSkillLevel(skillLevel);
    }
  }, [skillLevel]);

  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: searchQuery 
      ? ["/api/resources/search", { q: searchQuery }]
      : selectedSkillLevel 
        ? ["/api/resources/skill", selectedSkillLevel]
        : ["/api/resources"],
    queryFn: async () => {
      let url = "/api/resources";
      if (searchQuery) {
        url = `/api/resources/search?q=${encodeURIComponent(searchQuery)}`;
      } else if (selectedSkillLevel) {
        url = `/api/resources/skill/${selectedSkillLevel}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch resources");
      }
      return response.json();
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedSkillLevel(null);
  };

  const handleSkillLevelFilter = (level: string | null) => {
    setSelectedSkillLevel(level);
    setSearchQuery("");
  };

  const skillLevels = ["beginner", "intermediate", "advanced"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Educational Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive collection of learning materials organized by skill level
            </p>
          </div>

          <SearchBar onSearch={handleSearch} />

          {/* Skill Level Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant={selectedSkillLevel === null ? "default" : "outline"}
              onClick={() => handleSkillLevelFilter(null)}
            >
              All Levels
            </Button>
            {skillLevels.map((level) => (
              <Button
                key={level}
                variant={selectedSkillLevel === level ? "default" : "outline"}
                onClick={() => handleSkillLevelFilter(level)}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            ))}
          </div>

          {/* Active Filters */}
          {(selectedSkillLevel || searchQuery) && (
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedSkillLevel && (
                <Badge variant="secondary" className="px-3 py-1">
                  Skill Level: {selectedSkillLevel.charAt(0).toUpperCase() + selectedSkillLevel.slice(1)}
                  <button
                    onClick={() => handleSkillLevelFilter(null)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
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
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}

          {/* Resources Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-t-xl"></div>
                  <div className="bg-white p-6 rounded-b-xl">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? `No resources match your search for "${searchQuery}"`
                  : selectedSkillLevel
                    ? `No resources found for ${selectedSkillLevel} level`
                    : "No resources are currently available"
                }
              </p>
              {(searchQuery || selectedSkillLevel) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedSkillLevel(null);
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
