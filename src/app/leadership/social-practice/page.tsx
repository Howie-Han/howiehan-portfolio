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
    const FILM_CLASSES =
        "w-full aspect-[4/3] object-cover bg-zinc-100 rounded-xl filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700";
    const HERO_CAPTION = "text-sm text-zinc-500 text-center mt-3";
    const FILM_CAPTION = "text-xs text-zinc-500 text-center mt-2";

    // ─── Filmstrip generator ──────────────────────────────────────
    const Filmstrip = ({ count }: { count: number }) => (
        <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-4 mt-6 scrollbar-hide w-full">
            {Array.from({ length: count }).map((_, idx) => (
                <div key={idx} className="snap-center shrink-0 w-64 md:w-72 flex flex-col">
                    <img
                        src="/media/placeholder.png"
                        alt={`Filmstrip ${idx + 1}`}
                        className={FILM_CLASSES}
                    />
                    <p className={FILM_CAPTION}>
                        {t(`花絮图注占位 ${idx + 1}`, `Filmstrip Caption ${idx + 1}`)}
                    </p>
                </div>
            ))}
        </div>
    );

    // ─── Hero pair ────────────────────────────────────────────────
    const HeroPair = ({ media1IsVideo = false, media2IsVideo = false }: { media1IsVideo?: boolean; media2IsVideo?: boolean }) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
            <div>
                {media1IsVideo ? (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={HERO_VIDEO_CLASSES}
                    >
                        <source src="/media/placeholder.mp4" type="video/mp4" />
                    </video>
                ) : (
                    <img
                        src="/media/placeholder.png"
                        alt="Hero Media 1"
                        className={HERO_CLASSES}
                    />
                )}
                <p className={HERO_CAPTION}>
                    {t("核心媒体图注占位 (一)", "Hero Media Caption (I)")}
                </p>
            </div>
            <div>
                {media2IsVideo ? (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={HERO_VIDEO_CLASSES}
                    >
                        <source src="/media/placeholder.mp4" type="video/mp4" />
                    </video>
                ) : (
                    <img
                        src="/media/placeholder.png"
                        alt="Hero Media 2"
                        className={HERO_CLASSES}
                    />
                )}
                <p className={HERO_CAPTION}>
                    {t("核心媒体图注占位 (二)", "Hero Media Caption (II)")}
                </p>
            </div>
        </div>
    );

    return (
        <main className="w-full min-h-screen bg-zinc-50 text-zinc-900 font-sans">
            {/* Sticky frosted-glass navigation bar */}
            <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-50/80 border-b border-zinc-200/50">
                <div className="px-6 md:px-12 lg:px-24 h-16 flex items-center">
                    <Link
                        href={`/?lang=${lang}#leadership`}
                        className="text-zinc-500 hover:text-zinc-700 transition-colors duration-200 flex items-center gap-2"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                        {t("返回领导力", "Back to Leadership")}
                    </Link>
                </div>
            </nav>

            {/* Main content container */}
            <div className="px-6 md:px-12 lg:px-24 py-24 flex flex-col items-center w-full">
                {/* Centered main title */}
                <h1 className="text-4xl font-extrabold text-zinc-900 mb-6 text-center tracking-tight">
                    {t(
                        "暑期社会实践副队长",
                        "Vice Captain of Summer Social Practice"
                    )}
                </h1>

                {/* Full-width overview paragraph — max-w-none prevents line break truncation */}
                <p className="w-full text-zinc-600 text-center max-w-none">
                    {t(
                        "这里是暑期社会实践副队长的全局概述占位内容。",
                        "This is a placeholder overview for the Vice Captain of Summer Social Practice."
                    )}
                </p>

                {/* ============================================================ */}
                {/* Vertical three-module architecture                        */}
                {/* ============================================================ */}
                <div className="flex flex-col mt-24 w-full">
                    {/* ------ Module 1: 产业调研 / Industry Research ------ */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            {t("产业调研（占位标题）", "Industry Research (Placeholder Title)")}
                        </h2>
                        <p className="w-full text-zinc-600">
                            {t(
                                "这里是产业调研模块的描述占位文本。",
                                "This is a placeholder description for the Industry Research module."
                            )}
                        </p>
                        <HeroPair />
                        <Filmstrip count={9} />
                    </section>

                    {/* ------ Module 2: 下沉市场 / Downstream Market ------ */}
                    <section className="mt-24">
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            {t("下沉市场（占位标题）", "Downstream Market (Placeholder Title)")}
                        </h2>
                        <p className="w-full text-zinc-600">
                            {t(
                                "这里是下沉市场模块的描述占位文本。",
                                "This is a placeholder description for the Downstream Market module."
                            )}
                        </p>
                        <HeroPair />
                        <Filmstrip count={5} />
                    </section>

                    {/* ------ Module 3: 成果交付 / Outcome Delivery ------ */}
                    <section className="mt-24">
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            {t("成果交付（占位标题）", "Outcome Delivery (Placeholder Title)")}
                        </h2>
                        <p className="w-full text-zinc-600">
                            {t(
                                "这里是成果交付模块的描述占位文本。",
                                "This is a placeholder description for the Outcome Delivery module."
                            )}
                        </p>
                        <HeroPair />
                        <Filmstrip count={3} />
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