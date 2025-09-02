// src/components/layout/header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Bot } from "lucide-react";

type HeaderProps = {
  title: string;
};

const topNavLinks = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/ai-tools", label: "AI Tools", icon: Bot },
];

export function Header({ title }: HeaderProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-30 flex flex-col items-start gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6">
      <div className="flex h-14 w-full items-center">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-2xl font-headline font-semibold">{title}</h1>
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
