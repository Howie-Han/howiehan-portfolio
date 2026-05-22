"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageSlider({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // 安全的状态切换逻辑，绝对不会触发无限循环
    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    // 容错兜底：如果没有传入图片，显示一个深色占位块
    if (!images || images.length === 0) {
        return <div className="w-full h-full min-h-[300px] bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-600 font-mono text-sm">No Images</div>;
    }

    return (
        <div className="relative w-full h-full min-h-[300px] rounded-xl overflow-hidden group bg-zinc-900">
            {/* 核心图片渲染，使用 next/image 保证性能 */}
            <Image
                src={images[currentIndex]}
                alt={`Project Blueprint ${currentIndex + 1}`}
                fill
                priority // 提升首屏加载优先级
                sizes="(max-width: 768px) 100vw, 50vw" // <--- 加上这一行
                className="object-cover transition-opacity duration-300"
            />

            {/* 左侧切换按钮 */}
            <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
                &#10094;
            </button>

            {/* 右侧切换按钮 */}
            <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
                &#10095;
            </button>

            {/* 底部指示器 */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-white' : 'bg-white/40'}`}
                    />
                ))}
            </div>
        </div>
    );
}