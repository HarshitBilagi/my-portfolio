// import DarkVeils from "@/components/ReactComponents/DarkVeil";
// import MagicBento from "@/components/Skills";
// import Navbar from "@/components/Navbar/navbar";
// import HorizontalScrollProjects from "@/components/Projects";
// import ExperienceSection from "@/components/Experience/Experience";
// import ContactSection from '../components/Contact/Contact';
// import HeroSection from "@/components/HeroSection/HeroSection";
// import Footer from "@/components/Footer/footer";

// export default function HomePage() {
//   return (
//     <main style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
//       <div
//         style={{
//           position: "fixed",
//           inset: 0,
//           zIndex: 0,
//           width: "100vw",
//           height: "100vh",
//           pointerEvents: "none",
//         }}
//       >
//         <DarkVeils />
//       </div>
//       <div style={{ position: "relative", zIndex: 1 }}>
//         <Navbar />
//         <section
//           id="home"
//           style={{ position: "relative", height: "100vh", overflow: "hidden" }}
//         >
//           <HeroSection />
//         </section>

//         <section
//           id="skills"
//           style={{
//             position: "relative",
//             padding: "2rem",
//             textAlign: "center",
//             height: "100vh",
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               position: "relative",
//               zIndex: 1,
//               width: "100%",
//               height: "100%",
//             }}
//           >
//             <h2 style={{ fontSize: "2.5rem"}} className="font-futurism bg-gradient-to-r from-[#56ccf2] to-[#2f80ed] bg-clip-text text-transparent">Skills</h2>
//             <div style={{ position: "relative", marginTop: "4rem" }}>
//               <MagicBento
//                 textAutoHide={true}
//                 enableStars={true}
//                 enableSpotlight={true}
//                 enableBorderGlow={true}
//                 enableTilt={true}
//                 enableMagnetism={false}
//                 clickEffect={true}
//                 spotlightRadius={1000}
//                 particleCount={200}
//                 glowColor="132, 0, 255"
//               />
//             </div>
//           </div>
//         </section>
//         <section
//           id="projects"
//           style={{
//             position: "relative",
//             padding: "2rem",
//             textAlign: "center",
//             height: "100vh",
//             overflow: "hidden",
//           }}
//         >
//           <div style={{ position: "relative", zIndex: 1 }}>
//             <h2 style={{ fontSize: "2.5rem"}} className="font-futurism bg-gradient-to-r from-[#56ccf2] to-[#2f80ed] bg-clip-text text-transparent">Projects</h2>
//             <div style={{ marginTop: "-6rem" }}>
//               <HorizontalScrollProjects />
//             </div>
//           </div>
//         </section>
//         <section
//           id="experience"
//           style={{
//             position: "relative",
//             padding: "2rem",
//             textAlign: "center",
//             height: "100vh",
//             overflow: "hidden",
//           }}
//         >
//           <div style={{ position: "relative", zIndex: 1 }}>
//             <h2 style={{ fontSize: "2.5rem"}} className="font-futurism bg-gradient-to-r from-[#56ccf2] to-[#2f80ed] bg-clip-text text-transparent">Experience</h2>
//             <div style={{ marginTop: "-5rem" }}>
//               <ExperienceSection />
//             </div>
//           </div>
//         </section>
//         <section id="contact" style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
//           <ContactSection />
//         </section>
//         <Footer /> 
//       </div>
//     </main>
//   );
// }


import DarkVeils from "@/components/ReactComponents/DarkVeil";
import MagicBento from "@/components/Skills";
import Navbar from "@/components/Navbar/navbar";
import HorizontalScrollProjects from "@/components/Projects/HorizontalScrollProjects"; // This will be the file we just built
import ExperienceSection from "@/components/Experience/index";
import ContactSection from '../components/Contact/Contact';
import HeroSection from "@/components/HeroSection/HeroSection";
import Footer from "@/components/Footer/footer";

export default function HomePage() {
  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
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

        {/* --- CRITICAL UPDATE IN THIS SECTION --- */}
        <section
          id="projects"
          style={{
            position: "relative",
            // REMOVED: height: "100vh" and overflow: "hidden" so the 700vh scroll track can breathe
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Added absolute positioning to the header so it sits nicely on top of the sticky project cards */}
            <h2 style={{ fontSize: "2.5rem", position: "absolute", top: "2rem", width: "100%", textAlign: "center", zIndex: 10 }} className="font-futurism bg-gradient-to-r from-[#56ccf2] to-[#2f80ed] bg-clip-text text-transparent">
              Projects
            </h2>
            
            {/* Removed the negative margin so it doesn't mess with the sticky container's calculations */}
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
            {/* Absolute positioning keeps the heading pinned at the top of the section! */}
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

        <section id="contact" style={{ position: "relative", height: "100vh"}}>
          <ContactSection />
        </section>
        
        <Footer /> 
      </div>
    </main>
  );
}