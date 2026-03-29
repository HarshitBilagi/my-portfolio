'use client';
import React, { useRef } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import styles from './experience.module.scss';
import { Experience } from './experienceData';

interface ExperienceCardProps extends Experience {
    i: number;
    progress: MotionValue<number>;
    range: number[];
    targetScale: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ 
    i, role, company, duration, description, logo, technologies, progress, range, targetScale 
}) => {
    const container = useRef<HTMLDivElement>(null);
    
    // This handles the scaling down effect as the next card scrolls up
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className={styles.cardContainer}>
            <motion.div 
                className={styles.card}
                style={{ 
                    scale, 
                    /* Pushes the card slightly down based on its index so they visually stack */
                    top: `calc(-10vh + ${i * 25}px)` 
                }}
            >
                <div className="flex items-center gap-4 mb-4">
                    <Image
                        src={logo}
                        alt={`${company} logo`}
                        width={180}
                        height={90}
                        className="object-contain rounded-lg bg-gray-900"
                    />
                </div>
                <div>
                    <h2 className="text-2xl bg-gradient-to-r from-[#56ccf2] to-[#2f80ed] bg-clip-text text-transparent font-bold mb-1">
                        {role}
                    </h2>
                    <p className="text-cyan-400 font-medium mb-4">
                        {company} • {duration}
                    </p>
                </div>
                <p className="text-gray-300 text-sm/8 leading-[1.3em] font-normal">
                    {description}
                </p>
                <div className="mt-8">
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-[#56ccf2] to-[#2f80ed] bg-clip-text text-transparent text-cyan-400 mb-3">Skills:</h3>
                    <ul className="flex flex-wrap gap-4">
                        {technologies.map((tech) => (
                            <li
                                key={tech}
                                className="mr-[1rem] mb-[0.5rem] list-none"
                            >
                                {tech}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </div>
    );
};

export default ExperienceCard;