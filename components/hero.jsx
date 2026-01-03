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
  Users
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-20 pb-16 md:pt-28 lg:pb-24">
      
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute top-0 h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))]" />
        <div className="absolute top-1/4 right-0 h-96 w-96 bg-[radial-gradient(circle,rgba(139,92,246,0.1),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 bg-[radial-gradient(circle,rgba(34,197,94,0.08),transparent_70%)]" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 text-center">
        
        {/* Animated Badge */}
        <div className="mb-8 flex justify-center animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="group relative">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 opacity-20 blur group-hover:opacity-40 transition-opacity" />
            <span className="relative inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-800 bg-background/80 px-5 py-2 text-sm font-medium shadow-sm backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
              </span>
              <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              AI-Powered Career Guidance for Engineers
            </span>
          </div>
        </div>

        {/* Main Headline with Staggered Animation */}
        <h1 className="mx-auto max-w-5xl animate-in fade-in slide-in-from-top-6 duration-1000 delay-150">
          <span className="block text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.1]">
            Navigate Your Career
          </span>
          <span className="block mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent animate-gradient">
              With Confidence
            </span>
          </span>
        </h1>

        {/* Enhanced Subtext */}
        <p className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-8 duration-1000 delay-300">
          From <span className="font-semibold text-foreground">resume building</span> to{" "}
          <span className="font-semibold text-foreground">interview prep</span>, CareerPilot provides 
          AI-driven insights tailored to your industry and experience level.
        </p>

        {/* CTA Buttons with Enhanced Styling */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-top-10 duration-1000 delay-500">
          <Link href="/dashboard">
            <Button 
              size="lg" 
              className="group h-14 px-10 text-base font-semibold shadow-xl shadow-blue-500/25 transition-all hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          <Link href="#features">
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-10 text-base font-semibold border-2 hover:bg-muted/50 hover:scale-105 transition-all"
            >
              <Zap className="mr-2 h-5 w-5" />
              See How It Works
            </Button>
          </Link>
        </div>

        {/* Enhanced Trust Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm animate-in fade-in duration-1000 delay-700">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/30">
            <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-blue-900 dark:text-blue-100">AI-Powered</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-950/30">
            <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="font-medium text-purple-900 dark:text-purple-100">Industry Focused</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-950/30">
            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="font-medium text-green-900 dark:text-green-100">Career Growth</span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl mx-auto animate-in fade-in duration-1000 delay-1000">
          <div className="group relative p-6 rounded-2xl border bg-gradient-to-br from-blue-50 to-background dark:from-blue-950/20 dark:to-background hover:shadow-lg transition-all">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 blur transition-opacity" />
            <div className="relative">
              <Award className="h-8 w-8 mx-auto text-blue-600 dark:text-blue-400 mb-3" />
              <div className="text-3xl font-bold gradient-title mb-1">AI-Driven</div>
              <p className="text-sm text-muted-foreground">Personalized insights</p>
            </div>
          </div>
          
          <div className="group relative p-6 rounded-2xl border bg-gradient-to-br from-purple-50 to-background dark:from-purple-950/20 dark:to-background hover:shadow-lg transition-all">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-purple-500 to-green-500 opacity-0 group-hover:opacity-20 blur transition-opacity" />
            <div className="relative">
              <Target className="h-8 w-8 mx-auto text-purple-600 dark:text-purple-400 mb-3" />
              <div className="text-3xl font-bold gradient-title mb-1">15+ Industries</div>
              <p className="text-sm text-muted-foreground">Specialized guidance</p>
            </div>
          </div>
          
          <div className="group relative p-6 rounded-2xl border bg-gradient-to-br from-green-50 to-background dark:from-green-950/20 dark:to-background hover:shadow-lg transition-all">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 opacity-0 group-hover:opacity-20 blur transition-opacity" />
            <div className="relative">
              <Users className="h-8 w-8 mx-auto text-green-600 dark:text-green-400 mb-3" />
              <div className="text-3xl font-bold gradient-title mb-1">100%</div>
              <p className="text-sm text-muted-foreground">Success focused</p>
            </div>
          </div>
        </div>

        {/* Banner with Enhanced Glow Effect */}
        <div className="relative mt-20 animate-in fade-in duration-1000 delay-1000">
          {/* Multi-layer Glow */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 opacity-20 blur-3xl" />
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 blur-2xl animate-pulse" />
          
          <div className="relative rounded-2xl border-2 border-blue-100 dark:border-blue-900/50 bg-background/60 p-3 shadow-2xl backdrop-blur-sm lg:rounded-3xl lg:p-4 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
            <div className="overflow-hidden rounded-xl lg:rounded-2xl ring-1 ring-black/5">
              <Image
                src="/banner.png"
                alt="Career guidance dashboard preview showcasing AI-powered insights and career planning tools"
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