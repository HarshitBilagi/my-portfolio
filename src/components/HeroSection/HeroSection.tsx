'use client';

import SplitText from "@/components/ReactComponents/SplitText";
import Dock from '@/components/SocialLinks';
import styles from '@/components/HeroSection/herosection.module.css'; 

export default function HeroSection() {
    return (
        <div
            style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                flexDirection: "column", 
                boxSizing: "border-box",
            }}
        >
            <div style={{ textAlign: "center", maxWidth: "700px" }}>
                <SplitText
                    text="Harshit Bilagi"
                    tag="h1"
                    className="text-2xl font-bold text-center animated-gradient-to-r from-purple-400 via-pink-500 to-red-500"
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
                
                <p className={styles.description}>
                    A software engineer driven by curiosity and a passion for turning 
                    interesting ideas into clean, effective, and human-centered 
                    digital experiences.
                </p>
            </div>

            <div 
                style={{ 
                    position: "absolute", 
                    bottom: "30px",
                    left: "50%",
                    transform: "translateX(-50%)"
                }}
            >
                <Dock 
                    panelHeight={60}
                    baseItemSize={50}
                    magnification={70}
                    className={styles.dock_icons} 
                    spring={{ mass: 0.1, stiffness: 150, damping: 12 }}
                />
            </div>
        </div>
    )
}