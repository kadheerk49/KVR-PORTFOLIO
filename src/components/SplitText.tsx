import React, { type CSSProperties } from 'react';
import { motion, type Variants } from 'framer-motion';

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';
  from?: { opacity?: number; y?: number; x?: number; scale?: number; filter?: string };
  to?: { opacity?: number; y?: number; x?: number; scale?: number; filter?: string };
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 40,
  duration = 0.8,
  splitType = 'chars',
  from = { opacity: 0, y: 35 },
  to = { opacity: 1, y: 0 },
  tag = 'h1',
  textAlign = 'center',
  onLetterAnimationComplete
}) => {
  const TagName = tag || 'h1';
  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: from.opacity ?? 0,
      y: from.y ?? 35,
      x: from.x ?? 0,
      scale: from.scale ?? 1,
      filter: from.filter ?? 'none',
    },
    visible: {
      opacity: to.opacity ?? 1,
      y: to.y ?? 0,
      x: to.x ?? 0,
      scale: to.scale ?? 1,
      filter: to.filter ?? 'none',
      transition: {
        duration,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  if (splitType === 'words') {
    return (
      <TagName
        style={{ textAlign }}
        className={`block w-full text-center ${className}`}
      >
        <motion.span
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          onAnimationComplete={onLetterAnimationComplete}
          className="inline-flex flex-wrap gap-x-[0.3em] gap-y-1 justify-center"
        >
          {words.map((word, wIdx) => (
            <motion.span
              key={wIdx}
              variants={itemVariants}
              className="inline-block whitespace-nowrap"
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </TagName>
    );
  }

  return (
    <TagName
      style={{ textAlign }}
      className={`block w-full text-center ${className}`}
    >
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        onAnimationComplete={onLetterAnimationComplete}
        className="inline-flex flex-wrap gap-x-[0.25em] gap-y-1 justify-center"
      >
        {words.map((word, wIdx) => (
          <span key={wIdx} className="inline-block whitespace-nowrap">
            {word.split('').map((char, cIdx) => (
              <motion.span
                key={cIdx}
                variants={itemVariants}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </TagName>
  );
};

export default SplitText;
