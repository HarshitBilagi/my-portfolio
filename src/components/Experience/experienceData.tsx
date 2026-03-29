export interface Experience {
    role: string;
    company: string;
    duration: string;
    description: string;
    logo: string;
    technologies: string[];
}

export const experienceData: Experience[] = [
    {
        role: "SDE Intern",
        company: "Code Inbound LLP",
        duration: "Sep. 2024 - Mar. 2025",
        description: "Enhanced a Network Monitoring System by resolving key UI bugs and introducing new functionality. This involved fixing SNMP form field visibility, redesigning the interface table to align with Figma specifications, and integrating an API that allows users to export node asset data. These improvements contributed to better network performance, availability, and security monitoring.",
        logo: "/logos/logo-code_inbound_llp.png",
        technologies: ["React", "TypeScript", "CSS", "Tailwind CSS", "Swagger UI", "Git", "GitHub"]
    },
    {
        role: "Intern - Programmer Analyst Trainee",
        company: "Cognizant Technology Solutions",
        duration: "Mar. 2025 - Jun. 2025",
        description: "Upskilled in frontend development, Python, REST APIs, and Oracle Cloud technologies. And Developed a Vehicle Booking System using Oracle APEX and PL/SQL. My responsibilities included designing the database, managing backend booking workflows, and implementing automated email confirmations.",
        logo: "/logos/cognizant-logo-white.webp",
        technologies: ["SQL", "PL/SQL", "CSS", "Oracle APEX", "Oracle VBCS", "JavaScript", "REST APIs"]
    },
    {
        role: "Fulltime - Programmer Analyst Trainee",
        company: "Cognizant Technology Solutions",
        duration: "Jul. 2025 - Present",
        description: "Currently working on a key business application using Oracle APEX for the user interface and PL/SQL for all backend logic. I'm focused on building dynamic, data-driven reports, directly enhancing operational efficiency and improving data accessibility for the team.",
        logo: "/logos/cognizant-logo-white.webp",
        technologies: ["SQL", "PL/SQL", "CSS", "Oracle APEX"]
    },
];