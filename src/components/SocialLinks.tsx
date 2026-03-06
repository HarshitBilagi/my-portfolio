'use client';

import { motion, MotionValue, useMotionValue, useSpring, useTransform, type SpringOptions, AnimatePresence} from 'motion/react';
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import { SlSocialLinkedin, SlSocialGithub } from "react-icons/sl";
import { RiTwitterXFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";
import { IoDocumentTextOutline } from "react-icons/io5";

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  className?: string;
} & (
  | { onClick: () => void; href?: undefined; download?: undefined }
  | { href: string; download?: string | boolean; onClick?: undefined }
);

const items: DockItemData[] = [
    { icon: <SlSocialLinkedin size={25} />, label: 'LinkedIn', onClick: () => window.open("https://www.linkedin.com/in/harshit-mahesh-bilagi/","_blank") },
    { icon: <SlSocialGithub size={25} />, label: 'GitHub', onClick: () => window.open("https://github.com/HarshitBilagi/", "_blank") },
    { icon: <RiTwitterXFill size={25} />, label: 'Twitter', onClick: () => window.open ("https://x.com/HarshitBilagi", "_blank") },
    { icon: <SiLeetcode size={25} />, label: 'LeetCode', onClick: () => window.open("https://leetcode.com/HarshitBilagi/", "_blank") },
    { 
      icon: <IoDocumentTextOutline size={25} />, 
      label: 'Resume', 
      href: '/documents/Harshit_Mahesh_Bilagi_Resume.pdf', 
      download: 'Harshit_Mahesh_Bilagi_Resume.pdf'
    },
];

export type DockProps = {
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
};

function DockItem({
  children,
  className = '',
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      className={`relative inline-flex z-10 items-center justify-center text-white rounded-xl bg-transparent border-neutral-700 border-2 shadow-md transition-all hover:backdrop-blur-xl ${className}`}
    >
      {Children.map(children, child =>
        React.isValidElement(child)
          ? cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number> }>, { isHovered })
          : child
      )}
    </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockLabel({ children, className = '', isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', latest => { setIsVisible(latest === 1); });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute top-[-25px] z-50 left-1/2 w-fit whitespace-nowrap rounded-md border border-neutral-700 bg-transparent p-[5px] text-xs backdrop-blur-md`}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockIcon({ children, className = '' }: DockIconProps) {
  return <div className={`flex items-center justify-center text-white ${className}`}>{children}</div>;
}

export default function Dock({
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 64,
  dockHeight = 256,
  baseItemSize = 50
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(() => Math.max(dockHeight, magnification + magnification / 2 + 4), [magnification, dockHeight]);
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div style={{ height }} className="mx-2 flex max-w-full items-center">
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        // className={`${className} absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-end w-fit gap-4 border-neutral-700 border-2 pb-2 px-4 rounded-2xl`}
        className={`${className} absolute bottom-2 left-1/2 transform -translate-x-1/2 
                    flex items-end w-fit 
                    gap-2 sm:gap-3 md:gap-4 
                    border-neutral-700 border-2 pb-2 
                    sm:w-[200px] md:w-[200px] 
                    rounded-2xl`}

        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => {
          const dockItemContent = (
            <DockItem
              className={item.className}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
            >
              <DockIcon>{item.icon}</DockIcon>
              <DockLabel>{item.label}</DockLabel>
            </DockItem>
          );

          if (item.href) {
            return (
              <a key={index} href={item.href} download={item.download} className='' style={{ color: '#8d4ee4ff' }}>
                {dockItemContent}
              </a>
            );
          } else {
            return (
              <button key={index} onClick={item.onClick} className="p-0 m-0 bg-transparent border-none cursor-pointer" style={{ color: '#8d4ee4ff' }}>
                {dockItemContent}
              </button>
            );
          }
        })}
      </motion.div>
    </motion.div>
  );
}
