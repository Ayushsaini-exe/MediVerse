import type { Metadata } from "next";
import "./globals.css";
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Chatbot } from "@/components/chatbot/chatbot";

export const metadata: Metadata = {
  title: "MediVerse",
  description: "A comprehensive healthcare platform by Firebase Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <div className="min-h-screen">
                {children}
              </div>
            </SidebarInset>
        </SidebarProvider>
        <Toaster />
        <Chatbot />
      </body>
    </html>
  );
}
