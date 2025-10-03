"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "LeetCode Revision Agent",
    description:
      "An agent that helps you revise solved LeetCode problems by sending you N number of solved problems with link everyday through mail.",
    imageUrl:
      "/projects/p1.jpeg",
    techStack: ["Python"],
    liveUrl: "#",
    githubUrl: "https://github.com/HarshitBilagi/LeetCode-Revision-Agent",
    live: false,
  },
  {
    title: "BlogIt",
    description:
      "A blogging platform where users can create, edit, and share blog posts. A Full-Stack application with user authentication, authorization and responsive design.",
    imageUrl:
      "/projects/p2.jpg",
    techStack: ["Next.Js", "REST API", "Node.js", "Tailwind CSS", "MongoDB"],
    liveUrl: "#",
    githubUrl: "https://github.com/HarshitBilagi/blog-it",
    live: true,
  },
  {
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with Next.js and Tailwind CSS to showcase projects, skills, and experience.",
    imageUrl:
      "/projects/p3.png",
    techStack: ["Next.Js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
    liveUrl: "#",
    githubUrl: "https://github.com/HarshitBilagi/my-portfolio",
    live: true,
  },
  {
    title: "Online FIR System",
    description:
      "This is a user side web application where a user can file a First Information Report (FIR) online, without the need of visiting police station physically.",
    imageUrl:
      "/projects/p4.png",
    techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    liveUrl: "#",
    githubUrl: "https://github.com/HarshitBilagi/Online-FIR-System.git",
    live: false,
  },
  {
    title: "Customer Survey: A Kiosk Application",
    description:
      "A responsive customer survey form built with React that allows users to answer questions, stores results in Database, and uses 'useNavigate' for smooth redirection after submission.",
    imageUrl:
      "/projects/p5.png",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "#",
    githubUrl: "https://github.com/HarshitBilagi/Customer_Survey",
    live: true,
  },
  {
    title: "To-Do List",
    description:
      "An efficient To-Do List application with full CRUD capabilities, allowing you to easily Create, Read, Update, and Delete tasks. Stay organized and manage your tasks seamlessly with this user-friendly task management system.",
    imageUrl:
      "/projects/p6.png",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "#",
    githubUrl: "https://github.com/HarshitBilagi/To-Do-List",
    live: true,
  },
];

const HorizontalScrollProjects: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isThrottledRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [locked, setLocked] = useState(false);

  // Lock when section is in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setLocked(entry.isIntersecting && entry.intersectionRatio >= 0.7);
        });
      },
      { threshold: 0.7 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Apply lock to body scroll
  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [locked]);

  // Wheel handler with lock persistence
  useEffect(() => {
    if (!locked) return;

    const onWheel = (e: WheelEvent) => {
      if (isThrottledRef.current) {
        e.preventDefault();
        return;
      }
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      if (isScrollingDown) {
        if (activeIndex < projects.length - 1) {
          e.preventDefault();
          setActiveIndex((prev) => prev + 1);
        } else {
          // only unlock if already at last card *and* scroll again
          setLocked(false);
        }
      } else if (isScrollingUp) {
        if (activeIndex > 0) {
          e.preventDefault();
          setActiveIndex((prev) => prev - 1);
        } else {
          // unlock if already at first card *and* scroll again
          setLocked(false);
        }
      }

      isThrottledRef.current = true;
      setTimeout(() => {
        isThrottledRef.current = false;
      }, 1000); // matches animation duration
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel as any);
  }, [locked, activeIndex]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative h-screen bg-transparent flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="w-full max-w-[1100px] flex flex-col items-center justify-center px-6">
        {/* Cards */}
        <div className="relative w-full h-[520px] flex items-center justify-center">
          {projects.map((project, i) => {
            const offset = i - activeIndex;
            if (Math.abs(offset) > 3) return null; // limit renders

            return (
              <motion.div
                key={project.title}
                animate={{
                  x: offset * 60, // horizontal offset for stacking
                  y: offset * 20, // vertical offset for book-page look
                  scale: 1 - Math.abs(offset) * 0.08,
                  opacity: 1 - Math.abs(offset) * 0.25,
                  zIndex: projects.length - Math.abs(offset),
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="absolute top-0 h-[500px] w-full max-w-[900px]"
                style={{ pointerEvents: offset === 0 ? "auto" : "none" }}
              >
                <ProjectCard project={project} isActive={activeIndex === i} />
              </motion.div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex gap-6 mt-10">
          <button
            onClick={() => setActiveIndex((p) => Math.max(p - 1, 0))}
            disabled={activeIndex === 0}
            className="disabled:opacity-30 disabled:cursor-not-allowed rounded-full p-3 
                       bg-gradient-to-r from-[#00DFD8] to-[#007CF0]
                       text-white shadow-lg shadow-cyan-500/30
                       transition-transform hover:scale-110 active:scale-95"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() =>
              setActiveIndex((p) => Math.min(p + 1, projects.length - 1))
            }
            disabled={activeIndex === projects.length - 1}
            className="disabled:opacity-30 disabled:cursor-not-allowed rounded-full p-3 
                       bg-gradient-to-r from-[#FF0080] to-[#7928CA]
                       text-white shadow-lg shadow-pink-500/30
                       transition-transform hover:scale-110 active:scale-95"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({
  project,
  isActive,
}: {
  project: any;
  isActive: boolean;
}) => {
  return (
    <div
      className={`group relative h-full w-full overflow-hidden rounded-2xl shadow-2xl glass-card transition-all duration-300 ${
        !isActive && "brightness-75"
      }`}
    >
      <div
        className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-105"
        style={{
          backgroundImage: `url(${project.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
      <div className="relative z-20 flex h-full flex-col justify-end p-8 text-white">
        <h3 className="text-3xl font-bold mb-2 tracking-wide">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-4 max-w-2xl">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {project.techStack.map((tech: string) => (
            <span
              key={tech}
              className="bg-gray-800/70 backdrop-blur-sm text-[#00DFD8] text-xs font-semibold px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-center space-x-8">
          <a
            style={{ display: project.live ? "inline-flex" : "none" }}
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold text-white transition-all duration-300 
                      rounded-lg bg-gradient-to-r from-[#00DFD8] to-[#007CF0] 
                      px-5 py-2.5 text-sm hover:scale-105 active:scale-95 shadow-md"
          >
            View Live <ArrowRight size={16} />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-110"
          >
            <Github size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollProjects;
