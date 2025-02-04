import type { Metadata } from "next";
import React from "react";

import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";


export const metadata: Metadata = {
  title: "Bevy Beta",
  description: "Welcome to Bevy Beta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
