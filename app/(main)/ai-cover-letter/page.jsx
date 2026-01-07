import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="page-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-950/50 dark:to-purple-950/50">
                <FileText className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <h1 className="page-title">My Cover Letters</h1>
            </div>
            <p className="page-description">
              Create professional, AI-powered cover letters tailored to each job application.
            </p>
          </div>
          <Link href="/ai-cover-letter/new">
            <Button size="lg" className="gap-2 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all">
              <Plus className="h-4 w-4" />
              Create New
            </Button>
          </Link>
        </div>
      </div>

      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
}
