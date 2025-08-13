import type React from "react";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "سوريانا التعليمية",
  description: "تواصل معنا للحصول على خدمات إعلانية مميزة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.className} dark`}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
