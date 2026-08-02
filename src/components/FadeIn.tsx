import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  x = 0,
  y = 20,
  className = '',
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}