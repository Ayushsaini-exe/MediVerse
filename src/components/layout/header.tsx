// src/components/layout/header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Bot, User, LogOut } from "lucide-react";
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

type HeaderProps = {
  title?: string;
};

const topNavLinks = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/ai-tools", label: "AI Tools", icon: Bot },
];

export function Header({ title }: HeaderProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-30 flex flex-col items-start gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6">
      <div className="flex h-14 w-full items-center">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          {title ? (
            <h1 className="text-2xl font-headline font-semibold">{title}</h1>
          ) : (
            <Link href="/" className="flex items-center gap-2">
              <Logo className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-headline font-semibold">MediVerse</h1>
            </Link>
          )}
        </div>
        <div className="ml-auto">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative flex items-center gap-2 h-10"
                >
                  <span>{user.name}</span>
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
      <nav className="w-full">
        <div className="flex items-center gap-4">
          {topNavLinks.map((link) => (
            <Link key={link.href} href={link.href} passHref>
              <div
                className={cn(
                  "flex items-center gap-2 px-3 py-2 border-b-2 transition-colors",
                  isActive(link.href)
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <link.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{link.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
