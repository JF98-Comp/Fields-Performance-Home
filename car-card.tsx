import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Fuel, Gauge, Palette } from "lucide-react";
import { Link } from "wouter";
import type { Car } from "@shared/schema";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
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

  return (
    <Card className="card-hover shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800">
      <img
        src={car.images[0] || "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"}
        alt={`${car.make} ${car.model}`}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge className={getCategoryColor(car.category)}>
            {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
          </Badge>
          <span className="text-sm text-gray-500 dark:text-gray-400">{car.year}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {car.make} {car.model}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{car.description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Gauge className="h-4 w-4 mr-2" />
            {formatMileage(car.mileage)}
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Fuel className="h-4 w-4 mr-2" />
            {car.fuelType}
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-2" />
            {car.transmission}
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Palette className="h-4 w-4 mr-2" />
            {car.color}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{formatPrice(car.price)}</span>
          <Button asChild>
            <Link href={`/car/${car.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}