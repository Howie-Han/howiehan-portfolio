"use client";

import { useState } from "react";
import ImageSlider from "@/components/ImageSlider";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[300px] bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-600 font-mono text-sm">Loading 3D Engine...</div>
});

export default function Home() {
  const [lang, setLang] = useState<"en" | "zh">("en");

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "zh" : "en"));
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-200 overflow-x-hidden">
      {/* ========== NAVBAR ========== */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-zinc-950/60 border-b border-zinc-800/50 md:px-12 lg:px-24">
        <span className="text-lg font-bold tracking-[0.2em] text-white select-none">
          HOWIE.H
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a
            href="#projects"
            className="hover:text-white transition-colors duration-300"
          >
            Projects
          </a>
          <a
            href="#skills"
            className="hover:text-white transition-colors duration-300"
          >
            Tech Stack
          </a>
          <a
            href="#resume"
            className="hover:text-white transition-colors duration-300"
          >
            Resume
          </a>
          <button
            onClick={toggleLang}
            className="ml-4 px-3 py-1 rounded-md border border-zinc-700 text-xs tracking-wider text-zinc-300 hover:border-zinc-500 hover:text-white transition-all duration-300"
          >
            {lang === "en" ? "EN / 中" : "中 / EN"}
          </button>
        </div>
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="px-2.5 py-1 rounded-md border border-zinc-700 text-xs tracking-wider text-zinc-300 hover:border-zinc-500 transition-all"
          >
            {lang === "en" ? "EN / 中" : "中 / EN"}
          </button>
          <button className="text-zinc-400 hover:text-white transition-colors">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-16 md:px-12 lg:px-24">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-zinc-800/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          <span className="inline-block mb-6 text-xs font-medium tracking-[0.3em] uppercase text-zinc-500">
            {lang === "en" ? "Portfolio · 2026" : "作品集 · 2026"}
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight text-white">
            Hao Yu
            <br />
            <span className="text-zinc-400">HAN</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-zinc-400 font-light">
            {lang === "en"
              ? "A hardcore structural engineer who understands control algorithms and system boundaries."
              : "懂控制算法与系统边界的硬核结构工程师"}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-white px-8 py-3.5 text-sm font-semibold text-zinc-950 transition-all duration-300 hover:bg-zinc-200"
            >
              <span className="relative z-10">
                {lang === "en" ? "Explore Projects" : "探索硬核交付物"}
              </span>
            </a>
            <a
              href="/resume.pdf"
              className="group inline-flex items-center gap-2 rounded-md border border-zinc-700 px-8 py-3.5 text-sm font-medium text-zinc-300 transition-all duration-300 hover:border-zinc-500 hover:text-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {lang === "en" ? "Download CV" : "下载简历 (CV)"}
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600">
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent" />
        </div>
      </section>

      {/* ========== FEATURED ENGINEERING ========== */}
      <section
        id="projects"
        className="px-6 py-24 md:px-12 lg:px-24 md:py-32"
      >
        {/* Section Title */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-zinc-500">
            {lang === "en" ? "Portfolio" : "交付物"}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            {lang === "en" ? "Featured Engineering" : "硬核交付物"}
          </h2>
          <div className="mt-4 w-12 h-px bg-zinc-700" />
        </div>

        {/* Project Cards Grid */}
        <div className="max-w-6xl mx-auto flex flex-col gap-12 md:gap-16">
          {/* ---------- Card 1 ---------- */}
          <div className="flex flex-col md:flex-row rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden transition-all duration-500 hover:border-zinc-700 hover:shadow-[0_0_32px_-8px_rgba(255,255,255,0.04)]">
            {/* Video Media */}
            <div className="md:w-1/2 min-h-[280px] overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/media/wbc-demo.mp4" type="video/mp4" />
              </video>
            </div>
            {/* Content */}
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {lang === "en"
                  ? "Learning-based WBC for Quadruped Manipulator"
                  : "基于强化学习的四足机械臂全身控制 (WBC)"}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs font-medium text-zinc-300 border border-zinc-700/50">
                  Isaac Gym
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs font-medium text-zinc-300 border border-zinc-700/50">
                  C++ / Python
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs font-medium text-zinc-300 border border-zinc-700/50">
                  {lang === "en" ? "Soft-Hardware Synergy" : "软硬协同设计"}
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs font-medium text-zinc-300 border border-zinc-700/50">
                  {lang === "en" ? "Dynamics Constraint" : "动力学约束"}
                </span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-zinc-400">
                {lang === "en"
                  ? "Implemented Whole-Body Control (WBC) for a quadruped manipulator with a high center of mass (~0.52m). Achieved continuous stair climbing at 1.5 m/s."
                  : "面向动力学约束的结构架构设计：通过 Isaac Gym 仿真反推结构刚度边界，实现系统高质心动态作业下的软硬协同。"}
              </p>
            </div>
          </div>

          {/* ---------- Card 2 ---------- */}
          <div className="flex flex-col md:flex-row-reverse rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden transition-all duration-500 hover:border-zinc-700 hover:shadow-[0_0_32px_-8px_rgba(255,255,255,0.04)]">
            {/* 3D Model Viewer */}
            <div className="md:w-1/2 min-h-[300px] bg-zinc-950">
              <ModelViewer />
            </div>
            {/* Content */}
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {lang === "en"
                  ? "High-Precision Omnidirectional Wheel System"
                  : "高精度全向舵轮底盘架构设计"}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs font-medium text-zinc-300 border border-zinc-700/50">
                  SolidWorks
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs font-medium text-zinc-300 border border-zinc-700/50">
                  AutoCAD
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs font-medium text-zinc-300 border border-zinc-700/50">
                  GB/T1804-2000
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs font-medium text-zinc-300 border border-zinc-700/50">
                  DFAM
                </span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-zinc-400">
                {lang === "en"
                  ? "Designed and manufactured a highly integrated omnidirectional mobile chassis. Achieved robust steering transmission and dynamic maneuverability."
                  : "基于 GB/T1804-2000 标准进行公差分析与架构设计，实现高响应机动性。该底层核心技术支撑团队最终斩获第 23 届 ROBOCON 全国一等奖。"}
              </p>
            </div>
          </div>

          {/* ---------- Card 3 ---------- */}
          <div className="flex flex-col md:flex-row rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden transition-all duration-500 hover:border-zinc-700 hover:shadow-[0_0_32px_-8px_rgba(255,255,255,0.04)]">
            {/* Image Slider */}
            <div className="md:w-1/2 min-h-[280px]">
              <ImageSlider
                images={["/media/tpu-sop.jpeg", "/media/tpu-prototype.jpg", "/media/tpu-cad.png"]}
              />
            </div>
            {/* Content */}
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {lang === "en"
                  ? "Bionic Thoracic Motion Simulator"
                  : "仿生胸腔运动模拟器机构设计"}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs font-medium text-zinc-300 border border-zinc-700/50">
                  DFAM
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs font-medium text-zinc-300 border border-zinc-700/50">
                  TPU / PLA
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs font-medium text-zinc-300 border border-zinc-700/50">
                  SOP Formulation
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs font-medium text-zinc-300 border border-zinc-700/50">
                  Biomechanics
                </span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-zinc-400">
                {lang === "en"
                  ? "Engineered a biomechanical simulator utilizing multi-material 3D printing. Developed standardized TPU printing SOPs, significantly improving manufacturing and assembly efficiency."
                  : "面向生物力学的多材料增材制造（DFAM）架构设计。独立制定 TPU/PLA 标准化打印流程（SOP），通过零件一体化设计大幅降低装配复杂度与制造成本。"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CORE CAPABILITIES (Bento Box) ========== */}
      <section id="skills" className="px-6 py-24 md:px-12 lg:px-24 md:py-32">
        {/* Section Title */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-zinc-500">
            {lang === "en" ? "Expertise" : "专长"}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            {lang === "en" ? "Core Capabilities" : "核心技能栈"}
          </h2>
          <div className="mt-4 w-12 h-px bg-zinc-700" />
        </div>

        {/* Bento Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[240px]">
          {/* ---- Card 1: CAD & DFAM (spans 2 cols) ---- */}
          <div className="md:col-span-2 md:row-span-2 rounded-xl border border-zinc-800 bg-zinc-950 p-8 md:p-10 flex flex-col justify-between transition-all duration-500 hover:border-zinc-700 hover:shadow-[0_0_32px_-8px_rgba(255,255,255,0.04)]">
            <div>
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-400"
                >
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                  <line x1="12" y1="22" x2="12" y2="15.5" />
                  <polyline points="22 8.5 12 15.5 2 8.5" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">
                CAD & DFAM
              </h3>
              <p className="mt-1 text-xs tracking-wider uppercase text-zinc-500">
                结构设计与增材制造
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "SolidWorks",
                "Onshape",
                "Fusion 360",
                "GD&T",
                "DFAM",
                "FDM/SLA",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-zinc-800/60 text-xs text-zinc-400 border border-zinc-700/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ---- Card 2: CAE Simulation (spans 2 cols) ---- */}
          <div className="md:col-span-2 rounded-xl border border-zinc-800 bg-zinc-950 p-8 md:p-10 flex flex-col justify-between transition-all duration-500 hover:border-zinc-700 hover:shadow-[0_0_32px_-8px_rgba(255,255,255,0.04)]">
            <div>
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-400"
                >
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                  <path d="M16 16h5v5" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">
                CAE Simulation
              </h3>
              <p className="mt-1 text-xs tracking-wider uppercase text-zinc-500">
                仿真与动力学
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {["Abaqus", "COMSOL", "ANSYS", "FEA", "CFD", "Multibody"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-zinc-800/60 text-xs text-zinc-400 border border-zinc-700/40"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* ---- Card 3: Control & System (spans 2 cols, 2 rows) ---- */}
          <div className="md:col-span-2 md:row-span-2 rounded-xl border border-zinc-800 bg-zinc-950 p-8 md:p-10 flex flex-col justify-between transition-all duration-500 hover:border-zinc-700 hover:shadow-[0_0_32px_-8px_rgba(255,255,255,0.04)]">
            <div>
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-400"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">
                Control & System
              </h3>
              <p className="mt-1 text-xs tracking-wider uppercase text-zinc-500">
                系统与算法
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "MATLAB",
                "Simulink",
                "ROS2",
                "PID",
                "MPC",
                "State Estimation",
                "C++",
                "Python",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-zinc-800/60 text-xs text-zinc-400 border border-zinc-700/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-zinc-800/60 px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-xs text-zinc-500 tracking-wide">
            &copy; 2026 Hao Yu HAN. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:hello@howiehan.com"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-300 tracking-wide"
            >
              Email
            </a>
            <span className="text-zinc-700 text-xs">/</span>
            <a
              href="https://linkedin.com/in/howie-han"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-300 tracking-wide"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}