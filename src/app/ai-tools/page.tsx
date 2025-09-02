import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Droplets, HeartPulse, BrainCircuit } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tools = [
  {
    title: "Diabetes Prediction",
    description: "Assess your risk of diabetes based on key health metrics.",
    icon: <Droplets className="w-10 h-10 text-primary" />,
    href: "/ai-tools/diabetes",
    color: "bg-blue-100",
  },
  {
    title: "Heart Health Assessment",
    description: "Evaluate your cardiovascular health and get insights.",
    icon: <HeartPulse className="w-10 h-10 text-primary" />,
    href: "/ai-tools/heart",
    color: "bg-red-100",
  },
  {
    title: "Stress Level Prediction",
    description: "Analyze your stress levels through a series of questions.",
    icon: <BrainCircuit className="w-10 h-10 text-primary" />,
    href: "/ai-tools/stress",
    color: "bg-purple-100",
  },
];

export default function AiToolsPage() {
  return (
    <div className="flex flex-col w-full">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-headline font-bold text-primary">
            Empower Your Health with AI
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Our intelligent tools provide preliminary assessments based on your
            data. Please note these are not a substitute for professional medical
            advice.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {tools.map((tool) => (
            <Card
              key={tool.title}
              className="flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                <div className={`p-4 rounded-full ${tool.color}`}>
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="font-headline">{tool.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{tool.description}</CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href={tool.href} passHref>
                  <Button
                    className={cn(
                      "w-full bg-accent hover:bg-accent/90"
                    )}
                  >
                    Start Assessment
                    <ArrowRight className="ml-2 h-4 w-4 inline" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
