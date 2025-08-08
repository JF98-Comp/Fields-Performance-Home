import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowLeft, Check } from "lucide-react";
import type { Resource } from "@shared/schema";

export default function ResourceDetail() {
  const params = useParams();
  const resourceId = params.id;

  const { data: resource, isLoading, error } = useQuery<Resource>({
    queryKey: ["/api/resources", resourceId],
    queryFn: async () => {
      const response = await fetch(`/api/resources/${resourceId}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Resource not found");
        }
        throw new Error("Failed to fetch resource");
      }
      return response.json();
    },
  });

  const getSkillLevelColor = (skillLevel: string) => {
    switch (skillLevel) {
      case "beginner":
        return "bg-green-100 text-green-700";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(0)}`;
  };

  const formatRating = (rating: number) => {
    return (rating / 10).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="mb-6">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="h-80 bg-gray-300 rounded-xl"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-300 rounded"></div>
                  <div className="h-6 bg-gray-300 rounded"></div>
                  <div className="h-20 bg-gray-300 rounded"></div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Resource Not Found</h1>
            <p className="text-gray-600 mb-8">
              The resource you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/resources">Back to Resources</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900">
              <Link href="/resources">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Resources
              </Link>
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative">
                <img
                  src={resource.imageUrl}
                  alt={resource.title}
                  className="w-full h-80 lg:h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getSkillLevelColor(resource.skillLevel)}>
                    {resource.skillLevel.charAt(0).toUpperCase() + resource.skillLevel.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    {resource.category}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-5 w-5 mr-1 fill-current" />
                    <span className="text-gray-700 font-medium">{formatRating(resource.rating)}</span>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{resource.title}</h1>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {resource.description}
                </p>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {resource.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price and CTA */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-3xl font-bold text-primary">{formatPrice(resource.price)}</div>
                      <div className="text-sm text-gray-500">One-time payment</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button size="lg" className="w-full">
                      Enroll Now
                    </Button>
                    <Button variant="outline" size="lg" className="w-full">
                      Add to Wishlist
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">Self-Paced</div>
                <p className="text-gray-600">Learn at your own speed with lifetime access</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">Expert Support</div>
                <p className="text-gray-600">Get help from industry professionals</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">Certificate</div>
                <p className="text-gray-600">Earn a completion certificate</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
