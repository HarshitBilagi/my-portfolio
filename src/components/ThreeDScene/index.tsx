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
      <ambientLight intensity={0.5} color="#2c2c6eff" />

      {/* ── Key light — cool moonlight from window side ── */}
        <directionalLight
          position={[2.7, 27.55, -12.5]}
          intensity={1.8}
          color="#2067eaff"
          castShadow
          // shadow-mapSize={[2048, 2048]}
        />

      {/* ── Warm desk lamp glow ── */}
      <pointLight
        position={[7.7, 50.55, -12.5]}
        intensity={40}
        color="#ffa726"
        distance={21}
        decay={0.1}
      />

      {/* Left Under-Desk Light */}
  <pointLight
    position={[1.0, 28.0, 20.0]} // Lowered Y to ensure it's under the desk
    intensity={15}               // Reduced to prevent color clipping
    color="#2067ea"             
    distance={100}
    decay={0.5}
    castShadow                  // 3. Enable shadow casting
    shadow-mapSize={[512, 512]} // Performance optimization for shadows
  />

  {/* Right Under-Desk Light */}
  <pointLight
    position={[1.0, 28.0, -15.0]} 
    intensity={15}
    color="#2067ea"
    distance={40}
    decay={0.5}
    castShadow
    shadow-mapSize={[512, 512]} // Performance optimization for shadows
  />

      {/* 
        ScrollControls remains enabled so it remembers its 0.98 offset. 
        It naturally is ignored when the 2D portfolio covers it because 
        the portfolio has z-index and intercepts the wheel events.
      */}
      <ScrollControls pages={2} damping={0.2} enabled={true}>
        <CameraController />
        <RoomSetup />
      </ScrollControls>
    </Canvas>
    </div>
  );
}
