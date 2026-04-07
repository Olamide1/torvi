import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { MetaPixel } from "@/components/MetaPixel";
import { TikTokPixel } from "@/components/TikTokPixel";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://torvilearning.online";

export const metadata: Metadata = {
  title: "Torvi — Ship a work tool in 4 weeks",
  description: "A 4-week guided build system for senior professionals. The app guides your work. Office hours unblock you. One shipped tool at the end.",
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: "Torvi — Ship a work tool in 4 weeks",
    description: "A 4-week guided build system for senior professionals. The app guides your work. Office hours unblock you. One shipped tool at the end.",
    url: APP_URL,
    siteName: "Torvi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Torvi — Ship a work tool in 4 weeks",
    description: "A 4-week guided build system for senior professionals. The app guides your work. Office hours unblock you. One shipped tool at the end.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F7F6F3] text-[#1C1917]">
        <GoogleAnalytics />
        <MetaPixel />
        <TikTokPixel />
        {children}
      </body>
    </html>
  );
}
