import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hao Yu HAN | Structural Engineer · Control & Systems",
  description:
    "Hao Yu (Howie) Han's portfolio — A structural engineer who understands control algorithms and system boundaries.",
  keywords: [
    "Hao Yu Han",
    "Howie Han",
    "Structural Engineer",
    "Control Algorithms",
    "portfolio",
  ],
  openGraph: {
    title: "Hao Yu HAN · Portfolio",
    description: "Structural Engineer · Control & Systems",
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
      <body className="min-h-full bg-slate-50 font-sans text-zinc-900">
        {children}
      </body>
    </html>
  );
}