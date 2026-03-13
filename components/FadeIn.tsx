"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

// HIER IST DAS UPGRADE: Wir erlauben jetzt className
type FadeInProps = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string; 
};

export default function FadeIn({ children, delay = 0, direction = "up", className = "" }: FadeInProps) {
  // Woher soll das Element eingeflogen kommen?
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      className={className} // HIER WIRD ES ANGEWENDET
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }} 
      transition={{ 
        duration: 0.7, 
        delay: delay, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
    >
      {children}
    </motion.div>
  );
}