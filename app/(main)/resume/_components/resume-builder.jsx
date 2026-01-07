"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { saveResume } from "@/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";


export default function ResumeBuilder({ initialContent }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent ?? "");
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  // Watch form fields for preview updates
  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  // Update preview content when form values change
  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  // Handle save result
  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user.fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const [isGenerating, setIsGenerating] = useState(false);


  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("resume-pdf");
      if (!element) {
        toast.error("Resume preview not ready for PDF export.");
        return;
      }

      // Ensure DOM has painted before capture
      await new Promise((resolve) => requestAnimationFrame(resolve));

      const opt = {
        margin: [15, 15],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          onclone: (doc) => {
            // html2canvas doesn't support modern CSS color functions (oklch, lab, etc.)
            // Apply safe inline styles to the PDF container
            const pdfRoot = doc.getElementById("resume-pdf");
            if (pdfRoot) {
              // Make element visible and positioned for capture
              pdfRoot.style.position = "relative";
              pdfRoot.style.left = "0";
              pdfRoot.style.top = "0";
              pdfRoot.style.width = "210mm";
              pdfRoot.style.minHeight = "297mm";
              pdfRoot.style.background = "#ffffff";
              pdfRoot.style.color = "#000000";
              pdfRoot.style.padding = "20mm";
              
              // Force all text elements to be black
              pdfRoot.querySelectorAll("*").forEach((el) => {
                const computed = window.getComputedStyle(el);
                el.style.color = "#000000";
                el.style.background = "transparent";
                // Preserve font sizes
                if (computed.fontSize) {
                  el.style.fontSize = computed.fontSize;
                }
              });
            }

            // Remove all stylesheets to avoid color parsing issues
            doc.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
              link.remove();
            });
            doc.querySelectorAll("style").forEach((style) => {
              style.remove();
            });
          },
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      // Import dynamically to avoid bundler/server issues
      const html2pdfModule = await import("html2pdf.js");
      const html2pdf = html2pdfModule?.default ?? html2pdfModule;
      if (typeof html2pdf !== "function") {
        throw new Error("html2pdf failed to load (unexpected module shape)");
      }
      
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error(
        error?.message ? `Failed to generate PDF: ${error.message}` : "Failed to generate PDF. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formattedContent = previewContent
        .replace(/\n/g, "\n") // Normalize newlines
        .replace(/\n\s*\n/g, "\n\n") // Normalize multiple newlines to double newlines
        .trim();

      console.log(previewContent, formattedContent);
      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div data-color-mode="light" className="space-y-8">
      {/* Page Header */}
      <div className="page-header">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="page-title">Resume Builder</h1>
            </div>
            <p className="page-description">
              Create a professional resume with our easy-to-use builder. Add your details and export to PDF.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleSubmit(onSubmit)}
              disabled={isSaving}
              className="gap-2 border-2 hover:border-blue-300 dark:hover:border-blue-700"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Resume
                </>
              )}
            </Button>
            <Button 
              size="lg"
              onClick={generatePDF} 
              disabled={isGenerating}
              className="gap-2 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2 p-1">
          <TabsTrigger value="edit" className="gap-2">
            <Edit className="h-4 w-4" />
            Form Editor
          </TabsTrigger>
          <TabsTrigger value="preview" className="gap-2">
            <Monitor className="h-4 w-4" />
            Markdown View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-0">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Contact Information */}
            <div className="card-professional">
              <div className="section-header">
                <h3 className="section-title">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Contact Information
                </h3>
                <p className="section-description">Add your personal and contact details</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <Input
                    {...register("contactInfo.email")}
                    type="email"
                    placeholder="your@email.com"
                    className="h-11"
                  />
                  {errors.contactInfo?.email && (
                    <p className="form-error">{errors.contactInfo.email.message}</p>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <Input
                    {...register("contactInfo.mobile")}
                    type="tel"
                    placeholder="+1 234 567 8900"
                    className="h-11"
                  />
                  {errors.contactInfo?.mobile && (
                    <p className="form-error">{errors.contactInfo.mobile.message}</p>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">LinkedIn Profile</label>
                  <Input
                    {...register("contactInfo.linkedin")}
                    type="url"
                    placeholder="https://linkedin.com/in/your-profile"
                    className="h-11"
                  />
                  {errors.contactInfo?.linkedin && (
                    <p className="form-error">{errors.contactInfo.linkedin.message}</p>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Twitter / X Profile</label>
                  <Input
                    {...register("contactInfo.twitter")}
                    type="url"
                    placeholder="https://twitter.com/your-handle"
                    className="h-11"
                  />
                  {errors.contactInfo?.twitter && (
                    <p className="form-error">{errors.contactInfo.twitter.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="card-professional">
              <div className="section-header">
                <h3 className="section-title">
                  <Sparkles className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  Professional Summary
                </h3>
                <p className="section-description">Write a compelling overview of your career</p>
              </div>
              <div className="mt-6">
                <Controller
                  name="summary"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className="min-h-32 resize-y"
                      placeholder="Write a compelling professional summary that highlights your key achievements and career goals..."
                    />
                  )}
                />
                {errors.summary && (
                  <p className="form-error mt-2">{errors.summary.message}</p>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="card-professional">
              <div className="section-header">
                <h3 className="section-title">
                  <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  Skills & Expertise
                </h3>
                <p className="section-description">List your technical and soft skills</p>
              </div>
              <div className="mt-6">
                <Controller
                  name="skills"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className="min-h-32 resize-y"
                      placeholder="List your key skills (e.g., JavaScript, React, Node.js, Project Management, Team Leadership...)"
                    />
                  )}
                />
                {errors.skills && (
                  <p className="form-error mt-2">{errors.skills.message}</p>
                )}
              </div>
            </div>

            {/* Experience */}
            <div className="card-professional">
              <div className="section-header">
                <h3 className="section-title">
                  <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Work Experience
                </h3>
                <p className="section-description">Add your professional work history</p>
              </div>
              <div className="mt-6">
                <Controller
                  name="experience"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                      type="Experience"
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.experience && (
                  <p className="form-error mt-2">{errors.experience.message}</p>
                )}
              </div>
            </div>

            {/* Education */}
            <div className="card-professional">
              <div className="section-header">
                <h3 className="section-title">
                  <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  Education
                </h3>
                <p className="section-description">Add your educational background</p>
              </div>
              <div className="mt-6">
                <Controller
                  name="education"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                      type="Education"
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.education && (
                  <p className="form-error mt-2">{errors.education.message}</p>
                )}
              </div>
            </div>

            {/* Projects */}
            <div className="card-professional">
              <div className="section-header">
                <h3 className="section-title">
                  <FolderKanban className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  Projects
                </h3>
                <p className="section-description">Showcase your notable projects</p>
              </div>
              <div className="mt-6">
                <Controller
                  name="projects"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                      type="Project"
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.projects && (
                  <p className="form-error mt-2">{errors.projects.message}</p>
                )}
              </div>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              type="button"
              className="gap-2"
              onClick={() =>
                setResumeMode(resumeMode === "preview" ? "edit" : "preview")
              }
            >
              {resumeMode === "preview" ? (
                <>
                  <Edit className="h-4 w-4" />
                  Edit Markdown
                </>
              ) : (
                <>
                  <Monitor className="h-4 w-4" />
                  Show Preview
                </>
              )}
            </Button>
          </div>

          {resumeMode !== "preview" && (
            <div className="flex p-4 gap-3 items-center rounded-lg border-2 border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium">
                Changes made here will be overwritten if you update the form data.
              </span>
            </div>
          )}
          
          <div className="rounded-xl border-2 overflow-hidden">
            <MDEditor
              value={previewContent ?? ""}
              onChange={setPreviewContent}
              height={700}
              preview={resumeMode}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Keep PDF source always mounted (Download works on any tab) */}
      <div
        id="resume-pdf"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: "210mm",
          minHeight: "297mm",
          background: "#ffffff",
          color: "#000000",
          padding: "20mm",
          fontFamily: "Georgia, serif",
          fontSize: "12pt",
          lineHeight: "1.8",
        }}
      >
        <div style={{ 
          whiteSpace: "pre-wrap", 
          wordBreak: "break-word",
          color: "#000000",
          fontSize: "12pt"
        }}>
          {previewContent ?? "No content to export"}
        </div>
      </div>
    </div>
  );
}
