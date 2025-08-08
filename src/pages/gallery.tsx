import { useState } from "react";
import { AutomotiveHeader } from "@/components/automotive-header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Upload } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: "performance" | "beginner" | "general";
  description?: string;
}

export default function Gallery() {
  // Sample gallery images - in a real app, this would come from your backend
  const [images] = useState<GalleryImage[]>([
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "BMW M3 Competition",
      category: "performance",
      description: "Stunning Alpine White M3 Competition - example of performance excellence we source"
    },
    {
      id: "2", 
      url: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "MINI JCW",
      category: "performance",
      description: "Chili Red John Cooper Works - showcasing our performance car expertise"
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1606016159549-62a3819cb531?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Volkswagen Golf",
      category: "beginner",
      description: "Perfect example of beginner-friendly vehicles we recommend"
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Renault Clio RS",
      category: "performance",
      description: "Liquid Yellow RS - demonstrating our French performance car knowledge"
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "FIAT 500",
      category: "beginner",
      description: "Charming city car - perfect for new drivers we help guide"
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Showroom",
      category: "general",
      description: "Our Southampton showroom - where passion meets professionalism"
    }
  ]);

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredImages = selectedCategory === "all" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "performance":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      case "beginner":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "general":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AutomotiveHeader />
      
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Gallery
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A visual showcase of our expertise, passion, and the quality vehicles we work with
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-12">
            <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
              <CardContent className="p-8 text-center">
                <Upload className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Add New Images
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Upload photos of your latest arrivals, sold vehicles, or showroom shots
                </p>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Images
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
            >
              All Images
            </Button>
            <Button
              variant={selectedCategory === "performance" ? "default" : "outline"}
              onClick={() => setSelectedCategory("performance")}
            >
              Performance Cars
            </Button>
            <Button
              variant={selectedCategory === "beginner" ? "default" : "outline"}
              onClick={() => setSelectedCategory("beginner")}
            >
              Beginner Friendly
            </Button>
            <Button
              variant={selectedCategory === "general" ? "default" : "outline"}
              onClick={() => setSelectedCategory("general")}
            >
              General
            </Button>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Card 
                key={image.id} 
                className="card-hover cursor-pointer overflow-hidden bg-white dark:bg-gray-800"
                onClick={() => setSelectedImage(image)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={getCategoryColor(image.category)}>
                        {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {image.title}
                    </h3>
                    {image.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {image.description}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No images found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                No images match your current filter selection
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Modal for full-size image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-lg">
              <div className="text-white">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
                  <Badge className={getCategoryColor(selectedImage.category)}>
                    {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}
                  </Badge>
                </div>
                {selectedImage.description && (
                  <p className="text-gray-300">{selectedImage.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}