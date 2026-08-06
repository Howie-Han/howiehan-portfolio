"use client";
import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { ASSET_BASE } from "@/config/assets";
import LazyMedia from "@/components/LazyMedia";

// 懒加载 3D 组件，防止阻塞主线程
const RobotScene = dynamic(() => import("@/components/alstom/RobotScene"), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-50 rounded-3xl">
            <div className="w-8 h-8 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin mb-4"></div>
            <p className="text-zinc-500 tracking-widest text-sm uppercase">Loading 3D Engine...</p>
        </div>
    ),
});

const InteractivePartScene = dynamic(() => import("@/components/alstom/InteractivePartScene"), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-50 rounded-2xl">
            <div className="w-6 h-6 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
        </div>
    ),
});

function AlstomContent() {
    const searchParams = useSearchParams();
    const lang = searchParams.get("lang") || "zh";
    const isZh = lang === "zh";

    const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
    const galleryMedia = [
        {
            type: "image",
            src: `${ASSET_BASE}/experience/alstom/gallery-3-outdoor-img.webp`,
            title: isZh ? "实车底部巡检运行测试" : "Under-Train Inspection Testing",
            desc: isZh ? "机器人在列车底部真实环境下的运行实景，验证底盘的通过性与工作空间。" : "Field validation of chassis mobility and operating clearance beneath railway vehicles.",
        },
        {
            type: "image",
            src: `${ASSET_BASE}/experience/alstom/gallery-2-indoor-img.webp`,
            title: isZh ? "机电一体化组装实物" : "Fully Assembled Mechatronic Prototype",
            desc: isZh ? "完成全部结构件制造、电子设备集成及内部布线后的机器人整机。" : "Final assembled robot integrating printed mechanical components, electronics, and internal wiring.",
        },
        {
            type: "image",
            src: `${ASSET_BASE}/experience/alstom/gallery-1-tpu.webp`,
            title: isZh ? "FDM 柔性履带打印过程" : "FDM Printing of Flexible Track",
            desc: isZh ? "基于 Bambu Lab X1C 与 TPU 95A HF 材料完成柔性履带一体化打印。" : "Integrated FDM printing of flexible tracks using TPU 95A HF on a Bambu Lab X1C.",
        },
        {
            type: "video",
            src: `${ASSET_BASE}/experience/alstom/gallery-4-rail-test.mp4`,
            title: isZh ? "户外铁轨越障测试" : "Outdoor Rail-Crossing Test",
            desc: isZh ? "在真实轨道环境中验证机器人越障能力与底盘通过性。" : "Outdoor field test validating obstacle-crossing capability on railway tracks.",
        },
        {
            type: "video",
            src: `${ASSET_BASE}/experience/alstom/gallery-5-outdoor-test.mp4`,
            title: isZh ? "陡坎攀爬能力测试" : "Steep Slope Climbing Test",
            desc: isZh ? "验证机器人在大坡度地形下的抓地能力与行驶稳定性。" : "Evaluation of traction and climbing stability on steep terrain.",
        },
    ];

    const [activeStep, setActiveStep] = useState(0);
    const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
    const stepperData = [
        {
            title: isZh ? "实机破损原件勘查" : "Damaged Part Inspection",
            imgs: ["reverse-1-broken-1.webp", "reverse-1-broken-2.webp"]
        },
        {
            title: isZh ? "三维点云扫描捕获" : "3D Point Cloud Scanning",
            imgs: ["reverse-2-scan-1.webp", "reverse-2-scan-2.webp"]
        },
        {
            title: isZh ? "Quicksurface 逆向重建" : "Quicksurface Reverse Engineering",
            imgs: ["reverse-3-reverse-1.webp", "reverse-3-reverse-2.webp"]
        },
        {
            title: isZh ? "Onshape 打印前结构修复" : "Onshape Pre-print Optimization",
            imgs: ["reverse-4-cad-1.webp", "reverse-4-cad-2.webp"]
        },
        {
            title: isZh ? "工业级 3D 打印成品交付" : "Industrial 3D Printed Delivery",
            imgs: ["reverse-4-final-1.webp", "reverse-4-final-2.webp"]
        },
    ];

    const timelineData = [
        { img: "workflow-1-form.webp", title: isZh ? "需求标准化表单发起" : "Request Form Generation" },
        { img: "workflow-2-database.webp", title: isZh ? "云端数据库结构化归档" : "Cloud Database Archiving" },
        { img: "workflow-3-automate.webp", title: isZh ? "自动化引擎逻辑流转" : "Power Automate Engine" },
        { img: "workflow-4-email.webp", title: isZh ? "状态确认与邮件通知" : "Automated Notifications" },
        { img: "workflow-5-dashboard.webp", title: isZh ? "可视化多维交互看板" : "Interactive Dashboard" },
    ];

    const MEDIA_FILTER = "object-contain";

    return (
        <main className="min-h-screen bg-zinc-50 text-zinc-900 pb-32">
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

            <section className="max-w-7xl mx-auto px-8 pt-12 pb-24 flex flex-col items-center text-center">
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-6 text-zinc-900">
                    {isZh ? "工业级增材制造与机器人研发实践" : "Industrial Additive Manufacturing & Robotics R&D"}
                </h1>
                <p className="text-xl text-zinc-500 font-light">
                    {isZh ? "机器人与增材制造研发实习生 @ 阿尔斯通（亚太）创新中心" : "Robotics & AM R&D Intern @ Alstom Innovation Station"}
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                    {[
                        "DfAM",
                        isZh ? "逆向工程" : "Reverse Engineering",
                        isZh ? "EHS合规" : "EHS Compliance",
                        isZh ? "巡检机器人" : "Inspection Robot",
                        "PLA, PETG, TPU, PA6, PPS-CF",
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

            {/* Module 1: Tracked Train Inspection Robot */}
            <section className="max-w-7xl mx-auto px-8 mb-32">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-sm font-bold text-zinc-400 tracking-widest">01 /</span>
                    <h2 className="text-3xl font-semibold tracking-tight">
                        {isZh ? "履带式列车巡检机器人" : "Tracked Train Inspection Robot"}
                    </h2>
                </div>

                {/* 新增：总述与核心数据 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="md:col-span-2 text-zinc-500 font-light leading-relaxed">
                        {isZh
                            ? "基于 DfAM（面向增材制造设计）理念重新设计机器人底盘，采用 PA6 工程塑料与 FDM 打印工艺，实现关键结构件的自主制造，并完成机电系统集成验证。"
                            : "Redesigned the robot chassis following Design for Additive Manufacturing (DfAM) principles. PA6 engineering plastic and FDM printing were adopted to manufacture key structural components and validate the integrated mechatronic system."}
                    </div>
                    <div className="flex flex-col justify-between border-l-2 border-zinc-200 pl-6">
                        <div>
                            <p className="text-2xl font-semibold text-zinc-800">5 kg</p>
                            <p className="text-xs text-zinc-400 uppercase tracking-widest">{isZh ? "实机自重" : "Total Weight"}</p>
                        </div>
                        <div>
                            <p className="text-2xl font-semibold text-zinc-800">85° / 15 cm</p>
                            <p className="text-xs text-zinc-400 uppercase tracking-widest">{isZh ? "极限越障" : "Obstacle Clearance"}</p>
                        </div>
                    </div>
                </div>

                {/* 主展台 */}
                <div className="w-full h-[50vh] md:h-[420px] bg-white rounded-3xl overflow-hidden shadow-2xl shadow-zinc-200/50 mb-16 relative border border-zinc-100">
                    <RobotScene />
                </div>

                {/* 交互式 Bento Box 图文混排 - 升级为双模复合布局 */}
                <div className="grid grid-cols-1 gap-12 mb-16">

                    {/* 局部组件 1：一体化集成设计 */}
                    <div className="bg-white rounded-3xl p-4 md:p-8 shadow-xl shadow-zinc-200/30 border border-zinc-100 flex flex-col xl:flex-row gap-8 min-h-[300px] md:min-h-[450px] xl:h-[450px]">
                        {/* 左侧：文字描述 + 静态高精CAD渲染图 */}
                        <div className="flex-1 flex flex-col">
                            <div>
                                <h3 className="text-xl font-bold text-zinc-800 mb-2">{isZh ? "一体化集成设计" : "Integrated Architecture"}</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                                    {isZh ? "通过 DfAM 将理线、控制板减震及快拆结构集成于打印件中，整机机械结构精简至10余个核心部件。图片展示最终总装效果，模型支持交互细节查看。" : "DfAM enabled cable routing, controller damping, and quick-release features to be integrated into printed components, reducing the mechanical assembly to just over ten core parts."}
                                </p>
                            </div>
                            <div className="relative w-full h-48 xl:h-52 bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-200 mt-2">
                                <Image src={`${ASSET_BASE}/experience/alstom/robot-part-chassis-render.webp`} alt="Chassis CAD Render" fill unoptimized className={MEDIA_FILTER} />
                            </div>
                        </div>
                        {/* 右侧：丝滑低面互动 3D 视窗 */}
                        <div className="flex-1 relative bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-200 h-64 xl:h-full">
                            <LazyMedia placeholderClass="w-full h-full min-h-[200px]">
                                <InteractivePartScene modelPath={`${ASSET_BASE}/experience/alstom/robot-part-chassis.glb`} />
                            </LazyMedia>
                        </div>
                    </div>

                    {/* 局部组件 2：刚性复用与受力优化 */}
                    <div className="bg-white rounded-3xl p-4 md:p-8 shadow-xl shadow-zinc-200/30 border border-zinc-100 flex flex-col xl:flex-row gap-8 min-h-[300px] md:min-h-[450px] xl:h-[450px]">
                        {/* 左侧：文字描述 + 静态高精CAD渲染图 */}
                        <div className="flex-1 flex flex-col">
                            <div>
                                <h3 className="text-xl font-bold text-zinc-800 mb-2">{isZh ? "刚性复用与受力优化" : "Rigidity & Stress Optimization"}</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                                    {isZh ? "利用电机外壳作为局部承力结构分散关键受力区域应力，提高3D打印主体的整体刚度。" : "The motor housing was incorporated as a load-bearing element to redistribute local stresses and improve the overall stiffness of the printed structure."}
                                </p>
                            </div>
                            <div className="relative w-full h-48 xl:h-52 bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-200 mt-2">
                                <Image src={`${ASSET_BASE}/experience/alstom/robot-part-joint-render.webp`} alt="Joint CAD Render" fill unoptimized className={MEDIA_FILTER} />
                            </div>
                        </div>
                        {/* 右侧：丝滑低面互动 3D 视窗 */}
                        <div className="flex-1 relative bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-200 h-64 xl:h-full">
                            <LazyMedia placeholderClass="w-full h-full min-h-[200px]">
                                <InteractivePartScene modelPath={`${ASSET_BASE}/experience/alstom/robot-part-joint.glb`} />
                            </LazyMedia>
                        </div>
                    </div>

                </div>

                {/* 画廊保持原样 */}
                <div className="bg-white p-6 md:p-12 rounded-3xl shadow-xl shadow-zinc-200/30 border border-zinc-100">
                    {/* 画廊联动高灵敏度文本描述控制台 */}
                    <div className="mb-3 pb-6 border-b border-zinc-100 transition-all duration-300">
                        <h4 className="text-xl font-bold text-zinc-900 tracking-tight mb-2">
                            {galleryMedia[activeGalleryIndex].title}
                        </h4>
                        <p className="text-sm text-zinc-500 font-light leading-relaxed">
                            {galleryMedia[activeGalleryIndex].desc}
                        </p>
                    </div>
                    <div className="w-full h-[400px] md:h-[600px] bg-zinc-50 rounded-2xl overflow-hidden flex items-center justify-center mb-8 relative border border-zinc-200">
                        {galleryMedia[activeGalleryIndex].type === "video" ? (
                            <LazyMedia placeholderClass="w-full h-full">
                                <video
                                    key={galleryMedia[activeGalleryIndex].src}
                                    src={galleryMedia[activeGalleryIndex].src}
                                    controls
                                    preload="metadata"
                                    muted
                                    playsInline
                                    className={`w-full h-full ${MEDIA_FILTER}`}
                                />
                            </LazyMedia>
                        ) : (
                            <Image
                                src={galleryMedia[activeGalleryIndex].src}
                                alt="Gallery"
                                fill
                                unoptimized
                                className={MEDIA_FILTER}
                            />
                        )}
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                        {galleryMedia.map((media, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveGalleryIndex(idx)}
                                className={`relative h-16 md:h-24 rounded-xl border-2 overflow-hidden ${activeGalleryIndex === idx
                                    ? "border-zinc-800"
                                    : "border-transparent bg-zinc-100"
                                    }`}
                            >
                                {media.type === "video" ? (
                                    <LazyMedia placeholderClass="w-full h-full">
                                        <video
                                            src={media.src}
                                            controls
                                            preload="metadata"
                                            muted
                                            playsInline
                                            className="w-full h-full object-cover pointer-events-none"
                                        />
                                    </LazyMedia>
                                ) : (
                                    <Image src={media.src} alt={`thumb-${idx}`} fill unoptimized className="object-cover pointer-events-none" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Module 2: Railway Transit Spare Parts Supply Chain Optimization */}
            <section className="max-w-7xl mx-auto px-8 mb-32">
                <div className="flex items-center gap-4 mb-12">
                    <span className="text-sm font-bold text-zinc-400 tracking-widest">02 /</span>
                    <h2 className="text-3xl font-semibold tracking-tight">
                        {isZh ? "轨道交通备件逆向工程与增材制造" : "Reverse Engineering & Additive Manufacturing for Railway Spare Parts"}
                    </h2>
                </div>

                <div className="flex flex-col xl:flex-row gap-12">
                    <div className="flex flex-row xl:flex-col gap-4 overflow-x-auto pb-4 xl:pb-0 xl:w-64 shrink-0">
                        {stepperData.map((step, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveStep(idx)}
                                className={`flex items-center gap-4 text-left whitespace-nowrap p-4 rounded-2xl transition-all ${activeStep === idx
                                    ? "bg-zinc-900 text-white shadow-lg"
                                    : "hover:bg-zinc-200 text-zinc-500"
                                    }`}
                            >
                                <span className="font-mono text-xs opacity-50">0{idx + 1}</span>
                                <span className="font-semibold text-sm">{step.title}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 bg-white p-8 rounded-3xl shadow-xl shadow-zinc-200/30 border border-zinc-100 min-h-[400px]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                            <div className="relative w-full aspect-video md:aspect-square bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-200">
                                <Image
                                    src={`${ASSET_BASE}/experience/alstom/${stepperData[activeStep].imgs[0]}`}
                                    alt="Part 1"
                                    fill
                                    unoptimized
                                    className={MEDIA_FILTER}
                                />
                            </div>
                            <div className="relative w-full aspect-video md:aspect-square bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-200">
                                <Image
                                    src={`${ASSET_BASE}/experience/alstom/${stepperData[activeStep].imgs[1]}`}
                                    alt="Part 2"
                                    fill
                                    unoptimized
                                    className={MEDIA_FILTER}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Module 3: Digital Workflow Dashboard */}
            <section className="max-w-7xl mx-auto px-8">
                <div className="flex items-center gap-4 mb-10">
                    <span className="text-sm font-bold text-zinc-400 tracking-widest">03 /</span>
                    <h2 className="text-3xl font-semibold tracking-tight">
                        {isZh ? "数字化工作流看板" : "Digital Workflow Dashboard"}
                    </h2>
                </div>

                {/* 全新横向控制台布局 */}
                <div className="bg-white p-6 md:p-12 rounded-3xl shadow-xl shadow-zinc-200/30 border border-zinc-100">

                    {/* 上方：横向进度条导航 */}
                    <div className="flex flex-row overflow-x-auto gap-2 md:gap-4 pb-6 mb-8 border-b border-zinc-100 scrollbar-hide">
                        {timelineData.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveWorkflowStep(idx)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl whitespace-nowrap transition-all ${activeWorkflowStep === idx
                                    ? 'bg-zinc-900 text-white shadow-md'
                                    : 'hover:bg-zinc-100 text-zinc-500'
                                    }`}
                            >
                                <span className={`font-mono text-sm ${activeWorkflowStep === idx ? 'opacity-70' : 'opacity-50'}`}>0{idx + 1}</span>
                                <span className="font-semibold text-sm">{item.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* 下方：超大图文展示视窗 */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-800">
                            {timelineData[activeWorkflowStep].title}
                        </h3>

                        <div className="w-full h-[400px] md:h-[600px] bg-zinc-50 rounded-2xl overflow-hidden flex items-center justify-center relative border border-zinc-200">
                            <Image
                                src={`${ASSET_BASE}/experience/alstom/${timelineData[activeWorkflowStep].img}`}
                                alt={timelineData[activeWorkflowStep].title}
                                fill
                                unoptimized
                                className={MEDIA_FILTER}
                            />
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}

export default function AlstomExperiencePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-zinc-50"></div>}>
            <AlstomContent />
        </Suspense>
    );
}