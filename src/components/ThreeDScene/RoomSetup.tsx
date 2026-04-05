"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useGLTF, Text3D, Center, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore } from "./store";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  const check = useCallback(() => {
    setIsMobile(window.innerWidth < breakpoint);
  }, [breakpoint]);

  useEffect(() => {
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [check]);

  return isMobile;
}

export default function RoomSetup() {
  const { scene } = useGLTF("/models/room_scene_v3.glb", true) as any;
  const powerOn = useAppStore((state) => state.powerOn);
  const setPowerOn = useAppStore((state) => state.setPowerOn);
  const isMobile = useIsMobile();

  const switchRef = useRef<THREE.Mesh>(null);

  const handleSwitchClick = (e: any) => {
    e.stopPropagation();
    setPowerOn(!powerOn);
  };

  useFrame(() => {
    if (switchRef.current) {
      const targetRotationX = powerOn ? Math.PI / 4 : -Math.PI / 4;
      switchRef.current.rotation.x = THREE.MathUtils.lerp(
        switchRef.current.rotation.x,
        targetRotationX,
        0.1
      );
    }
  });

  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  // Responsive text config
  const textSize = isMobile ? 0.9 : 1.2;
  const textHeight = isMobile ? 0.3 : 0.5;
  const topGroupPos: [number, number, number] = isMobile ? [65, 62, -4] : [80, 60, 0];
  const bottomGroupPos: [number, number, number] = isMobile ? [65, 35, -8.5] : [80, 35, -8.5];

  return (
    <group>
      {/* ── Room lighting ── */}
      <ambientLight intensity={0.15} color="#303841" />

      {/* Cool-toned directional moonlight */}
      <directionalLight
        position={[10, 5, 0]}
        intensity={2}
        color="#a8c1ff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10, 0.1, 50]} />
      </directionalLight>

      {/* Subtle purple accent from behind */}
      <pointLight position={[-5, 43, -3]} intensity={0.8} color="#7c3aed" distance={15} decay={2} />

      {/* Render the Blender Scene */}
      <primitive object={scene} />

      {/* Switch hitbox */}
      <mesh
        position={[2, 1, 0.5]}
        onClick={handleSwitchClick}
        ref={switchRef}
        visible={false}
      >
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshBasicMaterial transparent opacity={0.5} color="red" />
      </mesh>

      {/* Monitor emit glow */}
      <group position={[0.05, 43.55, -0.15]} rotation={[0, Math.PI / 2, 0]}>
        <pointLight
          intensity={powerOn ? 2.5 : 0}
          distance={5}
          color="#60a5fa"
          position={[0, 0, 0.1]}
        />
      </group>

      {/* 3D Intro Text */}
      <group position={topGroupPos} rotation={[0, Math.PI / 2, 0]}>
        <Float speed={5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Center>
            <Text3D
              font="/fonts/Inter_Bold.json"
              size={textSize}
              height={textHeight}
              curveSegments={12}
              // bevelEnabled
              bevelThickness={0.1}
              bevelSize={0.05}
              bevelOffset={0}
              bevelSegments={5}
              lineHeight={1.4}
              letterSpacing={0.02}
            >
              {`Hey there! \nI'm too lazy to walk you to my portfolio.`}
              <meshStandardMaterial color="#E0E6ED" roughness={0.2} metalness={0.6} />
            </Text3D>
          </Center>
        </Float>
      </group>
      <group position={bottomGroupPos} rotation={[0, Math.PI / 2, 0]}>
        <Float speed={5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Center>
            <Text3D
              font="/fonts/Inter_Bold.json"
              size={textSize}
              height={textHeight}
              curveSegments={12}
              // bevelEnabled
              bevelThickness={0.1}
              bevelSize={0.05}
              bevelOffset={0}
              bevelSegments={5}
              lineHeight={1.4}
              letterSpacing={0.04}
            >
              {`Use the scroll wheel;\nI'll meet you at the laptop.`}
              <meshStandardMaterial color="#E0E6ED" roughness={0.2} metalness={0.6} />
            </Text3D>
          </Center>
        </Float>
      </group>
    </group>
  );
}

useGLTF.preload("/models/room_scene_v3.glb");
