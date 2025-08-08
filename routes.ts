import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all cars
  app.get("/api/cars", async (req, res) => {
    try {
      const cars = await storage.getCars();
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cars" });
    }
  });

  // Get featured cars
  app.get("/api/cars/featured", async (req, res) => {
    try {
      const cars = await storage.getFeaturedCars();
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured cars" });
    }
  });

  // Get cars by category
  app.get("/api/cars/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const cars = await storage.getCarsByCategory(category);
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cars by category" });
    }
  });

  // Search cars
  app.get("/api/cars/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      const cars = await storage.searchCars(query);
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: "Failed to search cars" });
    }
  });

  // Get single car
  app.get("/api/cars/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const car = await storage.getCar(id);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      res.json(car);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch car" });
    }
  });

  // Create inquiry
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid inquiry data",
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create inquiry" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
