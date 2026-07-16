"use client";

import React from "react";
import type { Pose3D } from "./KinematicChain";

// ─── i18n dictionary ─────────────────────────────────────────
const I18N = {
    title: { zh: "运动学控制台", en: "Kinematics Control" },
    startPose: { zh: "起点姿态 (A点)", en: "Start Pose (Point A)" },
    targetPose: { zh: "终点姿态 (B点)", en: "Target Pose (Point B)" },
    execute: { zh: "执行轨迹规划", en: "Execute Trajectory" },
    reset: { zh: "系统重置", en: "Reset to Zero" },
    toggleWorkspace: { zh: "显示/隐藏工作空间", en: "Toggle Workspace" },
    yaw: "Yaw",
    pitch: "Pitch",
    roll: "Roll",
    deg: "°",
} as const;

// ─── Physical joint limits (degrees) ────────────────────────
const LIMITS = {
    yaw: { min: -180, max: 180, step: 1 },
    pitch: { min: -95, max: 0, step: 1 },
    roll: { min: -180, max: 180, step: 1 },
} as const;

// ─── Slider definitions ─────────────────────────────────────
type I18NStringKeys = "yaw" | "pitch" | "roll";

interface SliderDef {
    key: "yaw" | "pitch" | "roll";
    labelKey: I18NStringKeys;
}

const POINT_A_SLIDERS: SliderDef[] = [
    { key: "yaw", labelKey: "yaw" },
    { key: "pitch", labelKey: "pitch" },
    { key: "roll", labelKey: "roll" },
];

const POINT_B_SLIDERS: SliderDef[] = [
    { key: "yaw", labelKey: "yaw" },
    { key: "pitch", labelKey: "pitch" },
    { key: "roll", labelKey: "roll" },
];

// ─── Props ───────────────────────────────────────────────────
export interface SimulatorUIProps {
    lang: "zh" | "en";
    pointA: Pose3D;
    pointB: Pose3D;
    isAnimating: boolean;
    showWorkspace: boolean;
    hudRef: React.RefObject<HTMLDivElement | null>;
    onPointAChange: (key: keyof Pose3D, value: number) => void;
    onPointBChange: (key: keyof Pose3D, value: number) => void;
    onExecute: () => void;
    onReset: () => void;
    onToggleWorkspace: () => void;
}

// ─── Slider sub-component ───────────────────────────────────
function JointSlider({
    label,
    axis,
    value,
    limits,
    onChange,
}: {
    label: string;
    axis: string;
    value: number;
    limits: { min: number; max: number; step: number };
    onChange: (v: number) => void;
}) {
    return (
        <div className="flex flex-col gap-0.5">
            <div className="flex justify-between items-center">
                <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                    {label}
                </span>
                <span className="text-[11px] font-mono text-zinc-600 tabular-nums">
                    {value.toFixed(0)}°
                </span>
            </div>
            <input
                type="range"
                min={limits.min}
                max={limits.max}
                step={limits.step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1.5 appearance-none cursor-pointer
                    bg-zinc-200 rounded-full
                    accent-zinc-700
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-3
                    [&::-webkit-slider-thumb]:h-3
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-zinc-700
                    [&::-webkit-slider-thumb]:shadow-sm
                    [&::-webkit-slider-thumb]:border-2
                    [&::-webkit-slider-thumb]:border-white"
                aria-label={`${axis} ${label}`}
            />
        </div>
    );
}

// ─── Pose section (3 sliders) ───────────────────────────────
function PoseSliders({
    title,
    pose,
    onChange,
    lang,
}: {
    title: string;
    pose: Pose3D;
    onChange: (key: keyof Pose3D, value: number) => void;
    lang: "zh" | "en";
}) {
    const sliders: SliderDef[] =
        title === I18N.startPose[lang] ? POINT_A_SLIDERS : POINT_B_SLIDERS;

    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                {title}
            </span>
            {sliders.map((s) => (
                <JointSlider
                    key={s.key}
                    label={I18N[s.labelKey]}
                    axis={s.key}
                    value={pose[s.key]}
                    limits={LIMITS[s.key]}
                    onChange={(v) => onChange(s.key, v)}
                />
            ))}
        </div>
    );
}

// ─── Main UI Panel ───────────────────────────────────────────
export default function SimulatorUI({
    lang,
    pointA,
    pointB,
    isAnimating,
    showWorkspace,
    hudRef,
    onPointAChange,
    onPointBChange,
    onExecute,
    onReset,
    onToggleWorkspace,
}: SimulatorUIProps) {
    return (
        <div className="bg-white border border-zinc-200 shadow-sm rounded-xl p-6 flex flex-col gap-4 w-full h-full overflow-y-auto">
            {/* Title */}
            <h3 className="text-sm font-bold text-zinc-700 tracking-tight">
                {I18N.title[lang]}
            </h3>

            {/* Divider */}
            <div className="h-px bg-zinc-200" />

            {/* Point A sliders */}
            <PoseSliders
                title={I18N.startPose[lang]}
                pose={pointA}
                onChange={onPointAChange}
                lang={lang}
            />

            {/* Divider */}
            <div className="h-px bg-zinc-200" />

            {/* Point B sliders */}
            <PoseSliders
                title={I18N.targetPose[lang]}
                pose={pointB}
                onChange={onPointBChange}
                lang={lang}
            />

            {/* Action buttons + Workspace toggle */}
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <button
                        onClick={onExecute}
                        disabled={isAnimating}
                        className="flex-1 text-xs font-semibold py-1.5 px-3 rounded-lg
                            bg-zinc-800 text-zinc-100
                            hover:bg-zinc-700 active:bg-zinc-900
                            disabled:opacity-40 disabled:cursor-not-allowed
                            transition-all duration-150"
                    >
                        {I18N.execute[lang]}
                    </button>
                    <button
                        onClick={onReset}
                        className="text-xs font-semibold py-1.5 px-3 rounded-lg
                            bg-zinc-200 text-zinc-600
                            hover:bg-zinc-300 active:bg-zinc-400
                            transition-all duration-150"
                    >
                        {I18N.reset[lang]}
                    </button>
                </div>
                <button
                    onClick={onToggleWorkspace}
                    className="w-full text-xs font-semibold py-1.5 px-3 rounded-lg
                        bg-blue-50 text-blue-600 border border-blue-200
                        hover:bg-blue-100 active:bg-blue-200
                        transition-all duration-150"
                >
                    {I18N.toggleWorkspace[lang]}
                </button>
            </div>

            {/* HUD real-time monitor */}
            <div
                ref={hudRef}
                className="font-mono text-[10px] text-zinc-600 bg-zinc-200/40 p-2 rounded border border-zinc-200/60 whitespace-pre leading-snug"
            >
                Yaw:   0.00°
                Pitch: 0.00°
                Roll:  0.00°
                X: 0.0 mm
                Y: 0.0 mm
                Z: 0.0 mm
            </div>
        </div>
    );
}