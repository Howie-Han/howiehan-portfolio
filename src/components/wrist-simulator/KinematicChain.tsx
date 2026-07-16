"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// ─── Type Definitions ──────────────────────────────────────────
export interface Pose3D {
  yaw: number; // degrees (rotation around Z, Z-up standard)
  pitch: number; // degrees (rotation around Y, Z-up standard)
  roll: number; // degrees (rotation around X, Z-up standard)
}

export interface KinematicChainProps {
  pointA: Pose3D;
  pointB: Pose3D;
  isAnimating: boolean;
  timerRef: React.MutableRefObject<number>;
  hudRef: React.MutableRefObject<HTMLDivElement | null>;
  showWorkspace: boolean;
}

// ─── Constants ───────────────────────────────────────────────
const TOTAL_TIME = 3.0; // seconds
const BASE_HEIGHT = 0.05; // 50mm from base to joint intersection
const TCP_LENGTH = 0.223; // 223mm from intersection to TCP
const MC_POINTS = 1500; // Monte Carlo sample count

// ─── Quintic Polynomial Engine ─────────────────────────────────
interface QuinticCoeffs {
  a0: number;
  a3: number;
  a4: number;
  a5: number;
}

function computeQuinticCoeffs(start: number, end: number, T: number): QuinticCoeffs {
  const diff = end - start;
  const T3 = T * T * T;
  const T4 = T3 * T;
  const T5 = T4 * T;
  return {
    a0: start,
    a3: (10 * diff) / T3,
    a4: (-15 * diff) / T4,
    a5: (6 * diff) / T5,
  };
}

function evaluateQuintic(t: number, c: QuinticCoeffs): number {
  const t2 = t * t;
  const t3 = t2 * t;
  const t4 = t2 * t2;
  const t5 = t4 * t;
  return c.a0 + c.a3 * t3 + c.a4 * t4 + c.a5 * t5;
}

