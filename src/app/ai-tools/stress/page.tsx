// @/app/ai-tools/stress/page.tsx
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
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BrainCircuit, CheckCircle, AlertTriangle } from "lucide-react";

export default function StressPredictionPage() {
  const [result, setResult] = useState<
    { level: "Low" | "Moderate" | "High"; advice: string } | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [sleepQuality, setSleepQuality] = useState([5]);
  const [workload, setWorkload] = useState([5]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const stressScore = sleepQuality[0] + workload[0];
      if (stressScore <= 8) {
        setResult({
          level: "Low",
          advice: "Your stress levels seem to be in a healthy range. Keep practicing good self-care.",
        });
      } else if (stressScore <= 14) {
        setResult({
          level: "Moderate",
          advice: "You may be experiencing moderate stress. Consider mindfulness, exercise, and taking breaks.",
        });
      } else {
        setResult({
          level: "High",
          advice: "Your responses suggest high stress levels. It might be beneficial to talk to a mental health professional.",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full">
      <Header title="Stress Level Prediction" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 flex justify-center items-start">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <div className="flex items-center gap-4">
              <BrainCircuit className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="font-headline">Stress Level Assessment</CardTitle>
                <CardDescription>
                  Answer a few questions to gauge your current stress levels.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-8 pt-4">
              <div className="space-y-3">
                <Label htmlFor="sleep">On a scale of 1-10, how would you rate your sleep quality recently?</Label>
                <div className="flex gap-4 items-center">
                    <Slider id="sleep" min={1} max={10} step={1} value={sleepQuality} onValueChange={setSleepQuality}/>
                    <span className="font-bold text-primary w-8 text-center">{sleepQuality}</span>
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="workload">On a scale of 1-10, how would you rate your current workload or daily pressure?</Label>
                 <div className="flex gap-4 items-center">
                    <Slider id="workload" min={1} max={10} step={1} value={workload} onValueChange={setWorkload} />
                     <span className="font-bold text-primary w-8 text-center">{workload}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-stretch">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Calculating..." : "Predict Stress Level"}
              </Button>
              {result && (
                <Alert
                  className="mt-4"
                  variant={result.level === "High" ? "destructive" : "default"}
                >
                  {result.level === "Low" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    Result: {result.level} Stress Level
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
