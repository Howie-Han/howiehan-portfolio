"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// 3D 组件懒加载
const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full min-h-[300px] rounded-xl bg-zinc-800 flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-zinc-600 border-t-white rounded-full animate-spin" />
            <span className="text-xs tracking-widest uppercase text-zinc-500">
                Loading 3D Model…
            </span>
        </div>
    ),
});

const MEDIA_FILTER =
    "filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700 w-full h-auto object-cover rounded-xl";

function DetailContent() {
    const searchParams = useSearchParams();
    const lang = searchParams.get("lang") || "zh";

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-zinc-200">
            {/* ─── Navigation ─── */}
            <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-md border-b border-zinc-200 z-50">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
                    <Link
                        href={`/?lang=${lang}#projects`}
                        className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-2"
                    >
                        <span>←</span>
                        {lang === "zh" ? "返回主页" : "Back to Home"}
                    </Link>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 pt-32 pb-24">

                {/* ═══════════════════════════════════════════════
                   Module 01 – Hero 3D
                   ═══════════════════════════════════════════════ */}
                <section className="min-h-[80vh] flex flex-col items-center justify-center text-center mb-24">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        {lang === "zh"
                            ? "高精度全向舵轮研发"
                            : "High-Precision Omnidirectional Steering Wheel"}
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
                        {lang === "zh"
                            ? "全国大学生机器人大赛 ROBOCON — 舵轮 / 全向轮底盘系统"
                            : "National University Robot Competition ROBOCON — Steering & Omni-Wheel Chassis System"}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {[
                            lang === "zh" ? "ROBOCON 全国一等奖" : "ROBOCON National 1st Prize",
                            "Dual-Motor",
                            "4:1 Ratio",
                            "GB Standard",
                        ].map((tag) => (
                            <span
                                key={tag}
                                className="bg-zinc-100 text-zinc-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-zinc-200"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* 3D Canvas — ModelViewer via next/dynamic */}
                    <div className="w-full max-w-4xl aspect-[2273/1276] rounded-2xl overflow-hidden border border-zinc-200 shadow-md">
                        <ModelViewer />
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                   Module 02 – Architecture
                   ═══════════════════════════════════════════════ */}
                <section className="mb-24 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left – Sticky Text */}
                        <div className="sticky top-24 self-start">
                            <h2 className="text-3xl font-bold tracking-tight mb-6">
                                {lang === "zh"
                                    ? "双电机解耦传动架构"
                                    : "Decoupled Transmission Architecture"}
                            </h2>
                            <p className="text-zinc-500 leading-relaxed">
                                {lang === "zh"
                                    ? "采用双电机独立驱动，通过 4:1 锥齿轮与直齿轮减速系统，实现 1.7° 的极高系统级转向分辨率。"
                                    : "Achieved 1.7° extreme steering resolution through a 4:1 bevel and spur gear reduction system."}
                            </p>
                        </div>

                        {/* Right – 2 Videos */}
                        <div className="flex flex-col gap-6">
                            {/* Axial Gear Video */}
                            <div className="w-full aspect-[1680/720] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                                <video
                                    src="/media/project/omni-wheel/sim-axial.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className={MEDIA_FILTER}
                                />
                            </div>

                            {/* Steering Gear Video */}
                            <div className="w-full aspect-[1280/720] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                                <video
                                    src="/media/project/omni-wheel/sim-steering.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className={MEDIA_FILTER}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                   Module 03 – Simulation & Validation
                   ═══════════════════════════════════════════════ */}
                {/* 资源缺失，已彻底删除 */}

                {/* ═══════════════════════════════════════════════
                   Module 04 – Industrial Rigor
                   ═══════════════════════════════════════════════ */}
                <section className="mb-24 py-8">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">
                        {lang === "zh"
                            ? "工业级公差控制与规范"
                            : "Tolerance Control & CNC Standards"}
                    </h2>
                    <p className="text-zinc-400 mb-10 max-w-xl">
                        {lang === "zh"
                            ? "严格遵循 GB/T1804-2000 国家公差标准出图。核心传动部件标注达到 7 级精度。"
                            : "Strict adherence to GB/T1804-2000 standard. Implemented Grade 7 precision for core transmission gears."}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* CAD Blueprint 1 – Shaft */}
                        <div className="w-full aspect-[1292/925] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                            <img
                                src="/media/project/omni-wheel/cad-shaft.png"
                                alt="CAD Shaft Blueprint"
                                className={MEDIA_FILTER}
                            />
                        </div>

                        {/* CAD Blueprint 2 – Gear */}
                        <div className="w-full aspect-[1279/915] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                            <img
                                src="/media/project/omni-wheel/cad-gear.png"
                                alt="CAD Gear Blueprint"
                                className={MEDIA_FILTER}
                            />
                        </div>

                        {/* CAD Blueprint 3 – Part */}
                        <div className="w-full aspect-[1215/876] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                            <img
                                src="/media/project/omni-wheel/cad-part.png"
                                alt="CAD Part Blueprint"
                                className={MEDIA_FILTER}
                            />
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                   Module 05 – Fabrication & Integration
                   ═══════════════════════════════════════════════ */}
                <section className="mb-24 py-8">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">
                        {lang === "zh"
                            ? "实机打样与底层联调"
                            : "Hardware Integration & Delivery"}
                    </h2>
                    <p className="text-zinc-400 mb-10 max-w-xl">
                        {lang === "zh"
                            ? "展现极强的闭环交付力：完成从图纸到高精度舵轮的组装。打通机电走线，成功支撑 6kg 负载底座联调。"
                            : "Delivered the complete engineering loop from blueprint to mass production. Successfully integrated to handle a 6kg payload."}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left – Large */}
                        <div className="w-full aspect-[655/491] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                            <img
                                src="/media/project/omni-wheel/hardware-single.png"
                                alt="Single Wheel Hardware"
                                className={MEDIA_FILTER}
                            />
                        </div>

                        {/* Right – Stacked */}
                        <div className="flex flex-col gap-6">
                            <div className="w-full aspect-[800/600] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                                <img
                                    src="/media/project/omni-wheel/hardware-integration.png"
                                    alt="Chassis Integration"
                                    className={MEDIA_FILTER}
                                />
                            </div>
                            <div className="w-full aspect-[800/533] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                                <img
                                    src="/media/project/omni-wheel/hardware-debugging.png"
                                    alt="On-site Debugging"
                                    className={MEDIA_FILTER}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                   Module 06 – The Arena
                   ═══════════════════════════════════════════════ */}
                <section className="mb-24 py-8">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">
                        {lang === "zh"
                            ? "赛场实战与团队荣誉"
                            : "Battle-Tested Performance"}
                    </h2>
                    <p className="text-zinc-400 mb-10 max-w-xl">
                        {lang === "zh"
                            ? "历经国家级赛事高强度实战检验。以极致稳定的底层硬件基础，助力团队斩获 ROBOCON 全国一等奖。"
                            : "The robust mechanical chassis empowered the team to secure the National 1st Prize in the ROBOCON Championship."}
                    </p>

                    {/* Side-by-side videos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Manual Robot Video */}
                        <div className="w-full aspect-[1280/720] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                            <video
                                src="/media/project/omni-wheel/match-manual.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className={MEDIA_FILTER}
                            />
                        </div>

                        {/* Auto Robot Video */}
                        <div className="w-full aspect-[1280/720] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                            <video
                                src="/media/project/omni-wheel/match-auto.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className={MEDIA_FILTER}
                            />
                        </div>
                    </div>

                    {/* Full-width team photo */}
                    <div className="w-full aspect-[2816/1600] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                        <img
                            src="/media/project/omni-wheel/team-photo.png"
                            alt="Team Photo"
                            className={MEDIA_FILTER}
                        />
                    </div>
                </section>

            </main>

            {/* ─── Footer ─── */}
            <footer className="border-t border-zinc-200 py-12 text-center text-sm text-zinc-400">
                <p>ROBOCON — Steering & Omni-Wheel Chassis Project</p>
            </footer>
        </div>
    );
}

export default function ProjectDetail() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-zinc-50"></div>}>
            <DetailContent />
        </Suspense>
    );
}