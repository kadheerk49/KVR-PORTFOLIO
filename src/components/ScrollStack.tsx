import React, { type ReactNode } from 'react';

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
  // Sticky top offset calculated for each stacked card
  const stickyTop = 100 + index * 24;

  return (
    <div
      className={`sticky w-full transition-all duration-300 ${itemClassName}`.trim()}
      style={{
        top: `${stickyTop}px`,
        zIndex: index + 1,
        transformOrigin: 'top center',
        ...style
      }}
    >
      {children}
    </div>
  );
};

export interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

export const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`relative w-full flex flex-col gap-12 pb-16 ${className}`.trim()}>
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
