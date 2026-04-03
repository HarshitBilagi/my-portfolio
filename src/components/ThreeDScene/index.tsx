"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import RoomSetup from "./RoomSetup";
import CameraController from "./CameraController";
import { useAppStore } from "./store";

export default function ThreeDScene() {
  const isIntroFinished = useAppStore((state) => state.isIntroFinished);

  return (
    <div style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 10 }}>
    <Canvas
      camera={{ position: [140.14, 50.6, -1.5], fov: 45 }}
    >
      {/* ── Ambient fill ── */}
      <ambientLight intensity={0.35} color="#1a1a2e" />

      {/* ── Key light — cool moonlight from window side ── */}
      <directionalLight
        position={[20, 25, 5]}
        intensity={1.8}
        color="#b4c6e7"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* ── Rim / back light — purple tint for depth ── */}
      <directionalLight
        position={[-15, 20, -10]}
        intensity={0.6}
        color="#4a3f6b"
      />

      {/* ── Warm desk lamp glow ── */}
      <pointLight
        position={[3, 44.5, 1.5]}
        intensity={1.2}
        color="#ffa726"
        distance={12}
        decay={2}
      />

      {/* 
        ScrollControls disabled when zoomed in so wheel events 
        pass through to the portfolio HTML container 
      */}
      <ScrollControls pages={2} damping={0.2} enabled={!isIntroFinished}>
        <CameraController />
        <RoomSetup />
      </ScrollControls>
    </Canvas>
    </div>
  );
}
