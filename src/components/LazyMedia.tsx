"use client";

import { type ReactNode, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface LazyMediaProps {
    children: ReactNode;
    /** Tailwind classes for the placeholder skeleton (must match the real container dimensions) */
    placeholderClass?: string;
    /** Extra offset before triggering (default: 200px below viewport) */
    rootMargin?: string;
    /** Only trigger once (default: true) */
    triggerOnce?: boolean;
}

/**
 * LazyMedia — IntersectionObserver-based lazy loader for heavy media.
 *
 * Only renders `children` when the placeholder enters the viewport
 * (with configurable rootMargin). Before that, renders a grey skeleton
 * placeholder to prevent layout shift (CLS).
 */
export default function LazyMedia({
    children,
    placeholderClass = "w-full h-full min-h-[200px]",
    rootMargin = "200px 0px",
    triggerOnce = true,
}: LazyMediaProps) {
    const { ref, inView } = useInView({
        triggerOnce,
        rootMargin,
    });

    return (
        <div ref={ref} className={placeholderClass}>
            {inView ? (
                children
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-100 rounded-xl animate-pulse">
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-zinc-300"
                    >
                        <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                </div>
            )}
        </div>
    );
}