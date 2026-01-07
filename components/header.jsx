import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  Sparkles,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  await checkUser();

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo with Gradient Text */}
        <Link href="/" className="group">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Rocket className="h-6 w-6 text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110 group-hover:-rotate-12" />
              <div className="absolute -inset-1 bg-blue-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              CareerPilot
            </span>
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 md:gap-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden w-10 h-10 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <LayoutDashboard className="h-5 w-5" />
              </Button>
            </Link>

            {/* Career Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all ring-offset-2 hover:ring-2 ring-blue-500/20">
                  <Sparkles className="h-4 w-4" />
                  <span className="hidden md:block">Career Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 border-blue-100 dark:border-blue-900/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-blue-900/20 p-2"
              >
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-blue-50 dark:focus:bg-blue-900/20 rounded-md my-1">
                  <Link href="/resume" className="flex items-center gap-3 px-2 py-2">
                    <div className="p-1.5 rounded-md bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">Resume Builder</span>
                      <span className="text-xs text-muted-foreground">Create professional resumes</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-purple-50 dark:focus:bg-purple-900/20 rounded-md my-1">
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-3 px-2 py-2"
                  >
                     <div className="p-1.5 rounded-md bg-purple-100/50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                      <PenBox className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">Cover Letter AI</span>
                      <span className="text-xs text-muted-foreground">Smart letter generator</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-green-50 dark:focus:bg-green-900/20 rounded-md my-1">
                  <Link href="/interview" className="flex items-center gap-3 px-2 py-2">
                     <div className="p-1.5 rounded-md bg-green-100/50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">Interview Practice</span>
                      <span className="text-xs text-muted-foreground">Mock interviews & feedback</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button 
                variant="outline" 
                className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 md:w-10 md:h-10 ring-2 ring-blue-100 dark:ring-blue-900 hover:ring-blue-200 dark:hover:ring-blue-800 transition-all",
                  userButtonPopoverCard: "shadow-2xl border-blue-100 dark:border-blue-900",
                  userButtonPopoverActionButton: "hover:bg-blue-50 dark:hover:bg-blue-950/30",
                  userButtonPopoverActionButtonText: "text-foreground",
                  userButtonPopoverActionButtonIcon: "text-blue-600 dark:text-blue-400",
                  userPreviewMainIdentifier: "font-semibold text-foreground",
                  userPreviewSecondaryIdentifier: "text-muted-foreground",
                  userButtonPopoverFooter: "hidden",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
