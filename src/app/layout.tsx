import type { Metadata, Viewport } from "next";
import { Inter, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0b0e18",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "SafeZone — Find missing children fast with community alerts",
  description:
    "Community-powered child safety. Instant geo-fenced alerts, coordinated volunteer search zones, AI-matched sightings, and automatic police notification. Built on free-tier services.",
  openGraph: {
    title: "SafeZone — Find missing children fast",
    description:
      "Instant community alerts, coordinated search zones, AI-matched sightings, automatic police notification.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen antialiased font-sans">{children}</body>
    </html>
  );
}
