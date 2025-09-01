// @/app/ai-tools/diabetes/page.tsx
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Droplets, CheckCircle, AlertTriangle } from "lucide-react";

export default function DiabetesPredictionPage() {
  const [result, setResult] = useState<
    { risk: "Low" | "Medium" | "High"; advice: string } | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate AI model processing
    setTimeout(() => {
      const random = Math.random();
      if (random < 0.5) {
        setResult({
          risk: "Low",
          advice: "Your risk appears to be low. Maintain a healthy lifestyle.",
        });
      } else if (random < 0.8) {
        setResult({
          risk: "Medium",
          advice: "You may have a medium risk. Consider consulting a doctor and monitoring your diet and exercise.",
        });
      } else {
        setResult({
          risk: "High",
          advice: "Your risk appears to be high. It is strongly recommended to consult a healthcare professional for a formal diagnosis.",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full">
      <Header title="Diabetes Prediction Tool" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 flex justify-center items-start">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Droplets className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="font-headline">Diabetes Risk Assessment</CardTitle>
                <CardDescription>
                  Enter your details to get an AI-powered risk prediction.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="glucose">Glucose Level (mg/dL)</Label>
                  <Input id="glucose" type="number" placeholder="e.g., 120" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bmi">Body Mass Index (BMI)</Label>
                  <Input id="bmi" type="number" step="0.1" placeholder="e.g., 25.4" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" placeholder="e.g., 45" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bp">Blood Pressure (Diastolic)</Label>
                  <Input id="bp" type="number" placeholder="e.g., 80" required />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-stretch">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Analyzing..." : "Assess Risk"}
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
