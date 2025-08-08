import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Zap, GraduationCap, Check } from "lucide-react";

export function CategoriesSection() {
  const categories = [
    {
      title: "Performance Cars",
      description: "BMW M, MINI JCW, Renault Sport, Hyundai N",
      icon: <Zap className="h-8 w-8 text-red-600" />,
      color: "red",
      bgColor: "bg-red-50 dark:bg-red-950",
      buttonColor: "bg-red-600 hover:bg-red-700",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      features: ["Up to £30k budget", "Performance focused", "Enthusiast approved"],
      priceRange: "£8k - £30k",
      category: "performance"
    },
    {
      title: "Beginner Friendly",
      description: "VW, FIAT, MINI - Perfect first cars",
      icon: <GraduationCap className="h-8 w-8 text-green-600" />,
      color: "green",
      bgColor: "bg-green-50 dark:bg-green-950",
      buttonColor: "bg-green-600 hover:bg-green-700",
      image: "https://images.unsplash.com/photo-1606016159549-62a3819cb531?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      features: ["£3k - £8k budget", "New driver friendly", "Reliable & economical"],
      priceRange: "£3k - £8k",
      category: "beginner"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Specialties
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We focus on two distinct markets - performance enthusiasts and new drivers, 
            ensuring every customer finds their perfect match
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {categories.map((category) => (
            <Card key={category.title} className="card-hover shadow-lg overflow-hidden bg-white dark:bg-gray-900">
              <CardContent className="p-0">
                <img
                  src={category.image}
                  alt={`${category.title} cars`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 ${category.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{category.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{category.description}</p>
                    <div className="text-lg font-semibold text-primary">{category.priceRange}</div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {category.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                        <Check className={`h-5 w-5 text-${category.color}-600 mr-3`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    asChild
                    className={`w-full text-white ${category.buttonColor}`}
                  >
                    <Link href={`/previously-sold?category=${category.category}`}>
                      Browse {category.title}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}