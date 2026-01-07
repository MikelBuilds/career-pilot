"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuizResult from "./quiz-result";
import { Play, Clock, TrendingUp, Sparkles } from "lucide-react";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      <Card className="border-2">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold gradient-title flex items-center gap-2">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                Recent Quizzes
              </CardTitle>
              <CardDescription className="mt-1">
                Review your past quiz performance and track your progress
              </CardDescription>
            </div>
            <Button 
              onClick={() => router.push("/interview/mock")}
              size="lg"
              className="gap-2 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
            >
              <Play className="h-4 w-4" />
              Start New Quiz
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {!assessments?.length ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="empty-state-title">No quizzes yet</h3>
              <p className="empty-state-description">
                Start your first quiz to begin practicing for your interviews.
              </p>
              <Button 
                onClick={() => router.push("/interview/mock")}
                className="mt-4"
              >
                Take Your First Quiz
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {assessments.map((assessment, i) => (
                <Card
                  key={assessment.id}
                  className="group cursor-pointer border-2 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md"
                  onClick={() => setSelectedQuiz(assessment)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold gradient-title flex items-center gap-2">
                        Quiz {i + 1}
                      </CardTitle>
                      <span className={`badge-${assessment.quizScore >= 70 ? 'success' : assessment.quizScore >= 50 ? 'warning' : 'primary'}`}>
                        <TrendingUp className="h-3 w-3" />
                        {assessment.quizScore.toFixed(1)}%
                      </span>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {format(new Date(assessment.createdAt), "MMMM dd, yyyy 'at' HH:mm")}
                    </CardDescription>
                  </CardHeader>
                  {assessment.improvementTip && (
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        💡 {assessment.improvementTip}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">Quiz Result</DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
