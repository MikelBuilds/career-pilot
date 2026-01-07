"use client";

import { Trophy, CheckCircle2, XCircle, Lightbulb, RefreshCw, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  if (!result) return null;

  const scoreColor = result.quizScore >= 80 
    ? "text-emerald-600 dark:text-emerald-400" 
    : result.quizScore >= 60 
    ? "text-amber-600 dark:text-amber-400" 
    : "text-rose-600 dark:text-rose-400";

  const scoreGradient = result.quizScore >= 80
    ? "from-emerald-500 to-teal-500"
    : result.quizScore >= 60
    ? "from-amber-500 to-orange-500"
    : "from-rose-500 to-pink-500";

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg">
          <Trophy className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold gradient-title">Quiz Results</h2>
      </div>

      {/* Score Overview Card */}
      <div className="card-professional !p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Score Circle */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className={`relative h-32 w-32 rounded-full bg-gradient-to-br ${scoreGradient} p-1 shadow-xl`}>
              <div className="h-full w-full rounded-full bg-background flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${scoreColor}`}>
                  {result.quizScore.toFixed(0)}%
                </span>
                <span className="text-xs text-muted-foreground">Score</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Performance</span>
              <span className="text-muted-foreground">
                {result.quizScore >= 80 ? "Excellent!" : result.quizScore >= 60 ? "Good Progress" : "Keep Learning"}
              </span>
            </div>
            <Progress value={result.quizScore} className="h-3" />
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                {result.questions?.filter(q => q.isCorrect).length || 0} Correct
              </span>
              <span className="flex items-center gap-1.5">
                <XCircle className="h-4 w-4 text-rose-500" />
                {result.questions?.filter(q => !q.isCorrect).length || 0} Incorrect
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Improvement Tip */}
      {result.improvementTip && (
        <div className="card-professional !p-5 border-l-4 border-l-indigo-500">
          <div className="flex gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Improvement Tip</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{result.improvementTip}</p>
            </div>
          </div>
        </div>
      )}

      {/* Questions Review */}
      <div className="space-y-4">
        <h3 className="section-title flex items-center gap-2">
          <Target className="h-5 w-5" />
          Question Review
        </h3>
        
        <div className="space-y-3">
          {result.questions.map((q, index) => (
            <div 
              key={index} 
              className={`card-professional !p-4 border-l-4 ${
                q.isCorrect 
                  ? "border-l-emerald-500" 
                  : "border-l-rose-500"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <p className="font-medium text-foreground">{q.question}</p>
                </div>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-rose-500 flex-shrink-0" />
                )}
              </div>
              
              <div className="ml-9 space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">Your answer: </span>
                  <span className={q.isCorrect ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-rose-600 dark:text-rose-400"}>
                    {q.userAnswer}
                  </span>
                </div>
                {!q.isCorrect && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Correct answer: </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">{q.answer}</span>
                  </div>
                )}
                <div className="text-sm bg-muted/50 dark:bg-muted/30 p-3 rounded-lg mt-2">
                  <p className="font-medium text-foreground mb-1">Explanation:</p>
                  <p className="text-muted-foreground">{q.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Start New Quiz Button */}
      {!hideStartNew && (
        <div className="pt-4">
          <Button onClick={onStartNew} className="w-full h-12 btn-primary-gradient gap-2">
            <RefreshCw className="h-4 w-4" />
            Start New Quiz
          </Button>
        </div>
      )}
    </div>
  );
}
