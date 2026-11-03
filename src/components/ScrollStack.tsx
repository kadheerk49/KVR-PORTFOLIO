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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Sticky top offset calculated for each stacked card on desktop
  const stickyTop = 90 + index * 22;

  return (
    <div
      data-stack-item
      className={`relative md:sticky w-full transition-[top] duration-300 ${itemClassName}`.trim()}
      style={{
        top: isDesktop ? `${stickyTop}px` : undefined,
        zIndex: isDesktop ? index + 1 : undefined,
        transformOrigin: 'top center',
        ...style
      }}
    >
      {/* Recession wrapper: on desktop (>= md), the stack engine scales/dims this as the next
          card slides over, so stuck cards visibly recede. On mobile (< md), cards scroll naturally
          in normal document flow so all components remain completely visible without overlapping. */}
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

  // Stack engine: active only on desktop (>= 768px).
  // For every card except the last, measure how far the next card has travelled
  // toward this card's sticky position and recess the card (scale down + dim).
  // On mobile (< 768px), cards are kept in natural vertical flow to prevent
  // tall mobile cards from overlapping or cutting off components.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-stack-item]'));
    const cards = items.map((item) => item.querySelector<HTMLElement>('[data-stack-recession]'));
    let raf = 0;

    const update = () => {
      const isDesktop = window.matchMedia('(min-width: 768px)').matches;
      const vh = window.innerHeight;
      items.forEach((item, i) => {
        const card = cards[i];
        if (!card) return;
        if (!isDesktop || reduce || i === items.length - 1) {
          card.style.transform = '';
          card.style.filter = '';
          return;
        }
        const next = items[i + 1];
        const stickyTop = parseFloat(item.style.top) || 90;
        const nextTop = next.getBoundingClientRect().top;
        const progress = Math.min(1, Math.max(0, (vh - nextTop) / Math.max(1, vh - stickyTop)));
        const eased = progress * progress * (3 - 2 * progress);
        const scale = 1 - 0.07 * eased;
        const brightness = 1 - 0.42 * eased;
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
    <div ref={rootRef} className={`relative w-full flex flex-col gap-8 md:gap-12 pb-16 ${className}`.trim()}>
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
