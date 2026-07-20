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
        description: "Built a web-based Vehicle Booking application, managing everything from schema design to the UI layer using React and JavaScript web components, which reduced manual booking processing times by 35%. Created automated backend workflows within the application, including programmatic SMTP email triggers for real-time booking confirmations. Completed intensive production training covering frontend architecture, REST APIs, Python scripting, Linux/Unix utilities, and cloud infrastructure deployment (OCI).",        logo: "/logos/cognizant-logo-white.webp",
        technologies: ["Python", "JavaScript", "REST APIs", "SQL", "HTML5/CSS3", "Linux/Unix", "Cloud Infra (OCI)"]
    },
    {
        role: "Fulltime - Programmer Analyst Trainee",
        company: "Cognizant Technology Solutions",
        duration: "Jul. 2025 - Present",
        description: "Developed and optimized the core backend data layers of an enterprise business application, writing complex SQL and PL/SQL procedures to manage high-throughput transactional logic. Engineered dynamic, data-driven dashboards and custom reporting modules, improving internal data accessibility and accelerating weekly team reporting cycles by 40%. Implemented structured query optimizations, indexing strategies, and refactored relational database tables to reduce database query execution latency by 25%.",        logo: "/logos/cognizant-logo-white.webp",
        technologies: ["Backend Engineering", "Relational Databases (SQL)", "PL/SQL Architecture", "Query Optimization", "Data Pipelines", "UI Component Design"]
    },
];