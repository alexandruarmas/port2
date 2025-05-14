"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  className?: string;
}

export const ScrollReveal = ({ 
  children, 
  direction = 'left',
  className = ''
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      animate={{
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : (direction === 'left' ? -30 : 30),
      }}
      transition={{
        duration: 1.0,
        ease: "linear"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}; 