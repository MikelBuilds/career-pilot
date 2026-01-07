<div align="center">

<!-- Replace with your actual banner image -->
![CareerPilot Banner](public/banner2.png)

# CareerPilot

### Your AI-Powered Career Coach

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?logo=prisma)](https://www.prisma.io/)

</div>

---

## 📌 Introduction

**CareerPilot** is an AI-powered career coaching platform that helps job seekers build professional resumes, generate tailored cover letters, and practice for interviews with intelligent mock assessments. Leveraging Google's Gemini AI, it provides personalized industry insights, skill recommendations, and real-time feedback to accelerate your career growth.

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15.5 (App Router with Turbopack) |
| **Frontend** | React 19, Tailwind CSS 4, Radix UI Primitives |
| **UI Components** | Shadcn/ui, Lucide Icons, Recharts |
| **Authentication** | Clerk |
| **Database** | PostgreSQL with Prisma ORM |
| **AI/LLM** | Google Generative AI (Gemini) |
| **Background Jobs** | Inngest |
| **Form Handling** | React Hook Form + Zod Validation |
| **Styling** | Tailwind CSS, class-variance-authority, tailwind-merge |
| **Utilities** | date-fns, html2pdf.js, next-themes |

---

## ✨ Key Features

- **🎯 Smart Onboarding** — Industry-specific profile setup to personalize your experience
- **📊 Dashboard** — Centralized view of your career progress and AI-generated industry insights
- **📝 AI Resume Builder** — Create ATS-optimized resumes with real-time AI feedback and scoring
- **✉️ AI Cover Letter Generator** — Generate tailored cover letters for specific job applications
- **🎤 Mock Interview Practice** — AI-powered interview simulations with performance analytics
- **📈 Performance Tracking** — Visualize your quiz scores and improvement over time with charts
- **🔐 Secure Authentication** — Clerk-powered sign-in/sign-up with protected routes
- **🌙 Theme Support** — Light and dark mode with next-themes

---

## 📊 Data Model

```
┌─────────────────┐       ┌─────────────────┐
│      User       │───────│ IndustryInsight │
├─────────────────┤       ├─────────────────┤
│ id, email, name │       │ salaryRanges    │
│ industry, bio   │       │ growthRate      │
│ experience      │       │ topSkills       │
│ skills[]        │       │ marketOutlook   │
└────────┬────────┘       └─────────────────┘
         │
    ┌────┴────┬──────────────┐
    ▼         ▼              ▼
┌────────┐ ┌────────┐ ┌─────────────┐
│ Resume │ │  Quiz  │ │ CoverLetter │
│        │ │Assessment│             │
└────────┘ └────────┘ └─────────────┘
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Database (PostgreSQL - Neon recommended)
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Inngest (Background Jobs)
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

---

## 🚀 Installation Guide

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- PostgreSQL database (or [Neon](https://neon.tech) for serverless)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/career-pilot.git
   cd career-pilot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual credentials
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 🗄️ Database Setup

1. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

2. **Push schema to database**
   ```bash
   npx prisma db push
   ```

3. **View database with Prisma Studio** (optional)
   ```bash
   npx prisma studio
   ```

4. **Run migrations** (for production)
   ```bash
   npx prisma migrate deploy
   ```

---

## 📁 Project Structure

```
career-pilot/
├── app/
│   ├── (auth)/              # Authentication routes (sign-in, sign-up)
│   ├── (main)/              # Protected app routes
│   │   ├── dashboard/       # User dashboard
│   │   ├── resume/          # AI Resume Builder
│   │   ├── ai-cover-letter/ # Cover Letter Generator
│   │   ├── interview/       # Mock Interview Practice
│   │   └── onboarding/      # User onboarding flow
│   └── api/                 # API routes (Inngest)
├── actions/                 # Server actions (AI operations)
├── components/              # Reusable UI components
├── lib/                     # Utilities, Prisma client, helpers
├── prisma/                  # Database schema & migrations
└── public/                  # Static assets
```

---


<div align="center">

**Built with ❤️ using Next.js and AI**

</div>