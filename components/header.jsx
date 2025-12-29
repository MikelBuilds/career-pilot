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
import { LayoutDashboard, FileText, PenBox, ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="CareerPilot Logo"
            width={150}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
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

        {/* Actions */}
        <div className="flex items-center gap-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="outline" className="hidden md:flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
            <Link href="/resume">
             <Button variant="ghost" className="hidden md:flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Build Resume</span>
              </Button>
            </Link>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 ring-2 ring-gray-100",
                },
              }}
            />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost">Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Get Started</Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;