import DarkVeils from "@/components/DarkVeil";
import MagicBento from "@/components/Skills";
import Navbar from "@/components/navbar";
import HorizontalScrollProjects from "@/components/Projects";
import ExperienceSection from "@/components/Experience/Experience";
import ContactSection from '@/components/Contact/Contact';
import HeroSection from "@/components/HeroSection/HeroSection";

export default function HomePage() {
  return (
    <main style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
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
            height: "100vh",
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
            <h1>Skills</h1>
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
            padding: "2rem",
            textAlign: "center",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            <h1>Projects</h1>
            <div style={{ marginTop: "-6rem" }}>
              <HorizontalScrollProjects />
            </div>
          </div>
        </section>
        <section
          id="experience"
          style={{
            position: "relative",
            padding: "2rem",
            textAlign: "center",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            <h1>Experience</h1>
            <div style={{ marginTop: "-5rem" }}>
              <ExperienceSection />
            </div>
          </div>
        </section>
        <section id="contact" style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
          <ContactSection />
        </section>
      </div>
    </main>
  );
}
