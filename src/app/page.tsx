"use client";

import React, { useEffect } from "react";
import ThreeDScene from "@/components/ThreeDScene";
import PortfolioContent from "@/components/PortfolioContent";
import { useAppStore } from "@/components/ThreeDScene/store";

export default function HomePage() {
  const isIntroFinished = useAppStore((state) => state.isIntroFinished);

  useEffect(() => {
    // Optional: force scroll to top when 2D view is toggled
    if (isIntroFinished) {
      window.scrollTo(0, 0);
    }
  }, [isIntroFinished]);

  return (
    <main style={{ position: "relative", minHeight: "100vh", backgroundColor: "#000" }}>
      
      {/* 3D Intro Container */}
      <div 
        style={{
          position: "fixed",
          inset: 0,
          opacity: isIntroFinished ? 0 : 1,
          pointerEvents: isIntroFinished ? "none" : "auto", 
          transition: "opacity 0.5s ease-in-out",
          zIndex: isIntroFinished ? 0 : 10
        }}
      >
        <ThreeDScene />
      </div>

      {/* 2D Standard Portfolio Container */}
      <div 
        style={{
          opacity: isIntroFinished ? 1 : 0,
          pointerEvents: isIntroFinished ? "auto" : "none",
          transition: "opacity 0.8s ease-in-out 0.2s", // slight delay to allow camera finish
          position: "relative",
          zIndex: isIntroFinished ? 10 : 0
        }}
      >
        <PortfolioContent />
      </div>
      
    </main>
  );
}