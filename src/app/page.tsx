import DarkVeils from "@/components/DarkVeil";
import MagicBento from "@/components/MagicBento";
import Navbar from "@/components/navbar";
import HorizontalScrollProjects from "@/components/Projects";
import Particles from "@/components/Particles";
import SplitText from "@/components/SplitText";
import Plasma from "@/components/Plasma";
import ExperienceSection from "@/components/Experience";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <section
        id="home"
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <DarkVeils />
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <SplitText
            text="Hello, Harshit welcomes you!"
            tag="h1"
            className="text-2xl font-bold text-center"
            delay={60}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>
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
            position: "absolute",
            inset: 0,
            zIndex: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            transform: "rotate(180deg)",
          }}
        >
          <DarkVeils />
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: "100%",
          }}
        >
          <h1>Skills</h1>
          <div>
            <MagicBento
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={12}
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            width: "100%",
            height: "100vh",
          }}
        >
          <Plasma
            color="#b19eef"
            speed={0.6}
            direction="forward"
            scale={1.1}
            opacity={0.8}
            mouseInteractive={false}
          />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1>Projects</h1>
          <div style={{ marginTop: "-8rem" }}>
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Particles
            particleColors={["#6b0bf2ff"]}
            particleCount={500}
            particleSpread={10}
            speed={0.05}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1>Experience</h1>
          <div style={{ marginTop: "-5rem" }}>
            <ExperienceSection />
          </div>
        </div>
      </section>
    </main>
  );
}
