"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Target, 
  TrendingUp,
  Zap,
  Award,
  Users,
  FileText,
  GraduationCap,
  Rocket
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute top-0 h-full w-full bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.12),rgba(255,255,255,0))]" />
        <div className="absolute top-1/3 right-0 h-96 w-96 bg-[radial-gradient(circle,rgba(99,102,241,0.08),transparent_60%)]" />
        <div className="absolute bottom-1/4 left-0 h-72 w-72 bg-[radial-gradient(circle,rgba(139,92,246,0.06),transparent_60%)]" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:py-32">
        <div className="text-center">
          
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-muted-foreground">AI-Powered Career Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="mx-auto max-w-4xl">
            <span className="block text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Navigate Your Career
            </span>
            <span className="block mt-2 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl gradient-title">
              With Confidence
            </span>
          </h1>

          {/* Subtext */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            From <span className="font-semibold text-foreground">resume building</span> to{" "}
            <span className="font-semibold text-foreground">interview prep</span>, get 
            AI-driven insights tailored to your industry and experience level.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button 
                size="lg" 
                className="h-12 px-8 text-base font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="#features">
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 px-8 text-base font-semibold border-2"
              >
                <Zap className="mr-2 h-5 w-5" />
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <div className="badge-primary">
              <CheckCircle2 className="h-4 w-4" />
              <span>AI-Powered</span>
            </div>
            <div className="badge-info">
              <Target className="h-4 w-4" />
              <span>Industry Focused</span>
            </div>
            <div className="badge-success">
              <TrendingUp className="h-4 w-4" />
              <span>Career Growth</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
          <div className="card-professional text-center group">
            <div className="card-feature-icon mx-auto mb-4 group-hover:scale-110 transition-transform">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Smart Resume Builder</h3>
            <p className="text-sm text-muted-foreground">Create professional resumes with AI-powered suggestions</p>
          </div>
          
          <div className="card-professional text-center group">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-950/50 dark:to-purple-950/50 text-violet-600 dark:text-violet-400 mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">AI Cover Letters</h3>
            <p className="text-sm text-muted-foreground">Generate tailored cover letters in seconds</p>
          </div>
          
          <div className="card-professional text-center group">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/50 text-emerald-600 dark:text-emerald-400 mx-auto mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Interview Practice</h3>
            <p className="text-sm text-muted-foreground">Practice with AI-generated mock interviews</p>
          </div>
        </div>

        {/* Banner Image */}
        <div className="relative mt-20">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-purple-500/10 blur-2xl" />
          
          <div className="relative rounded-2xl border-2 bg-background/50 p-2 shadow-2xl backdrop-blur-sm sm:p-3 lg:rounded-3xl">
            <div className="overflow-hidden rounded-xl lg:rounded-2xl ring-1 ring-border">
              <Image
                src="/banner.png"
                alt="CareerPilot Dashboard - AI-powered career insights and tools"
                width={1400}
                height={800}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}