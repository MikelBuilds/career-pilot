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
      {/* Page Header */}
      <div className="page-header">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50">
                <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="page-title">Industry Insights</h1>
            </div>
            <p className="page-description">
              Real-time market data and trends to guide your career decisions
            </p>
          </div>
          <div className="badge-primary">
            <Clock className="h-3 w-3" />
            Updated: {lastUpdatedDate}
          </div>
        </div>
      </div>

      {/* Market Overview Cards with Enhanced Styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Market Outlook Card */}
        <Card className="group relative overflow-hidden border-2 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">
              Market Outlook
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center">
              <OutlookIcon className={`h-5 w-5 ${outlookColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-title">
              {insights.marketOutlook}
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        {/* Industry Growth Card */}
        <Card className="group relative overflow-hidden border-2 hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/20 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">
              Industry Growth
            </CardTitle>
            <div className="h-10 w-10 rounded-lg bg-violet-100 dark:bg-violet-950/50 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-title">
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress value={insights.growthRate} className="mt-3 h-2" />
          </CardContent>
        </Card>

        {/* Demand Level Card */}
        <Card className="group relative overflow-hidden border-2 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">Demand Level</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center">
              <BriefcaseIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-title">
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
        <Card className="group relative overflow-hidden border-2 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">Top Skills</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center">
              <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {insights.topSkills.slice(0, 3).map((skill, index) => (
                <Badge 
                  key={skill} 
                  variant="secondary"
                  className="badge-primary !py-1"
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
      <Card className="card-professional relative overflow-hidden">
        <div className="absolute top-0 right-0 h-48 w-48 bg-gradient-to-bl from-violet-500/10 via-transparent to-transparent" />
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-violet-100 dark:bg-violet-950/50 flex items-center justify-center">
              <Target className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">Salary Ranges by Role</CardTitle>
              <CardDescription className="text-sm">
                Displaying minimum, median, and maximum salaries (in thousands)
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="name" 
                  className="text-xs" 
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background/95 backdrop-blur-sm border-2 border-border rounded-lg p-3 shadow-xl">
                          <p className="font-semibold text-sm mb-2">{label}</p>
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
                  fill="rgb(99, 102, 241)" 
                  name="Min Salary (K)" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="median" 
                  fill="rgb(139, 92, 246)" 
                  name="Median Salary (K)" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="max" 
                  fill="rgb(168, 85, 247)" 
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
        <Card className="card-professional relative overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-emerald-500/10 via-transparent to-transparent" />
          <CardHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Key Industry Trends</CardTitle>
                <CardDescription>
                  Current trends shaping the industry
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start space-x-3 group">
                  <div className="mt-2 h-2 w-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex-shrink-0" />
                  <span className="text-sm leading-relaxed group-hover:text-foreground transition-colors">
                    {trend}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recommended Skills */}
        <Card className="card-professional relative overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-indigo-500/10 via-transparent to-transparent" />
          <CardHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center">
                <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Recommended Skills</CardTitle>
                <CardDescription>Skills to consider developing</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.recommendedSkills.map((skill, index) => (
                <Badge 
                  key={skill} 
                  variant="outline"
                  className="hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 cursor-pointer font-medium"
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