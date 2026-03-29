'use client';
import { useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { projects } from './data'; // Adjust path to your data.js
import Card from './index'; // Adjust path to your Card.tsx
import styles from './projects.module.scss'; // Adjust path to your wrapper styles

export default function HorizontalScrollProjects() {
  const container = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    // This dynamically sets the height based on how many projects you have (7 * 100vh = 700vh)
    <div ref={container} className={styles.main} style={{ height: `${projects.length * 100}vh` }}>
      <div className={styles.stickyContainer}>
        {
          projects.map((project, i) => {
            return (
              <Card 
                key={`p_${i}`} 
                i={i} 
                {...project} 
                progress={scrollYProgress} 
                total={projects.length}
              />
            )
          })
        }
      </div>
    </div>
  )
}