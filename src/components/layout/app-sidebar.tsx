// src/components/layout/app-sidebar.tsx
"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Stethoscope,
  Pill,
  Bot,
  User,
  LogOut,
  LogIn,
} from "lucide-react";
import { Logo } from "@/components/icons/logo";
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { useAuth } from "@/components/auth/auth-provider";

export function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const menuItems = [
    { href: "/", icon: LayoutDashboard, label: "Dashboard", tooltip: "Dashboard" },
    { href: "/doctors", icon: Stethoscope, label: "Doctors", tooltip: "Doctors" },
    { href: "/pharmacy", icon: Pill, label: "Pharmacy", tooltip: "Pharmacy" },
    { href: "/ai-tools", icon: Bot, label: "AI Tools", tooltip: "AI Tools" },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Logo className="w-8 h-8 text-sidebar-foreground" />
          <h1 className="text-xl font-headline text-sidebar-foreground font-semibold">MediVerse</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={isActive(item.href)}
                  tooltip={item.tooltip}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {user ? (
            <>
              <SidebarMenuItem>
                <Link href="/profile">
                  <SidebarMenuButton
                    isActive={isActive("/profile")}
                    tooltip="Profile"
                  >
                    <User />
                    <span>Profile</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={logout}
                  tooltip="Logout"
                >
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          ) : (
            <SidebarMenuItem>
              <Link href="/login">
                <SidebarMenuButton
                  isActive={isActive("/login")}
                  tooltip="Login"
                >
                  <LogIn />
                  <span>Login</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
