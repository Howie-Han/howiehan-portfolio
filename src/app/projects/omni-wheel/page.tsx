"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ASSET_BASE } from "@/config/assets";
import LazyMedia from "@/components/LazyMedia";

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
    "w-full h-auto object-cover rounded-xl";

const MEDIA_FILTER_VIDEO =
    "bg-white object-cover w-full h-full scale-[1.02] rounded-xl";

const PLACEHOLDER_FILTER =
    "w-full h-full flex items-center justify-center bg-zinc-200 rounded-xl border border-zinc-300 shadow-inner";

function DetailContent() {
    const searchParams = useSearchParams();
    const lang = searchParams.get("lang") || "zh";

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-zinc-200">
            {/* ─── Navigation ─── */}
            <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-50/80 border-b border-zinc-200/50">
                <div className="w-full px-6 md:px-12 lg:px-24 py-4 flex items-center">
                    <Link
                        href={`/?lang=${lang}#projects`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                        <span>{"<"}</span>
                        <span>{lang === "zh" ? "返回项目经历" : "Back to Projects"}</span>
                    </Link>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 pt-32 pb-24">

                {/* ═══════════════════════════════════════════════
                   Module 01 – Hero 3D & Media Matrix
                   ═══════════════════════════════════════════════ */}
                <section className="min-h-[80vh] flex flex-col items-center justify-center text-center mb-24">
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
                        {lang === "zh"
                            ? "高精度舵轮与移动机器人底盘研发"
                            : "High-Precision Swerve Module & Mobile Robot Chassis Development"}
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl w-full leading-relaxed mb-8">
                        {lang === "zh"
                            ? "全国大学生机器人大赛 ROBOCON: 舵轮底盘系统"
                            : "National University Robot Competition ROBOCON: Swerve Module & Chassis System"}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {[
                            lang === "zh" ? "ROBOCON 全国季军" : "ROBOCON National 1st Prize",
                            lang === "zh" ? "双电机驱动" : "Dual-Motor Drive",
                            lang === "zh" ? "锥齿轮传动" : "Bevel Gear Transmission",
                            lang === "zh" ? "直齿轮减速" : "Spur Gear Reduction",
                            lang === "zh" ? "GB公差与工程图出图" : "GB Engineering Drawings",
                        ].map((tag) => (
                            <span
                                key={tag}
                                className="bg-zinc-100 text-zinc-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-zinc-200"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* 2-column Media Matrix: 3D Model + Exploded View Video */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-stretch">
                        {/* Left – 3D Model */}
                        <div className="w-full rounded-2xl overflow-hidden border border-zinc-200 shadow-md bg-zinc-100">
                            <ModelViewer />
                        </div>

                        {/* Right – Exploded View Video */}
                        <div className="w-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100">
                            <LazyMedia placeholderClass="w-full aspect-[4/3] rounded-xl">
                                <video
                                    src={`${ASSET_BASE}/project/omni-wheel/exploded-view.mp4`}
                                    controls
                                    preload="metadata"
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover rounded-xl aspect-[4/3]"
                                />
                            </LazyMedia>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                   Module 02 – Architecture (Flow Layout)
                   ═══════════════════════════════════════════════ */}
                <section className="mb-24 py-8">
                    {/* Title & Description — full width, above media */}
                    <div className="flex flex-col gap-4 mb-8 w-full">
                        <h2 className="text-3xl font-bold tracking-tight">
                            {lang === "zh"
                                ? "双电机解耦传动架构"
                                : "Decoupled Transmission Architecture"}
                        </h2>
                        <p className="text-zinc-500 leading-relaxed w-full">
                            {lang === "zh"
                                ? "采用双电机独立驱动架构，结合锥齿轮转向与直齿轮减速传动，实现约 1.7° 的系统转向精度。"
                                : "Implemented a dual-motor architecture combining bevel gear steering and spur gear reduction, achieving a steering accuracy of approximately 1.7°."}
                        </p>
                    </div>

                    {/* Videos — side by side, unified aspect-video */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {/* Axial Gear Video */}
                        <div className="w-full aspect-video rounded-xl overflow-hidden border border-zinc-200 bg-white">
                            <LazyMedia placeholderClass="w-full aspect-video rounded-xl">
                                <video
                                    src={`${ASSET_BASE}/project/omni-wheel/sim-axial.mp4`}
                                    controls
                                    preload="metadata"
                                    muted
                                    playsInline
                                    className={MEDIA_FILTER_VIDEO}
                                />
                            </LazyMedia>
                        </div>

                        {/* Steering Gear Video */}
                        <div className="w-full aspect-video rounded-xl overflow-hidden border border-zinc-200 bg-white">
                            <LazyMedia placeholderClass="w-full aspect-video rounded-xl">
                                <video
                                    src={`${ASSET_BASE}/project/omni-wheel/sim-steering.mp4`}
                                    controls
                                    preload="metadata"
                                    muted
                                    playsInline
                                    className={MEDIA_FILTER_VIDEO}
                                />
                            </LazyMedia>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                   Module 03 – Simulation & Validation (Deleted)
                   ═══════════════════════════════════════════════ */}

                {/* ═══════════════════════════════════════════════
                   Module 04 – Industrial Rigor
                   ═══════════════════════════════════════════════ */}
                <section className="mb-24 py-8">
                    {/* Title & Description — isolated above grid */}
                    <div className="flex flex-col gap-4 mb-8 w-full">
                        <h2 className="text-3xl font-bold tracking-tight">
                            {lang === "zh"
                                ? "工业级公差控制与规范"
                                : "Tolerance Control & CNC Standards"}
                        </h2>
                        <p className="text-zinc-400 w-full">
                            {lang === "zh"
                                ? "依据GB国家标准完成工程图设计，核心传动件采用 7 级公差标注，满足装配与传动精度要求。"
                                : "Engineering drawings were produced in accordance with GB standards, with critical drivetrain components specified to IT7 tolerance where required for assembly accuracy."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="w-full aspect-[1292/925] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                            <img
                                src={`${ASSET_BASE}/project/omni-wheel/cad-shaft.webp`}
                                alt="CAD Shaft Blueprint"
                                className={MEDIA_FILTER}
                            />
                        </div>
                        <div className="w-full aspect-[1279/915] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                            <img
                                src={`${ASSET_BASE}/project/omni-wheel/cad-gear.webp`}
                                alt="CAD Gear Blueprint"
                                className={MEDIA_FILTER}
                            />
                        </div>
                        <div className="w-full aspect-[1215/876] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                            <img
                                src={`${ASSET_BASE}/project/omni-wheel/cad-part.webp`}
                                alt="CAD Part Blueprint"
                                className={MEDIA_FILTER}
                            />
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                   Module 04b – CAE Simulation & Structural Validation
                   ═══════════════════════════════════════════════ */}
                <section className="mb-24 py-16 md:py-24">
                    {/* Section Header */}
                    <div className="flex flex-col gap-4 mb-12 w-full">
                        <h2 className="text-3xl font-bold tracking-tight">
                            {lang === "zh"
                                ? "CAE 有限元分析与结构校核"
                                : "CAE Simulation & Structural Validation"}
                        </h2>
                        <p className="text-zinc-500 leading-relaxed w-full">
                            {lang === "zh"
                                ? "针对关键传动部件开展静力学有限元分析，评估极限工况下的应力分布与变形，为结构尺寸、配合间隙及支撑方案提供设计依据。"
                                : "Static finite element analysis was conducted on key drivetrain components to evaluate stress distribution and elastic deformation under critical loading conditions, providing quantitative support for structural sizing and transmission clearance design."}
                        </p>
                    </div>

                    {/* ─── Sub-group 1: 75T Gear ─── */}
                    <div className="mb-16">
                        {/* 2-column image grid — stress + displacement */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="aspect-[16/10] overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200/80 shadow-sm">
                                <img
                                    src={`${ASSET_BASE}/project/omni-wheel/gear-75t-stress.webp`}
                                    alt="75T Gear Stress Distribution"
                                    className="object-contain w-full h-full"
                                />
                            </div>
                            <div className="aspect-[16/10] overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200/80 shadow-sm">
                                <img
                                    src={`${ASSET_BASE}/project/omni-wheel/gear-75t-displacement.webp`}
                                    alt="75T Gear Displacement"
                                    className="object-contain w-full h-full"
                                />
                            </div>
                        </div>
                        {/* Description */}
                        <h3 className="text-xl font-semibold tracking-tight mb-3">
                            {lang === "zh"
                                ? "75T 转向从动齿轮：单齿弯曲与啮合间隙校核"
                                : "75T Steering Driven Gear: Single-Tooth Bending & Backlash Validation"}
                        </h3>
                        <p className={`text-zinc-500 leading-relaxed w-full ${lang === "en" ? "text-justify hyphens-auto" : ""}`}>
                            {lang === "zh"
                                ? "对75T转向从动齿轮开展单齿弯曲分析，评估堵转工况下的齿根应力与啮合变形，验证齿轮强度及传动精度设计。"
                                : "Static bending analysis was performed on the 75T steering driven gear to evaluate tooth root stress and meshing deformation under stall conditions, providing verification for gear strength and transmission accuracy."}
                        </p>
                    </div>

                    {/* ─── Sub-group 2: Transverse Shaft ─── */}
                    <div>
                        {/* 2-column image grid — stress + displacement */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="aspect-[16/10] overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200/80 shadow-sm">
                                <img
                                    src={`${ASSET_BASE}/project/omni-wheel/shaft-transverse-stress.webp`}
                                    alt="Transverse Shaft Stress Distribution"
                                    className="object-contain w-full h-full"
                                />
                            </div>
                            <div className="aspect-[16/10] overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200/80 shadow-sm">
                                <img
                                    src={`${ASSET_BASE}/project/omni-wheel/shaft-transverse-displacement.webp`}
                                    alt="Transverse Shaft Displacement"
                                    className="object-contain w-full h-full"
                                />
                            </div>
                        </div>
                        {/* Description */}
                        <h3 className="text-xl font-semibold tracking-tight mb-3">
                            {lang === "zh"
                                ? "横向车轮传动轴：跨中挠度与锥齿轮支承校核"
                                : "Transverse Drive Shaft: Mid-Span Deflection & Bevel Gear Support Analysis"}
                        </h3>
                        <p className={`text-zinc-500 leading-relaxed w-full ${lang === "en" ? "text-justify hyphens-auto" : ""}`}>
                            {lang === "zh"
                                ? "对横向传动轴进行跨中挠度分析，评估轴系弯曲刚度及其对锥齿轮啮合精度的影响，为支撑方案设计提供验证依据。"
                                : "A deflection analysis was performed on the transverse drive shaft to evaluate its bending stiffness, ensuring that the meshing accuracy requirements of the bevel gears are met, and providing a verification basis for the shaft support scheme."}
                        </p>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                   Module 05 – Fabrication & Integration
                   ═══════════════════════════════════════════════ */}
                <section className="mb-24 py-8">
                    {/* Title & Description — isolated above grid */}
                    <div className="flex flex-col gap-4 mb-8 w-full">
                        <h2 className="text-3xl font-bold tracking-tight">
                            {lang === "zh"
                                ? "实机装配与底层联调"
                                : "Hardware Assembly & Integration"}
                        </h2>
                        <p className="text-zinc-400 w-full">
                            {lang === "zh"
                                ? "完成舵轮系统加工制造、整机装配及机电集成，并参与底层控制系统联调与负载移动机器人底盘测试。"
                                : "Completed fabrication, mechanical assembly, and mechatronic integration of the swerve module, followed by low-level system commissioning and validation on a mobile robot platform."}
                        </p>
                    </div>

                    {/* Unified aspect-[4/3] for equal frame height */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                            <img
                                src={`${ASSET_BASE}/project/omni-wheel/hardware-single.webp`}
                                alt="Single Wheel Hardware"
                                className={MEDIA_FILTER}
                            />
                        </div>
                        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                            <img
                                src={`${ASSET_BASE}/project/omni-wheel/hardware-integration.webp`}
                                alt="Chassis Integration"
                                className={MEDIA_FILTER}
                            />
                        </div>
                        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                            <img
                                src={`${ASSET_BASE}/project/omni-wheel/hardware-debugging.webp`}
                                alt="On-site Debugging"
                                className={MEDIA_FILTER}
                            />
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                   Module 06 – The Arena
                   ═══════════════════════════════════════════════ */}
                <section className="mb-24 py-8">
                    {/* Title & Description — isolated above grid */}
                    <div className="flex flex-col gap-4 mb-8 w-full">
                        <h2 className="text-3xl font-bold tracking-tight">
                            {lang === "zh"
                                ? "整机部署与赛事验证"
                                : "System Deployment & Competition Validation"}
                        </h2>
                        <p className="text-zinc-400 w-full">
                            {lang === "zh"
                                ? "部署完成的两套移动机器人底盘被应用于 ROBOCON 全国大学生机器人大赛实战，并通过比赛环境验证系统可靠性，最终获得全国季军。"
                                : "Two complete mobile robot chassis were deployed for the ROBOCON National Robotics Competition, where the team was awarded the National First Prize."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="w-full aspect-[1280/720] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                            <LazyMedia placeholderClass="w-full aspect-[1280/720] rounded-xl">
                                <video
                                    src={`${ASSET_BASE}/project/omni-wheel/match-manual.mp4`}
                                    controls
                                    preload="metadata"
                                    muted
                                    playsInline
                                    className={MEDIA_FILTER}
                                />
                            </LazyMedia>
                        </div>
                        <div className="w-full aspect-[1280/720] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                            <LazyMedia placeholderClass="w-full aspect-[1280/720] rounded-xl">
                                <video
                                    src={`${ASSET_BASE}/project/omni-wheel/match-auto.mp4`}
                                    controls
                                    preload="metadata"
                                    muted
                                    playsInline
                                    className={MEDIA_FILTER}
                                />
                            </LazyMedia>
                        </div>
                    </div>

                    <div className="w-full aspect-[2816/1600] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                        <img
                            src={`${ASSET_BASE}/project/omni-wheel/team-photo.webp`}
                            alt="Team Photo"
                            className={MEDIA_FILTER}
                        />
                    </div>
                </section>

            </main>
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