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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const { user, loginAsGuest } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      loginAsGuest(email);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Welcome!</CardTitle>
          <CardDescription>
            Enter your email to continue as a guest.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button className="w-full" type="submit" disabled={!email}>
              <LogIn className="mr-2 h-4 w-4" />
              Login as Guest
            </Button>
          </CardContent>
        </form>
        <CardFooter>
          <p className="text-xs text-muted-foreground text-center w-full">
            Your session will be cleared when you close this browser tab.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
