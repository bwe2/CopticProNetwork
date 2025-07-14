# Coptic Pro Network

## Overview

Coptic Pro Network is a professional networking and referral platform specifically designed for Coptic Orthodox Christians. It combines elements of LinkedIn, GroupMe, and AI-powered career tools to create a faith-based professional community. The platform enables users to find jobs through private referrals, share opportunities within trusted church groups, and build professional visibility through mentorship and community engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for development and build processes

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth with OpenID Connect + custom test users
- **Session Management**: Express sessions with PostgreSQL storage
- **API Design**: RESTful endpoints with WebSocket support for real-time features

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Key Tables**: users, groups, jobs, referrals, messages, resumes, notifications, sessions
- **User Tiers**: Enum-based tier system (free, pro, business)
- **Relationships**: Users can join multiple groups, create jobs, send referrals, and upload resumes

## Key Components

### Authentication System
- **Primary**: Replit Auth using OpenID Connect for production users
- **Development**: Custom test user system with predefined credentials
- **Session Storage**: PostgreSQL-backed session store with 7-day TTL
- **User Management**: Automatic user creation/update on login

### Subscription & Billing
- **Payment Provider**: Stripe for subscription management
- **Tiers**: Free (limited), Pro ($5/month), Business ($15/month)
- **Features**: Yearly discounts, webhook handling for tier changes
- **Access Control**: Feature gating based on user tier

### AI Integration
- **Provider**: OpenAI GPT-4o for resume analysis and content moderation
- **Features**: Resume parsing, optimization suggestions, content filtering
- **Access Control**: AI features restricted to Pro+ tiers

### Real-time Features
- **WebSockets**: Real-time messaging and notifications
- **Group Chat**: Church-based and topic-based group discussions
- **Live Updates**: Real-time job posting and referral notifications

## Data Flow

### User Onboarding
1. User authenticates via Replit Auth or test credentials
2. Profile creation with church, industry, and professional details
3. Group selection (1 church + 1 topic for Free users)
4. Dashboard personalization based on user tier

### Job & Referral System
1. Business tier users post job opportunities
2. Jobs are distributed to relevant groups and user feeds
3. Users can request referrals or apply directly
4. Referral tracking and status updates
5. AI-powered job matching based on skills and experience

### Content Moderation
1. All user-generated content passes through AI moderation
2. Flagged content is reviewed by administrators
3. Community guidelines enforcement
4. Automated spam and inappropriate content detection

## External Dependencies

### Authentication
- **Replit Auth**: OpenID Connect integration for user authentication
- **Passport.js**: Authentication middleware for Express

### Database & Storage
- **Neon Database**: PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database queries and migrations

### Payment Processing
- **Stripe**: Subscription management, payment processing, webhooks
- **Stripe React**: Frontend components for payment flows

### AI Services
- **OpenAI**: GPT-4o for resume analysis and content moderation
- **Content Analysis**: Automated text processing and optimization

### UI & Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library

## Deployment Strategy

### Development Environment
- **Replit**: Cloud-based development with hot reloading
- **Vite Dev Server**: Fast development builds and HMR
- **Environment Variables**: Secure credential management

### Production Build
- **Frontend**: Vite build with React optimization
- **Backend**: ESBuild bundling for Node.js deployment
- **Assets**: Static file serving with CDN support

### Database Management
- **Migrations**: Drizzle Kit for schema changes
- **Connection Pooling**: Efficient database connections
- **Backup Strategy**: Automated backups via Neon

### Security Considerations
- **HTTPS**: Secure communication in production
- **Session Security**: HttpOnly cookies with secure flags
- **Input Validation**: Zod schemas for data validation
- **Rate Limiting**: API endpoint protection
- **CORS**: Cross-origin resource sharing configuration

The application is designed for scalability with a clear separation of concerns between frontend and backend, robust authentication, and comprehensive feature gating based on subscription tiers. The AI integration provides value-added services while maintaining user privacy and content quality.