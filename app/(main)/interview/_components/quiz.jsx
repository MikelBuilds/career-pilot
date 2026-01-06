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
        <div className="absolute -inset-2 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 opacity-5 blur-2xl" />
        <CardHeader className="relative space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
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
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                <div className="h-10 w-10 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold">10</div>
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Questions</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">Industry-specific</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
                <div className="h-10 w-10 rounded-full bg-purple-600 dark:bg-purple-500 flex items-center justify-center text-white font-bold">⏱️</div>
                <div>
                  <p className="text-sm font-medium text-purple-900 dark:text-purple-100">Timed</p>
                  <p className="text-xs text-purple-600 dark:text-purple-400">At your pace</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                <div className="h-10 w-10 rounded-full bg-green-600 dark:bg-green-500 flex items-center justify-center text-white font-bold">✓</div>
                <div>
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">Instant</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Feedback</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="relative">
          <Button 
            onClick={generateQuizFn} 
            className="w-full h-12 text-base font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
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
          className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <CardHeader className="space-y-3 pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Question {currentQuestion + 1} of {quizData.length}
          </CardTitle>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            {Math.round(progress)}% Complete
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200 dark:border-blue-800">
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
                className={`group relative flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-purple-300 dark:hover:border-purple-700 ${
                  isSelected 
                    ? 'border-purple-500 dark:border-purple-600 bg-purple-50 dark:bg-purple-950/30 shadow-md' 
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
          <div className="relative overflow-hidden mt-6 p-5 rounded-lg border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 shadow-inner animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(34,197,94,0.1),transparent_70%)]" />
            <p className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-green-600 dark:bg-green-500 flex items-center justify-center text-white text-sm">✓</span>
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
            className="border-2 hover:border-green-400 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-950/30 transition-all"
          >
            💡 Show Explanation
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          className="ml-auto px-8 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
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
