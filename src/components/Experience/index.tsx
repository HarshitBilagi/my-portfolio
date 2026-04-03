'use client';
import React, { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
// import Lenis removed
import styles from './experience.module.scss';
import ExperienceCard from './ExperienceCard';
import { experienceData } from './experienceData';

export default function ExperienceSection() {
    const container = useRef<HTMLDivElement>(null);

    // Track the scroll progress of the entire wrapper
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    // Lenis initialization moved to PortfolioContent

    return (
        <main ref={container} className={styles.main}>
            {experienceData.map((exp, i) => {
                const targetScale = 1 - ((experienceData.length - i) * 0.05);
                const rangeMultiplier = 1 / experienceData.length;

                return (
                    <ExperienceCard 
                        key={`exp_${i}`} 
                        i={i} 
                        {...exp} 
                        progress={scrollYProgress} 
                        range={[i * rangeMultiplier, 1]} 
                        targetScale={targetScale} 
                    />
                );
            })}
        </main>
    );
}