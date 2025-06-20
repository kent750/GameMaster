# Character Creation Quiz Application

## Overview

This is a full-stack character creation quiz application built with React, Express, and PostgreSQL. The application presents users with a multi-stage questionnaire that determines their character archetype and attributes based on their choices. The system features a modern UI with shadcn/ui components, real-time character calculation, and comprehensive result presentation.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Storage**: PostgreSQL database (Neon serverless in production)
- **Session Management**: In-memory storage with fallback to database persistence

### Data Flow
1. User starts quiz → Creates new session
2. User answers questions → Updates session with choices
3. Quiz completion → Triggers character calculation
4. Results displayed → Character attributes and description generated

## Key Components

### Database Schema
Located in `shared/schema.ts`:
- **questions**: Stores quiz questions with stage, choices, and metadata
- **quiz_sessions**: Tracks user progress and selected choices
- **character_results**: Stores calculated character attributes and descriptions

### Storage Layer
- **Interface**: `IStorage` defines storage operations
- **Implementation**: `MemStorage` provides in-memory storage with pre-seeded questions
- **Future**: Ready for database implementation (PostgreSQL configured)

### Character Calculation
- **Algorithm**: Maps user choices to character traits and attributes
- **Attributes**: Strength, Wisdom, Agility, Mysticism (0-100 scale)
- **Categories**: Generated based on dominant trait combinations
- **Descriptions**: Dynamic character descriptions based on calculated attributes

### UI Components
- **QuestionStage**: Displays current question with choice cards
- **ChoiceCard**: Interactive choice selection with visual feedback
- **CharacterResults**: Comprehensive results display with sharing capabilities
- **Progress Tracking**: Visual progress indicators throughout quiz

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI primitives
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **vite**: Frontend build tool with HMR

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Port**: 5000 (configured in .replit)
- **Hot Reload**: Vite HMR for frontend, tsx for backend

### Production Build
- **Frontend**: `vite build` → `dist/public`
- **Backend**: `esbuild` → `dist/index.js`
- **Start**: `npm run start`

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- **Replit**: Configured for autoscale deployment

### Database Management
- **Migrations**: `npm run db:push` applies schema changes
- **Schema**: Drizzle generates types from schema definitions
- **Connection**: Serverless-ready with connection pooling

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 20, 2025. Initial setup