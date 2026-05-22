"use client";

import { Component, type ReactNode, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    useGLTF,
    Environment,
    ContactShadows,
    Center,
} from "@react-three/drei";

// ─── Step 1: Cut off Draco CDN completely ───────────────────────────────
useGLTF.preload("/media/omni-wheel.glb");
(useGLTF as any).setDecoderPath?.("");

// ─── Step 2: Error Boundary class (catches unexpected crashes only) ────

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ThreeErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: { componentStack?: string }) {
        console.warn(
            "[ModelViewer] 3D rendering error caught by boundary:",
            error.message,
            info.componentStack ?? ""
        );
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback ?? (
                    <div className="flex items-center justify-center w-full h-full min-h-[300px] rounded-xl bg-zinc-900">
                        <div className="flex flex-col items-center gap-4 px-6 text-center">
                            <svg
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-zinc-600"
                            >
                                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                                <line x1="12" y1="22" x2="12" y2="15.5" />
                                <polyline points="22 8.5 12 15.5 2 8.5" />
                            </svg>
                            <span className="text-xs tracking-widest uppercase text-zinc-500">
                                3D Model Unavailable
                            </span>
                            <span className="text-[11px] text-zinc-600 leading-relaxed max-w-[200px]">
                                请下载简历查看图纸 · Download CV for blueprints
                            </span>
                        </div>
                    </div>
                )
            );
        }
        return this.props.children;
    }
}

// ─── 3D Scene internals ─────────────────────────────────────────────────

function Model() {
    const { scene } = useGLTF("/media/omni-wheel.glb");

    return (
        <Center>
            <primitive
                object={scene}
                scale={1}
                // CAD model coordinate fix: rotate 90° around X axis
                // so the wheel stands upright in the viewport center
                rotation={[-Math.PI / 2, 0, 0]}
            />
        </Center>
    );
}

function LoadingFallback() {
    return (
        <div className="flex items-center justify-center w-full h-full min-h-[300px] rounded-xl bg-zinc-900">
            <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 border-2 border-zinc-600 border-t-white rounded-full animate-spin" />
                <span className="text-xs tracking-widest uppercase text-zinc-500">
                    Loading 3D Model…
                </span>
            </div>
        </div>
    );
}

// ─── Canvas with context-lost graceful handling (no throw!) ────────────

function ThreeCanvas() {
    const [isContextLost, setContextLost] = useState(false);

    if (isContextLost) {
        return <DegradedFallback />;
    }

    return (
        <Canvas
            shadows
            camera={{ position: [3, 2, 4], fov: 40 }}
            gl={{ antialias: true, powerPreference: "high-performance" }}
            onCreated={(state) => {
                state.gl.domElement.addEventListener("webglcontextlost", (e) => {
                    e.preventDefault();
                    // Smooth degradation — set state, DO NOT throw
                    setContextLost(true);
                });
            }}
            className="w-full h-full"
        >
            <Environment preset="studio" />
            <ContactShadows
                position={[0, -0.8, 0]}
                opacity={0.5}
                scale={6}
                blur={2.5}
                far={2}
            />
            <Model />
            <OrbitControls
                autoRotate
                autoRotateSpeed={3}
                enableZoom
                enablePan
                enableDamping
                dampingFactor={0.05}
            />
        </Canvas>
    );
}

// ─── Shared degraded/error fallback UI ─────────────────────────────────

function DegradedFallback() {
    return (
        <div className="flex items-center justify-center w-full h-full min-h-[300px] rounded-xl bg-zinc-900">
            <div className="flex flex-col items-center gap-4 px-6 text-center">
                <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-zinc-600"
                >
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                    <line x1="12" y1="22" x2="12" y2="15.5" />
                    <polyline points="22 8.5 12 15.5 2 8.5" />
                </svg>
                <span className="text-xs tracking-widest uppercase text-zinc-500">
                    3D Model Unavailable
                </span>
                <span className="text-[11px] text-zinc-600 leading-relaxed max-w-[200px]">
                    请下载简历查看图纸 · Download CV for blueprints
                </span>
            </div>
        </div>
    );
}

// ─── Exported component with full defense chain ────────────────────────

export default function ModelViewer() {
    return (
        <ThreeErrorBoundary>
            <div className="w-full h-full min-h-[300px] rounded-xl overflow-hidden">
                <Suspense fallback={<LoadingFallback />}>
                    <ThreeCanvas />
                </Suspense>
            </div>
        </ThreeErrorBoundary>
    );
}