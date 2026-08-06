"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ASSET_BASE } from "@/config/assets";
import LazyMedia from "@/components/LazyMedia";

function SocialPracticeContent() {
    const [lang, setLang] = useState<"zh" | "en">("zh");
    const searchParams = useSearchParams();

    useEffect(() => {
        const urlLang = searchParams.get("lang");
        if (urlLang === "zh" || urlLang === "en") {
            setLang(urlLang);
        }
    }, [searchParams]);

    const t = (zh: string, en: string) => (lang === "zh" ? zh : en);

    const HERO_CLASSES =
        "w-full h-[40vh] max-h-[400px] object-cover bg-zinc-100 rounded-xl";
    const HERO_VIDEO_CLASSES =
        "w-full h-[40vh] max-h-[400px] object-cover bg-zinc-100 rounded-xl";
    const HERO_CONTAIN_CLASSES =
        "w-full h-[40vh] max-h-[400px] object-contain bg-zinc-100 rounded-xl";
    const FILM_CLASSES =
        "w-full aspect-[4/3] object-cover bg-zinc-100 rounded-xl";
    const FILM_CONTAIN_CLASSES =
        "w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl";
    const FILM_VIDEO_CLASSES =
        "w-full aspect-[4/3] object-cover bg-zinc-100 rounded-xl";
    const HERO_CAPTION = "text-sm text-zinc-500 text-center mt-3";
    const FILM_CAPTION = "text-xs text-zinc-500 text-center mt-2";

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
            <div className="px-6 md:px-12 lg:px-24 py-24 flex flex-col items-center w-full">
                {/* Centered main title */}
                <h1 className="text-2xl md:text-4xl font-extrabold text-zinc-900 mb-6 text-center tracking-tight">
                    {t(
                        "暑期社会实践队副队长 (2023.08)",
                        "Vice Captain, Summer Social Practice Team (Aug. 2023)"
                    )}
                </h1>

                {/* Full-width overview paragraph — max-w-none prevents line break truncation */}
                <p className="w-full text-zinc-600 text-center max-w-none">
                    {t(
                        "带领\"灵创巧探\"实践队开展农业机器人实地调研。完成企业走访、农村实地调研及需求分析，形成1.5万字调研报告，并基于调研结果完成农业机器人概念方案设计。",
                        "Led the \"LingChuang QiaoTan\" field research team to investigate agricultural robotics through industry visits, rural field studies, and user requirement analysis. Produced a 15,000-word technical report and developed a concept design for an agricultural robot based on the findings."
                    )}
                </p>

                {/* ============================================================ */}
                {/* Vertical three-module architecture                        */}
                {/* ============================================================ */}
                <div className="flex flex-col mt-16 md:mt-24 w-full">
                    {/* ------ Module 1: 产业调研与技术前瞻 / Industry Research & Tech Scouting ------ */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            {t("产业调研与技术前瞻", "Industry Research & Tech Scouting")}
                        </h2>
                        <p className="w-full text-zinc-600">
                            {t(
                                "走访农业机器人企业及 2023 世界机器人大会，调研农业机器人关键技术路线、典型产品及产业应用现状。",
                                "Visited agricultural robotics companies and the 2023 World Robot Conference to investigate key technologies, representative products, and current industrial applications."
                            )}
                        </p>
                        {/* Hero 2-col */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
                            <div>
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m1-robot.webp`}
                                    alt="WRC Agri Robots"
                                    className={HERO_CLASSES}
                                />
                                <p className={HERO_CAPTION}>
                                    {t("WRC 农业采摘机器人技术调研", "Agricultural Robotics Survey at WRC 2023")}
                                </p>
                            </div>
                            <div>
                                <LazyMedia placeholderClass="w-full h-[40vh] max-h-[400px] rounded-xl">
                                    <video
                                        controls
                                        preload="metadata"
                                        muted
                                        playsInline
                                        className={HERO_VIDEO_CLASSES}
                                    >
                                        <source
                                            src={`${ASSET_BASE}/leadership/social-practice/sp-m1-bochuang.mp4`}
                                            type="video/mp4"
                                        />
                                    </video>
                                </LazyMedia>
                                <p className={HERO_CAPTION}>
                                    {t("校友企业博创联动调研", "Field Study at Bochuang Tech HQ")}
                                </p>
                            </div>
                        </div>
                        {/* Filmstrip: 9 items (all img) */}
                        <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-4 mt-6 scrollbar-hide w-full">
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m1-icebreak.webp`}
                                    alt="Team Icebreak"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("实践团队合影", "Team Photo")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m1-sannong.webp`}
                                    alt="San Nong"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("三农主题交流活动", "Rural Development Seminar")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m1-museum-solo.webp`}
                                    alt="Museum Solo"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("中国农业博物馆调研", "China Agricultural Museum Visit")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m1-museum-group.webp`}
                                    alt="Museum Group"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("中国农业博物馆团队调研", "China Agricultural Museum Group Visit")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m1-wrc-group.webp`}
                                    alt="WRC Group"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("WRC 2023 展区调研", "WRC 2023 Exhibition Survey")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m1-wrc-interview.webp`}
                                    alt="WRC Interview"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("WRC 行业交流采访", "Industry Interview at WRC 2023")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m1-cau-event.webp`}
                                    alt="CAU Event"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("中国农大交流活动", "Exchange with China Agricultural University")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m1-cau-group1.webp`}
                                    alt="CAU Group 1"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("农大农学院技术交流", "Technical Exchange with CAU")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m1-cau-group2.webp`}
                                    alt="CAU Group 2"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("农大科技小院调研", "CAU Sci-Tech Courtyard Visit")}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ------ Module 2: 下沉市场与需求定义 / Grassroots Market & Requirement Definition ------ */}
                    <section className="mt-16 md:mt-24">
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            {t("下沉市场与需求定义", "Field Investigation & Requirement Analysis")}
                        </h2>
                        <p className="w-full text-zinc-600">
                            {t(
                                "深入寿光市及威海大水泊镇，走访6个自然村和30余户农户，调研非结构化农田环境下农业机器人的实际应用需求。",
                                "Conducted field studies in Shouguang and Dashuibo Town, visiting six villages and over 30 farming households to identify practical requirements for agricultural robots in unstructured farming environments."
                            )}
                        </p>
                        {/* Hero 2-col (both img) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
                            <div>
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m2-greenhouse.webp`}
                                    alt="Greenhouse Survey"
                                    className={HERO_CLASSES}
                                />
                                <p className={HERO_CAPTION}>
                                    {t("寿光蔬菜大棚调研", "Greenhouse Field Investigation in Shouguang")}
                                </p>
                            </div>
                            <div>
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m2-weihai-lecture.webp`}
                                    alt="Weihai Lecture"
                                    className={HERO_CLASSES}
                                />
                                <p className={HERO_CAPTION}>
                                    {t("乡村振兴专家座谈", "Discussion with Rural Revitalization Experts")}
                                </p>
                            </div>
                        </div>
                        {/* Filmstrip: 5 items (4 img + 1 video at position 5) */}
                        <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-4 mt-6 scrollbar-hide w-full">
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m2-shouguang-group.webp`}
                                    alt="Shouguang Group"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("寿光三元朱村田间调研", "Field Investigation in Sanyuanzhu Village")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m2-shouguang-park.webp`}
                                    alt="Shouguang Park"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("寿光高新农业示范园调研", "Agricultural Demonstration Park Visit")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m2-shouguang-expo.webp`}
                                    alt="Shouguang Expo"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("国际蔬菜科技博览会", "International Vegetable Sci-Tech Expo")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m2-weihai-group.webp`}
                                    alt="Weihai Group"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("威海基层调研团队", "Weihai Grassroots Visit Team")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <LazyMedia placeholderClass="w-full aspect-[4/3] rounded-xl">
                                    <video
                                        controls
                                        preload="metadata"
                                        muted
                                        playsInline
                                        className={FILM_VIDEO_CLASSES}
                                    >
                                        <source
                                            src={`${ASSET_BASE}/leadership/social-practice/sp-m2-weihai-visit.mp4`}
                                            type="video/mp4"
                                        />
                                    </video>
                                </LazyMedia>
                                <p className={FILM_CAPTION}>
                                    {t("农业生产痛点调研", "Agricultural Workflow Investigation")}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ------ Module 3: 成果交付与硬件孵化 / Project Delivery & Hardware Incubation ------ */}
                    <section className="mt-16 md:mt-24">
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            {t("调研成果与概念设计", "Project Delivery & Conceptual Design")}
                        </h2>
                        <p className="w-full text-zinc-600">
                            {t(
                                "统筹完成1.5万字农业机器人调研报告，并结合实地需求完成农业机器人概念结构设计，为后续产品开发提供参考。",
                                "Coordinated the preparation of a 15,000-word technical report and translated field research findings into a conceptual mechanical design for an agricultural robot."
                            )}
                        </p>
                        {/* Hero 2-col (both img with object-contain) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
                            <div>
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m3-cad.webp`}
                                    alt="Agri Robot CAD"
                                    className={HERO_CONTAIN_CLASSES}
                                />
                                <p className={HERO_CAPTION}>
                                    {t("农业机器人概念 CAD 模型", "Agricultural Robot Concept CAD Model")}
                                </p>
                            </div>
                            <div>
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m3-summary-1.webp`}
                                    alt="Report Summary 1"
                                    className={HERO_CONTAIN_CLASSES}
                                />
                                <p className={HERO_CAPTION}>
                                    {t("农业机器人调研报告", "Agricultural Robotics Research Report")}
                                </p>
                            </div>
                        </div>
                        {/* Filmstrip: 3 items (all img, object-contain for screenshots) */}
                        <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-4 mt-6 scrollbar-hide w-full">
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m3-flag.webp`}
                                    alt="Team Flag"
                                    className={FILM_CONTAIN_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("灵创巧探实践队旗", "Lingchuang Qiaotan Practice Team Flag")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m3-summary-2.webp`}
                                    alt="Report Summary 2"
                                    className={FILM_CONTAIN_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("技术与产业痛点分析节选", "Tech & Industry Pain Point Analysis Excerpt")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src={`${ASSET_BASE}/leadership/social-practice/sp-m3-summary-3.webp`}
                                    alt="Report Summary 3"
                                    className={FILM_CONTAIN_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("校地合作规划", "University-Local Collaboration")}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default function SocialPractice() {
    return (
        <Suspense fallback={<div className="w-full min-h-screen bg-zinc-50"></div>}>
            <SocialPracticeContent />
        </Suspense>
    );
}