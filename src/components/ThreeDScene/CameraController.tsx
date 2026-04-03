"use client";

import React from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import { useAppStore } from "./store";

export default function CameraController() {
  const scroll = useScroll();
  const setPowerOn = useAppStore((state) => state.setPowerOn);
  const setZoomLevel = useAppStore((state) => state.setZoomLevel);
  const setIsIntroFinished = useAppStore((state) => state.setIsIntroFinished);
  const isIntroFinished = useAppStore((state) => state.isIntroFinished);

  const initialPosition = new THREE.Vector3(140.14, 50.6, -1.5);
  const initialLookAt = new THREE.Vector3(0, 42.9, 0);
  
  // Bring the camera very close to the screen so it perfectly fills the viewport
  const monitorPosition = new THREE.Vector3(2.2, 43.55, -0.15); 
  const monitorLookAt = new THREE.Vector3(0, 43.55, -0.15);

  useFrame((state: any) => {
    if (isIntroFinished) {
      state.camera.position.copy(monitorPosition);
      state.camera.lookAt(monitorLookAt);
      return;
    }

    const offset = scroll.offset;
    setZoomLevel(offset);

    if (offset > 0.5) {
      setPowerOn(true);
    }

    const factor = Math.min(offset * 2, 1);
    const targetPos = new THREE.Vector3().lerpVectors(initialPosition, monitorPosition, factor);
    state.camera.position.lerp(targetPos, 0.1);

    const currentLookAt = new THREE.Vector3().lerpVectors(initialLookAt, monitorLookAt, factor);
    state.camera.lookAt(currentLookAt);

    // At exact 1.0, switch to 2D portfolio
    if (offset >= 0.999) {
      state.camera.position.copy(monitorPosition);
      state.camera.lookAt(monitorLookAt);
      setIsIntroFinished(true);
    }
  });

  return null;
}
