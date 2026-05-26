import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
