"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ASSET_BASE } from "@/config/assets";
import LazyMedia from "@/components/LazyMedia";

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
                        "统筹北航机器人协会日常运营，组织400余人规模校级机器人竞赛，推动桌面级四足机器人孵化项目，并策划12场以上机器人软硬件技术讲座与工作坊。",
                        "Led the Beihang Robotics Association, organizing a university-wide robotics competition with over 400 participants, launching a desktop quadruped robot incubation project, and coordinating more than 12 robotics lectures and technical workshops."
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
                                "从0到1完成校级机器人竞赛策划，负责竞技场地设计、比赛规则制定及赛事组织，保障400余名参赛选手和观众顺利完成比赛。",
                                "Planned and organized a university-wide robotics competition from the ground up, including arena design, game rule development, and event coordination for more than 400 participants."
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
                                    {t("竞技场地抓取测试", "Arena Grasping Test  ")}
                                </p>
                            </div>
                            <div>
                                <img
                                    src={`${ASSET_BASE}/leadership/robot-association/ra-event-tour.webp`}
                                    alt="Event Tour"
                                    className={IMG_CLASSES}
                                />
                                <p className={CAPTION_CLASSES}>
                                    {t("比赛规则现场讲解", "Competition Rule Briefing")}
                                </p>
                            </div>
                            <div>
                                <img
                                    src={`${ASSET_BASE}/leadership/robot-association/ra-event-group.webp`}
                                    alt="Event Group Photo"
                                    className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl"
                                />
                                <p className={CAPTION_CLASSES}>
                                    {t("400+人规模机器人竞赛大合影", "Group Photo of 400+ Participant Event")}
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
                                "发起\"极客孵化计划\"，组织桌面级四足机器人项目开发，完成整机 CAD 重构、BOM 选型及机电系统集成，并建立项目开发文档与基础流程。",
                                "Initiated the Geek Incubation Program, leading the development of a desktop quadruped robot including CAD redesign, BOM selection, mechatronic integration, and project documentation."
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
                                    {t("桌面级机器狗孵化项目海报", "Desktop Quadruped Project Poster")}
                                </p>
                            </div>
                            <div>
                                <img
                                    src={`${ASSET_BASE}/leadership/robot-association/ra-incub-cad.webp`}
                                    alt="Incubation CAD"
                                    className={IMG_CLASSES}
                                />
                                <p className={CAPTION_CLASSES}>
                                    {t("机器狗本体 CAD 模型", "Desktop Quadruped CAD Model")}
                                </p>
                            </div>
                            <div>
                                <LazyMedia placeholderClass="w-full aspect-[4/3] rounded-xl">
                                    <video
                                        controls
                                        preload="metadata"
                                        muted
                                        playsInline
                                        className={VIDEO_CLASSES}
                                    >
                                        <source
                                            src={`${ASSET_BASE}/leadership/robot-association/ra-incub-promo.mp4`}
                                            type="video/mp4"
                                        />
                                    </video>
                                </LazyMedia>
                                <p className={CAPTION_CLASSES}>
                                    {t("新生项目成果展示 ", "Project Demonstration for New Members")}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ------ Module 3: 社群扩展 / Community Expansion ------ */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            {t("技术培训与社区建设", "Tech Training & Community Building")}
                        </h2>
                        <p className="w-full text-zinc-600">
                            {t(
                                "组织12场以上机器人软硬件技术讲座与工作坊，并策划校园科技节机器人互动展区，推动机器人技术交流与实践活动。",
                                "Organized more than 12 robotics lectures and technical workshops, while coordinating interactive robotics exhibitions during the university science festival."
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
                                    {t("机器人协会核心管理团队", "Core Management & Tech Guidance Board")}
                                </p>
                            </div>
                            <div className="w-full flex flex-col min-w-0">
                                <img
                                    src={`${ASSET_BASE}/leadership/robot-association/ra-comm-lec1.webp`}
                                    alt="Lecture 1"
                                    className="w-full h-full aspect-[4/3] object-cover bg-zinc-100 rounded-xl"
                                />
                                <p className={CAPTION_CLASSES}>
                                    {t("机器人技术讲座（一）", "Robotics Technical Lecture (I)")}
                                </p>
                            </div>
                            <div className="w-full flex flex-col min-w-0">
                                <img
                                    src={`${ASSET_BASE}/leadership/robot-association/ra-comm-lec2.webp`}
                                    alt="Lecture 2"
                                    className="w-full h-full aspect-[4/3] object-cover bg-zinc-100 rounded-xl"
                                />
                                <p className={CAPTION_CLASSES}>
                                    {t("机器人技术讲座（二）", "Robotics Technical Lecture (II)")}
                                </p>
                            </div>
                            <div className="w-full flex flex-col min-w-0">
                                <img
                                    src={`${ASSET_BASE}/leadership/robot-association/ra-comm-out1.webp`}
                                    alt="Outdoor Exhibition 1"
                                    className="w-full h-full aspect-[4/3] object-cover bg-zinc-100 rounded-xl"
                                />
                                <p className={CAPTION_CLASSES}>
                                    {t("校园科技节机器人展区（一）", "Robotics Exhibition at Science Festival (I)")}
                                </p>
                            </div>
                            <div className="w-full flex flex-col min-w-0">
                                <img
                                    src={`${ASSET_BASE}/leadership/robot-association/ra-comm-out2.webp`}
                                    alt="Outdoor Exhibition 2"
                                    className="w-full h-full aspect-[4/3] object-cover bg-zinc-100 rounded-xl"
                                />
                                <p className={CAPTION_CLASSES}>
                                    {t("校园科技节机器人展区（二）", "Robotics Exhibition at Science Festival (II)")}
                                </p>
                            </div>
                            <div className="w-full flex flex-col min-w-0">
                                <img
                                    src={`${ASSET_BASE}/leadership/robot-association/ra-comm-out3.webp`}
                                    alt="Outdoor Exhibition 3"
                                    className="w-full h-full aspect-[4/3] object-cover bg-zinc-100 rounded-xl"
                                />
                                <p className={CAPTION_CLASSES}>
                                    {t("校园科技节机器人展区（三）", "Robotics Exhibition at Science Festival (III)")}
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