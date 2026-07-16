"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function InternationalTeamContent() {
    const [lang, setLang] = useState<"zh" | "en">("zh");
    const searchParams = useSearchParams();

    useEffect(() => {
        const urlLang = searchParams.get("lang");
        if (urlLang === "zh" || urlLang === "en") {
            setLang(urlLang);
        }
    }, [searchParams]);

    const t = (zh: string, en: string) => (lang === "zh" ? zh : en);

    return (
        <div className="w-full min-h-screen bg-zinc-50 text-zinc-900">
            {/* Sticky frosted-glass nav bar */}
            <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-50/80 border-b border-zinc-200/50">
                <div className="px-6 md:px-12 lg:px-24 h-16 flex items-center">
                    <Link href={`/?lang=${lang}#leadership`} className="text-zinc-500 hover:text-zinc-700 transition-colors duration-200 flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                        {t("返回领导力", "Back to Leadership")}
                    </Link>
                </div>
            </nav>

            {/* Main content */}
            <main className="px-6 md:px-12 lg:px-24 py-24 flex flex-col items-center justify-center w-full">
                <h1 className="text-4xl font-extrabold text-zinc-900 mb-6 text-center tracking-tight">
                    {t("北航国际学生机器人队创始人", "Founder & Captain of BUAA Int. Robotics Team")}
                </h1>

                {/* 分级叙事骨架 */}
                <div className="flex flex-col gap-24 py-24 w-full">

                    {/* ============================================================ */}
                    {/* Phase 1 */}
                    {/* ============================================================ */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            {t("0-1 破局与敏捷交付 (2024.03 - 2024.07)", "0-1 Incubation & Agile Delivery (Mar. 2024 - Jul. 2024)")}
                        </h2>
                        <p className="w-full text-zinc-600">
                            {t(
                                "从 5 人初创团队起步，亲自担任核心技术骨干。在 4 个月内搭建敏捷开发流程，完成竞技机器人的从 0 到 1 研发，最终斩获首届首都来华留学生机器人竞赛一等奖第一名及 ROBOTAC 2024 留学生赛道全国总冠军。",
                                "Founded a 5-member incubation team, serving as the core technical lead. Established an agile development pipeline to complete the 0-1 robotics R&D within 4 months, ultimately winning 1st Place at the 1st Capital International Students Robotics Competition and the National Championship of ROBOTAC 2024."
                            )}
                        </p>

                        {/* Hero + Filmstrip */}
                        <div className="flex flex-col gap-4 mt-6 w-full">
                            {/* Hero Image */}
                            <img
                                src="/media/leadership/robotics-team/p1-prelim-team.png"
                                alt={t("斩获首届首都来华留学生机器人竞赛一等奖第一名", "1st Place at the 1st Capital International Students Robotics Competition")}
                                className="w-full h-[50vh] md:h-[70vh] max-h-[700px] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                            />
                            <p className="text-sm text-zinc-500 text-center mt-3">
                                {t("斩获首届首都来华留学生机器人竞赛一等奖第一名", "1st Place at the 1st Capital International Students Robotics Competition")}
                            </p>

                            {/* Filmstrip */}
                            <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide w-full">
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p1-founder-team.png"
                                        alt={t("机器人队 6 人初创团队合影", "6-Member Founding Team")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("机器人队 6 人初创团队合影", "6-Member Founding Team")}</p>
                                </div>
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p1-prep-1.png"
                                        alt={t("早期实验室敏捷备赛与结构搭建", "Early-stage Agile Preparation & Assembly")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("早期实验室敏捷备赛与结构搭建", "Early-stage Agile Preparation & Assembly")}</p>
                                </div>
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p1-prep-2.png"
                                        alt={t("跨文化技术沟通与底盘调试", "Cross-cultural Technical Communication & Chassis Tuning")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("跨文化技术沟通与底盘调试", "Cross-cultural Technical Communication & Chassis Tuning")}</p>
                                </div>
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p1-personal-comp.png"
                                        alt={t("比赛现场作为技术骨干亲自操刀调试", "On-site Technical Lead Debugging")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("比赛现场作为技术骨干亲自操刀调试", "On-site Technical Lead Debugging")}</p>
                                </div>
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p1-interview.png"
                                        alt={t("夺冠后接受官方媒体技术专访", "Post-championship Official Media Interview")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("夺冠后接受官方媒体技术专访", "Post-championship Official Media Interview")}</p>
                                </div>
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p1-official-group.png"
                                        alt={t("首都预选赛全体参赛队伍官方大合影", "Official Group Photo of the Capital Preliminary")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("首都预选赛全体参赛队伍官方大合影", "Official Group Photo of the Capital Preliminary")}</p>
                                </div>
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p1-robot-auto.png"
                                        alt={t("自主研发的自动机器人构型展示", "Automated Robot Architecture Display")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("自主研发的自动机器人构型展示", "Automated Robot Architecture Display")}</p>
                                </div>
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p1-robot-manual.png"
                                        alt={t("自主研发的手动机器人构型展示", "Manual Robot High-mobility Chassis Display")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("自主研发的手动机器人构型展示", "Manual Robot High-mobility Chassis Display")}</p>
                                </div>
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p1-lecture.png"
                                        alt={t("面向国际学院本硕博开展首次科技讲座", "First Tech Sharing Session for International Students")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("面向国际学院本硕博开展首次科技讲座", "First Tech Sharing Session for International Students")}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ============================================================ */}
                    {/* Phase 2 */}
                    {/* ============================================================ */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            {t("架构标准化与高规格路演 (2024.08 - 2024.12)", "Systematization & High-Level Exhibition (Aug. 2024 - Dec. 2024)")}
                        </h2>
                        <p className="w-full text-zinc-600">
                            {t(
                                "受聘为全校国际学生科技辅导员，建立\"机械硬件+电控算法\"双轨制与\"老带新\"培训标准（SOP）。统筹开发 6 台全新展示机器人矩阵，并在联合国附属机构十周年晚会及\"北京之夜\"完成高规格技术路演。",
                                "Appointed as the University International Students' Tech Counselor. Established a dual-track (Mechanical + Electrical) framework and a senior-mentoring-junior SOP. Coordinated the development of 6 new exhibition robots for high-level roadshows at the UN Affiliated Centre's 10th Anniversary Gala and \"Beijing Night\"."
                            )}
                        </p>

                        {/* Hero + Filmstrip */}
                        <div className="flex flex-col gap-4 mt-6 w-full">
                            {/* Hero Image */}
                            <img
                                src="/media/leadership/robotics-team/p2-un-gala.png"
                                alt={t("联合国附属机构十周年晚会路演现场", "High-level Roadshow at UN Affiliated Centre Gala")}
                                className="w-full h-[50vh] md:h-[70vh] max-h-[700px] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                            />
                            <p className="text-sm text-zinc-500 text-center mt-3">
                                {t("联合国附属机构十周年晚会路演现场", "High-level Roadshow at UN Affiliated Centre Gala")}
                            </p>

                            {/* Filmstrip */}
                            <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide w-full">
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p2-training-1.png"
                                        alt={t("团队标准化\"老带新\"基础理论培训", "Standardized Mentoring SOP: Theoretical Training")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("团队标准化\"老带新\"基础理论培训", "Standardized Mentoring SOP: Theoretical Training")}</p>
                                </div>
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p2-training-2.png"
                                        alt={t("机械硬件与电控算法双轨制工作坊", "Dual-track Workshop: Mechanics & Electronics")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("机械硬件与电控算法双轨制工作坊", "Dual-track Workshop: Mechanics & Electronics")}</p>
                                </div>
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p2-un-gala-team.png"
                                        alt={t("联合国十周年晚会团队合影", "Core Delivery Team at the UN Gala")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("联合国十周年晚会团队合影", "Core Delivery Team at the UN Gala")}</p>
                                </div>
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p2-un-gala-robot.png"
                                        alt={t("联合国晚会展示机器人实机", "Exhibition Robot Matrix at UN Gala")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("联合国晚会展示机器人实机", "Exhibition Robot Matrix at UN Gala")}</p>
                                </div>
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p2-bj-night-team.png"
                                        alt={t("\"留学北京\"文化之夜登台团队合影", "Team Photo at \"Study in Beijing\" Night")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("\"留学北京\"文化之夜登台团队合影", "Team Photo at \"Study in Beijing\" Night")}</p>
                                </div>
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p2-bj-night-robot.png"
                                        alt={t("北京之夜舞台机器人效果展示", "Dynamic Robot Exhibition at Beijing Night")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("北京之夜舞台机器人效果展示", "Dynamic Robot Exhibition at Beijing Night")}</p>
                                </div>
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p2-workshop.png"
                                        alt={t("主持接待泰国中学生跨国机器人workshop", "Hosting Cross-national Robotics Workshop for Thai Students")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("主持接待泰国中学生跨国机器人workshop", "Hosting Cross-national Robotics Workshop for Thai Students")}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ============================================================ */}
                    {/* Phase 3 */}
                    {/* ============================================================ */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            {t("管理降维与闭环验证 (2025.03 - 2025.06)", "Management Decoupling & Loop Validation (Mar. 2025 - Jun. 2025)")}
                        </h2>
                        <p className="w-full text-zinc-600">
                            {t(
                                "工作重心由一线研发全面向项目进度与团队管理转移。通过成熟的梯队建设与 SOP 赋能，在不依赖创始人一线干预的情况下，新一代团队包揽预选赛 3 项大奖，并成功卫冕第二十四届 ROBOTAC 全国总冠军，完成交接。",
                                "Shifted focus from frontline R&D to project management and team leadership. Validated the robustness of team SOPs: without the founder's direct R&D intervention, the new generation team swept 3 awards in the preliminaries and successfully defended the ROBOTAC National Championship, achieving a perfect handover."
                            )}
                        </p>

                        {/* Hero + Filmstrip */}
                        <div className="flex flex-col gap-4 mt-6 w-full">
                            {/* Hero Image */}
                            <img
                                src="/media/leadership/robotics-team/p3-award-ceremony.png"
                                alt={t("新一代团队包揽预选赛亚军及季军奖项", "Next-Gen Team Sweeping Runner-up Awards at Preliminaries")}
                                className="w-full h-[50vh] md:h-[70vh] max-h-[700px] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                            />
                            <p className="text-sm text-zinc-500 text-center mt-3">
                                {t("新一代团队包揽预选赛亚军及季军奖项", "Next-Gen Team Sweeping Runner-up Awards at Preliminaries")}
                            </p>

                            {/* Filmstrip */}
                            <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide w-full">
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p3-robotac-team.png"
                                        alt={t("新团队卫冕第二十四届 ROBOTAC 全国总冠军", "Defending the 24th ROBOTAC National Championship")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("新团队卫冕第二十四届 ROBOTAC 全国总冠军", "Defending the 24th ROBOTAC National Championship")}</p>
                                </div>
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p3-tech-exchange.png"
                                        alt={t("赛前新老核心成员技术方案评审与交流", "Pre-competition Technical Review & Exchange")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("赛前新老核心成员技术方案评审与交流", "Pre-competition Technical Review & Exchange")}</p>
                                </div>
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p3-dev.png"
                                        alt={t("新成员独立主导机器人开发与测试", "New Members Leading Development without Direct Intervention")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("新成员独立主导机器人开发与测试", "New Members Leading Development without Direct Intervention")}</p>
                                </div>
                                <div className="snap-center shrink-0 w-72 md:w-80 flex flex-col gap-3">
                                    <img
                                        src="/media/leadership/robotics-team/p3-robotac-scene.png"
                                        alt={t("第二十四届 ROBOTAC 全国总决赛现场", "High-pressure Match at the 24th ROBOTAC National Finals")}
                                        className="w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                    <p className="text-xs text-zinc-500 text-center">{t("第二十四届 ROBOTAC 全国总决赛现场", "High-pressure Match at the 24th ROBOTAC National Finals")}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}

export default function InternationalTeam() {
    return (
        <Suspense fallback={<div className="w-full min-h-screen bg-zinc-50"></div>}>
            <InternationalTeamContent />
        </Suspense>
    );
}