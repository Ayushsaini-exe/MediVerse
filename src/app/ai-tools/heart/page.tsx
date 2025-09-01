// @/app/ai-tools/heart/page.tsx
"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { HeartPulse, CheckCircle, AlertTriangle } from "lucide-react";

export default function HeartHealthPage() {
  const [result, setResult] = useState<
    { risk: "Low" | "Moderate" | "High"; advice: string } | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const random = Math.random();
      if (random < 0.5) {
        setResult({
          risk: "Low",
          advice: "Your cardiovascular health appears to be good. Keep up the healthy habits!",
        });
      } else if (random < 0.8) {
        setResult({
          risk: "Moderate",
          advice: "Some factors indicate a moderate risk. Consider lifestyle changes and a check-up.",
        });
      } else {
        setResult({
          risk: "High",
          advice: "Multiple factors suggest a high risk. We strongly recommend consulting a cardiologist soon.",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full">
      <Header title="Heart Health Assessment" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 flex justify-center items-start">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <div className="flex items-center gap-4">
              <HeartPulse className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="font-headline">Cardiovascular Health Assessment</CardTitle>
                <CardDescription>
                  Fill in the details for an AI-powered heart health evaluation.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" placeholder="e.g., 52" required />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="cholesterol">Total Cholesterol (mg/dL)</Label>
                  <Input id="cholesterol" type="number" placeholder="e.g., 200" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="systolic-bp">Systolic Blood Pressure</Label>
                  <Input id="systolic-bp" type="number" placeholder="e.g., 120" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diastolic-bp">Diastolic Blood Pressure</Label>
                  <Input id="diastolic-bp" type="number" placeholder="e.g., 80" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smoker">Smoking Status</Label>
                   <Select required>
                    <SelectTrigger id="smoker">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">Non-smoker</SelectItem>
                      <SelectItem value="yes">Smoker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-stretch">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Evaluating..." : "Assess Heart Health"}
              </Button>
              {result && (
                 <Alert
                  className="mt-4"
                  variant={result.risk === "High" ? "destructive" : "default"}
                >
                  {result.risk === "Low" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    Result: {result.risk} Risk
                  </AlertTitle>
                  <AlertDescription>{result.advice}</AlertDescription>
                </Alert>
              )}
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
