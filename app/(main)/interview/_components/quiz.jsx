"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import QuizResult from "./quiz-result";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    setResultData(null);
  };

  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;
  }

  // Show results if quiz is completed
  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  if (!quizData) {
    return (
      <Card className="mx-2 relative overflow-hidden border-2 shadow-lg">
        <div className="absolute -inset-2 bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500 opacity-5 blur-2xl" />
        <CardHeader className="relative space-y-2">
          <CardTitle className="text-3xl font-bold gradient-title">
            Ready to test your knowledge?
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-4">
            <p className="text-muted-foreground text-lg">
              This quiz contains 10 questions specific to your industry and
              skills. Take your time and choose the best answer for each question.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
                <div className="h-10 w-10 rounded-full bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-bold">10</div>
                <div>
                  <p className="text-sm font-medium text-indigo-900 dark:text-indigo-100">Questions</p>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400">Industry-specific</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800">
                <div className="h-10 w-10 rounded-full bg-violet-600 dark:bg-violet-500 flex items-center justify-center text-white font-bold">⏱️</div>
                <div>
                  <p className="text-sm font-medium text-violet-900 dark:text-violet-100">Timed</p>
                  <p className="text-xs text-violet-600 dark:text-violet-400">At your pace</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                <div className="h-10 w-10 rounded-full bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white font-bold">✓</div>
                <div>
                  <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">Instant</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">Feedback</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="relative">
          <Button 
            onClick={generateQuizFn} 
            className="w-full h-12 text-base font-semibold btn-primary-gradient"
          >
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <Card className="mx-2 relative overflow-hidden border-2 shadow-lg">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-muted">
        <div 
          className="h-full bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <CardHeader className="space-y-3 pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold gradient-title">
            Question {currentQuestion + 1} of {quizData.length}
          </CardTitle>
          <span className="badge-primary">
            {Math.round(progress)}% Complete
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/20 dark:to-violet-950/20 border border-indigo-200 dark:border-indigo-800">
          <p className="text-lg font-medium leading-relaxed">{question.question}</p>
        </div>
        <RadioGroup
          onValueChange={handleAnswer}
          value={answers[currentQuestion]}
          className="space-y-3"
        >
          {question.options.map((option, index) => {
            const isSelected = answers[currentQuestion] === option;
            return (
              <div 
                key={index} 
                className={`group relative flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-violet-300 dark:hover:border-violet-700 ${
                  isSelected 
                    ? 'border-violet-500 dark:border-violet-600 bg-violet-50 dark:bg-violet-950/30 shadow-md' 
                    : 'border-border hover:bg-muted/50'
                }`}
              >
                <RadioGroupItem value={option} id={`option-${index}`} className="mt-0.5" />
                <Label 
                  htmlFor={`option-${index}`} 
                  className={`flex-1 cursor-pointer text-base ${
                    isSelected ? 'font-medium text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                  }`}
                >
                  {option}
                </Label>
              </div>
            );
          })}
        </RadioGroup>

        {showExplanation && (
          <div className="relative overflow-hidden mt-6 p-5 rounded-lg border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 shadow-inner animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(16,185,129,0.1),transparent_70%)]" />
            <p className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2 flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white text-sm">✓</span>
              Explanation:
            </p>
            <p className="text-muted-foreground leading-relaxed">{question.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between gap-4 pt-6">
        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!answers[currentQuestion]}
            className="border-2 hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all"
          >
            💡 Show Explanation
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          className="ml-auto px-8 btn-primary-gradient"
        >
          {savingResult && (
            <BarLoader className="mt-4" width={"100%"} color="gray" />
          )}
          {currentQuestion < quizData.length - 1
            ? "Next Question →"
            : "Finish Quiz ✓"}
        </Button>
      </CardFooter>
    </Card>
  );
}
