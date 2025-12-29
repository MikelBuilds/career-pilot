"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react"; // Assuming you have lucide-react installed

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-24 pb-20 md:pt-32 lg:pb-32">
      
      {/* Background Gradients - Adds depth without clutter */}
      <div className="absolute top-0 z-[-1] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      
      <div className="mx-auto max-w-6xl px-6 text-center">
        
        {/* Badge - Modern touch to announce status or target audience */}
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            For Tier-3 Engineers
          </span>
        </div>

        {/* Headline - Tighter tracking and gradient text */}
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:leading-[1.1]">
          Find direction. Build skills.
          <br className="hidden md:block" />
          <span className="block mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Aim higher with clarity.
          </span>
        </h1>

        {/* Subtext - Better width constraint for readability */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          CareerPilot helps you cut through the confusion, choose the right path, 
          and focus on the skills that actually improve placement outcomes.
        </p>

        {/* Actions - Added icon and shadow */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/dashboard">
            <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link href="/about">
            <Button size="lg" variant="ghost" className="h-12 px-8 text-base hover:bg-muted/80">
              How It Works
            </Button>
          </Link>
        </div>

        {/* Social Proof / Trust (Optional but recommended) */}
        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-blue-600" />
            <span>Placement Focused</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-blue-600" />
            <span>Roadmap Based</span>
          </div>
        </div>

        {/* Banner with Glow Effect */}
        <div className="relative mt-16">
          {/* The Glow */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 opacity-15 blur-2xl" />
          
          <div className="relative rounded-xl border bg-background/50 p-2 shadow-2xl backdrop-blur-sm lg:rounded-2xl lg:p-3">
            <div className="overflow-hidden rounded-lg lg:rounded-xl">
              <Image
                src="/banner.png"
                alt="Career guidance dashboard preview"
                width={1400}
                height={800}
                className="h-auto w-full object-cover shadow-sm"
                priority
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}