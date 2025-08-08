import { type User, type InsertUser, type Car, type InsertCar, type Inquiry, type InsertInquiry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getCars(): Promise<Car[]>;
  getFeaturedCars(): Promise<Car[]>;
  getCarsByCategory(category: string): Promise<Car[]>;
  getCar(id: string): Promise<Car | undefined>;
  searchCars(query: string): Promise<Car[]>;
  createCar(car: InsertCar): Promise<Car>;
  
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private cars: Map<string, Car>;
  private inquiries: Map<string, Inquiry>;

  constructor() {
    this.users = new Map();
    this.cars = new Map();
    this.inquiries = new Map();
    this.seedCars();
  }

  private seedCars() {
    const sampleCars: InsertCar[] = [
      {
        make: "BMW",
        model: "M3 Competition",
        year: 2021,
        price: 2850000, // £28,500
        category: "performance",
        mileage: 12500,
        fuelType: "Petrol",
        transmission: "Automatic",
        bodyType: "Saloon",
        color: "Alpine White",
        description: "Stunning BMW M3 Competition in pristine condition. This is the ultimate sports saloon with 510hp of twin-turbo V6 power. Meticulously maintained with full service history.",
        features: ["M Performance Exhaust", "Carbon Fiber Roof", "Harman Kardon Sound", "Adaptive M Suspension", "M Carbon Ceramic Brakes"],
        images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        isFeatured: 1,
        isAvailable: 1
      },
      {
        make: "MINI",
        model: "Cooper S JCW",
        year: 2020,
        price: 1850000, // £18,500
        category: "performance",
        mileage: 24000,
        fuelType: "Petrol",
        transmission: "Manual",
        bodyType: "Hatchback",
        color: "Chili Red",
        description: "Iconic MINI John Cooper Works with the performance upgrades that make every drive exhilarating. Perfect for those who want go-kart handling in a practical package.",
        features: ["JCW Performance Kit", "Sport Seats", "JCW Exhaust", "Track Mode", "Brembo Brakes"],
        images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        isFeatured: 1,
        isAvailable: 1
      },
      {
        make: "Volkswagen",
        model: "Golf",
        year: 2019,
        price: 650000, // £6,500
        category: "beginner",
        mileage: 35000,
        fuelType: "Petrol",
        transmission: "Manual",
        bodyType: "Hatchback",
        color: "Tornado Red",
        description: "Perfect first car! This VW Golf offers reliability, practicality, and the build quality Volkswagen is famous for. Ideal for new drivers.",
        features: ["Bluetooth Connectivity", "Air Conditioning", "Electric Windows", "Remote Central Locking", "Multi-Function Steering Wheel"],
        images: ["https://images.unsplash.com/photo-1606016159549-62a3819cb531?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        isFeatured: 0,
        isAvailable: 1
      },
      {
        make: "Renault",
        model: "Clio RS",
        year: 2018,
        price: 1250000, // £12,500
        category: "performance",
        mileage: 28000,
        fuelType: "Petrol",
        transmission: "Manual",
        bodyType: "Hatchback",
        color: "Liquid Yellow",
        description: "Renault Sport's finest hot hatch. The Clio RS offers incredible performance and handling that punches well above its weight class.",
        features: ["Renault Sport Chassis", "Recaro Seats", "RS Performance Monitor", "Launch Control", "Electronic Differential"],
        images: ["https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        isFeatured: 1,
        isAvailable: 1
      },
      {
        make: "FIAT",
        model: "500",
        year: 2020,
        price: 450000, // £4,500
        category: "beginner",
        mileage: 18000,
        fuelType: "Petrol",
        transmission: "Manual",
        bodyType: "Hatchback",
        color: "Pastel Blue",
        description: "Charming and economical FIAT 500, perfect for city driving and new drivers. Small, nimble, and economical with bags of character.",
        features: ["City Brake Control", "7-inch Touchscreen", "Bluetooth", "Electric Mirrors", "Split-Folding Rear Seats"],
        images: ["https://images.unsplash.com/photo-1600712242805-5f78671b24da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        isFeatured: 0,
        isAvailable: 1
      },
      {
        make: "Hyundai",
        model: "i30N",
        year: 2022,
        price: 2650000, // £26,500
        category: "performance",
        mileage: 8500,
        fuelType: "Petrol",
        transmission: "Manual",
        bodyType: "Hatchback",
        color: "Performance Blue",
        description: "Hyundai's impressive entry into the hot hatch market. The i30N delivers thrilling performance with everyday usability and a 5-year warranty.",
        features: ["N Performance Package", "Electronic LSD", "Launch Control", "Rev Matching", "Performance Seats"],
        images: ["https://images.unsplash.com/photo-1606016159549-62a3819cb531?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        isFeatured: 1,
        isAvailable: 1
      }
    ];

    sampleCars.forEach(car => {
      const id = randomUUID();
      this.cars.set(id, { ...car, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCars(): Promise<Car[]> {
    return Array.from(this.cars.values()).filter(car => car.isAvailable === 1);
  }

  async getFeaturedCars(): Promise<Car[]> {
    return Array.from(this.cars.values()).filter(
      car => car.isFeatured === 1 && car.isAvailable === 1
    );
  }

  async getCarsByCategory(category: string): Promise<Car[]> {
    return Array.from(this.cars.values()).filter(
      car => car.category === category && car.isAvailable === 1
    );
  }

  async getCar(id: string): Promise<Car | undefined> {
    const car = this.cars.get(id);
    return car && car.isAvailable === 1 ? car : undefined;
  }

  async searchCars(query: string): Promise<Car[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.cars.values()).filter(
      car => 
        car.isAvailable === 1 && (
          car.make.toLowerCase().includes(lowercaseQuery) ||
          car.model.toLowerCase().includes(lowercaseQuery) ||
          car.description.toLowerCase().includes(lowercaseQuery) ||
          car.category.toLowerCase().includes(lowercaseQuery) ||
          car.bodyType.toLowerCase().includes(lowercaseQuery) ||
          car.color.toLowerCase().includes(lowercaseQuery)
        )
    );
  }

  async createCar(insertCar: InsertCar): Promise<Car> {
    const id = randomUUID();
    const car: Car = { 
      ...insertCar, 
      id,
      features: insertCar.features || [],
      images: insertCar.images || [],
      isFeatured: insertCar.isFeatured || 0,
      isAvailable: insertCar.isAvailable || 1
    };
    this.cars.set(id, car);
    return car;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const inquiry: Inquiry = { 
      ...insertInquiry, 
      id, 
      phone: insertInquiry.phone || null,
      interestedInCategory: insertInquiry.interestedInCategory || null,
      budgetRange: insertInquiry.budgetRange || null,
      createdAt: new Date() 
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
}

export const storage = new MemStorage();
