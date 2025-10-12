'use client';

import { SlSocialLinkedin, SlSocialGithub } from "react-icons/sl";
import { RiTwitterXFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";
import SplitText from "@/components/SplitText";
import Dock from '../SocialLinks/SocialLinks';
import { style } from "framer-motion/client";
import styles from '@/components/HeroSection/herosection.module.css';

  const items = [
    { icon: <SlSocialLinkedin size={25} />, label: 'LinkedIn', onClick: () => window.open("https://www.linkedin.com/in/harshit-mahesh-bilagi/","_blank") },
    { icon: <SlSocialGithub size={25} />, label: 'GitHub', onClick: () => window.open("https://github.com/HarshitBilagi/", "_blank") },
    { icon: <RiTwitterXFill size={25} />, label: 'Twitter', onClick: () => window.open ("https://x.com/HarshitBilagi", "_blank") },
    { icon: <SiLeetcode size={25} />, label: 'LeetCode', onClick: () => window.open("https://leetcode.com/HarshitBilagi/", "_blank") },
  ];

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
            }}
          >
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
            <div>
                <Dock 
                    items={items}
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