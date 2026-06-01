import type { Metadata, Viewport } from "next";
import { Inter, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0e18",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "SafeZone — Coordinated community response when a child goes missing",
  description:
    "Community-powered child safety. Verified neighbour alerts, coordinated search zones, and AI-triaged sightings that help a coordinator brief the police. You report — police lead the recovery. An MVP preview.",
  openGraph: {
    title: "SafeZone — Coordinated community response when a child goes missing",
    description:
      "Verified neighbour alerts, coordinated search zones, AI-triaged sightings. Report, don't approach — police lead the recovery.",
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
