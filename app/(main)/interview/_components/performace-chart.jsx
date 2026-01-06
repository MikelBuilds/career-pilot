"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <Card className="relative overflow-hidden border-2 shadow-lg">
      <div className="absolute -inset-2 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 opacity-5 blur-2xl" />
      <CardHeader className="relative space-y-2">
        <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
          Performance Trend
        </CardTitle>
        <CardDescription className="text-base">Your quiz scores over time</CardDescription>
      </CardHeader>
      <CardContent className="relative">
        {chartData.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">No quiz data yet</p>
              <p className="text-sm text-muted-foreground">Complete a quiz to see your performance trend</p>
            </div>
          </div>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="50%" stopColor="#9333ea" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                  <linearGradient id="colorScoreArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#9333ea" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="#ffffff"
                  tick={{ fill: '#ffffff' }}
                  style={{ fontSize: '14px', fontWeight: 500 }}
                />
                <YAxis 
                  domain={[0, 100]} 
                  stroke="#ffffff"
                  tick={{ fill: '#ffffff' }}
                  style={{ fontSize: '14px', fontWeight: 500 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      return (
                        <div className="bg-background border-2 border-purple-500 rounded-lg p-3 shadow-xl">
                          <p className="text-base font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                            {payload[0].value}%
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {payload[0].payload.date}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="url(#colorScore)"
                  strokeWidth={3}
                  dot={{ 
                    fill: "#9333ea", 
                    strokeWidth: 2, 
                    r: 5,
                    stroke: "#fff"
                  }}
                  activeDot={{ 
                    r: 7, 
                    fill: "#9333ea",
                    stroke: "#fff",
                    strokeWidth: 2
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
