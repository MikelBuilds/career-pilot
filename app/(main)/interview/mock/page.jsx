import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from "../_components/quiz";

export default function MockInterviewPage() {
  return (
    <div className="relative container mx-auto space-y-6 py-6">
      {/* Background Effects */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 bg-[radial-gradient(circle,rgba(59,130,246,0.08),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 bg-[radial-gradient(circle,rgba(139,92,246,0.08),transparent_70%)]" />
      </div>

      <div className="flex flex-col space-y-4 mx-2">
        <Link href="/interview">
          <Button 
            variant="ghost" 
            className="gap-2 pl-0 hover:gap-3 transition-all text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Interview Preparation
          </Button>
        </Link>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Live Assessment</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Mock Interview
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Challenge yourself with industry-specific questions designed to prepare you for real interviews
          </p>
        </div>
      </div>

      <Quiz />
    </div>
  );
}
