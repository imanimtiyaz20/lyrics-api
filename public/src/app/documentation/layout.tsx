import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../global.css";
import DocumentationShell from "@/components/Documentation/DocumentationShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LyricsAPI - Documentation",
  description: "An open-source Lyrics API that works.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <DocumentationShell>{children}</DocumentationShell>
    </div>
  );
}
