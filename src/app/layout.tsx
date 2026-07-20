import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// 【PM 重构】：面向大厂 HR 和 ATS 筛选系统的高阶 SEO 元数据
export const metadata: Metadata = {
  title: "Haoyu (Howie) HAN | Robotics Structural Engineer",
  description:
    "Portfolio of Haoyu (Howie) HAN. A structural engineer specializing in robotics, precision mechanical design, DfAM, and mechatronic systems integration.",
  keywords: [
    "Haoyu HAN",
    "Howie Han",
    "Robotics Structural Engineer",
    "Mechanical Design",
    "Mechatronics",
    "DfAM",
    "Portfolio",
  ],
  openGraph: {
    title: "Haoyu (Howie) HAN · Engineering Portfolio",
    description: "Robotics Structural Engineer · Precision Design & Systems",
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
      {/* 【视觉红线修复】：将 slate-50 修正为与全站设计系统统一的 zinc-50，并加入优雅的选中文本高亮 */}
      <body className="min-h-full bg-zinc-50 font-sans text-zinc-900 selection:bg-zinc-200">
        {children}
      </body>
    </html>
  );
}