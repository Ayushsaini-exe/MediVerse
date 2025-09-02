// src/components/auth/auth-provider.tsx
"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// Define the shape of the user object and the auth context
interface GuestUser {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: GuestUser | null;
  loading: boolean;
  loginAsGuest: () => void;
  logout: () => void;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<GuestUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("guest-user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from sessionStorage", error);
      sessionStorage.removeItem("guest-user");
    } finally {
      setLoading(false);
    }
  }, []);

  const loginAsGuest = () => {
    const guestUser: GuestUser = {
      id: `guest_${Date.now()}`,
      name: "Guest User",
      email: "guest@example.com",
    };
    sessionStorage.setItem("guest-user", JSON.stringify(guestUser));
    setUser(guestUser);
    router.push("/");
  };

  const logout = () => {
    sessionStorage.removeItem("guest-user");
    setUser(null);
    router.push("/login");
  };

  const value = { user, loading, loginAsGuest, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
