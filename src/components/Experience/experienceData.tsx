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
        description: "Built a web-based Vehicle Booking application, managing everything from schema design to the UI layer using a modern low-code framework. Created automated workflows within the application, including programmatic email triggers for real-time booking confirmations. Completed intensive production training covering Frontend concepts, REST APIs, Python scripting, Linux/Unix utilities, and cloud infrastructure deployment (OCI).",
        logo: "/logos/cognizant-logo-white.webp",
        technologies: ["Python", "JavaScript", "REST APIs", "SQL", "HTML5/CSS3", "Linux/Unix", "Cloud Infra (OCI)"]
    },
    {
        role: "Fulltime - Programmer Analyst Trainee",
        company: "Cognizant Technology Solutions",
        duration: "Jul. 2025 - Present",
        description: "Developed and optimized the core backend data layers of an enterprise business application, writing complex database scripts to manage transactional logic. Engineered dynamic, data-driven interfaces and custom reporting modules, directly improving data accessibility and operational efficiency for internal teams. Implemented structured query optimizations and refactored existing relational database structures to reduce query execution latency",
        logo: "/logos/cognizant-logo-white.webp",
        technologies: ["Backend Engineering", "Relational Databases (SQL)", "PL/SQL Architecture", "Query Optimization", "Data Pipelines", "UI Component Design"]
    },
];