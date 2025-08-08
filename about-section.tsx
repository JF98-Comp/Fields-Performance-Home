import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Heart, Target } from "lucide-react";

export function AboutSection() {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Passion Driven",
      description: "Every car is chosen with a petrolhead's eye for quality and character"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Personal Service",
      description: "Small company means more attention to detail and one-on-one customer care"
    },
    {
      icon: <Award className="h-8 w-8 text-green-600" />,
      title: "Quality Focus",
      description: "We only sell cars we'd proudly own ourselves - no exceptions"
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Honest Approach",
      description: "Transparent pricing and genuine enthusiasm for helping you find the right car"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Founded in 2024 and driven by over a decade of hands-on experience in the motor trade, 
                we're two brothers united by a lifelong passion for performance cars and all things automotive. 
                Based in Southampton, our business was born from a simple but powerful idea — to bring honesty, 
                excitement, and true enthusiast spirit back to car buying.
              </p>
              <p>
                We specialise in sourcing and selling performance-focused models like BMW M, MINI JCW, 
                Renault Sport, and Hyundai N, alongside carefully selected beginner-friendly cars such as VW, 
                FIAT, and MINI. But here's what sets us apart: we don't just sell any car — we only choose vehicles 
                we'd proudly own ourselves. Every car in our inventory is hand-picked with a petrolhead's eye and held 
                to the highest standards of quality, character, and driving enjoyment.
              </p>
              <p>
                As a small, growing company, we focus on low-volume, high-quality stock. This means more attention 
                to detail, more time spent finding the right cars, and more one-on-one service for our customers. 
                We're not here to push metal — we're here to share our passion, build trust, and help fellow 
                enthusiasts find their perfect car.
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                Whether you're hunting for your first hot hatch or your dream performance machine, we're here to 
                make the experience personal, transparent, and exciting — just like driving should be.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
              alt="Car dealership"
              className="rounded-xl shadow-lg w-full h-auto"
            />
            <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-4 rounded-lg shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">10+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="text-center bg-gray-50 dark:bg-gray-800 border-none">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <blockquote className="text-2xl font-medium text-gray-900 dark:text-white italic">
            "Whether you're hunting for your first hot hatch or your dream performance machine, 
            we're here to make the experience personal, transparent, and exciting — just like driving should be."
          </blockquote>
          <p className="mt-4 text-gray-600 dark:text-gray-400">— The Fields Performance Team</p>
        </div>
      </div>
    </section>
  );
}