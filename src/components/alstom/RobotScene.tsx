"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Bounds } from "@react-three/drei";
import { ASSET_BASE } from "@/config/assets";

function Model() {
    const { scene } = useGLTF(`${ASSET_BASE}/experience/alstom/robot-main.glb`);
    return <primitive object={scene} />;
}

export default function RobotScene() {
    return (
        <Canvas camera={{ position: [0, 2, 8], fov: 50 }} className="w-full h-full bg-zinc-50" dpr={[1, 2]}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <Suspense fallback={null}>
                <Bounds fit clip observe margin={1.2}>
                    <Center>
                        <Model />
                    </Center>
                </Bounds>
            </Suspense>
            <OrbitControls autoRotate autoRotateSpeed={8} enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
    );
}
