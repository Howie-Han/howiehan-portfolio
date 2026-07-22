"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ASSET_BASE } from "@/config/assets";

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
                        ? "针对仿生胸腔模拟器进行整机建模与力学拓扑优化。运用 DfAM（面向增材制造的设计）原则对软硬复合材料进行工艺调优，将TPU软体材料的打印失败率显著降低 20%，零部件数量从 62 件大幅锐减至 5 件。"
                        : "Conducted full-scale modeling and structural optimization for a biomimetic ribcage simulator. Applied DfAM principles to optimize multi-material FDM print parameters, lowering the print-failure rate of TPU filament by 20% and reducing assembly parts from 62 to 5 pcs."}
                </p>

                {/* 三列等高栅格容器 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mt-8 items-stretch">
                    {/* 左列：GLB */}
                    <div className="flex flex-col w-full h-full min-w-0">
                        <div className="relative w-full h-[40vh] md:h-[350px] max-h-[450px] object-contain bg-zinc-100 rounded-xl overflow-hidden">
                            <div className="w-full h-full flex items-center justify-center">
                                <ModelViewer modelPath={`${ASSET_BASE}/experience/duke-nus/simulator.glb`} />
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
                                src={`${ASSET_BASE}/experience/duke-nus/simulator-render.png`}
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
                            <video
                                src={`${ASSET_BASE}/experience/duke-nus/system-operation.mp4`}
                                className="w-full h-full object-contain"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        </div>
                        <p className="text-sm text-zinc-500 mt-3 text-center font-medium">
                            {isZh ? "全系统实机连续运行" : "Full System Physical Operation"}
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
                            ? "通过齿轮齿条机构将复杂呼吸运动降维为可控直线运动，采用 Dynamixel 伺服电机驱动，并基于 Arduino 搭建底层电控链路。"
                            : "Decoupled complex respiratory motions into controlled linear actuations via rack and pinion, driven by Dynamixel servos and orchestrated by an Arduino-based lower-level framework."}
                    </p>
                </div>

                {/* 中层：三列等宽网格 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-6">
                    <div className="flex flex-col items-center">
                        <img
                            src={`${ASSET_BASE}/experience/duke-nus/gear-rack-cad.png`}
                            className={`${MEDIA_FILTER} object-cover aspect-[4/3]`}
                            alt="Gear/Rack CAD"
                        />
                        <p className="text-sm text-zinc-500 mt-3 text-center font-medium">
                            {isZh ? "传动机构概念建模" : "Transmission Mechanism CAD"}
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <video
                            src={`${ASSET_BASE}/experience/duke-nus/gear-rack-sim.mp4`}
                            className={`${MEDIA_FILTER} object-cover aspect-[4/3]`}
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        <p className="text-sm text-zinc-500 mt-3 text-center font-medium">
                            {isZh ? "运动学仿真" : "Kinematic Simulation"}
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <video
                            src={`${ASSET_BASE}/experience/duke-nus/gear-rack-test.mp4`}
                            className={`${MEDIA_FILTER} object-contain bg-zinc-100 aspect-[4/3]`}
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        <p className="text-sm text-zinc-500 mt-3 text-center font-medium">
                            {isZh ? "驱动器单体性能测试" : "Actuator Unit Performance Test"}
                        </p>
                    </div>
                </div>

                {/* 底层：超宽单列网格 */}
                <div className="grid grid-cols-1 mt-6 w-full">
                    <div className="flex flex-col items-center max-w-full md:max-w-[50%] mx-auto">
                        <img
                            src={`${ASSET_BASE}/experience/duke-nus/control-architecture.png`}
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
                            ? "运用 SolidWorks Simulation 对伺服电机基座进行静力学分析，指导结构设计，确保动态交变负载下的结构刚度与强度。"
                            : "Conducted rigorous static stress analysis on the servo mounting structures using SolidWorks Simulation to ensure sufficient stiffness and load-bearing capacity under dynamic conditions."}
                    </p>
                </div>

                {/* 全宽单列大画幅 */}
                <div className="grid grid-cols-1 w-full">
                    <div className="flex flex-col items-center max-w-full md:max-w-[66%] mx-auto">
                        <img
                            src={`${ASSET_BASE}/experience/duke-nus/servo-fea.png`}
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
                        {isZh ? "极限增材制造与材料工程" : "Advanced DfAM & Material Engineering"}
                    </h2>
                </div>

                {/* 顶层文字占位 */}
                <div className="w-full mb-10 space-y-3">
                    <p className="text-zinc-500 font-light leading-relaxed w-full">
                        {isZh
                            ? "突破传统 FDM 边界，通过刚性 PLA 与柔性 TPU 的多材料互锁连接设计，将系统零件总数从 62 个极限压缩至 5 个，实现系统结构优化与降本。"
                            : "Explored the limits of FDM by integrating rigid PLA and flexible TPU through multi-segment interlocking designs, drastically reducing the BOM from 62 to just 5 consolidated parts."}
                    </p>
                </div>

                {/* 三列等宽网格 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <div className="flex flex-col items-center">
                        <img
                            src={`${ASSET_BASE}/experience/duke-nus/tpu-pla-design.png`}
                            className={`${MEDIA_FILTER} object-contain bg-zinc-100 aspect-[4/3]`}
                            alt="TPU/PLA Interlocking Design"
                        />
                        <p className="text-sm text-zinc-500 mt-3 text-center font-medium">
                            {isZh ? "多材料互锁结构理论设计" : "Multi-Material Interlocking Design"}
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img
                            src={`${ASSET_BASE}/experience/duke-nus/print-detail-1.png`}
                            className={`${MEDIA_FILTER} object-cover aspect-[4/3]`}
                            alt="Print Close-up 1"
                        />
                        <p className="text-sm text-zinc-500 mt-3 text-center font-medium">
                            {isZh ? "柔性关节表面光洁度优化" : "Flexible Joint Surface Optimization"}
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img
                            src={`${ASSET_BASE}/experience/duke-nus/print-detail-2.png`}
                            className={`${MEDIA_FILTER} object-cover aspect-[4/3]`}
                            alt="Print Close-up 2"
                        />
                        <p className="text-sm text-zinc-500 mt-3 text-center font-medium">
                            {isZh ? "刚柔耦合实物高精打印" : "Rigid-Flexible Coupled High-Precision Print"}
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
                            ? "提炼并验证 TPU 柔性材料打印核心工艺参数，撰写输出实验室级操作规程，展现成熟硬件工程师的技术沉淀与标准化文档能力。"
                            : "Formulated a comprehensive laboratory-level Standard Operating Procedure (SOP) for TPU printing, demonstrating maturity in technical documentation and knowledge transfer."}
                    </p>
                </div>

                {/* 两列等宽网格（无描述文字） */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <img
                        src={`${ASSET_BASE}/experience/duke-nus/sop-1.png`}
                        className={`${MEDIA_FILTER} object-contain bg-zinc-100 aspect-[1628/1085]`}
                        alt="SOP Screenshot 1"
                    />
                    <img
                        src={`${ASSET_BASE}/experience/duke-nus/sop-2.png`}
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