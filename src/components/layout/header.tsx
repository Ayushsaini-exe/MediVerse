// src/components/layout/header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Bot, User, LogOut, Stethoscope, Pill, Info } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/icons/logo";

const topNavLinks = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/doctors", icon: Stethoscope, label: "Doctors" },
  { href: "/pharmacy", icon: Pill, label: "Pharmacy" },
  { href: "/ai-tools", label: "AI Tools", icon: Bot },
  { href: "/about", label: "About Us", icon: Info },
];

export function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-30 flex flex-col border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-2 flex-1">
           <Link href="/" className="flex items-center gap-2">
              <Logo className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-headline font-semibold hidden md:block">MediVerse</h1>
            </Link>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative flex items-center gap-2 h-10"
                >
                  <span className="hidden sm:inline">{user.name}</span>
                  <Avatar className="h-8 w-8">
                     <AvatarImage src={`https://picsum.photos/seed/${user.id}/100/100`} />
                    <AvatarFallback>
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
       <nav className="flex-1 border-t">
        <div className="flex items-center justify-center gap-4 h-12">
          {topNavLinks.map((link) => (
            <Link key={link.href} href={link.href} passHref>
              <div
                className={cn(
                  "flex items-center gap-2 px-3 py-2 border-b-2 h-full transition-colors",
                  isActive(link.href)
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <link.icon className="h-5 w-5" />
                <span className="text-sm font-medium hidden sm:inline">{link.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
