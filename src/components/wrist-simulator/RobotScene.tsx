"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface RobotSceneProps {
  /** Arbitrary R3F children (the kinematic chain, etc.) */
  children: React.ReactNode;
}

/**
 * RobotScene — R3F Canvas with grid, lights, and orbital controls.
 *
 * - Zinc‑palette GridHelper matching the industrial theme.
 * - Ambient + directional lights (shadows enabled).
 * - OrbitControls locked to the upper hemisphere (no underground).
 */
export default function RobotScene({ children }: RobotSceneProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0.6, 0.5, 0.9], fov: 40 }}
      dpr={[1, 2]}
      className="w-full h-full"
    >
      {/* ── Light background ──────────────────────────── */}
      <color attach="background" args={["#f4f4f5"]} />

      {/* ── Lightened grid ─────────────────────────────── */}
      <gridHelper args={[2, 20, "#d4d4d8", "#e4e4e7"]} />

      {/* ── Lights ─────────────────────────────────────── */}
      <ambientLight intensity={0.4} color="#e4e4e7" />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={8}
        shadow-camera-near={0.1}
      />
      <directionalLight
        position={[-3, 4, -2]}
        intensity={0.35}
        color="#a1a1aa"
      />

      {/* ── Scene content ──────────────────────────────── */}
      <Suspense fallback={null}>{children}</Suspense>

      {/* ── Controls (no underground, no pan) ──────────── */}
      <OrbitControls
        makeDefault
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minDistance={0.25}
        maxDistance={1.8}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}
