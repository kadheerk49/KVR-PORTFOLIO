import { motion, useAnimation } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

interface MagnetProps {
  children: ReactNode;
  strength?: number;
  padding?: number;
  className?: string;
}

export function Magnet({
  children,
  strength = 0.2,
  padding = 100,
  className = '',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    if (isTouchDevice || !ref.current) return;

    const element = ref.current;
    const center = {
      x: element.offsetLeft + element.offsetWidth / 2,
      y: element.offsetTop + element.offsetHeight / 2,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - center.x;
      const dy = e.clientY - center.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < padding) {
        controls.start({
          x: dx / (strength * 100),
          y: dy / (strength * 100),
        });
      }
    };

    const handleMouseLeave = () => {
      controls.start({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTouchDevice, padding, strength, controls]);

  if (isTouchDevice) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      animate={controls}
      transition={{ type: 'spring', damping: 15, stiffness: 300 }}
      className={className}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}