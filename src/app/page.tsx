import DarkVeils from "../components/DarkVeil";
import MagicBento from "../components/MagicBento";
import DotGrid from "../components/DotGrid";
import Threads from "../components/Threads";
import Navbar from "@/components/navbar";
import HorizontalScrollProjects from "../components/Projects";
import DecryptedText from "@/components/DecryptedText";
import Particles from "@/components/Particles";
import SplitText from "@/components/SplitText";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <section
        id="home"
        style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
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
          <br />
          <div style={{ marginTop: "4rem" }}>
          {/* <DecryptedText
            text="It's me! A masterpiece in the making."
            speed={100}
            maxIterations={10}
            characters="ABCD#$%/{}</>1234!?"
            className="revealed"
            revealDirection="start"
            sequential={true}
            parentClassName="all-letters"
            animateOn="view"
            encryptedClassName="encrypted"
          /> */}
          </div>
        </div>
      </section>

      <section
        id="skills"
        style={{
          position: "relative",
          padding: "2rem",
          textAlign: "center",
          minHeight: "600px",
          overflow: "hidden",
        }}
      >
        {/* Dark Veils as background */}
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
        {/* Foreground content */}
        <div style={{ position: "relative", zIndex: 1 , width: "100%", height: "100%"}}>
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
          minHeight: "600px",
          overflow: "hidden",
        }}
      >
        {/* <div
          style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
          }}
        >
        <DotGrid
        dotSize={5}
        gap={15}
        baseColor="#271e37"
        activeColor="#5227FF"
        proximity={100}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
          />
        </div> */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1>Projects</h1>
          <HorizontalScrollProjects />
        </div>
      </section>
      <section
        id="experience"
        style={{
          position: "relative",
          padding: "2rem",
          textAlign: "center",
          height: "90vh",
          overflow: "hidden",
        }}
      >
        {/* Dark Veils as background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            width: "100%",
            height: "100%",
            // pointerEvents: "none",
          }}
        >
          <Particles
            particleColors={['#6b0bf2ff']}
            particleCount={1000}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>
        {/* Foreground content */}
        <div style={{ position: "relative", zIndex: 1}}>
          <h1>Experience</h1>

        </div>
      </section>
    </main>
  );
}
