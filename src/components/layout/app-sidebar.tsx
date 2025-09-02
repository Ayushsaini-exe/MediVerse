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
  Stethoscope,
  Pill,
} from "lucide-react";
import { Logo } from "@/components/icons/logo";
import { usePathname } from "next/navigation";
import Link from 'next/link';

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/doctors", icon: Stethoscope, label: "Doctors", tooltip: "Doctors" },
    { href: "/pharmacy", icon: Pill, label: "Pharmacy", tooltip: "Pharmacy" },
  ];

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <Sidebar collapsible="offcanvas" variant="sidebar">
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
      <SidebarFooter />
    </Sidebar>
  );
}
