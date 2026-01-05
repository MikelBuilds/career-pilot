"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
  Sparkles,
  Target,
  Clock,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DashboardView = ({ insights }) => {
  // Transform salary data for the chart
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  // Format dates using date-fns
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Enhanced Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 opacity-20 blur" />
              <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background">
                <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                  Industry Insights
                </h1>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">
            Real-time market data and trends for your career growth
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100">
            <Clock className="h-3 w-3 mr-1" />
            Last updated: {lastUpdatedDate}
          </Badge>
        </div>
      </div>

      {/* Market Overview Cards with Enhanced Styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Market Outlook Card */}
        <Card className="group relative overflow-hidden border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">
              Market Outlook
            </CardTitle>
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur" />
              <OutlookIcon className={`relative h-5 w-5 ${outlookColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {insights.marketOutlook}
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        {/* Industry Growth Card */}
        <Card className="group relative overflow-hidden border-2 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">
              Industry Growth
            </CardTitle>
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur" />
              <TrendingUp className="relative h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress value={insights.growthRate} className="mt-3 h-2" />
          </CardContent>
        </Card>

        {/* Demand Level Card */}
        <Card className="group relative overflow-hidden border-2 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">Demand Level</CardTitle>
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-20 blur" />
              <BriefcaseIcon className="relative h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {insights.demandLevel}
            </div>
            <div className="relative mt-3 h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getDemandLevelColor(
                  insights.demandLevel
                )}`}
                style={{ width: insights.demandLevel === 'High' ? '100%' : insights.demandLevel === 'Medium' ? '66%' : '33%' }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Top Skills Card */}
        <Card className="group relative overflow-hidden border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">Top Skills</CardTitle>
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20 blur" />
              <Brain className="relative h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {insights.topSkills.slice(0, 3).map((skill, index) => (
                <Badge 
                  key={skill} 
                  variant="secondary"
                  className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100 font-medium"
                >
                  {skill}
                </Badge>
              ))}
            </div>
            {insights.topSkills.length > 3 && (
              <p className="text-xs text-muted-foreground mt-2">
                +{insights.topSkills.length - 3} more
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Salary Ranges Chart with Enhanced Styling */}
      <Card className="relative overflow-hidden border-2 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
        <div className="absolute top-0 right-0 h-48 w-48 bg-gradient-to-bl from-purple-500/10 via-transparent to-transparent" />
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur" />
              <Target className="relative h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="text-xl font-bold">Salary Ranges by Role</CardTitle>
          </div>
          <CardDescription className="text-base">
            Displaying minimum, median, and maximum salaries (in thousands)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="name" 
                  className="text-xs" 
                  tick={{ fill: 'currentColor' }}
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background/95 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-800 rounded-lg p-3 shadow-xl">
                          <p className="font-semibold text-sm mb-2 text-purple-900 dark:text-purple-100">{label}</p>
                          {payload.map((item) => (
                            <p key={item.name} className="text-sm flex items-center gap-2">
                              <span 
                                className="h-2 w-2 rounded-full" 
                                style={{ backgroundColor: item.fill }}
                              />
                              {item.name}: <span className="font-semibold">${item.value}K</span>
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="min" 
                  fill="rgb(147, 51, 234)" 
                  name="Min Salary (K)" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="median" 
                  fill="rgb(168, 85, 247)" 
                  name="Median Salary (K)" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="max" 
                  fill="rgb(192, 132, 252)" 
                  name="Max Salary (K)" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Industry Trends with Enhanced Styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Key Industry Trends */}
        <Card className="relative overflow-hidden border-2 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20">
          <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-green-500/10 via-transparent to-transparent" />
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 opacity-20 blur" />
                <TrendingUp className="relative h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-lg font-bold">Key Industry Trends</CardTitle>
            </div>
            <CardDescription>
              Current trends shaping the industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start space-x-3 group">
                  <div className="relative mt-2">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-40 blur transition-opacity" />
                    <div className="relative h-2 w-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-600" />
                  </div>
                  <span className="text-sm leading-relaxed group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                    {trend}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recommended Skills */}
        <Card className="relative overflow-hidden border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
          <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-blue-500/10 via-transparent to-transparent" />
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20 blur" />
                <Brain className="relative h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-lg font-bold">Recommended Skills</CardTitle>
            </div>
            <CardDescription>Skills to consider developing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.recommendedSkills.map((skill, index) => (
                <Badge 
                  key={skill} 
                  variant="outline"
                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/30 dark:hover:to-purple-950/30 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:scale-105 cursor-pointer font-medium"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;