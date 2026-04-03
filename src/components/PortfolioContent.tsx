import DarkVeils from "@/components/ReactComponents/DarkVeil";
import MagicBento from "@/components/Skills";
import Navbar from "@/components/Navbar/navbar";
import HorizontalScrollProjects from "@/components/Projects/HorizontalScrollProjects";
import ExperienceSection from "@/components/Experience/index";
import ContactSection from '../components/Contact/Contact';
import HeroSection from "@/components/HeroSection/HeroSection";
import Footer from "@/components/Footer/footer";
import React, { useEffect } from "react";
import Lenis from "lenis";
import { useAppStore } from "./ThreeDScene/store";

const PortfolioContent = () => {
  const isIntroFinished = useAppStore((state) => state.isIntroFinished);
  const setIsIntroFinished = useAppStore((state) => state.setIsIntroFinished);

  useEffect(() => {
    if (!isIntroFinished) return;

    // Normal body scroll Lenis initialization
    const lenis = new Lenis({
      // We can use default window/body scroll
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleWheel = (e: WheelEvent) => {
      // If we are at the very top of the 2D page and scroll UP
      if (window.scrollY <= 0 && e.deltaY < 0) {
        // Prevent Lenis from continuing to parse the negative scroll 
        // to avoid tug-of-war while React handles the state switch
        lenis.stop();
        
        // Small delay so state switch doesn't block main thread mid-frame
        setTimeout(() => {
          setIsIntroFinished(false);
        }, 10);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      lenis.destroy();
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isIntroFinished, setIsIntroFinished]);

  return (
    <div className="portfolio-content-wrapper w-full relative">
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        className="darkveil-bg"
      >
        <DarkVeils />
      </div>
      
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        
        <section
          id="home"
          style={{ position: "relative", height: "100vh", overflow: "hidden" }}
        >
          <HeroSection />
        </section>

        <section
          id="skills"
          style={{
            position: "relative",
            padding: "2rem",
            textAlign: "center",
            minHeight: "100vh",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              height: "100%",
            }}
          >
            <h2 style={{ fontSize: "2.5rem"}} className="font-futurism bg-gradient-to-r from-[#56ccf2] to-[#2f80ed] bg-clip-text text-transparent">Skills</h2>
            <div style={{ position: "relative", marginTop: "4rem" }}>
              <MagicBento
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={false}
                clickEffect={true}
                spotlightRadius={1000}
                particleCount={200}
                glowColor="132, 0, 255"
              />
            </div>
          </div>
        </section>

        <section
          id="projects"
          style={{
            position: "relative",
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: "2.5rem", position: "absolute", top: "2rem", width: "100%", textAlign: "center", zIndex: 10 }} className="font-futurism bg-gradient-to-r from-[#56ccf2] to-[#2f80ed] bg-clip-text text-transparent">
              Projects
            </h2>
            
            <div>
              <HorizontalScrollProjects />
            </div>
          </div>
        </section>

        <section
          id="experience"
          style={{ position: "relative", marginTop: "3rem"}}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 
              style={{ fontSize: "2.5rem", position: "relative", top: "2rem", width: "100%", textAlign: "center", zIndex: 10 }} 
              className="font-futurism bg-gradient-to-r from-[#56ccf2] to-[#2f80ed] bg-clip-text text-transparent"
            >
              Experience
            </h2>
            <div style={{marginTop: "3rem"}}>
              <ExperienceSection />
            </div>
          </div>
        </section>

        <section id="contact" style={{ position: "relative", minHeight: "100vh"}}>
          <ContactSection />
        </section>
        
        <Footer /> 
      </div>
    </div>
  );
};

export default PortfolioContent;
