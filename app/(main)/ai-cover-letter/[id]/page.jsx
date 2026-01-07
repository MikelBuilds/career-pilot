import Link from "next/link";
import { ArrowLeft, FileText, Building2, Briefcase, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCoverLetter } from "@/actions/cover-letter";
import CoverLetterPreview from "../_components/cover-letter-preview";

export default async function EditCoverLetterPage({ params }) {
  const { id } = await params;
  const coverLetter = await getCoverLetter(id);

  return (
    <div className="space-y-8">
      {/* Back Navigation */}
      <Link href="/ai-cover-letter">
        <Button variant="ghost" className="gap-2 -ml-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Cover Letters
        </Button>
      </Link>

      {/* Page Header */}
      <div className="page-header">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
            <FileText className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="page-title mb-1">
              {coverLetter?.jobTitle || "Cover Letter"}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4" />
                {coverLetter?.companyName || "Company"}
              </span>
              {coverLetter?.createdAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(coverLetter.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cover Letter Content */}
      <div className="card-professional">
        <CoverLetterPreview content={coverLetter?.content} />
      </div>
    </div>
  );
}
