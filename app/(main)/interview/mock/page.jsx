import Link from "next/link";
import { ArrowLeft, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from "../_components/quiz";

export default function MockInterviewPage() {
  return (
    <div className="relative space-y-8">
      {/* Background Effects */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 bg-[radial-gradient(circle,rgba(99,102,241,0.08),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 bg-[radial-gradient(circle,rgba(139,92,246,0.08),transparent_70%)]" />
      </div>

      {/* Back Navigation */}
      <Link href="/interview">
        <Button 
          variant="ghost" 
          className="gap-2 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Interview Preparation
        </Button>
      </Link>

      {/* Page Header */}
      <div className="page-header">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
            <Brain className="h-7 w-7 text-white" />
          </div>
          <div>
            <div className="badge-info mb-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
              </span>
              Live Assessment
            </div>
            <h1 className="page-title">Mock Interview</h1>
          </div>
        </div>
        <p className="page-description max-w-2xl">
          Challenge yourself with industry-specific questions designed to prepare you for real interviews
        </p>
      </div>

      <Quiz />
    </div>
  );
}
