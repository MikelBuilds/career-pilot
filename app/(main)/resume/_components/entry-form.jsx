// app/resume/_components/entry-form.jsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { entrySchema } from "@/app/lib/schema";
import { Sparkles, PlusCircle, X, Pencil, Save, Loader2, Calendar, Building2, Briefcase } from "lucide-react";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";

const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

export function EntryForm({ type, entries, onChange }) {
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  const current = watch("current");

  const handleAdd = handleValidation((data) => {
    const formattedEntry = {
      ...data,
      startDate: formatDisplayDate(data.startDate),
      endDate: data.current ? "" : formatDisplayDate(data.endDate),
    };

    onChange([...entries, formattedEntry]);

    reset();
    setIsAdding(false);
  });

  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    onChange(newEntries);
  };

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAI);

  // Add this effect to handle the improvement result
  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("description", improvedContent);
      toast.success("Description improved successfully!");
    }
    if (improveError) {
      toast.error(improveError.message || "Failed to improve description");
    }
  }, [improvedContent, improveError, isImproving, setValue]);

  // Replace handleImproveDescription with this
  const handleImproveDescription = async () => {
    const description = watch("description");
    if (!description) {
      toast.error("Please enter a description first");
      return;
    }

    await improveWithAIFn({
      current: description,
      type: type.toLowerCase(), // 'experience', 'education', or 'project'
    });
  };

  return (
    <div className="space-y-4">
      {/* Existing Entries */}
      <div className="space-y-3">
        {entries.map((item, index) => (
          <Card key={index} className="border-2 hover:border-primary/30 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-base font-semibold">
                  {item.title} <span className="text-muted-foreground font-normal">@</span> {item.organization}
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => handleDelete(index)}
                className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                <Calendar className="h-3.5 w-3.5" />
                {item.current
                  ? `${item.startDate} - Present`
                  : `${item.startDate} - ${item.endDate}`}
              </div>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Entry Form */}
      {isAdding && (
        <Card className="border-2 border-dashed border-primary/40 bg-primary/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-primary" />
              Add {type}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Title / Position</label>
                <Input
                  placeholder="e.g. Software Engineer"
                  {...register("title")}
                  className="border-2"
                />
                {errors.title && (
                  <p className="text-sm text-rose-500 mt-1">{errors.title.message}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Organization / Company</label>
                <Input
                  placeholder="e.g. Google Inc."
                  {...register("organization")}
                  className="border-2"
                />
                {errors.organization && (
                  <p className="text-sm text-rose-500 mt-1">{errors.organization.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <Input
                  type="month"
                  {...register("startDate")}
                  className="border-2"
                />
                {errors.startDate && (
                  <p className="text-sm text-rose-500 mt-1">{errors.startDate.message}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">End Date</label>
                <Input
                  type="month"
                  {...register("endDate")}
                  disabled={current}
                  className="border-2 disabled:opacity-50"
                />
                {errors.endDate && (
                  <p className="text-sm text-rose-500 mt-1">{errors.endDate.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border">
              <input
                type="checkbox"
                id="current"
                {...register("current")}
                onChange={(e) => {
                  setValue("current", e.target.checked);
                  if (e.target.checked) {
                    setValue("endDate", "");
                  }
                }}
                className="h-4 w-4 rounded border-2 border-primary text-primary focus:ring-primary"
              />
              <label htmlFor="current" className="text-sm font-medium cursor-pointer">
                I currently work here / This is ongoing
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <Textarea
                placeholder={`Describe your ${type.toLowerCase()} responsibilities, achievements, and impact...`}
                className="h-32 border-2 resize-none"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-rose-500 mt-1">{errors.description.message}</p>
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleImproveDescription}
                disabled={isImproving || !watch("description")}
                className="mt-2 gap-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/30"
              >
                {isImproving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Improving...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Improve with AI
                  </>
                )}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setIsAdding(false);
              }}
              className="border-2"
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleAdd} className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Entry
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Add Entry Button */}
      {!isAdding && (
        <Button
          className="w-full h-12 border-2 border-dashed hover:border-primary hover:bg-primary/5 gap-2"
          variant="outline"
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="h-5 w-5" />
          Add {type}
        </Button>
      )}
    </div>
  );
}
