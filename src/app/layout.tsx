import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hao Yu HAN | 硬核结构工程师 · 控制算法与系统边界",
  description:
    "Hao Yu (Howie) Han 的个人作品集 — 懂控制算法与系统边界的硬核结构工程师。探索 Projects、Tech Stack 与 Resume。",
  keywords: [
    "Hao Yu Han",
    "Howie Han",
    "结构工程师",
    "控制算法",
    "portfolio",
    "作品集",
  ],
  openGraph: {
    title: "Hao Yu HAN · Portfolio",
    description: "控制算法与系统边界的硬核结构工程师",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-zinc-950 font-sans text-zinc-200">
        {children}
      </body>
    </html>
  );
}