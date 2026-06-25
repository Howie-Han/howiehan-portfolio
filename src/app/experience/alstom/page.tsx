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

    const [activeGalleryIndex, setActiveGalleryIndex] = useState(3);
    const galleryMedia = [
        {
            type: "image",
            src: "/media/experience/alstom/gallery-1-tpu.gif",
            title: isZh ? "FDM 打印工艺与构型多材料测试" : "PETG/TPU Multi-material Prototyping Optimization",
            desc: isZh ? "测试柔性高分子构件在复杂应力条件下的回弹极限与层间黏结表现。" : "Evaluating interlayer adhesion and elasticity threshold under continuous stress profiling.",
        },
        {
            type: "image",
            src: "/media/experience/alstom/gallery-2-indoor-img.png",
            title: isZh ? "车厂实机室内轨道标定与干涉校验" : "Depot Indoor Track Calibration & Interference Analysis",
            desc: isZh ? "在 Kim Chuan Depot 进行实装匹配，通过多维尺寸校验确保运行动载间隙符合毫米级公差约束。" : "On-site precision fit verification to ensure dynamic clearances comply with millimeter-level tolerances.",
        },
        {
            type: "image",
            src: "/media/experience/alstom/gallery-3-outdoor-img.png",
            title: isZh ? "实地部署与复杂坡度地形通过性常规测试" : "Field Deployment & Complex Terrain Navigation Trials",
            desc: isZh ? "评估小直径履带结构在砂石、坡道等多变地质环境下的越障通过能力。" : "Assessing high-angle climbing independence across highly irregular outdoor aggregate surfaces.",
        },
        {
            type: "video",
            src: "/media/experience/alstom/gallery-4-rail-test.mp4",
            title: isZh ? "沿轨自主导向巡检实机闭环运行验证" : "Autonomous Rail-Guided Inspection Operations",
            desc: isZh ? "针对列车底盘关键探测点执行全自动化视觉循迹与机械臂多姿态拟合巡检测试。" : "Validating closed-loop autonomous navigation and posture optimization for under-train imaging.",
        },
        {
            type: "video",
            src: "/media/experience/alstom/gallery-5-outdoor-test.mp4",
            title: isZh ? "全天候户外严苛环境长距离续航极限验证" : "All-Weather Endurance & Locomotion Performance Verification",
            desc: isZh ? "实测极端高湿度及高温条件下，整体机电架构与电池管理系统的热耗散及防尘防水可靠性。" : "Verifying thermal dissipation efficiency and electromechanical enclosure integrity under high heat and moisture.",
        },
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
                    {"<"} {isZh ? "返回主页" : "BACK TO HOME"}
                </Link>
            </nav>

            <section className="max-w-7xl mx-auto px-8 pt-12 pb-24 flex flex-col items-center text-center">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-zinc-900">
                    {isZh ? "重塑工业级增材制造。" : "Redefining Industrial Additive Manufacturing."}
                </h1>
                <p className="text-xl text-zinc-500 font-light">
                    {isZh ? "机器人与增材制造研发实习生 @ 阿尔斯通（亚太）创新中心" : "Robotics & AM R&D Intern @ Alstom Innovation Station"}
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                    {[
                        "DfAM",
                        isZh ? "逆向工程" : "Reverse Engineering",
                        "EHS Compliance",
                        isZh ? "巡检机器人" : "Inspection Robot",
                        "FDM / PA6",
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
                            ? "基于 DfAM（面向增材制造设计）理念彻底重构。采用 PA6 工程塑料与 FDM 打印工艺，将传统高度集成的商用底盘转化为极具韧性、零供应商依赖的全新机电架构。"
                            : "Redesigned from the ground up using Design for Additive Manufacturing (DfAM) principles. By utilizing PA6 engineering plastic and FDM printing, the traditional highly integrated commercial chassis was transformed into a resilient, supplier-independent architecture."}
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
                <div className="w-full h-[420px] bg-white rounded-3xl overflow-hidden shadow-2xl shadow-zinc-200/50 mb-16 relative border border-zinc-100">
                    <RobotScene />
                </div>

                {/* 交互式 Bento Box 图文混排 - 升级为双模复合布局 */}
                <div className="grid grid-cols-1 gap-12 mb-16">

                    {/* 局部组件 1：一体化集成设计 */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-zinc-200/30 border border-zinc-100 flex flex-col xl:flex-row gap-8 min-h-[450px] xl:h-[450px]">
                        {/* 左侧：文字描述 + 静态高精CAD渲染图 */}
                        <div className="flex-1 flex flex-col">
                            <div>
                                <h3 className="text-xl font-bold text-zinc-800 mb-2">{isZh ? "一体化集成设计" : "Integrated Architecture"}</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                                    {isZh ? "通过 DfAM 优化，将理线卡扣、控制板减震与快拆结构高度整合，整机精简至 10 余个核心部件。左图展示最终总装效果，右侧模型支持交互细节拆解。" : "Highly integrated cable routing, shock absorption, and quick-release mechanisms, reducing the assembly to ~10 core parts. Left image displays full CAD assembly, right viewport enables detail inspection."}
                                </p>
                            </div>
                            <div className="relative w-full h-48 xl:h-52 bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-200 mt-2">
                                <Image src="/media/experience/alstom/robot-part-chassis-render.png" alt="Chassis CAD Render" fill unoptimized className={MEDIA_FILTER} />
                            </div>
                        </div>
                        {/* 右侧：丝滑低面互动 3D 视窗 */}
                        <div className="flex-1 relative bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-200 h-64 xl:h-full">
                            <InteractivePartScene modelPath="/media/experience/alstom/robot-part-chassis.glb" />
                        </div>
                    </div>

                    {/* 局部组件 2：刚性复用与受力优化 */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-zinc-200/30 border border-zinc-100 flex flex-col xl:flex-row gap-8 min-h-[450px] xl:h-[450px]">
                        {/* 左侧：文字描述 + 静态高精CAD渲染图 */}
                        <div className="flex-1 flex flex-col">
                            <div>
                                <h3 className="text-xl font-bold text-zinc-800 mb-2">{isZh ? "刚性复用与受力优化" : "Rigidity & Stress Optimization"}</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                                    {isZh ? "巧妙利用电机金属外壳的物理刚性来分散薄弱环节应力，极大提升了 3D 打印主体结构的整体刚度。配合高分辨率 CAD 数据与流式 3D 交互共同佐证。" : "Innovatively utilizes the motor's metal casing to disperse stress at weak points, significantly enhancing overall structural rigidity. Documented via high-res CAD renders combined with lightweight fluid 3D viewports."}
                                </p>
                            </div>
                            <div className="relative w-full h-48 xl:h-52 bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-200 mt-2">
                                <Image src="/media/experience/alstom/robot-part-joint-render.png" alt="Joint CAD Render" fill unoptimized className={MEDIA_FILTER} />
                            </div>
                        </div>
                        {/* 右侧：丝滑低面互动 3D 视窗 */}
                        <div className="flex-1 relative bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-200 h-64 xl:h-full">
                            <InteractivePartScene modelPath="/media/experience/alstom/robot-part-joint.glb" />
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