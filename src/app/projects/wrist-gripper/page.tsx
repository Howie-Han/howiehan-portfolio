"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const MEDIA_CLASSES = "filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700 rounded-xl object-contain w-full h-full";
const CONTAINER_CLASSES = "bg-zinc-100 rounded-xl overflow-hidden";

function DetailContent() {
    const searchParams = useSearchParams();
    const lang = (searchParams.get("lang") as "zh" | "en") || "zh";

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-zinc-300">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-zinc-50/80 backdrop-blur-md border-b border-zinc-200 z-50">
                <div className="w-full px-6 h-16 flex items-center">
                    <Link href={`/?lang=${lang}#projects`} className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-2">
                        <span>←</span>
                        {lang === "zh" ? "返回主页" : "Back to Home"}
                    </Link>
                </div>
            </nav>

            <main className="w-full">
                {/* ========== Module 01: Hero Section ========== */}
                <section className="w-full pt-32 pb-24 px-6">
                    <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight w-full text-zinc-900">
                            {lang === "zh"
                                ? "刚柔耦合绳驱空间腕关节及灵巧手开发"
                                : "Rigid-Flexible Rope-Driven Wrist Joint"}
                        </h1>
                        <div className="flex flex-wrap justify-center gap-3 mt-8">
                            {["D-H Kinematics", "Tendon-Driven", "Rigid-Flexible Coupling", "1kg Payload"].map((badge) => (
                                <span key={badge} className="bg-zinc-100 text-zinc-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-zinc-200">
                                    {badge}
                                </span>
                            ))}
                        </div>
                        <p className="text-lg text-zinc-500 md:text-xl leading-relaxed w-full mt-10">
                            {lang === "zh"
                                ? "主导设计 3 自由度串联球腕关节与欠驱动刚柔耦合夹爪。独立完成从 D-H 正运动学建模、SolidWorks 机构设计到混合制造装配的全链路研发，最终实现 1kg 的末端有效负载闭环。"
                                : "Engineered a 3-DoF spherical wrist joint and an underactuated rigid-flexible gripper. Independently drove the full lifecycle from D-H kinematic modeling and SolidWorks mechanism design to hybrid manufacturing, achieving a 1kg payload capacity."}
                        </p>
                    </div>
                </section>

                {/* ========== Module 02: Kinematic Modeling & Workspace ========== */}
                <section className="w-full py-24 px-6 bg-white">
                    <div className="w-full max-w-6xl mx-auto">
                        <div className="flex flex-col gap-4 mb-8 w-full">
                            <h2 className="text-3xl font-bold tracking-tight">
                                {lang === "zh" ? "空间运动学与包络验证" : "D-H Kinematics & Workspace Validation"}
                            </h2>
                            <p className="text-zinc-600 leading-relaxed w-full">
                                {lang === "zh"
                                    ? "基于 D-H 参数建立严谨的正运动学数学模型，并通过 MATLAB 机器人工具箱完成蒙特卡洛仿真，验证了直径 200mm 的半球形工作空间包络。"
                                    : "Established a rigorous mathematical model based on D-H parameters. Validated the 200mm hemispherical workspace envelope and optimized singularity avoidance trajectories via MATLAB Robotics Toolbox."}
                            </p>
                        </div>
                        {/* MATLAB Academic Dual-Column Media Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-11/12 lg:w-5/6 mx-auto mt-8">
                            {/* Left: Kinematics Simulation GIF */}
                            <div>
                                <div className="w-full aspect-[4/3] bg-zinc-100 rounded-xl overflow-hidden shadow-inner border border-zinc-200">
                                    <img
                                        src="/media/project/wrist/wrist-sim-kinematics.gif"
                                        alt="Kinematics Simulation"
                                        className="object-contain w-full h-full filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                </div>
                                <p className="text-sm text-zinc-500 text-center w-full mt-3">
                                    {lang === 'zh' ? '6-DoF 关节空间多项式轨迹与末端位姿轴向补偿仿真' : '6-DoF Joint-Space Polynomial Trajectory & Axial End-Effector Pose Compensation Simulation'}
                                </p>
                            </div>
                            {/* Right: Monte Carlo Workspace Cloud Map */}
                            <div>
                                <div className="w-full aspect-[4/3] bg-zinc-100 rounded-xl overflow-hidden shadow-inner border border-zinc-200">
                                    <img
                                        src="/media/project/wrist/wrist-sim-workspace.png"
                                        alt="Workspace Cloud Map"
                                        className="object-contain w-full h-full filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                </div>
                                <p className="text-sm text-zinc-500 text-center w-full mt-3">
                                    {lang === 'zh' ? '末端 TCP 空间可达包络点云 (蒙特卡洛法求解)' : 'End-Effector TCP Spatial Reachable Envelope Point Cloud (Solved via Monte Carlo Method)'}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== Module 03: Tendon-Driven & Rigid-Flexible Mechanism ========== */}
                <section className="w-full py-24 px-6">
                    <div className="w-full max-w-6xl mx-auto">
                        <div className="flex flex-col gap-4 mb-8 w-full">
                            <h2 className="text-3xl font-bold tracking-tight">
                                {lang === "zh" ? "绳驱动与刚柔耦合构型" : "Tendon-Driven & Rigid-Flexible Coupling"}
                            </h2>
                            <p className="text-zinc-600 leading-relaxed w-full">
                                {lang === "zh"
                                    ? "利用总线舵机与绕线盘构建极其紧凑的欠驱动绳驱传动链。创新性地利用铝制薄片在绳索拉力下的弹性形变，实现对异形易碎物品（如鸡蛋）的自适应包裹抓取。"
                                    : "Designed a highly compact underactuated tendon-driven transmission chain using bus servos. Innovatively utilized the elastic deformation of aluminum flakes under cable tension to achieve adaptive enveloping of fragile or irregular objects."}
                            </p>
                        </div>
                        {/* 2-column media grid: CAD render + Exploded video */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-2/3 mx-auto mt-8">
                            <div>
                                <div className={`${CONTAINER_CLASSES} aspect-[4/3]`}>
                                    <img
                                        src="/media/project/wrist/wrist-cad-render.png"
                                        alt={lang === "zh" ? "3DoF腕关节三维构型" : "3D CAD Assembly"}
                                        className={MEDIA_CLASSES}
                                    />
                                </div>
                                <p className="text-sm text-zinc-500 text-center mt-3">
                                    {lang === "zh" ? "3DoF腕关节三维构型" : "3D CAD Assembly"}
                                </p>
                            </div>
                            <div>
                                <div className={`${CONTAINER_CLASSES} aspect-[4/3]`}>
                                    <video
                                        src="/media/project/wrist/wrist-exploded.mp4"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className={MEDIA_CLASSES}
                                    />
                                </div>
                                <p className="text-sm text-zinc-500 text-center mt-3">
                                    {lang === "zh" ? "欠驱动绳驱传动链拆解" : "Exploded Transmission View"}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== Module 04: System Integration & Payload Validation ========== */}
                <section className="w-full py-24 px-6 bg-white">
                    <div className="w-full max-w-6xl mx-auto">
                        {/* Row 1: Title */}
                        <h2 className="text-3xl font-bold tracking-tight">
                            {lang === "zh" ? "一体化集成与有效负载验证" : "System Integration & Clinical Metrics Verified"}
                        </h2>

                        {/* Row 2: Description */}
                        <p className="text-zinc-600 leading-relaxed w-full mt-4">
                            {lang === "zh"
                                ? "融合 FDM 3D 打印与金属 CNC 机加工工艺，完成从静力学校核到实物原型的可靠组装，并通过物理负载测试验证了整套系统的传动效能。"
                                : "Combined FDM 3D printing with metal CNC machining for reliable physical prototyping. Conducted rigorous payload testing to validate the transmission efficiency and structural integrity."}
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
                                    {lang === "zh" ? "空间活动度: 200mm 包络" : "Workspace: 200mm Envelope"}
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
                                        src="/media/project/wrist/real-gripper.png"
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
                                        src="/media/project/wrist/real-joint.png"
                                        alt={lang === "zh" ? "空间腕关节实物装配" : "Wrist Joint Assembly"}
                                        className={MEDIA_CLASSES}
                                    />
                                </div>
                                <p className="text-sm text-zinc-500 text-center mt-3">
                                    {lang === "zh" ? "空间腕关节实物装配" : "Wrist Joint Assembly"}
                                </p>
                            </div>
                            <div>
                                <div className={`${CONTAINER_CLASSES} aspect-[4/3]`}>
                                    <img
                                        src="/media/project/wrist/real-system-payload.png"
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