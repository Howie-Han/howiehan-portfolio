"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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
        "w-full h-[40vh] max-h-[400px] object-cover bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700";
    const HERO_VIDEO_CLASSES =
        "w-full h-[40vh] max-h-[400px] object-cover bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700";
    const HERO_CONTAIN_CLASSES =
        "w-full h-[40vh] max-h-[400px] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700";
    const FILM_CLASSES =
        "w-full aspect-[4/3] object-cover bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700";
    const FILM_CONTAIN_CLASSES =
        "w-full aspect-[4/3] object-contain bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700";
    const FILM_VIDEO_CLASSES =
        "w-full aspect-[4/3] object-cover bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700";
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
                        <span>{t("返回领导力", "Back to Leadership")}</span>
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
                        "带领\"灵创巧探\"实践队开展农业机器人实地调研。统筹前沿技术走访与山东下沉市场勘察，产出1.5万字调研报告及多项校企合作意向。获全网40万+曝光，并成功将一线痛点转化为农业机器人CAD工程实体。",
                        "Led a field research team focusing on agricultural robotics. Coordinated frontier tech visits and grassroots market investigations in Shandong. Delivered a 15k-word report, 400k+ impressions, and translated frontline pain points into a CAD engineering prototype."
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
                                "对接博创联动等头部企业及 2023 世界机器人大会。从宏观视角梳理当代农业机器人的技术栈与商业落地痛点。",
                                "Visited top-tier enterprises and the 2023 World Robot Conference. Analyzed the technology stack and commercialization bottlenecks of modern agricultural robots."
                            )}
                        </p>
                        {/* Hero 2-col */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
                            <div>
                                <img
                                    src="/media/leadership/social-practice/sp-m1-robot.png"
                                    alt="WRC Agri Robots"
                                    className={HERO_CLASSES}
                                />
                                <p className={HERO_CAPTION}>
                                    {t("WRC 农业采摘机器人技术架构分析", "Tech Architecture Analysis of WRC Agri-Robots")}
                                </p>
                            </div>
                            <div>
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className={HERO_VIDEO_CLASSES}
                                >
                                    <source
                                        src="/media/leadership/social-practice/sp-m1-bochuang.mp4"
                                        type="video/mp4"
                                    />
                                </video>
                                <p className={HERO_CAPTION}>
                                    {t("校友企业博创联动科技总部实地调研", "Field Study at Bochuang Tech HQ")}
                                </p>
                            </div>
                        </div>
                        {/* Filmstrip: 9 items (all img) */}
                        <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-4 mt-6 scrollbar-hide w-full">
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src="/media/leadership/social-practice/sp-m1-icebreak.png"
                                    alt="Team Icebreak"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("团队破冰合影", "Team Icebreaker Photo")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src="/media/leadership/social-practice/sp-m1-sannong.png"
                                    alt="San Nong"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("三农主题团日大会", "San Nong Themed Group Meeting")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src="/media/leadership/social-practice/sp-m1-museum-solo.png"
                                    alt="Museum Solo"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("农业博物馆溯源 - 个人", "Agri-Museum Origin Trace - Solo")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src="/media/leadership/social-practice/sp-m1-museum-group.png"
                                    alt="Museum Group"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("农业博物馆溯源 - 团队", "Agri-Museum Origin Trace - Group")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src="/media/leadership/social-practice/sp-m1-wrc-group.png"
                                    alt="WRC Group"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("WRC 2023 核心展区合影", "WRC 2023 Core Exhibition Group Photo")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src="/media/leadership/social-practice/sp-m1-wrc-interview.png"
                                    alt="WRC Interview"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("WRC 行业生态专访", "WRC Industry Ecosystem Interview")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src="/media/leadership/social-practice/sp-m1-cau-event.png"
                                    alt="CAU Event"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("中国农大联合团日交流", "CAU Joint Group Exchange")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src="/media/leadership/social-practice/sp-m1-cau-group1.png"
                                    alt="CAU Group 1"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("农大农学院技术共建", "CAU Agri-Tech Co-Development")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src="/media/leadership/social-practice/sp-m1-cau-group2.png"
                                    alt="CAU Group 2"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("农大科技小院深度联动", "CAU Sci-Tech Courtyard Deep Collaboration")}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ------ Module 2: 下沉市场与需求定义 / Grassroots Market & Requirement Definition ------ */}
                    <section className="mt-16 md:mt-24">
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            {t("下沉市场与需求定义", "Grassroots Market & Requirement Definition")}
                        </h2>
                        <p className="w-full text-zinc-600">
                            {t(
                                "深入寿光市与威海大水泊镇。走访6个自然村与30余家农户，明确非结构化农田环境下的真实机器换人需求。",
                                "Immersed in Shouguang and Dashuipo Town. Visited 6 villages and 30+ farmers to define authentic requirements for robot substitution in unstructured farmlands."
                            )}
                        </p>
                        {/* Hero 2-col (both img) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
                            <div>
                                <img
                                    src="/media/leadership/social-practice/sp-m2-greenhouse.png"
                                    alt="Greenhouse Survey"
                                    className={HERO_CLASSES}
                                />
                                <p className={HERO_CAPTION}>
                                    {t("寿光蔬菜大棚非结构化作业环境勘察", "Environmental Survey in Shouguang Greenhouses")}
                                </p>
                            </div>
                            <div>
                                <img
                                    src="/media/leadership/social-practice/sp-m2-weihai-lecture.png"
                                    alt="Weihai Lecture"
                                    className={HERO_CLASSES}
                                />
                                <p className={HERO_CAPTION}>
                                    {t("威海大水泊镇乡村振兴首席专家深度座谈", "Panel with Rural Revitalization Experts")}
                                </p>
                            </div>
                        </div>
                        {/* Filmstrip: 5 items (4 img + 1 video at position 5) */}
                        <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-4 mt-6 scrollbar-hide w-full">
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src="/media/leadership/social-practice/sp-m2-shouguang-group.png"
                                    alt="Shouguang Group"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("寿光三元朱村田间合影", "Field Group Photo at Sanyuanzhu Village")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src="/media/leadership/social-practice/sp-m2-shouguang-park.png"
                                    alt="Shouguang Park"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("寿光高新农业示范园", "Shouguang Hi-Tech Agri Demo Park")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src="/media/leadership/social-practice/sp-m2-shouguang-expo.png"
                                    alt="Shouguang Expo"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("国际蔬菜科技博览会", "International Vegetable Sci-Tech Expo")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src="/media/leadership/social-practice/sp-m2-weihai-group.png"
                                    alt="Weihai Group"
                                    className={FILM_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("威海基层走访团队合影", "Weihai Grassroots Visit Team Photo")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className={FILM_VIDEO_CLASSES}
                                >
                                    <source
                                        src="/media/leadership/social-practice/sp-m2-weihai-visit.mp4"
                                        type="video/mp4"
                                    />
                                </video>
                                <p className={FILM_CAPTION}>
                                    {t("农作痛点实地采集录像", "On-site Pain Point Collection Footage")}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ------ Module 3: 成果交付与硬件孵化 / Project Delivery & Hardware Incubation ------ */}
                    <section className="mt-16 md:mt-24">
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            {t("成果交付与硬件孵化", "Project Delivery & Hardware Incubation")}
                        </h2>
                        <p className="w-full text-zinc-600">
                            {t(
                                "统筹撰写1.5万字报告，作为技术骨干，将调研需求直接闭环转化为农用机器人机构设计。",
                                "Coordinated a 15k-word technical report. As technical lead, translated field requirements directly into a custom robot mechanism design."
                            )}
                        </p>
                        {/* Hero 2-col (both img with object-contain) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
                            <div>
                                <img
                                    src="/media/leadership/social-practice/sp-m3-cad.png"
                                    alt="Agri Robot CAD"
                                    className={HERO_CONTAIN_CLASSES}
                                />
                                <p className={HERO_CAPTION}>
                                    {t("基于下沉需求孵化设计的农业机器人 CAD 原型", "Agri-Robot CAD Prototype from Market Needs")}
                                </p>
                            </div>
                            <div>
                                <img
                                    src="/media/leadership/social-practice/sp-m3-summary-1.png"
                                    alt="Report Summary 1"
                                    className={HERO_CONTAIN_CLASSES}
                                />
                                <p className={HERO_CAPTION}>
                                    {t("产出万字调研分析报告", "Comprehensive Technical & Market Report")}
                                </p>
                            </div>
                        </div>
                        {/* Filmstrip: 3 items (all img, object-contain for screenshots) */}
                        <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-4 mt-6 scrollbar-hide w-full">
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src="/media/leadership/social-practice/sp-m3-flag.png"
                                    alt="Team Flag"
                                    className={FILM_CONTAIN_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("灵创巧探实践队出征队旗", "Lingchuang Qiaotan Practice Team Flag")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src="/media/leadership/social-practice/sp-m3-summary-2.png"
                                    alt="Report Summary 2"
                                    className={FILM_CONTAIN_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("技术与产业痛点分析节选", "Tech & Industry Pain Point Analysis Excerpt")}
                                </p>
                            </div>
                            <div className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                                <img
                                    src="/media/leadership/social-practice/sp-m3-summary-3.png"
                                    alt="Report Summary 3"
                                    className={FILM_CONTAIN_CLASSES}
                                />
                                <p className={FILM_CAPTION}>
                                    {t("校地合作规划与闭环总结", "University-Local Collaboration & Closure Summary")}
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