import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Torvi — Ship a work tool in 4 weeks",
  description: "A 4-week guided build system for senior professionals. The app guides your work. Office hours unblock you. One shipped tool at the end.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F7F6F3] text-[#1C1917]">{children}</body>
    </html>
  );
}
