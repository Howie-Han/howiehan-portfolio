"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Bounds } from "@react-three/drei";

function Model({ modelPath }: { modelPath: string }) {
    const { scene } = useGLTF(modelPath);
    return <primitive object={scene} />;
}

export default function InteractivePartScene({ modelPath }: { modelPath: string }) {
    return (
        <Canvas camera={{ position: [0, 2, 6], fov: 50 }} className="w-full h-full cursor-grab active:cursor-grabbing" dpr={[1, 2]}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <Suspense fallback={null}>
                <Bounds fit clip observe margin={1.2}>
                    <Center>
                        <Model modelPath={modelPath} />
                    </Center>
                </Bounds>
            </Suspense>
            {/* 开启所有交互，并启用 damping(阻尼) 保证拖拽丝滑 */}
            <OrbitControls makeDefault enableDamping dampingFactor={0.05} enableZoom={true} enablePan={true} enableRotate={true} />
        </Canvas>
    );
}