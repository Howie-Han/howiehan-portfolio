"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ASSET_BASE } from "@/config/assets";
import LazyMedia from "@/components/LazyMedia";

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-50 rounded-xl">
            <div className="w-6 h-6 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
        </div>
    ),
});

const MEDIA_FILTER = "w-full h-full rounded-xl";

function DukeNusContent() {
    const searchParams = useSearchParams();
    const lang = searchParams.get("lang") || "zh";
    const isZh = lang === "zh";

    return (
        <main className="min-h-screen bg-zinc-50 text-zinc-900 pb-32">
            {/* 固定导航 */}
            <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-50/80 border-b border-zinc-200/50">
                <div className="w-full px-6 md:px-12 lg:px-24 py-4 flex items-center">
                    <Link
                        href={`/?lang=${lang}#experience`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                        <span>{"<"}</span>
                        <span>{isZh ? "返回工作经历" : "Back to Experience"}</span>
                    </Link>
                </div>
            </nav>

            {/* ============================================ */}
            {/* Module 00 & 01: Global Header & Hero 3D Matrix */}
            {/* ============================================ */}
            <section className="max-w-7xl mx-auto px-8 pt-12 pb-24 flex flex-col items-center text-center">
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-6 text-zinc-900">
                    {isZh ? "仿生胸腔模拟器研发" : "Bionic Thoracic Simulator R&D"}
                </h1>
                <p className="text-xl text-zinc-500 font-light w-full">
                    {isZh
                        ? "仿生机电系统研发实习生 @ 杜克-新加坡国立大学医学院"
                        : "Medical Mechatronics Research Intern @ Duke-NUS Medical School"}
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                    {[
                        "DfAM",
                        isZh ? "机电一体化系统" : "Mechatronics",
                        isZh ? "运动学建模" : "Kinematic Modeling",
                        isZh ? "FEA仿真" : "FEA Simulation",
                        isZh ? "仿生结构设计" : "Bionic Structure Design",
                        isZh ? "TPU-PLA多材料打印" : "TPU-PLA Multi-Material Printing",
                    ].map((tag) => (
                        <span
                            key={tag}
                            className="bg-zinc-100 text-zinc-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-zinc-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </section>

            {/* ============================================ */}
            {/* Module 01: Bionic Thoracic Simulator Design & Operation */}
            {/* ============================================ */}
            <section className="max-w-7xl mx-auto px-8 mb-24">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-sm font-bold text-zinc-400 tracking-widest">01 /</span>
                    <h2 className="text-3xl font-semibold tracking-tight">
                        {isZh ? "仿生胸腔模拟器设计与系统运行" : "Bionic Thoracic Simulator Design & Operation"}
                    </h2>
                </div>

                {/* 顶层文字占位 */}
                <p className="text-zinc-500 font-light leading-relaxed w-full">
                    {isZh
                        ? "完成仿生胸腔模拟器整机建模与结构优化，基于 DfAM 原则优化 TPU/PLA 多材料打印工艺，将零部件数量由 62 件整合至 5 件，并降低 TPU 柔性材料打印失败率约 20%。"
                        : "Developed the complete biomimetic thoracic simulator and optimized its structure using DfAM principles. The TPU/PLA multi-material printing process reduced the number of components from 62 to 5 while lowering TPU print failure by approximately 20%."}
                </p>

                {/* 三列等高栅格容器 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mt-8 items-stretch">
                    {/* 左列：GLB */}
                    <div className="flex flex-col w-full h-full min-w-0">
                        <div className="relative w-full h-[40vh] md:h-[350px] max-h-[450px] object-contain bg-zinc-100 rounded-xl overflow-hidden">
                            <div className="w-full h-full flex items-center justify-center">
                                <LazyMedia placeholderClass="w-full h-full min-h-[200px]">
                                    <ModelViewer modelPath={`${ASSET_BASE}/experience/duke-nus/simulator.glb`} />
                                </LazyMedia>
                            </div>
                        </div>
                        <p className="text-sm text-zinc-500 mt-3 text-center font-medium">
                            {isZh ? "交互式 3D 模型" : "Interactive 3D Model"}
                        </p>
                    </div>
                    {/* 中列：HD Render */}
                    <div className="flex flex-col w-full h-full min-w-0">
                        <div className="w-full h-[40vh] md:h-[350px] max-h-[450px] object-contain bg-zinc-100 rounded-xl overflow-hidden">
                            <img
                                src={`${ASSET_BASE}/experience/duke-nus/simulator-render.webp`}
                                className="w-full h-full object-contain"
                                alt="HD Render"
                            />
                        </div>
                        <p className="text-sm text-zinc-500 mt-3 text-center font-medium">
                            {isZh ? "CAD模型渲染" : "CAD Model Rendering"}
                        </p>
                    </div>
                    {/* 右列：Video */}
                    <div className="flex flex-col w-full h-full min-w-0">
                        <div className="w-full h-[40vh] md:h-[350px] max-h-[450px] object-contain bg-zinc-100 rounded-xl overflow-hidden">
                            <LazyMedia placeholderClass="w-full h-full">
                                <video
                                    src={`${ASSET_BASE}/experience/duke-nus/system-operation.mp4`}
                                    className="w-full h-full object-contain"
                                    controls
                                    preload="metadata"
                                    muted
                                    playsInline
                                />
                            </LazyMedia>
                        </div>
                        <p className="text-sm text-zinc-500 mt-3 text-center font-medium">
                            {isZh ? "系统连续运行测试" : "Continuous System Operation Test"}
                        </p>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* Module 02: Kinematics & Mechatronics           */}
            {/* ============================================ */}
            <section className="max-w-7xl mx-auto px-8 mb-32 mt-24">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-sm font-bold text-zinc-400 tracking-widest">02 /</span>
                    <h2 className="text-3xl font-semibold tracking-tight">
                        {isZh ? "运动学传动与底层机电架构" : "Kinematics & Mechatronics Architecture"}
                    </h2>
                </div>

                {/* 顶层文字占位 */}
                <div className="w-full mb-10 space-y-3">
                    <p className="text-zinc-500 font-light leading-relaxed w-full">
                        {isZh
                            ? "采用齿轮齿条机构实现呼吸运动转换，由 Dynamixel 伺服电机驱动，并基于 Arduino 搭建底层控制系统。"
                            : "Implemented respiratory motion through a rack-and-pinion mechanism driven by Dynamixel servos, with the embedded control system developed on Arduino."}
                    </p>
                </div>

                {/* 中层：三列等宽网格 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-6">
                    <div className="flex flex-col items-center">
                        <img
                            src={`${ASSET_BASE}/experience/duke-nus/gear-rack-cad.webp`}
                            className={`${MEDIA_FILTER} object-cover aspect-[4/3]`}
                            alt="Gear/Rack CAD"
                        />
                        <p className="text-sm text-zinc-500 mt-3 text-center font-medium">
                            {isZh ? "传动机构概念建模" : "Transmission Mechanism CAD"}
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <LazyMedia placeholderClass="w-full aspect-[4/3] rounded-xl">
                            <video
                                src={`${ASSET_BASE}/experience/duke-nus/gear-rack-sim.mp4`}
                                className={`${MEDIA_FILTER} object-cover aspect-[4/3]`}
                                controls
                                preload="metadata"
                                muted
                                playsInline
                            />
                        </LazyMedia>
                        <p className="text-sm text-zinc-500 mt-3 text-center font-medium">
                            {isZh ? "运动学仿真" : "Kinematic Simulation"}
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <LazyMedia placeholderClass="w-full aspect-[4/3] rounded-xl">
                            <video
                                src={`${ASSET_BASE}/experience/duke-nus/gear-rack-test.mp4`}
                                className={`${MEDIA_FILTER} object-contain bg-zinc-100 aspect-[4/3]`}
                                controls
                                preload="metadata"
                                muted
                                playsInline
                            />
                        </LazyMedia>
                        <p className="text-sm text-zinc-500 mt-3 text-center font-medium">
                            {isZh ? "驱动器单体性能测试" : "Actuator Unit Performance Test"}
                        </p>
                    </div>
                </div>

                {/* 底层：超宽单列网格 */}
                <div className="grid grid-cols-1 mt-6 w-full">
                    <div className="flex flex-col items-center max-w-full md:max-w-[50%] mx-auto">
                        <img
                            src={`${ASSET_BASE}/experience/duke-nus/control-architecture.webp`}
                            className={`${MEDIA_FILTER} object-cover aspect-[3075/1517]`}
                            alt="Control Architecture"
                        />
                        <p className="text-sm text-zinc-500 mt-3 text-center font-medium">
                            {isZh ? "底层控制系统搭建" : "Embedded Control System Architecture"}
                        </p>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* Module 03: Structural FEA Validation           */}
            {/* ============================================ */}
            <section className="max-w-7xl mx-auto px-8 mb-32">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-sm font-bold text-zinc-400 tracking-widest">03 /</span>
                    <h2 className="text-3xl font-semibold tracking-tight">
                        {isZh ? "结构静力学校核" : "Structural FEA Validation"}
                    </h2>
                </div>

                {/* 顶层文字占位 */}
                <div className="w-full mb-10 space-y-3">
                    <p className="text-zinc-500 font-light leading-relaxed w-full">
                        {isZh
                            ? "采用 SolidWorks Simulation 对伺服电机安装基座开展静力学分析，评估结构应力与刚度，为结构设计提供验证依据。"
                            : "Static finite element analysis was conducted in SolidWorks Simulation to evaluate the stress distribution and stiffness of the servo mounting bracket, providing quantitative support for structural design."}
                    </p>
                </div>

                {/* 全宽单列大画幅 */}
                <div className="grid grid-cols-1 w-full">
                    <div className="flex flex-col items-center max-w-full md:max-w-[66%] mx-auto">
                        <img
                            src={`${ASSET_BASE}/experience/duke-nus/servo-fea.webp`}
                            className={`${MEDIA_FILTER} object-cover aspect-[2096/757]`}
                            alt="Servo Mount Static FEA"
                        />
                        <p className="text-sm text-zinc-500 mt-3 text-center font-medium">
                            {isZh ? "舵机安装基座应力分布云图" : "Servo Mount Stress Distribution Map"}
                        </p>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* Module 04: Advanced DfAM                       */}
            {/* ============================================ */}
            <section className="max-w-7xl mx-auto px-8 mb-32">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-sm font-bold text-zinc-400 tracking-widest">04 /</span>
                    <h2 className="text-3xl font-semibold tracking-tight">
                        {isZh ? "面向增材制造的设计" : "Design for Additive Manufacturing (DfAM)"}
                    </h2>
                </div>

                {/* 顶层文字占位 */}
                <div className="w-full mb-10 space-y-3">
                    <p className="text-zinc-500 font-light leading-relaxed w-full">
                        {isZh
                            ? "基于 PLA 与 TPU 多材料互锁连接设计，减少装配接口，将系统零部件数量由 62 件整合至 5 件，实现结构集成与制造成本优化。"
                            : "Designed an interlocking PLA–TPU multi-material structure to reduce assembly interfaces, consolidating the system from 62 components to 5 while improving structural integration and manufacturing efficiency."}
                    </p>
                </div>

                {/* 三列等宽网格 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <div className="flex flex-col items-center">
                        <img
                            src={`${ASSET_BASE}/experience/duke-nus/tpu-pla-design.webp`}
                            className={`${MEDIA_FILTER} object-contain bg-zinc-100 aspect-[4/3]`}
                            alt="TPU/PLA Interlocking Design"
                        />
                        <p className="text-sm text-zinc-500 mt-3 text-center font-medium">
                            {isZh ? "多材料互锁结构设计" : "Interlocking Multi-material Design"}
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img
                            src={`${ASSET_BASE}/experience/duke-nus/print-detail-1.webp`}
                            className={`${MEDIA_FILTER} object-cover aspect-[4/3]`}
                            alt="Print Close-up 1"
                        />
                        <p className="text-sm text-zinc-500 mt-3 text-center font-medium">
                            {isZh ? "柔性关节打印质量优化" : "Flexible Joint Print Optimization"}
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img
                            src={`${ASSET_BASE}/experience/duke-nus/print-detail-2.webp`}
                            className={`${MEDIA_FILTER} object-cover aspect-[4/3]`}
                            alt="Print Close-up 2"
                        />
                        <p className="text-sm text-zinc-500 mt-3 text-center font-medium">
                            {isZh ? "刚柔耦合打印原型" : "Rigid–Soft Integrated Prototype"}
                        </p>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* Module 05: Engineering SOP                     */}
            {/* ============================================ */}
            <section className="max-w-7xl mx-auto px-8 mb-32">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-sm font-bold text-zinc-400 tracking-widest">05 /</span>
                    <h2 className="text-3xl font-semibold tracking-tight">
                        {isZh ? "工业级标准操作规程 (SOP)" : "Standardized Engineering Documentation"}
                    </h2>
                </div>

                {/* 顶层文字占位 */}
                <div className="w-full mb-10 space-y-3">
                    <p className="text-zinc-500 font-light leading-relaxed w-full">
                        {isZh
                            ? "整理 TPU 柔性材料打印工艺参数，形成实验室标准操作规程（SOP），用于统一打印流程与工艺规范。"
                            : "Documented key TPU printing parameters and established a laboratory Standard Operating Procedure (SOP) to standardize the printing workflow."}
                    </p>
                </div>

                {/* 两列等宽网格（无描述文字） */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <img
                        src={`${ASSET_BASE}/experience/duke-nus/sop-1.webp`}
                        className={`${MEDIA_FILTER} object-contain bg-zinc-100 aspect-[1628/1085]`}
                        alt="SOP Screenshot 1"
                    />
                    <img
                        src={`${ASSET_BASE}/experience/duke-nus/sop-2.webp`}
                        className={`${MEDIA_FILTER} object-contain bg-zinc-100 aspect-[1628/1085]`}
                        alt="SOP Screenshot 2"
                    />
                </div>
            </section>
        </main>
    );
}

export default function DukeNusExperiencePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-zinc-50"></div>}>
            <DukeNusContent />
        </Suspense>
    );
}