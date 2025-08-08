import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Sprout, TrendingUp, Rocket, Check } from "lucide-react";

export function SkillLevelsSection() {
  const skillLevels = [
    {
      title: "Beginner",
      description: "Perfect for those just starting their learning journey",
      icon: <Sprout className="h-8 w-8 text-green-600" />,
      color: "green",
      bgColor: "bg-green-50",
      buttonColor: "bg-green-600 hover:bg-green-700",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      features: ["Foundational concepts", "Step-by-step guidance", "Basic projects"],
      level: "beginner"
    },
    {
      title: "Intermediate",
      description: "Ready to take your skills to the next level",
      icon: <TrendingUp className="h-8 w-8 text-yellow-600" />,
      color: "yellow",
      bgColor: "bg-yellow-50",
      buttonColor: "bg-yellow-600 hover:bg-yellow-700",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      features: ["Advanced techniques", "Real-world applications", "Portfolio projects"],
      level: "intermediate"
    },
    {
      title: "Advanced",
      description: "Master complex concepts and become an expert",
      icon: <Rocket className="h-8 w-8 text-red-600" />,
      color: "red",
      bgColor: "bg-red-50",
      buttonColor: "bg-red-600 hover:bg-red-700",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      features: ["Expert-level content", "Industry insights", "Capstone projects"],
      level: "advanced"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our resources are carefully organized by skill level to ensure you get the most effective learning experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {skillLevels.map((level) => (
            <Card key={level.title} className="card-hover shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 ${level.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {level.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{level.title}</h3>
                  <p className="text-gray-600">{level.description}</p>
                </div>
                <img
                  src={level.image}
                  alt={`${level.title} learning`}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <ul className="space-y-3 mb-6">
                  {level.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Check className={`h-5 w-5 text-${level.color}-600 mr-3`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`w-full text-white ${level.buttonColor}`}
                >
                  <Link href={`/resources/${level.level}`}>
                    Explore {level.title} Resources
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
