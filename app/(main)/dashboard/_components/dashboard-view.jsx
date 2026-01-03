"use client";

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Target, 
  Sparkles,
  DollarSign,
  MapPin,
  Calendar
} from "lucide-react";

const DashboardView = ({ insights }) => {
  const getOutlookColor = (outlook) => {
    switch (outlook?.toLowerCase()) {
      case 'positive': return 'text-green-600 dark:text-green-400';
      case 'negative': return 'text-red-600 dark:text-red-400';
      default: return 'text-yellow-600 dark:text-yellow-400';
    }
  };

  const getDemandColor = (demand) => {
    switch (demand?.toLowerCase()) {
      case 'high': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'low': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight gradient-title">Industry Insights</h1>
          <p className="text-muted-foreground mt-1">
            Real-time market data and trends for your industry
          </p>
        </div>
        <Badge variant="outline" className="w-fit flex items-center gap-2">
          <Calendar className="h-3 w-3" />
          Updated {new Date(insights.lastUpdated).toLocaleDateString()}
        </Badge>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Market Outlook
            </CardTitle>
            <BarChart3 className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getOutlookColor(insights.marketOutlook)}`}>
              {insights.marketOutlook}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Current market condition
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Industry Growth
            </CardTitle>
            {insights.growthRate > 0 ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {(insights.growthRate * 100).toFixed(1)}%
            </div>
            <Progress value={Math.abs(insights.growthRate * 100)} className="mt-3 h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Year-over-year growth rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Demand Level
            </CardTitle>
            <Target className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <Badge className={`text-lg px-3 py-1 ${getDemandColor(insights.demandLevel)}`}>
              {insights.demandLevel}
            </Badge>
            <p className="text-xs text-muted-foreground mt-3">
              Current hiring demand
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Top Skills
            </CardTitle>
            <Sparkles className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold mb-3">{insights.topSkills.length} Skills</div>
            <div className="flex flex-wrap gap-1.5">
              {insights.topSkills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Key Trends */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Key Industry Trends
            </CardTitle>
            <CardDescription>
              Current trends shaping your industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-semibold text-blue-600 dark:text-blue-300">
                    {index + 1}
                  </div>
                  <p className="text-sm flex-1">{trend}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recommended Skills */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-orange-500" />
              Recommended Skills
            </CardTitle>
            <CardDescription>
              Skills to boost your career growth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.recommendedSkills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <span className="text-sm font-medium">{skill}</span>
                  <Badge variant="outline" className="text-xs">In-demand</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Ranges */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            Salary Ranges by Role
          </CardTitle>
          <CardDescription>
            Compensation expectations for common roles in your industry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.salaryRanges.map((range, index) => (
              <div 
                key={range.role} 
                className="group p-4 rounded-lg border bg-card hover:bg-muted/50 transition-all hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                        {index + 1}
                      </div>
                      <h4 className="text-base font-semibold">{range.role}</h4>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground ml-10">
                      <MapPin className="h-3 w-3" />
                      <span>{range.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 ml-10 md:ml-0">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Range:</span>
                      <div className="font-medium">
                        ${range.min.toLocaleString()} - ${range.max.toLocaleString()}
                      </div>
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                      <span className="text-xs text-muted-foreground block">Median</span>
                      <div className="text-lg font-bold text-green-700 dark:text-green-400">
                        ${range.median.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardView;