// ─── Kinematic Chain Component ─────────────────────────────────
export default function KinematicChain({
  pointA,
  pointB,
  isAnimating,
  timerRef,
  hudRef,
  showWorkspace,
}: KinematicChainProps) {
  // Scene-graph refs (direct manipulation - no setState)
  const yawRef = useRef<THREE.Group>(null!);
  const pitchRef = useRef<THREE.Group>(null!);
  const rollRef = useRef<THREE.Group>(null!);
  const tcpRef = useRef<THREE.Object3D>(null!);

  // Trajectory line (fully imperative, no React state)
  const linePositions = useRef<number[]>([]);
  const lineGeomRef = useRef<THREE.BufferGeometry>(null!);

  // Scratch vectors
  const tmpVec = useMemo(() => new THREE.Vector3(), []);
  const tmpQuat = useMemo(() => new THREE.Quaternion(), []);

  // ─── Monte Carlo workspace points (memoized) ──────────
  const mcPositions = useMemo(() => {
    const positions = new Float32Array(MC_POINTS * 3);
    const yawMin = -Math.PI;
    const yawMax = Math.PI;
    const pitchMin = (-95 * Math.PI) / 180;
    const pitchMax = 0;

    for (let i = 0; i < MC_POINTS; i++) {
      const yaw = yawMin + Math.random() * (yawMax - yawMin);
      const pitch = pitchMin + Math.random() * (pitchMax - pitchMin);
      const x = TCP_LENGTH * Math.cos(pitch) * Math.cos(yaw);
      const y = TCP_LENGTH * Math.cos(pitch) * Math.sin(yaw);
      const z = BASE_HEIGHT + TCP_LENGTH * Math.sin(pitch);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, []);

  // Quintic coefficients per axis
  const coeffs = useMemo(
    () => ({
      yaw: computeQuinticCoeffs(pointA.yaw, pointB.yaw, TOTAL_TIME),
      pitch: computeQuinticCoeffs(pointA.pitch, pointB.pitch, TOTAL_TIME),
      roll: computeQuinticCoeffs(pointA.roll, pointB.roll, TOTAL_TIME),
    }),
    [pointA, pointB],
  );

  // Initial pose
  useEffect(() => {
    // Z-up convention: yaw=Z, pitch=Y, roll=X
    yawRef.current.rotation.z = THREE.MathUtils.degToRad(pointA.yaw);
    pitchRef.current.rotation.y = THREE.MathUtils.degToRad(pointA.pitch);
    rollRef.current.rotation.x = THREE.MathUtils.degToRad(pointA.roll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track previous isAnimating to detect rising edge
  const prevAnimatingRef = useRef(false);

  // ── Core frame loop ──────────────────────────────────
  useFrame((_state, delta) => {
    // ── Detect rising edge of isAnimating -> clear trajectory ──
    if (isAnimating && !prevAnimatingRef.current) {
      linePositions.current = [];
      // Force geometry update by clearing attribute
      if (lineGeomRef.current) {
        lineGeomRef.current.setAttribute(
          "position",
          new THREE.Float32BufferAttribute([], 3),
        );
        lineGeomRef.current.computeBoundingSphere();
      }
    }
    prevAnimatingRef.current = isAnimating;

    if (!isAnimating) return;

    const t = Math.min(timerRef.current + delta, TOTAL_TIME);
    timerRef.current = t;

    const currentYaw = evaluateQuintic(t, coeffs.yaw);
    const currentPitch = evaluateQuintic(t, coeffs.pitch);
    const currentRoll = evaluateQuintic(t, coeffs.roll);

    // Z-up: yaw=Z, pitch=Y, roll=X
    yawRef.current.rotation.z = THREE.MathUtils.degToRad(currentYaw);
    pitchRef.current.rotation.y = THREE.MathUtils.degToRad(currentPitch);
    rollRef.current.rotation.x = THREE.MathUtils.degToRad(currentRoll);

    // Trajectory collection
    tcpRef.current.getWorldPosition(tmpVec);
    linePositions.current.push(tmpVec.x, tmpVec.y, tmpVec.z);
    if (lineGeomRef.current) {
      const attr = new THREE.Float32BufferAttribute(linePositions.current, 3);
      lineGeomRef.current.setAttribute("position", attr);
      lineGeomRef.current.computeBoundingSphere();
    }

    // HUD direct DOM
    if (hudRef.current) {
      hudRef.current.innerText = [
        `Yaw:   ${currentYaw.toFixed(2)}°`,
        `Pitch: ${currentPitch.toFixed(2)}°`,
        `Roll:  ${currentRoll.toFixed(2)}°`,
        `X: ${(tmpVec.x * 1000).toFixed(1)} mm`,
        `Y: ${(tmpVec.y * 1000).toFixed(1)} mm`,
        `Z: ${(tmpVec.z * 1000).toFixed(1)} mm`,
      ].join("\n");
    }
  });

  // ─── Render: Scene Graph ─────────────────────────────
  return (
    // Z-up transform: rotate Three.js Y-up to engineering Z-up
    <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
      {/* ── Base disk ─────────────────────────────── */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.02, 32]} />
        <meshStandardMaterial color="#d4d4d8" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* ── Base neck: cylinder from 0 to BASE_HEIGHT ── */}
      <mesh position={[0, 0, BASE_HEIGHT / 2]} castShadow>
        <cylinderGeometry args={[0.035, 0.05, BASE_HEIGHT, 16]} />
        <meshStandardMaterial color="#a1a1aa" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* ── Three-axis intersection (Pieper criterion) ── */}
      <group position={[0, 0, BASE_HEIGHT]}>
        {/* ── Intersection sphere ──────────────── */}
        <mesh castShadow>
          <sphereGeometry args={[0.032, 24, 24]} />
          <meshStandardMaterial color="#d4d4d8" metalness={0.65} roughness={0.25} />
        </mesh>

        {/* Yaw: rotation around local Z */}
        <group ref={yawRef}>
          {/* ── Yaw joint indicator ring ────── */}
          <mesh position={[0, 0, 0]} castShadow>
            <torusGeometry args={[0.04, 0.006, 12, 32]} />
            <meshStandardMaterial color="#d4d4d8" metalness={0.6} roughness={0.3} />
          </mesh>

          {/* Pitch: rotation around local Y */}
          <group ref={pitchRef}>
            {/* ── Pitch joint ring ────────── */}
            <mesh rotation={[0, Math.PI / 2, 0]} castShadow>
              <torusGeometry args={[0.034, 0.005, 12, 32]} />
              <meshStandardMaterial color="#a1a1aa" metalness={0.55} roughness={0.35} />
            </mesh>

            {/* Roll: rotation around local X */}
            <group ref={rollRef}>
              {/* ── Roll joint ring ──────── */}
              <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
                <torusGeometry args={[0.028, 0.004, 12, 32]} />
                <meshStandardMaterial color="#d4d4d8" metalness={0.6} roughness={0.3} />
              </mesh>

              {/* ── Link: cylinder from intersection to TCP (along local X) ── */}
              <group position={[TCP_LENGTH / 2, 0, 0]}>
                <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                  <cylinderGeometry args={[0.014, 0.018, TCP_LENGTH, 12]} />
                  <meshStandardMaterial color="#a1a1aa" metalness={0.5} roughness={0.4} />
                </mesh>
              </group>

              {/* ── TCP frame ────────────── */}
              <object3D ref={tcpRef} position={[TCP_LENGTH, 0, 0]} />

              {/* ── Gripper at TCP ───────── */}
              <mesh position={[TCP_LENGTH + 0.01, 0, 0]} castShadow>
                <boxGeometry args={[0.025, 0.045, 0.016]} />
                <meshStandardMaterial color="#3f3f46" metalness={0.4} roughness={0.5} />
              </mesh>
              <mesh position={[TCP_LENGTH + 0.01, 0.028, 0]} castShadow>
                <boxGeometry args={[0.012, 0.034, 0.014]} />
                <meshStandardMaterial color="#3f3f46" metalness={0.35} roughness={0.55} />
              </mesh>
              <mesh position={[TCP_LENGTH + 0.01, -0.028, 0]} castShadow>
                <boxGeometry args={[0.012, 0.034, 0.014]} />
                <meshStandardMaterial color="#3f3f46" metalness={0.35} roughness={0.55} />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {/* ── Monte Carlo Workspace Cloud ────────────── */}
      {showWorkspace && (
        <Points positions={mcPositions} frustumCulled={false}>
          <PointMaterial
            color="#3b82f6"
            size={0.005}
            transparent
            opacity={0.6}
            sizeAttenuation
            depthWrite={false}
          />
        </Points>
      )}

      {/* ── Trajectory line ──────────────────────────── */}
      {linePositions.current.length >= 3 && (
        <line>
          <bufferGeometry ref={lineGeomRef} />
          <lineBasicMaterial color="#ef4444" transparent opacity={0.75} />
        </line>
      )}
    </group>
  );
}