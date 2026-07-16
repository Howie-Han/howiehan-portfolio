"use client";

import React, { useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import type { Pose3D } from "./KinematicChain";

// ─── Dynamic imports (SSR disabled for R3F) ─────────────────
const DynamicRobotScene = dynamic(
    () => import("./RobotScene"),
    { ssr: false },
);

const DynamicKinematicChain = dynamic(
    () => import("./KinematicChain"),
    { ssr: false },
);

const SimulatorUI = dynamic(
    () => import("./SimulatorUI"),
    { ssr: false },
);

// ─── Props ───────────────────────────────────────────────────
export interface WristSimulatorProps {
    lang: "zh" | "en";
}

// ─── Main Wrapper Component ─────────────────────────────────
export default function WristSimulator({ lang }: WristSimulatorProps) {
    // ── State ─────────────────────────────────────────────────
    const [pointA, setPointA] = useState<Pose3D>({ yaw: 0, pitch: 0, roll: 0 });
    const [pointB, setPointB] = useState<Pose3D>({
        yaw: 45,
        pitch: -60,
        roll: 30,
    });
    const [isAnimating, setIsAnimating] = useState(false);
    const [showWorkspace, setShowWorkspace] = useState(false);

    // ── Refs (bypass React for perf-critical animation) ────────
    const timerRef = useRef<number>(0);
    const hudRef = useRef<HTMLDivElement | null>(null);

    // ── Event handlers ──────────────────────────────────────────
    const handleExecute = useCallback(() => {
        setIsAnimating(true);
        timerRef.current = 0;
    }, []);

    const handleReset = useCallback(() => {
        setIsAnimating(false);
        timerRef.current = 0;
        setPointA({ yaw: 0, pitch: 0, roll: 0 });
        setPointB({ yaw: 45, pitch: -60, roll: 30 });
        if (hudRef.current) {
            hudRef.current.innerText = "Yaw:   0.00°\nPitch: 0.00°\nRoll:  0.00°\nX: 0.0 mm\nY: 0.0 mm\nZ: 0.0 mm";
        }
    }, []);

    const handlePointAChange = useCallback(
        (key: keyof Pose3D, value: number) => {
            setPointA((prev) => ({ ...prev, [key]: value }));
        },
        [],
    );

    const handlePointBChange = useCallback(
        (key: keyof Pose3D, value: number) => {
            setPointB((prev) => ({ ...prev, [key]: value }));
        },
        [],
    );

    const handleToggleWorkspace = useCallback(() => {
        setShowWorkspace((prev) => !prev);
    }, []);

    // ── Render ─────────────────────────────────────────────────
    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full mt-8">
            {/* ── Left: Control Panel ──────────────────────────── */}
            <div className="w-full lg:w-1/3 flex flex-col">
                <SimulatorUI
                    lang={lang}
                    pointA={pointA}
                    pointB={pointB}
                    isAnimating={isAnimating}
                    showWorkspace={showWorkspace}
                    hudRef={hudRef}
                    onPointAChange={handlePointAChange}
                    onPointBChange={handlePointBChange}
                    onExecute={handleExecute}
                    onReset={handleReset}
                    onToggleWorkspace={handleToggleWorkspace}
                />
            </div>

            {/* ── Right: 3D Canvas ────────────────────────────── */}
            <div className="w-full lg:w-2/3 aspect-[4/3] bg-[#f4f4f5] rounded-xl overflow-hidden shadow-inner border border-zinc-200">
                <DynamicRobotScene>
                    <DynamicKinematicChain
                        pointA={pointA}
                        pointB={pointB}
                        isAnimating={isAnimating}
                        timerRef={timerRef}
                        hudRef={hudRef}
                        showWorkspace={showWorkspace}
                    />
                </DynamicRobotScene>
            </div>
        </div>
    );
}