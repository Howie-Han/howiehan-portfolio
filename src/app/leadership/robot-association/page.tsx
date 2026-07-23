"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ASSET_BASE } from "@/config/assets";

function RobotAssociationContent() {
    const [lang, setLang] = useState<"zh" | "en">("zh");
    const searchParams = useSearchParams();

    useEffect(() => {
        const urlLang = searchParams.get("lang");
        if (urlLang === "zh" || urlLang === "en") {
            setLang(urlLang);
        }
    }, [searchParams]);

    const t = (zh: string, en: string) => (lang === "zh" ? zh : en);

    const IMG_CLASSES =
        "w-full aspect-[4/3] object-cover bg-zinc-100 rounded-xl";
    const IMG_CONTAIN_CLASSES =
        "w-full aspect-[4/3] object-contain bg-zinc-100/50 rounded-xl";
    const VIDEO_CLASSES =
        "w-full aspect-[4/3] object-cover bg-zinc-100 rounded-xl";
    const CAPTION_CLASSES = "text-xs text-zinc-500 text-center mt-3";

    return (
        <main className="w-full min-h-screen bg-zinc-50 text-zinc-900 font-sans">
            {/* Sticky frosted-glass navigation bar */}
            <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-50/80 border-b border-zinc-200/50">
                <div className="w-full px-6 md:px-12 lg:px-24 py-4 flex items-center">
                    <Link
                        href={`/?lang=${lang}#leadership`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                        <span>{"<"}</span>
                        <span>{t("返回社群与领导力", "Back to Leadership")}</span>
                    </Link>
                </div>
            </nav>

            {/* Main content container */}
            <div className="px-6 md:px-12 lg:px-24 py-12 md:py-24 flex flex-col items-center w-full">
                {/* Centered main title */}
                <h1 className="text-2xl md:text-4xl font-extrabold text-zinc-900 mb-6 text-center tracking-tight">
                    {t(
                        "北航机器人协会会长 (2023.09 - 2024.06)",
                        "President, Robot Association of Beihang University (Sep. 2023 - Jun. 2024)"
                    )}
                </h1>

                {/* Full-width overview paragraph — NO max-w constraint */}
                <p className="w-full text-zinc-600 text-center">
                    {t(
                        "统筹管理北航规模最大的硬科技社团。任期内成功策划并组织超 400 人规模的大型校级机器人竞技赛事；主导建立极客技术孵化机制（如下一代桌面级四足机器狗原型研发）；开展 12 场以上的软硬件技术工作坊，系统性提升社区整体工程素养与校际技术影响力。",
                        "Managed the university's largest hard-tech community. Successfully organized large-scale robotics competitions with 400+ participants; spearheaded geek tech incubation initiatives (e.g., next-generation desktop quadruped robot prototype); and conducted over 12 hardware and software workshops, systematically enhancing the community's engineering proficiency and inter-university influence."
                    )}
                </p>

                {/* ============================================================ */}
                {/* Vertical three-pillar architecture                        */}
                {/* ============================================================ */}
                <div className="flex flex-col gap-16 md:gap-24 py-24 w-full">
                    {/* ------ Module 1: 赛事统筹 / Event Coordination ------ */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            {t("赛事统筹与落地", "Event Coordination & Execution")}
                        </h2>
                        <p className="w-full text-zinc-600">
                            {t(
                                "从 0 到 1 架构校级机器人竞技赛事。独立完成竞技场地蓝图与关卡交互设计，统筹 400+ 参赛选手的赛程流转与技术合规审查，实现零事故闭环交付。",
                                "Architected university-level robotics competitions from scratch. Independently designed the arena blueprint and interactive tasks, coordinated the scheduling and technical compliance review for 400+ participants, achieving a zero-accident closed-loop delivery."
                            )}
                        </p>
                        {/* 3-column grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-6">
                            <div>
                                <img
                                    src={`${ASSET_BASE}/leadership/robot-association/ra-event-test.webp`}
                                    alt="Event Test"
                                    className={IMG_CLASSES}
                                />
                                <p className={CAPTION_CLASSES}>
                                    {t("独立设计的竞技场地实机抓取测试验证", "On-site Grasping Task Validation")}
                                </p>
                            </div>
                            <div>
                                <img
                                    src={`${ASSET_BASE}/leadership/robot-association/ra-event-tour.webp`}
                                    alt="Event Tour"
                                    className={IMG_CLASSES}
                                />
                                <p className={CAPTION_CLASSES}>
                                    {t("面向参赛团队的场地与交互规则实地宣讲", "Arena & Task Rules Briefing for Teams")}
                                </p>
                            </div>
                            <div>
                                <img
                                    src={`${ASSET_BASE}/leadership/robot-association/ra-event-group.webp`}
                                    alt="Event Group Photo"
                                    className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl"
                                />
                                <p className={CAPTION_CLASSES}>
                                    {t("400+人规模校级赛事核心组织方大合影", "Core Organizing Team of 400+ Participant Event")}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ------ Module 2: 技术孵化 / Tech Incubation ------ */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            {t("极客项目孵化", "Geek Project Incubation")}
                        </h2>
                        <p className="w-full text-zinc-600">
                            {t(
                                "打破传统社团理论授课壁垒，主导发起\"极客孵化计划\"。带领核心梯队完成桌面级四足机器狗的整机 CAD 重构、BOM 选型与电控部署，建立社团硬件研发 SOP。",
                                "Broke the barriers of traditional theoretical teaching by launching the \"Geek Incubation Program\". Led the core echelon to complete the CAD restructuring, BOM selection, and electronic deployment of a desktop quadruped robot, establishing the community's R&D SOP."
                            )}
                        </p>
                        {/* 3-column grid: 2 images + 1 video */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-6">
                            <div>
                                <img
                                    src={`${ASSET_BASE}/leadership/robot-association/ra-incub-poster.webp`}
                                    alt="Incubation Poster"
                                    className={IMG_CONTAIN_CLASSES}
                                />
                                <p className={CAPTION_CLASSES}>
                                    {t("桌面级机器狗孵化项目早期蓝图海报", "Early Blueprint Poster for Quadruped Incubation")}
                                </p>
                            </div>
                            <div>
                                <img
                                    src={`${ASSET_BASE}/leadership/robot-association/ra-incub-cad.webp`}
                                    alt="Incubation CAD"
                                    className={IMG_CLASSES}
                                />
                                <p className={CAPTION_CLASSES}>
                                    {t("机器狗本体高密度机械结构 CAD 渲染", "High-density Mechanical Structure CAD Render")}
                                </p>
                            </div>
                            <div>
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className={VIDEO_CLASSES}
                                >
                                    <source
                                        src={`${ASSET_BASE}/leadership/robot-association/ra-incub-promo.mp4`}
                                        type="video/mp4"
                                    />
                                </video>
                                <p className={CAPTION_CLASSES}>
                                    {t("面向新生的机电孵化成果实机演示", "Electromechanical Incubation Live Demo")}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ------ Module 3: 社群扩展 / Community Expansion ------ */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            {t("社群影响力扩展", "Community Influence Expansion")}
                        </h2>
                        <p className="w-full text-zinc-600">
                            {t(
                                "搭建社团跨学历技术交流桥梁。年内组织超过 12 场涵盖软硬件底层逻辑的前沿硬科技讲座，并在校园科技节策划千人级外场互动展区，实现技术开源与社群破圈。",
                                "Built a cross-academic tech communication bridge. Organized over 12 frontier hard-tech workshops covering software and hardware architectures within the year, and planned a 1000+ attendee outdoor interactive exhibition, achieving tech open-sourcing and community growth."
                            )}
                        </p>
                        {/* 3-column physical-alignment grid (6 items: 3x2 perfect fill) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-6 items-stretch">
                            <div className="w-full flex flex-col min-w-0">
                                <img
                                    src={`${ASSET_BASE}/leadership/robot-association/ra-comm-team.webp`}
                                    alt="Community Team"
                                    className="w-full h-full aspect-[4/3] object-cover bg-zinc-100 rounded-xl"
                                />
                                <p className={CAPTION_CLASSES}>
                                    {t("机器人协会核心管理与技术指导架构", "Core Management & Tech Guidance Board")}
                                </p>
                            </div>
                            <div className="w-full flex flex-col min-w-0">
                                <img
                                    src={`${ASSET_BASE}/leadership/robot-association/ra-comm-lec1.webp`}
                                    alt="Lecture 1"
                                    className="w-full h-full aspect-[4/3] object-cover bg-zinc-100 rounded-xl"
                                />
                                <p className={CAPTION_CLASSES}>
                                    {t("软硬件底层架构前沿硬科技讲座 (一)", "Frontier Hard-Tech Architecture Workshop (I)")}
                                </p>
                            </div>
                            <div className="w-full flex flex-col min-w-0">
                                <img
                                    src={`${ASSET_BASE}/leadership/robot-association/ra-comm-lec2.webp`}
                                    alt="Lecture 2"
                                    className="w-full h-full aspect-[4/3] object-cover bg-zinc-100 rounded-xl"
                                />
                                <p className={CAPTION_CLASSES}>
                                    {t("软硬件底层架构前沿硬科技讲座 (二)", "Frontier Hard-Tech Architecture Workshop (II)")}
                                </p>
                            </div>
                            <div className="w-full flex flex-col min-w-0">
                                <img
                                    src={`${ASSET_BASE}/leadership/robot-association/ra-comm-out1.webp`}
                                    alt="Outdoor Exhibition 1"
                                    className="w-full h-full aspect-[4/3] object-cover bg-zinc-100 rounded-xl"
                                />
                                <p className={CAPTION_CLASSES}>
                                    {t("千人级校园科技节外场交互展区 (一)", "1000+ Attendee Campus Tech Festival Exhibition (I)")}
                                </p>
                            </div>
                            <div className="w-full flex flex-col min-w-0">
                                <img
                                    src={`${ASSET_BASE}/leadership/robot-association/ra-comm-out2.webp`}
                                    alt="Outdoor Exhibition 2"
                                    className="w-full h-full aspect-[4/3] object-cover bg-zinc-100 rounded-xl"
                                />
                                <p className={CAPTION_CLASSES}>
                                    {t("千人级校园科技节外场交互展区 (二)", "1000+ Attendee Campus Tech Festival Exhibition (II)")}
                                </p>
                            </div>
                            <div className="w-full flex flex-col min-w-0">
                                <img
                                    src={`${ASSET_BASE}/leadership/robot-association/ra-comm-out3.webp`}
                                    alt="Outdoor Exhibition 3"
                                    className="w-full h-full aspect-[4/3] object-cover bg-zinc-100 rounded-xl"
                                />
                                <p className={CAPTION_CLASSES}>
                                    {t("千人级校园科技节外场交互展区 (三)", "1000+ Attendee Campus Tech Festival Exhibition (III)")}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default function RobotAssociation() {
    return (
        <Suspense fallback={<div className="w-full min-h-screen bg-zinc-50"></div>}>
            <RobotAssociationContent />
        </Suspense>
    );
}