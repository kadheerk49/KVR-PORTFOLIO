import { motion, type Variants } from 'framer-motion';

interface AnimatedTextProps {
  children: string;
  className?: string;
}

export function AnimatedText({ children, className = '' }: AnimatedTextProps) {
  const words = children.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0.1,
      y: 8,
      filter: 'blur(3px)',
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`inline-flex flex-wrap gap-x-[0.25em] gap-y-1 justify-center text-center ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}