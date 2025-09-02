// src/app/login/page.tsx
"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const { user, loginAsGuest } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is already logged in, redirect to the dashboard
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleGuestLogin = () => {
    loginAsGuest();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Welcome!</CardTitle>
          <CardDescription>
            Log in as a guest to explore the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={handleGuestLogin}>
            <LogIn className="mr-2 h-4 w-4" />
            Continue as Guest
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground text-center w-full">
            Your session will be cleared when you close this browser tab.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
