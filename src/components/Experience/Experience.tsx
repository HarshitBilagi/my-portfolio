'use client';

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from './experience.module.css'

const experienceData = [
    {
        role: "SDE Intern",
        company: "Code Inbound LLP",
        duration: "Sep. 2024 - Mar. 2025",
        description:
            "Enhanced a Network Monitoring System by resolving key UI bugs and introducing new functionality. This involved fixing SNMP form field visibility, redesigning the interface table to align with Figma specifications, and integrating an API that allows users to export node asset data. These improvements contributed to better network performance, availability, and security monitoring.",
        logo: "/logos/logo-code_inbound_llp.png",
        technologies: ["React", "TypeScript", "CSS", "Tailwind CSS", "Swagger UI", "Git", "GitHub"]
            
    },
    {
        role: "Intern - Programmer Analyst Trainee",
        company: "Cognizant Technology Solutions",
        duration: "Mar. 2025 - Jun. 2025",
        description:
            "Upskilled in frontend development, Python, REST APIs, and Oracle Cloud technologies. And Developed a Vehicle Booking System using Oracle APEX and PL/SQL. My responsibilities included designing the database, managing backend booking workflows, and implementing automated email confirmations.",
        logo: "/logos/logo-cts.png",
        technologies: ["SQL", "PL/SQL", "CSS", "Oracle APEX", "Oracle VBCS", "JavaScript", "REST APIs"]
    },
    {
        role: "Fulltime - Programmer Analyst Trainee",
        company: "Cognizant Technology Solutions",
        duration: "Jul. 2025 - Present",
        description:
            "Currently working on a key business application using Oracle APEX for the user interface and PL/SQL for all backend logic. I'm focused on building dynamic, data-driven reports, directly enhancing operational efficiency and improving data accessibility for the team.",
        logo: "/logos/logo-cts.png",
        technologies: ["SQL", "PL/SQL", "CSS", "Oracle APEX"]
    },
];

const ExperienceSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const isThrottledRef = useRef(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [locked, setLocked] = useState(false);

    // Lock scroll when section is in view
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

    // Apply body scroll lock
    useEffect(() => {
        document.body.style.overflow = locked ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [locked]);

    // Wheel handler (one scroll → one card)
// inside useEffect that handles wheel
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
      if (activeIndex < experienceData.length - 1) {
        e.preventDefault();
        setActiveIndex((prev) => prev + 1);
      } else {
        // already at last → only unlock on EXTRA scroll attempt
        if (!isThrottledRef.current) {
          setLocked(false);
        }
      }
    } else if (isScrollingUp) {
      if (activeIndex > 0) {
        e.preventDefault();
        setActiveIndex((prev) => prev - 1);
      } else {
        // already at first → only unlock on EXTRA scroll attempt
        if (!isThrottledRef.current) {
          setLocked(false);
        }
      }
    }

    // throttle duration controls how slow / smooth scrolling feels
    isThrottledRef.current = true;
    setTimeout(() => {
      isThrottledRef.current = false;
    }, 1100); // match card animation duration
  };

  window.addEventListener("wheel", onWheel, { passive: false });
  return () => window.removeEventListener("wheel", onWheel);
}, [locked, activeIndex]);


    return (
        <section
            ref={sectionRef}
            id="experience"
            className="relative h-screen bg-transparent flex flex-col justify-center items-center overflow-hidden"
        >
            <div className="text-center mb-12">

            </div>
            <div className="w-full max-w-[1200px] flex">
                <div className="w-2/4 relative flex flex-col items-start justify-center pr-6">
                    <div className="absolute left-[14px] top-0 h-full w-[2px] bg-gray-700" />
                    <motion.div
                        className="absolute left-[14px] top-0 h-full w-[2px] bg-cyan-400 origin-top"
                        animate={{ scaleY: activeIndex / (experienceData.length - 1) }}
                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                    />
                    <div className="flex flex-col gap-8 relative z-10">
                        {experienceData.map((exp, i) => (
                            <div key={exp.role + exp.company} className="flex items-center py-[15] gap-4">
                                <motion.div
                                    animate={{
                                        scale: activeIndex === i ? 1.5 : 1,
                                        borderColor: activeIndex === i ? 'rgb(34 211 238)' : 'rgb(107 114 128)',
                                        backgroundColor: activeIndex === i ? 'rgb(34 211 238)' : 'rgb(10 10 10)'
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    className="w-8 h-8 rounded-full border-2 bg-black flex-shrink-0"
                                />
                                <motion.button
                                    animate={{
                                        color: activeIndex === i ? 'rgb(255 255 255)' : 'rgb(156 163 175)',
                                        fontWeight: activeIndex === i ? '1000' : '400',
                                        fontSize: activeIndex === i ? '1.1rem' : '1rem'
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    className="text-sm bg-transparent border-none outline-none cursor-pointer"
                                    style={{ padding: 0, margin: 0 }}
                                    onClick={() => setActiveIndex(i)}
                                    tabIndex={0}
                                    aria-label={`Show experience for ${exp.role}`}
                                >
                                    {exp.role}
                                </motion.button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.card_container}>
                    {experienceData.map((exp, i) => {
                        const offset = i - activeIndex;
                        if (Math.abs(offset) > 3) return null;

                        return (
                            <motion.div
                                key={exp.role + exp.company}
                                animate={{
                                    y: offset * 30, 
                                    scale: 1 - Math.abs(offset) * 0.08,
                                    opacity: 1 - Math.abs(offset) * 0.3,
                                    zIndex: experienceData.length - Math.abs(offset),
                                }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                className={styles.cards}
                                style={{ pointerEvents: offset === 0 ? "auto" : "none" }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={exp.logo}
                                        alt={`${exp.company} logo`}
                                        width={200}
                                        className="object-contain rounded-lg bg-gray-900"
                                    />
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                                        <p className="text-cyan-400 font-medium">
                                            {exp.company} • {exp.duration}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-300 text-sm/8 leading-relaxed font-normal ">
                                    {exp.description}
                                </p>
                                <div className="mt-8">
                                    <h4 className="text-lg font-semibold text-cyan-400 mb-3">Skills</h4>
                                    <ul className="flex flex-wrap gap-6">
                                        {exp.technologies.map((tech) => (
                                            <li
                                                key={tech}
                                                className="px-[8] mx-[4] my-[4] py-[2] list-none bg-gradient-to-r from-cyan-700 via-cyan-500 to-cyan-400 text-white text-sm font-semibold shadow-md border border-cyan-300 hover:scale-105 transition-transform duration-200"
                                            >
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;