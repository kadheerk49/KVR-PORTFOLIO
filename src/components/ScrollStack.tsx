import React, { type ReactNode, useEffect, useRef, useState } from 'react';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
  index?: number;
  style?: React.CSSProperties;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
  index = 0,
  style
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Sticky top offset calculated for each stacked card:
  // Mobile: 60px + index * 8px so stacked card edges peek out neatly without wasting screen height
  // Desktop: 85px + index * 20px
  const stickyTop = isMobile ? 60 + index * 8 : 85 + index * 20;

  return (
    <div
      data-stack-item
      className={`sticky w-full transition-[top] duration-300 ${itemClassName}`.trim()}
      style={{
        top: `${stickyTop}px`,
        zIndex: index + 1,
        transformOrigin: 'top center',
        ...style
      }}
    >
      {/* Recession wrapper: the stack engine scales and dims this as the next
          card slides over, providing the physical 3D card deck effect on both mobile and desktop. */}
      <div data-stack-recession className="will-change-transform" style={{ transformOrigin: 'top center' }}>
        {children}
      </div>
    </div>
  );
};

export interface ScrollStackProps {
  className?: string;
  children: ReactNode;
}

export const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = ''
}) => {
  const rootRef = useRef<HTMLDivElement>(null);

  // Stack engine: active on both mobile and desktop.
  // For every card except the last, measure how far the next card has travelled
  // toward this card's sticky position and recess the card (scale down + dim).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-stack-item]'));
    const cards = items.map((item) => item.querySelector<HTMLElement>('[data-stack-recession]'));
    let raf = 0;

    const update = () => {
      const vh = window.innerHeight;
      const isMobile = window.matchMedia('(max-width: 640px)').matches;
      items.forEach((item, i) => {
        const card = cards[i];
        if (!card) return;
        if (reduce || i === items.length - 1) {
          card.style.transform = '';
          card.style.filter = '';
          return;
        }
        const next = items[i + 1];
        const stickyTop = parseFloat(item.style.top) || (isMobile ? 60 : 85);
        const nextTop = next.getBoundingClientRect().top;
        const progress = Math.min(1, Math.max(0, (vh - nextTop) / Math.max(1, vh - stickyTop)));
        const eased = progress * progress * (3 - 2 * progress);
        const scale = 1 - (isMobile ? 0.04 : 0.06) * eased;
        const brightness = 1 - (isMobile ? 0.35 : 0.42) * eased;
        card.style.transform = `scale(${scale.toFixed(4)})`;
        card.style.filter = `brightness(${brightness.toFixed(3)})`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className={`relative w-full flex flex-col gap-12 sm:gap-14 pb-16 ${className}`.trim()}>
      {React.Children.map(children, (child, idx) => {
        if (React.isValidElement<ScrollStackItemProps>(child)) {
          return React.cloneElement(child, { index: idx });
        }
        return child;
      })}
    </div>
  );
};

export default ScrollStack;
