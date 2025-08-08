# Fields Performance - Car Sales Business Website

## Overview

Fields Performance is a premium car sales business landing page built with React, Express, and TypeScript. The website showcases a Southampton-based car business run by two brothers with over a decade of motor trade experience, specializing in sourcing performance cars (BMW M, MINI JCW, Renault Sport, Hyundai N) up to £30k and beginner-friendly cars (VW, FIAT, MINI) from £3k-£8k. The site serves as a business showcase and contact platform, with cars sold through external advertising platforms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite with custom configuration
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **API Pattern**: RESTful API design
- **Error Handling**: Centralized error middleware
- **Logging**: Custom request/response logging middleware

### Database & ORM
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle Kit for database migrations
- **Connection**: @neondatabase/serverless driver

## Key Components

### Data Models
- **Cars**: Vehicle inventory with make, model, year, price, category, images, features, specifications
- **Inquiries**: Contact form submissions from potential customers
- **Gallery**: Image management system for showcasing vehicle inventory

### Storage Layer
- **Interface**: IStorage abstraction for data operations
- **Implementation**: MemStorage (in-memory storage with seeded data)
- **Operations**: CRUD operations for users, resources, and inquiries

### UI Components
- **Component Library**: shadcn/ui with Radix UI primitives
- **Layout Components**: Header, Footer, Hero section
- **Feature Components**: Resource cards, search bar, skill level sections
- **Form Components**: Contact form with validation

### Pages & Routing
- **Home**: Landing page with hero section and about section
- **About**: Detailed business information and experience
- **Gallery**: Visual showcase of expertise and example vehicles
- **Contact**: Inquiry form for potential customer engagement
- **404**: Not found page

### Recent Changes (July 31, 2025)
- Removed all inventory/stock viewing features per user request
- Transformed from car sales inventory site to business landing page
- Updated navigation: removed "Previously Sold", kept "Gallery" for business showcase
- Modified hero CTA from "View Previously Sold" to "Learn About Us"
- Updated footer services section to focus on business offerings
- Changed gallery descriptions to emphasize expertise rather than sales
- Removed featured cars and categories sections from homepage
- Focused site on business presentation and contact generation

## Data Flow

### Resource Discovery
1. User visits homepage or resources page
2. Frontend fetches resources via React Query
3. Server queries storage layer (currently in-memory)
4. Resources displayed with filtering by skill level or search
5. User can view detailed resource information

### User Inquiries
1. User fills contact form with personal details and interests
2. Form validation using Zod schema
3. POST request to /api/inquiries endpoint
4. Server validates and stores inquiry
5. Success/error feedback to user

### Search & Filtering
1. User enters search query or selects skill level filter
2. Frontend makes API request with parameters
3. Server performs search/filter operations
4. Results displayed with maintained state

## External Dependencies

### Core Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **ORM**: drizzle-orm and drizzle-zod for database operations
- **UI**: @radix-ui components, tailwindcss, class-variance-authority
- **State**: @tanstack/react-query for server state management
- **Forms**: react-hook-form, @hookform/resolvers for form handling
- **Validation**: zod for schema validation
- **Routing**: wouter for client-side routing

### Development Tools
- **Build**: vite, esbuild for production builds
- **TypeScript**: Full TypeScript support across frontend and backend
- **Development**: tsx for TypeScript execution in development

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Assets**: Static assets served from built frontend

### Environment Configuration
- **Development**: Uses tsx for hot reloading, Vite dev server
- **Production**: Compiled JavaScript execution with static file serving
- **Database**: Requires DATABASE_URL environment variable

### Server Setup
- **Port Configuration**: Configurable via environment
- **Static Serving**: Express serves built frontend in production
- **API Routes**: All API endpoints prefixed with `/api`
- **Error Handling**: Global error middleware for API errors

### Database Deployment
- **Schema**: Defined in `shared/schema.ts`
- **Migrations**: Generated to `./migrations` directory
- **Push**: `npm run db:push` applies schema changes
- **Configuration**: Drizzle config points to PostgreSQL database

The application is designed to be easily deployable to platforms like Replit, with environment-based configuration and a simple build process that produces a single production server.