// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";
import { Chatbot } from "@/components/chatbot/chatbot";
import { AuthProvider } from "@/components/auth/auth-provider";
import { CartProvider } from "@/context/cart-context";

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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-1">{children}</div>
            </div>
            <Toaster />
            <Chatbot />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
