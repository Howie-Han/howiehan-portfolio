"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ASSET_BASE } from "@/config/assets";
import LazyMedia from "@/components/LazyMedia";

const MEDIA_CLASSES = "rounded-xl object-contain w-full h-full";
const CONTAINER_CLASSES = "bg-zinc-100 rounded-xl overflow-hidden";

function DetailContent() {
    const searchParams = useSearchParams();
    const lang = (searchParams.get("lang") as "zh" | "en") || "zh";

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-zinc-300">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-50/80 border-b border-zinc-200/50">
                <div className="w-full px-6 md:px-12 lg:px-24 py-4 flex items-center">
                    <Link href={`/?lang=${lang}#projects`} className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
                        <span>{"<"}</span>
                        <span>{lang === "zh" ? "返回项目经历" : "Back to Projects"}</span>
                    </Link>
                </div>
            </nav>

            <main className="w-full">
                {/* ========== Module 01: Hero Section ========== */}
                <section className="w-full pt-32 pb-24 px-6">
                    <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center">
                        <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight w-full text-zinc-900">
                            {lang === "zh"
                                ? "刚柔耦合绳驱空间腕关节灵巧手开发"
                                : "Development of a Tendon-Driven Compliant Robotic Wrist & Adaptive Gripper"}
                        </h1>
                        <div className="flex flex-wrap justify-center gap-3 mt-8">
                            {[
                                lang === "zh" ? "D-H 运动学" : "D-H Kinematics",
                                lang === "zh" ? "绳驱动" : "Rope-Driven",
                                lang === "zh" ? "刚柔耦合" : "Rigid-Flexible Coupling",
                                lang === "zh" ? "1kg 负载" : "1kg Payload"
                            ].map((badge) => (
                                <span key={badge} className="bg-zinc-100 text-zinc-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-zinc-200">
                                    {badge}
                                </span>
                            ))}
                        </div>
                        <p className="text-lg text-zinc-500 md:text-xl leading-relaxed w-full mt-10">
                            {lang === "zh"
                                ? "主导设计 3 自由度串联球腕关节与欠驱动刚柔耦合夹爪，完成 D-H 正运动学建模、机构设计、加工装配及样机验证，实现 1 kg 末端有效负载。"
                                : "Led the development of a 3-DOF serial spherical wrist and an underactuated compliant gripper, completing D-H kinematic modeling, mechanical design, fabrication, assembly, and prototype validation with a verified 1 kg payload."}
                        </p>
                    </div>
                </section>

                {/* ========== Module 02: Kinematic Modeling & Workspace ========== */}
                <section className="w-full py-16 md:py-24 px-6 bg-white">
                    <div className="w-full max-w-6xl mx-auto">
                        <div className="flex flex-col gap-4 mb-8 w-full">
                            <h2 className="text-3xl font-bold tracking-tight">
                                {lang === "zh" ? "运动学与工作空间验证" : "D-H Kinematics & Workspace Validation"}
                            </h2>
                            <p className="text-zinc-600 leading-relaxed w-full">
                                {lang === "zh"
                                    ? "基于 D-H 参数建立正运动学模型，并利用 MATLAB Robotics Toolbox 开展蒙特卡洛仿真，验证约 200 mm 半球形工作空间。"
                                    : "Established the forward kinematic model using D-H parameters and performed Monte Carlo simulations in MATLAB Robotics Toolbox to validate an approximately 200 mm hemispherical workspace."}
                            </p>
                        </div>
                        {/* MATLAB Academic Dual-Column Media Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-11/12 lg:w-5/6 mx-auto mt-8">
                            {/* Left: Kinematics Simulation GIF */}
                            <div>
                                <div className="w-full aspect-[4/3] bg-zinc-100 rounded-xl overflow-hidden shadow-inner border border-zinc-200">
                                    <img
                                        src={`${ASSET_BASE}/project/wrist/wrist-sim-kinematics.webp`}
                                        alt="Kinematics Simulation"
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                                <p className="text-sm text-zinc-500 text-center w-full mt-3">
                                    {lang === 'zh' ? '关节空间轨迹规划与末端位姿补偿仿真' : 'Joint Trajectory & End-Effector Pose Simulation'}
                                </p>
                            </div>
                            {/* Right: Monte Carlo Workspace Cloud Map */}
                            <div>
                                <div className="w-full aspect-[4/3] bg-zinc-100 rounded-xl overflow-hidden shadow-inner border border-zinc-200">
                                    <img
                                        src={`${ASSET_BASE}/project/wrist/wrist-sim-workspace.webp`}
                                        alt="Workspace Cloud Map"
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                                <p className="text-sm text-zinc-500 text-center w-full mt-3">
                                    {lang === 'zh' ? '末端 TCP 蒙特卡洛法工作空间点云' : 'End-Effector TCP Monte Carlo Workspace Point Cloud'}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== Module 03: Tendon-Driven & Rigid-Flexible Mechanism ========== */}
                <section className="w-full py-16 md:py-24 px-6">
                    <div className="w-full max-w-6xl mx-auto">
                        <div className="flex flex-col gap-4 mb-8 w-full">
                            <h2 className="text-3xl font-bold tracking-tight">
                                {lang === "zh" ? "绳驱动与刚柔耦合构型" : "Tendon-Driven & Rigid-Flexible Coupling"}
                            </h2>
                            <p className="text-zinc-600 leading-relaxed w-full">
                                {lang === "zh"
                                    ? "采用总线舵机与绕线盘构建欠驱动绳驱传动链，并利用铝制柔性薄片的弹性形变，实现对异形及易碎物品的自适应抓取。"
                                    : "Designed an underactuated tendon-driven transmission using bus servos and winding drums. Compliant aluminum flexures enabled adaptive grasping of irregular and fragile objects."}
                            </p>
                        </div>
                        {/* 2-column media grid: CAD render + Exploded video */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-2/3 mx-auto mt-8">
                            <div>
                                <div className={`${CONTAINER_CLASSES} aspect-[4/3]`}>
                                    <img
                                        src={`${ASSET_BASE}/project/wrist/wrist-cad-render.webp`}
                                        alt={lang === "zh" ? "3DoF 腕关节三维构型" : "3D CAD Assembly"}
                                        className={MEDIA_CLASSES}
                                    />
                                </div>
                                <p className="text-sm text-zinc-500 text-center mt-3">
                                    {lang === "zh" ? "3DoF 腕关节三维构型" : "3D CAD Assembly"}
                                </p>
                            </div>
                            <div>
                                <div className={`${CONTAINER_CLASSES} aspect-[4/3]`}>
                                    <LazyMedia placeholderClass="w-full h-full">
                                        <video
                                            src={`${ASSET_BASE}/project/wrist/wrist-exploded.mp4`}
                                            controls
                                            preload="metadata"
                                            muted
                                            playsInline
                                            className={MEDIA_CLASSES}
                                        />
                                    </LazyMedia>
                                </div>
                                <p className="text-sm text-zinc-500 text-center mt-3">
                                    {lang === "zh" ? "装配爆炸图" : "Exploded Assembly View"}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== Module 04: CAE 有限元分析 ========== */}
                <section className="w-full py-16 md:py-24 px-6">
                    <div className="w-full max-w-6xl mx-auto">
                        <div className="flex flex-col gap-4 mb-8 w-full">
                            <h2 className="text-3xl font-bold tracking-tight">
                                {lang === "zh" ? "CAE 有限元分析" : "FEA Validation"}
                            </h2>
                            <p className={`text-zinc-600 leading-relaxed w-full${lang === 'en' ? ' text-justify hyphens-auto' : ''}`}>
                                {lang === "zh"
                                    ? "针对 Pitch 轴结构关键薄弱点开展静力学有限元分析，验证增材制造关键受力部位的承载能力与结构变形，为结构设计优化提供依据。"
                                    : "Static finite element analysis was conducted on the key weak points of the pitch shaft structure to verify the load-bearing capacity and structural deformation of the key stress-bearing parts in additive manufacturing, providing a basis for structural design optimization."}
                            </p>
                        </div>
                        {/* 2-column FEA image grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-8">
                            <div>
                                <div className="w-2/3 mx-auto aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200/80 shadow-sm">
                                    <img
                                        src={`${ASSET_BASE}/project/wrist/wrist-pitch-bearing-stress.webp`}
                                        alt={lang === "zh" ? "Pitch 轴轴承应力云图" : "Pitch Bearing Stress Distribution"}
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                                <p className="text-sm text-zinc-500 text-center w-full mt-3">
                                    {lang === "zh" ? "应力云图" : "Stress Distribution"}
                                </p>
                            </div>
                            <div>
                                <div className="w-2/3 mx-auto aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200/80 shadow-sm">
                                    <img
                                        src={`${ASSET_BASE}/project/wrist/wrist-pitch-bearing-displacement.webp`}
                                        alt={lang === "zh" ? "Pitch 轴轴承位移云图" : "Pitch Bearing Deformation"}
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                                <p className="text-sm text-zinc-500 text-center w-full mt-3">
                                    {lang === "zh" ? "位移云图" : "Deformation Distribution"}
                                </p>
                            </div>
                        </div>
                        {/* Description row below images */}
                        <p className="w-full text-zinc-600 leading-relaxed text-center mt-6">
                            {lang === "zh"
                                ? "集成打印凸轴：应力集中与变形分析"
                                : "Integrated Printed Bearing Shaft: Stress & Deformation Analysis"}
                        </p>
                    </div>
                </section>

                {/* ========== Module 05: System Integration & Payload Validation ========== */}
                <section className="w-full py-24 px-6 bg-white">
                    <div className="w-full max-w-6xl mx-auto">
                        {/* Row 1: Title */}
                        <h2 className="text-3xl font-bold tracking-tight">
                            {lang === "zh" ? "一体化集成与有效负载验证" : "System Integration & Clinical Metrics Verified"}
                        </h2>

                        {/* Row 2: Description */}
                        <p className="text-zinc-600 leading-relaxed w-full mt-4">
                            {lang === "zh"
                                ? "结合 FDM 3D 打印与 CNC 加工完成样机制造及整机装配，并通过静力学分析与物理负载测试验证结构可靠性及 1 kg 有效负载能力。"
                                : "Fabricated and assembled the prototype using hybrid FDM printing and CNC machining. Structural reliability and a 1 kg payload capacity were validated through static analysis and physical load testing."}
                        </p>

                        {/* Row 3: Metrics cards — 3-column grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
                            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-center">
                                <p className="text-base font-bold text-zinc-800">
                                    {lang === "zh" ? "伺服扭矩: 35 kg·cm" : "Servo Torque: 35 kg·cm"}
                                </p>
                            </div>
                            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-center">
                                <p className="text-base font-bold text-zinc-800">
                                    {lang === "zh" ? "工作空间：≈200 mm" : "Workspace: ≈200 mm"}
                                </p>
                            </div>
                            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-center">
                                <p className="text-base font-bold text-zinc-800">
                                    {lang === "zh" ? "有效负载: 1.0 kg" : "Effective Payload: 1.0 kg"}
                                </p>
                            </div>
                        </div>

                        {/* Row 4: 3-column media grid for physical prototype images */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-4/5 mx-auto mt-8">
                            <div>
                                <div className={`${CONTAINER_CLASSES} aspect-[4/3]`}>
                                    <img
                                        src={`${ASSET_BASE}/project/wrist/real-gripper.webp`}
                                        alt={lang === "zh" ? "刚柔耦合夹爪实物装配" : "Gripper Assembly"}
                                        className={MEDIA_CLASSES}
                                    />
                                </div>
                                <p className="text-sm text-zinc-500 text-center mt-3">
                                    {lang === "zh" ? "刚柔耦合夹爪实物装配" : "Gripper Assembly"}
                                </p>
                            </div>
                            <div>
                                <div className={`${CONTAINER_CLASSES} aspect-[4/3]`}>
                                    <img
                                        src={`${ASSET_BASE}/project/wrist/real-joint.webp`}
                                        alt={lang === "zh" ? "3-DoF 空间腕关节样机" : "3-DOF Wrist Prototype"}
                                        className={MEDIA_CLASSES}
                                    />
                                </div>
                                <p className="text-sm text-zinc-500 text-center mt-3">
                                    {lang === "zh" ? "3-DoF 空间腕关节样机" : "3-DOF Wrist Prototype"}
                                </p>
                            </div>
                            <div>
                                <div className={`${CONTAINER_CLASSES} aspect-[4/3]`}>
                                    <img
                                        src={`${ASSET_BASE}/project/wrist/real-system-payload.webp`}
                                        alt={lang === "zh" ? "末端 1kg 负载抓取测试" : "System Payload Test"}
                                        className={MEDIA_CLASSES}
                                    />
                                </div>
                                <p className="text-sm text-zinc-500 text-center mt-3">
                                    {lang === "zh" ? "末端 1kg 负载抓取测试" : "System Payload Test"}
                                </p>
                            </div>
                        </div>
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