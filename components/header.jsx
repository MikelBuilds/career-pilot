import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { LayoutDashboard, Sparkles, User, ArrowRight } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/90 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo with Gradient Effect */}
        <Link href="/" className="group flex items-center gap-2 transition-all hover:scale-105">
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 opacity-0 group-hover:opacity-20 blur transition-opacity" />
            <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg">
              <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">CareerPilot</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation - The "Sell" */}
        {/* Only show this when NOT logged in or always, depending on preference */}
        {/* <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/features" className="hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About Us
          </Link>
        </nav> */}

        {/* Actions with Enhanced Styling */}
        <div className="flex items-center gap-3">
          <SignedIn>
            <Link href="/dashboard">
              <Button 
                variant="outline" 
                className="hidden md:flex items-center gap-2 border-2 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="font-semibold">Dashboard</span>
              </Button>
            </Link>

            <div className="relative group">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 opacity-0 group-hover:opacity-40 blur transition-opacity" />
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 ring-2 ring-blue-100 dark:ring-blue-900 hover:ring-blue-300 dark:hover:ring-blue-700 transition-all",
                  },
                }}
              />
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button 
                variant="ghost" 
                className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all">
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;