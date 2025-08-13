"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      dir="rtl"
      duration={4000}
      visibleToasts={3}
      expand={true}
      richColors={false}
      closeButton={false}
      toastOptions={{
        style: {
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          border: "1px solid #14b8a6",
          color: "#f8fafc",
          fontSize: "14px",
          fontFamily: "Tajawal, Arial, sans-serif",
          borderRadius: "12px",
          padding: "16px 20px",
          boxShadow:
            "0 10px 40px rgba(20, 184, 166, 0.3), 0 4px 12px rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(10px)",
          minWidth: "320px",
          maxWidth: "500px",
        },
        className: "sonner-toast",
        duration: 4000,
      }}
      style={
        {
          "--normal-bg": "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          "--normal-text": "#f8fafc",
          "--normal-border": "#14b8a6",
          "--success-bg": "linear-gradient(135deg, #065f46 0%, #047857 100%)",
          "--success-text": "#ecfdf5",
          "--success-border": "#10b981",
          "--error-bg": "linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)",
          "--error-text": "#fef2f2",
          "--error-border": "#ef4444",
          "--warning-bg": "linear-gradient(135deg, #78350f 0%, #92400e 100%)",
          "--warning-text": "#fffbeb",
          "--warning-border": "#f59e0b",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
