import type { ReactNode } from 'react';
import SpecularButton from './SpecularButton';

interface LiveProjectButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function LiveProjectButton({ href, children, className = '' }: LiveProjectButtonProps) {
  return (
    <SpecularButton
      href={href}
      size="md"
      radius={24}
      tint="#ffffff"
      tintOpacity={0.08}
      blur={12}
      textColor="#f8fafc"
      lineColor="#ffffff"
      baseColor="#334155"
      intensity={1.2}
      shineSize={18}
      shineFade={40}
      thickness={1.2}
      speed={0.35}
      followMouse={true}
      autoAnimate={true}
      className={className}
    >
      {children}
    </SpecularButton>
  );
}