import type { Metadata } from "next";
import { Outfit, Syne, Geist_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sujhaav — Immersive AI Tech Advisor",
  description: "Experience premium, neutral, and bespoke tech recommendations powered by AI. Created for visual curators and technology enthusiasts.",
  authors: [{ name: "Sujhaav Team" }],
  keywords: ["AI recommendations", "premium tech advisor", "minimalist tech curator", "smart tech decisions"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${syne.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030303] text-[#f5f5f7]">
        {children}
      </body>
    </html>
  );
}
