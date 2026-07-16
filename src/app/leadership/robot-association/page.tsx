"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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
                    {t("北航机器人协会会长", "President of BUAA Robotics Association")}
                </h1>
                <p className="w-full text-zinc-600">
                    {t("这里是北航机器人协会会长的详情页占位符内容。", "This is a placeholder for the President of BUAA Robotics Association details page.")}
                </p>
            </main>
        </div>
    );
}

export default function RobotAssociation() {
    return (
        <Suspense fallback={<div className="w-full min-h-screen bg-zinc-50"></div>}>
            <RobotAssociationContent />
        </Suspense>
    );
}