"use client";
import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

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

function AlstomContent() {
    const searchParams = useSearchParams();
    const lang = searchParams.get("lang") || "zh";
    const isZh = lang === "zh";

    const [activeGalleryIndex, setActiveGalleryIndex] = useState(3);
    const galleryMedia = [
        { type: "image", src: "/media/experience/alstom/gallery-1-tpu.gif" },
        { type: "image", src: "/media/experience/alstom/gallery-2-indoor-img.png" },
        { type: "image", src: "/media/experience/alstom/gallery-3-outdoor-img.png" },
        { type: "video", src: "/media/experience/alstom/gallery-4-rail-test.mp4" },
        { type: "video", src: "/media/experience/alstom/gallery-5-outdoor-test.mp4" },
    ];

    const [activeStep, setActiveStep] = useState(0);
    const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
    const stepperData = [
        { title: isZh ? "破损排查" : "Broken Parts Analysis", imgs: ["reverse-1-broken-1.png", "reverse-1-broken-2.png"] },
        { title: isZh ? "点云扫描" : "3D Scan", imgs: ["reverse-2-scan-1.png", "reverse-2-scan-2.png"] },
        { title: isZh ? "逆向重建" : "Reverse Engineering", imgs: ["reverse-3-reverse-1.png", "reverse-3-reverse-2.png"] },
        { title: isZh ? "CAD工艺修复" : "CAD Optimization", imgs: ["reverse-4-cad-1.png", "reverse-4-cad-2.png"] },
        { title: isZh ? "工业级交付" : "Industrial Delivery", imgs: ["reverse-4-final-1.png", "reverse-4-final-2.png"] },
    ];

    const timelineData = [
        { img: "workflow-1-form.png", title: isZh ? "需求标准化表单发起" : "Request Form Generation" },
        { img: "workflow-2-database.png", title: isZh ? "云端数据库结构化归档" : "Cloud Database Archiving" },
        { img: "workflow-3-automate.png", title: isZh ? "自动化引擎逻辑流转" : "Power Automate Engine" },
        { img: "workflow-4-email.png", title: isZh ? "状态确认与邮件通知" : "Automated Notifications" },
        { img: "workflow-5-dashboard.png", title: isZh ? "可视化多维交互看板" : "Interactive Dashboard" },
    ];

    const MEDIA_FILTER =
        "grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700 object-contain";

    return (
        <main className="min-h-screen bg-zinc-50 text-zinc-900 pb-32">
            <nav className="p-8 max-w-7xl mx-auto">
                <Link
                    href={`/?lang=${lang}`}
                    className="text-zinc-500 hover:text-zinc-900 transition-colors tracking-widest text-sm font-semibold uppercase"
                >
                    {"<"} {isZh ? "返回" : "BACK"}
                </Link>
            </nav>

            <section className="max-w-7xl mx-auto px-8 pt-12 pb-24 text-center md:text-left">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-zinc-900">
                    {isZh ? "重塑工业级增材制造。" : "Redefining Industrial Additive Manufacturing."}
                </h1>
                <p className="text-xl text-zinc-500 font-light">
                    {isZh ? "机器人与增材制造研发实习生 @ 阿尔斯通（亚太）创新中心" : "Robotics & AM R&D Intern @ Alstom Innovation Station"}
                </p>
            </section>

            {/* Module 1: Tracked Train Inspection Robot */}
            <section className="max-w-7xl mx-auto px-8 mb-32">
                <div className="flex items-center gap-4 mb-12">
                    <span className="text-sm font-bold text-zinc-400 tracking-widest">01 /</span>
                    <h2 className="text-3xl font-semibold tracking-tight">
                        {isZh ? "履带式列车巡检机器人" : "Tracked Train Inspection Robot"}
                    </h2>
                </div>

                <div className="w-full h-[600px] bg-white rounded-3xl overflow-hidden shadow-2xl shadow-zinc-200/50 mb-16 relative border border-zinc-100">
                    <RobotScene />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="h-64 border-2 border-dashed border-zinc-300 rounded-3xl flex items-center justify-center bg-zinc-50">
                        <p className="text-zinc-400 text-sm font-mono">
                            {isZh ? "交互式结构件 (待接入)" : "Interactive Structure (Pending)"}
                        </p>
                    </div>
                    <div className="h-64 border-2 border-dashed border-zinc-300 rounded-3xl flex items-center justify-center bg-zinc-50">
                        <p className="text-zinc-400 text-sm font-mono">
                            {isZh ? "受力优化节点 (待接入)" : "Interactive Joint (Pending)"}
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 md:p-12 rounded-3xl shadow-xl shadow-zinc-200/30 border border-zinc-100">
                    <div className="w-full h-[400px] md:h-[600px] bg-zinc-50 rounded-2xl overflow-hidden flex items-center justify-center mb-8 relative border border-zinc-200">
                        {galleryMedia[activeGalleryIndex].type === "video" ? (
                            <video
                                key={galleryMedia[activeGalleryIndex].src}
                                src={galleryMedia[activeGalleryIndex].src}
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls
                                className={`w-full h-full ${MEDIA_FILTER}`}
                            />
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
                    <div className="grid grid-cols-5 gap-4">
                        {galleryMedia.map((media, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveGalleryIndex(idx)}
                                className={`relative h-16 md:h-24 rounded-xl border-2 transition-all overflow-hidden ${activeGalleryIndex === idx
                                    ? "border-zinc-800 opacity-100"
                                    : "border-transparent opacity-50 grayscale hover:opacity-100 hover:grayscale-0 bg-zinc-100"
                                    }`}
                            >
                                {media.type === "video" ? (
                                    <video src={media.src} className="w-full h-full object-cover pointer-events-none" />
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
                        {isZh ? "轨道交通备件增材供应链优化" : "Railway Transit Spare Parts Supply Chain Optimization"}
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
                                    src={`/media/experience/alstom/${stepperData[activeStep].imgs[0]}`}
                                    alt="Part 1"
                                    fill
                                    unoptimized
                                    className={MEDIA_FILTER}
                                />
                            </div>
                            <div className="relative w-full aspect-video md:aspect-square bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-200">
                                <Image
                                    src={`/media/experience/alstom/${stepperData[activeStep].imgs[1]}`}
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
                <div className="flex items-center gap-4 mb-16">
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
                                src={`/media/experience/alstom/${timelineData[activeWorkflowStep].img}`}
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