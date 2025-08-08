import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Link } from "wouter";
import type { Resource } from "@shared/schema";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
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

  return (
    <Card className="card-hover shadow-sm hover:shadow-lg transition-shadow">
      <img
        src={resource.imageUrl}
        alt={resource.title}
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge className={getSkillLevelColor(resource.skillLevel)}>
            {resource.skillLevel.charAt(0).toUpperCase() + resource.skillLevel.slice(1)}
          </Badge>
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 mr-1 fill-current" />
            <span className="text-gray-700">{formatRating(resource.rating)}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{resource.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{formatPrice(resource.price)}</span>
          <Button asChild>
            <Link href={`/resource/${resource.id}`}>Learn More</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
