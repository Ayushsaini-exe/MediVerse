import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Stethoscope, Pill, Bot } from "lucide-react";
import { Header } from "@/components/layout/header";

export default function DashboardPage() {
  const features = [
    {
      title: "Find a Doctor",
      description: "Search for specialists and book appointments.",
      icon: <Stethoscope className="w-8 h-8 text-primary" />,
      href: "/doctors",
    },
    {
      title: "Visit Pharmacy",
      description: "Order medicines and health products online.",
      icon: <Pill className="w-8 h-8 text-primary" />,
      href: "/pharmacy",
    },
    {
      title: "AI Health Tools",
      description: "Assess your health with our smart tools.",
      icon: <Bot className="w-8 h-8 text-primary" />,
      href: "/ai-tools",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <Header title="Dashboard" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-headline font-bold text-primary">
            Welcome to MediVerse
          </h1>
          <p className="text-muted-foreground mt-2">
            Your all-in-one solution for comprehensive healthcare.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  {feature.icon}
                  <CardTitle className="font-headline">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
                <Button asChild variant="link" className="p-0 mt-4 h-auto">
                  <Link href={feature.href}>
                    Go to {feature.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="font-headline">Your Health, Simplified</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Manage appointments, track orders, and gain valuable health insights, all in one place.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Our platform is designed with a user-friendly and intuitive interface to encourage active participation in managing your health.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
