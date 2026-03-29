'use client'
import Image from 'next/image';
import styles from './projects.module.scss';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { Github } from 'lucide-react';

// Define the types for all the props the Card component expects
interface CardProps {
  i: number;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  githubUrl: string;
  progress: MotionValue<number>;
  total: number;
}

const Card: React.FC<CardProps> = ({ i, title, description, imageUrl, techStack, githubUrl, progress, total }) => {
  
  // Timing for when this specific card should animate in
  const startScroll = i / total;
  const endScroll = (i + 1) / total;

  // Variables to control how far back and small the oldest cards get
  const pushBackAmount = 35; // Pixels to move left per card on top of it
  const scaleDownAmount = 0.04; // How much it shrinks (0.04 = 4% smaller per card)

  // Where this card will end up when you scroll all the way to the bottom
  const finalRestingX = -((total - 1 - i) * pushBackAmount); 
  const finalRestingScale = 1 - ((total - 1 - i) * scaleDownAmount);

  // We need specific Framer Motion arrays based on whether it's the first, middle, or last card
  let progressRange: number[], xRange: string[], scaleRange: number[], opacityRange: number[];

  if (i === 0) {
    // First card starts on screen and just gets pushed back
    progressRange = [0, 1];
    xRange = ["0px", `${finalRestingX}px`];
    scaleRange = [1, finalRestingScale];
    opacityRange = [1, 1];
  } else if (i === total - 1) {
    // Last card slides in and stays in the center
    progressRange = [0, startScroll, 1];
    xRange = ["20vw", "20vw", "0px"]; 
    scaleRange = [0.8, 0.8, 1];
    opacityRange = [0, 0, 1]; // Smooth fade-in!
  } else {
    // Middle cards slide in, stay active briefly, then get pushed back
    progressRange = [0, startScroll, endScroll, 1];
    xRange = ["20vw", "20vw", "0px", `${finalRestingX}px`];
    scaleRange = [0.8, 0.8, 1, finalRestingScale];
    opacityRange = [0, 0, 1, 1]; // Smooth fade-in, stays visible
  }

  // Hook up the transforms
  const x = useTransform(progress, progressRange, xRange);
  const scale = useTransform(progress, progressRange, scaleRange);
  const opacity = useTransform(progress, progressRange, opacityRange);

  return (
    <div className={styles.cardContainer}>
      <motion.div 
        style={{
          x, 
          scale,
          opacity,
        }} 
        className={styles.card}
      >
        <h2>{title}</h2>
        <div className={styles.body}>
          <div className={styles.description}>
            <p>{description}</p>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '15px 0' }}>
              {techStack && techStack.map((tech, index) => (
                <span key={index} style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: 'rgba(255, 255, 255, 0.16)', borderRadius: '4px' }}>
                  {tech}
                </span>
              ))}
            </div>

            <span>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer"><Github size={26} /></a>
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z" fill="black"/>
              </svg>
            </span>
          </div>

          <div className={styles.imageContainer}>
            <div className={styles.inner} style={{position: 'relative', width: '100%', height: '100%'}}>
              <Image
                fill
                src={imageUrl}
                alt={title} 
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Card;