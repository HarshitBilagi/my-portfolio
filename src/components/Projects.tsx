"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, ChevronLeft, ChevronRight, RadioTower } from "lucide-react";

const projects = [
  {
    title: "LeetCode Revision Agent",
    description:
      "An agent that helps you revise solved LeetCode problems by sending you N number of solved problems with link everyday through mail.",
    imageUrl:
      "/projects/p1.png",
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
      "/projects/p2.png",
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
    liveUrl: "https://my-portfolio-git-main-sirius-projects-9e638854.vercel.app/",
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
          setLocked(false);
        }
      }

      isThrottledRef.current = true;
      setTimeout(() => {
        isThrottledRef.current = false;
      }, 1000); 
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [locked, activeIndex]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="w-full max-w-[1100px] flex flex-col items-center justify-center px-6">
        <div className="relative w-full h-[520px] flex items-center justify-center">
          {projects.map((project, i) => {
            const offset = i - activeIndex;
            if (Math.abs(offset) > 3) return null;

            return (
              <motion.div
                key={project.title}
                animate={{
                  x: offset * 60,
                  y: offset * 0, 
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
            className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed rounded-[50] w-[50px] p-3 
                       bg-gradient-to-r from-[#00DFD8] to-[#007CF0] m-[3]
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
            className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed rounded-full w-[50px] p-3 
                       bg-gradient-to-r from-[#FF0080] to-[#7928CA] m-[3]
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

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  live: boolean;
}

const ProjectCard = ({
  project,
  isActive,
}: {
  project: Project;
  isActive: boolean;
}) => {
  return (
    <div
      className={`group relative h-full w-full overflow-hidden rounded-2xl ${!isActive ? "brightness-50" : ""}`}
      style={{ background: "transparent" }}
    >
      <img
        src={project.imageUrl}
        alt={project.title}
        loading="lazy"
        className="absolute left-0 top-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
        style={{ objectPosition: "center center", display: "block" }}
      />

      <div className="relative z-20 flex h-[50%] mt-[28%] glass-card flex-col justify-end p-8 text-white 
             [mask-image:linear-gradient(to_top,black_65%,transparent_100%)]">
        <h2 className="text-3xl font-bold mb-2 tracking-wide">
          {project.title}
        </h2>

        <p className="text-gray-200 mb-4 leading-[1.3em] max-w-2xl">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-[6] justify-center">
          {project.techStack.map((tech: string) => (
            <span
              key={tech}
              className="bg-gray-800/60 backdrop-blur-sm text-[#00DFD8] text-xs font-semibold px-[10] py-[1] rounded-full"
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
            className="inline-flex m-[5] items-center gap-2 font-bold text-white transition-all duration-300 rounded-lg px-5 py-2.5 text-sm hover:scale-105 active:scale-95 shadow-md"
          >
            <RadioTower size={24} />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 m-[5] hover:text-white transition-colors duration-300 hover:scale-110"
          >
            <Github size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollProjects;
