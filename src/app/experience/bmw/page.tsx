"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function DetailContent() {
    const searchParams = useSearchParams();
    const lang = searchParams.get("lang") || "zh";

    return (
        <div className="min-h-screen bg-slate-50 text-zinc-900 selection:bg-zinc-200">
            {/* 极简导航栏 */}
            <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-md border-b border-zinc-200 z-50">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center">
                    <Link href={`/?lang=${lang}#experience`} className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-2">
                        <span>←</span> {lang === 'zh' ? '返回主页' : 'Back to Home'}
                    </Link>
                </div>
            </nav>

            {/* 详情页内容占位区 */}
            <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">BMW China</h1>
                    <p className="text-zinc-500 text-lg">
                        {lang === 'zh' ? '工程项目详情占位区' : 'Project Details Placeholder'}
                    </p>
                </div>

                <div className="aspect-video w-full bg-zinc-200 rounded-2xl flex items-center justify-center border border-zinc-300 mb-8 shadow-inner">
                    <span className="text-zinc-400 font-mono">
                        {lang === 'zh' ? '多媒体组件占位 (3D/视频)' : 'Media Container Placeholder'}
                    </span>
                </div>

                <div className="space-y-4">
                    <div className="h-4 bg-zinc-200 rounded w-full"></div>
                    <div className="h-4 bg-zinc-200 rounded w-5/6"></div>
                    <div className="h-4 bg-zinc-200 rounded w-4/6"></div>
                </div>
            </main>
        </div>
    );
}

export default function ExperienceDetail() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50"></div>}>
            <DetailContent />
        </Suspense>
    );
}