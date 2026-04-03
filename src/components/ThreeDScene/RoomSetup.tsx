"use client";

import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore } from "./store";

export default function RoomSetup() {
  const { scene } = useGLTF("/models/room_scene.glb", true) as any;
  const powerOn = useAppStore((state) => state.powerOn);
  const setPowerOn = useAppStore((state) => state.setPowerOn);

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
    </group>
  );
}

useGLTF.preload("/models/room_scene.glb");
